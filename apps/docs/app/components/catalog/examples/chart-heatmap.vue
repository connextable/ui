<script setup lang="ts">
import { UIChart, UIChartCartesian, UIChartHeatmap, UIChartPlot, UIChartRenderer, UIChartScaleLegend, UIChartXAxis, UIChartYAxis } from "@connextable/ui";
const days = ["월", "화", "수", "목", "금", "토", "일"];
const shifts = [
  { label: "09시", counts: [18, 24, 22, 17, 25, 9, 6] },
  { label: "12시", counts: [26, 37, 34, 25, 33, 14, 8] },
  { label: "15시", counts: [35, 40, 31, 38, 27, 17, 11] },
  { label: "18시", counts: [19, 21, 27, 24, 22, 13, 7] },
];
const rows = shifts.flatMap(({ label, counts }) => days.map((day, index) => ({
  id: `${day}-${label}`,
  day,
  shift: label,
  count: counts[index]!,
})));
const counts = rows.map(({ count }) => count);
</script>

<template>
  <UIChart :dom="{ accessibilityLabel: '요일과 시간대별 요청 수' }">
    <UIChartCartesian>
      <UIChartXAxis id="x" scale="categorical" field="day" />
      <UIChartYAxis id="y" scale="categorical" field="shift" :ticks="shifts.length" :domain="{ kind: 'categorical', values: shifts.map(({ label }) => label).reverse() }" />
      <UIChartHeatmap id="requests" :data="rows" x-axis="x" y-axis="y" value-field="count" label="요청 수" />
    </UIChartCartesian>
    <UIChartScaleLegend label="요청 수" :minimum="Math.min(...counts)" :maximum="Math.max(...counts)" />
    <UIChartPlot><UIChartRenderer /></UIChartPlot>
  </UIChart>
</template>
