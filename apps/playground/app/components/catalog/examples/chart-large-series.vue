<script setup lang="ts">
import {
  UIChart,
  UIChartActions,
  UIChartAxisView,
  UIChartCartesian,
  UIChartLegend,
  UIChartLine,
  UIChartNavigation,
  UIChartPlot,
  UIChartRenderer,
  UIChartViewToolbar,
  UIChartXAxis,
  UIChartYAxis,
} from "@connextable/ui";

const minute = 60_000;
const start = Date.UTC(2026, 6, 1);
const samples = Array.from({ length: 100_000 }, (_, id) => ({
  id,
  time: start + id * minute,
  count: Math.round(60 + 13 * Math.sin(id / 1800) + 7 * Math.cos(id / 91) + (id % 3917 === 42 ? 17 : 0)),
}));
const format = new Intl.NumberFormat("ko-KR");
const timeAxis = ["time"];
const axes = [{ id: "time", label: "시간축" }];
const controlLabels = { backward: "이전 범위", forward: "다음 범위", zoomIn: "확대", zoomOut: "축소", reset: "전체 범위" };
const countDomain = { kind: "numeric", minimum: 20, maximum: 100 } as const;
// Sectile can keep up to four representative points per CSS pixel column.
const renderPolicy = { type: "fixed", maximumRepresentatives: 16_384 } as const;
</script>

<template>
  <UIChart v-slot="{ projection }" animate-updates :dom="{
    accessibilityLabel: '10만 건의 요청 추이',
    accessibilityLimit: 48,
    renderPolicy,
  }">
    <UIChartLegend :items="[{ label: '분당 요청 수', value: `${format.format(samples.length)}개 관측값` }]" />
    <UIChartCartesian>
      <UIChartXAxis id="time" scale="temporal" field="time" :ticks="6" label="관측 시각 (UTC)">
        <UIChartAxisView :minimum-span="60 * minute" />
      </UIChartXAxis>
      <UIChartYAxis id="count" scale="linear" field="count" :domain="countDomain" :ticks="5" label="분당 요청 수 (건)" />
      <UIChartLine id="requests" :data="samples" x-axis="time" y-axis="count" label="분당 요청 수 (건)" />
      <UIChartNavigation :axes="timeAxis" drag="pan" wheel="zoom" wheel-modifier="control" pinch keyboard />
    </UIChartCartesian>
    <UIChartPlot data-ui-chart-pan>
      <UIChartRenderer />
      <template #controls>
        <UIChartViewToolbar :axes="axes" label="시간축 조작" :labels="controlLabels" />
      </template>
    </UIChartPlot>
    <UIChartActions>
      <output v-if="projection" aria-live="off">
        전체 {{ format.format(samples.length) }}개 중 실제로 그린 점 {{ format.format(projection.diagnostics.emittedPrimitives) }}개
      </output>
    </UIChartActions>
  </UIChart>
</template>
