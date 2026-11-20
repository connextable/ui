<script setup lang="ts">
import { UIChart, UIChartCartesian, UIChartLegend, UIChartLine, UIChartPlot, UIChartRenderer, UIChartXAxis, UIChartYAxis } from "@connextable/ui";

const traffic = [24, 32, 29, 46, 38, 56, 51, 68, 61, 77, 73, 88].map((visits, index) => ({
  id: index,
  month: `${index + 1}월`,
  visits,
}));
</script>

<template>
  <UIChart fill="area" :dom="{ accessibilityLabel: '월별 방문자 추이' }">
    <UIChartLegend :items="[{ label: '방문자 (천 명)' }]" />
    <UIChartCartesian>
      <UIChartXAxis id="month" scale="categorical" field="month" :ticks="traffic.length" />
      <UIChartYAxis id="visits" scale="linear" field="visits" :domain="{ kind: 'numeric', minimum: 0, maximum: 100 }" :ticks="5" />
      <UIChartLine id="traffic" :data="traffic" x-axis="month" y-axis="visits" />
    </UIChartCartesian>
    <UIChartPlot><UIChartRenderer /></UIChartPlot>
  </UIChart>
</template>
