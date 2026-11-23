<script setup lang="ts">
import { UIChart, UIChartActions, UIChartCartesian, UIChartHeatmap, UIChartPlot, UIChartRenderer, UIChartScaleLegend, UIChartXAxis, UIChartYAxis } from "@connextable/ui";

const regions = ["서울", "도쿄", "싱가포르"];
const hours = ["08시", "10시", "12시", "14시", "16시", "18시"];
const averages = [
  [32, 46, 64, 72, 58, 36],
  [43, 55, 98, 126, 78, 51],
  [62, 80, 107, 140, 155, 93],
];
// Keep one representative for each occupied region and time slot.
const renderPolicy = { type: "fixed", maximumRepresentatives: regions.length * hours.length } as const;
const samples = regions.flatMap((region, row) => hours.flatMap((hour, column) =>
  [-12, -4, 5, 11].map((offset, run) => ({
    id: `${row}-${column}-${run}`,
    region,
    hour,
    latency: averages[row]![column]! + offset,
  })),
));
const detail = samples.filter(sample => sample.region === "싱가포르" && sample.hour === "16시");
const measurements = detail.map(sample => sample.latency).join(", ");
</script>

<template>
  <UIChart :dom="{ accessibilityLabel: '지역과 시간대별 평균 응답 시간', renderPolicy }">
    <template #default="{ projection }">
      <UIChartCartesian>
        <UIChartXAxis id="hour" scale="categorical" field="hour" :ticks="hours.length" />
        <UIChartYAxis id="region" scale="categorical" field="region" :ticks="regions.length" :domain="{ kind: 'categorical', values: [...regions].reverse() }" />
        <UIChartHeatmap
          id="latency"
          :data="samples"
          x-axis="hour"
          y-axis="region"
          value-field="latency"
          :projection="{ kind: 'aggregate', reduction: 'mean' }"
          label="평균 응답 시간 (ms)"
        />
      </UIChartCartesian>
      <UIChartScaleLegend label="평균 응답 시간 (ms)" :minimum="Math.min(...averages.flat())" :maximum="Math.max(...averages.flat())" />
      <UIChartPlot><UIChartRenderer /></UIChartPlot>
      <UIChartActions>
        <output v-if="projection">
          측정 {{ samples.length }}건 → 평균 셀 {{ projection.diagnostics.emittedPrimitives }}개.
          싱가포르 16시의 {{ measurements }}ms는 평균 {{ averages[2]?.[4] }}ms입니다.
        </output>
      </UIChartActions>
    </template>
    <template #tooltip="{ title, value, aggregate }">
      <strong>{{ title }}</strong>
      <div class="ui-chart-tooltip__value"><span>평균</span><strong>{{ value }}ms</strong></div>
      <span v-if="aggregate">측정 {{ aggregate.count }}건</span>
    </template>
  </UIChart>
</template>
