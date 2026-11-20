<script setup lang="ts">
import { UIChart, UIChartLegend, UIChartPie, UIChartRadial, UIChartPlot, UIChartRenderer } from "@connextable/ui";
const rows = [
  { id: "기획", value: 30, label: "기획" },
  { id: "디자인", value: 45, label: "디자인" },
  { id: "개발", value: 25, label: "개발" },
];
</script>

<template>
  <UIChart :dom="{ accessibilityLabel: '분야별 작업 비중' }">
    <UIChartRadial>
      <UIChartPie id="tasks" :data="rows" value-field="value" label-field="label" label="작업" />
    </UIChartRadial>
    <UIChartLegend :items="rows.map(({ label, value }) => ({ label, value: `${value}%` }))" />
    <UIChartPlot><UIChartRenderer /></UIChartPlot>
  </UIChart>
</template>
