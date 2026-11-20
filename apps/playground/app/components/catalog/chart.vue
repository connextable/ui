<script setup lang="ts">
import {
  UIChart,
  UIChartCartesian,
  UIChartLegend,
  UIChartLine,
  UIChartPlot,
  UIChartRenderer,
  UIChartXAxis,
  UIChartYAxis,
} from "@connextable/ui";

const revenue = [128, 135, 132, 149, 146, 163, 168].map((amount, index) => ({
  id: index,
  date: new Date(Date.UTC(2026, 6, 6 + index * 7)),
  amount,
}));
</script>

<template>
  <UIChart :dom="{ accessibilityLabel: '주간 매출 추이' }">
    <UIChartLegend :items="[{ label: '주간 매출' }]" />
    <UIChartCartesian>
      <UIChartXAxis id="x" scale="temporal" field="date" :ticks="7" />
      <UIChartYAxis id="y" scale="linear" field="amount" :domain="{ kind: 'numeric', minimum: 100, maximum: 180 }" :ticks="5" label="매출 (만 원)" />
      <UIChartLine id="revenue" :data="revenue" x-axis="x" y-axis="y" label="주간 매출" />
    </UIChartCartesian>
    <UIChartPlot><UIChartRenderer /></UIChartPlot>
  </UIChart>
</template>
