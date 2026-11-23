<script setup lang="ts">
import { UIChart, UIChartCartesian, UIChartLegend, UIChartLine, UIChartPlot, UIChartRenderer, UIChartXAxis, UIChartYAxis } from "@connextable/ui";

const timings = [
  { id: "web", label: "웹", before: 68, after: 48 },
  { id: "mobile", label: "모바일", before: 46, after: 59 },
  { id: "api", label: "API", before: 33, after: 26 },
];
const series = timings.map(({ id, label, before, after }) => ({
  id,
  label,
  points: [
    { id: `${id}-before`, phase: "개선 전", time: before },
    { id: `${id}-after`, phase: "개선 후", time: after },
  ],
}));
</script>

<template>
  <UIChart :dom="{ accessibilityLabel: '개선 전후의 평균 응답 시간 비교' }">
    <UIChartLegend :items="timings" />
    <UIChartCartesian>
      <UIChartXAxis id="phase" scale="categorical" field="phase" :ticks="2" />
      <UIChartYAxis id="time" scale="linear" field="time" :domain="{ kind: 'numeric', minimum: 20, maximum: 80 }" :ticks="4" label="응답 시간 (ms)" />
      <UIChartLine v-for="item in series" :id="item.id" :key="item.id" :data="item.points" :label="item.label" x-axis="phase" y-axis="time" />
    </UIChartCartesian>
    <UIChartPlot><UIChartRenderer /></UIChartPlot>
  </UIChart>
</template>
