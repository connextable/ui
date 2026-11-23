<script setup lang="ts">
import {
  UIChart,
  UIChartBar,
  UIChartCartesian,
  UIChartPlot,
  UIChartRenderer,
  UIChartXAxis,
  UIChartYAxis,
} from "@connextable/ui";

const requests = [
  { id: "design", team: "디자인", total: 8 },
  { id: "web", team: "웹", total: 13 },
  { id: "platform", team: "플랫폼", total: 5 },
];
</script>

<template>
  <UIChart :dom="{ accessibilityLabel: '팀별 요청 수' }">
    <UIChartCartesian>
      <UIChartXAxis id="x" scale="categorical" field="team" label="팀" />
      <UIChartYAxis id="y" scale="linear" field="total" :domain="{ kind: 'numeric', minimum: 0, maximum: 15 }" :ticks="4" label="요청 수" />
      <UIChartBar id="requests" :data="requests" x-axis="x" y-axis="y" label="요청 수" />
    </UIChartCartesian>
    <UIChartPlot><UIChartRenderer /></UIChartPlot>
  </UIChart>
</template>
