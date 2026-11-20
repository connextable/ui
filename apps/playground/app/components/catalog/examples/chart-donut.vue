<script setup lang="ts">
import { UIChart, UIChartCenter, UIChartDonut, UIChartLegend, UIChartRadial, UIChartPlot, UIChartRenderer } from "@connextable/ui";
const rows = [
  { id: "complete", value: 68, label: "완료" },
  { id: "active", value: 21, label: "진행 중" },
  { id: "pending", value: 11, label: "대기" },
] as const;
</script>

<template>
  <UIChart :dom="{
    accessibilityLabel: '상태별 작업 비중',
    getAccessibleDatumLabel: id => rows.find(row => row.id === id)?.label ?? String(id),
  }">
    <UIChartRadial>
      <UIChartDonut id="tasks" :data="rows" value-field="value" label-field="label" :inner-radius="0.57" :outer-radius="0.88" />
    </UIChartRadial>
    <UIChartLegend :items="rows.map(({ label, value }) => ({ label, value: `${value}%` }))" />
    <UIChartPlot>
      <UIChartRenderer />
      <UIChartCenter label="완료율" :value="`${rows[0].value}%`" />
    </UIChartPlot>
  </UIChart>
</template>
