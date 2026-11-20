<script setup lang="ts">
import { UIChart, UIChartCartesian, UIChartLegend, UIChartLine, UIChartPlot, UIChartRenderer, UIChartXAxis, UIChartYAxis } from "@connextable/ui";

const releases = ["1주차", "2주차", "3주차", "4주차", "5주차", "6주차", "7주차", "8주차"];
const services = [
  { id: "workspace", label: "워크스페이스", ranks: [2, 2, 1, 1, 2, 3, 3, 2] },
  { id: "reports", label: "리포트", ranks: [4, 3, 3, 2, 1, 1, 2, 1] },
  { id: "files", label: "파일", ranks: [1, 1, 2, 3, 3, 2, 1, 3] },
  { id: "automations", label: "자동화", ranks: [3, 4, 4, 4, 4, 4, 4, 4] },
].map(({ id, label, ranks }) => ({
  id, label,
  data: ranks.map((rank, index) => ({ id: `${id}-${index}`, week: releases[index]!, rank: `${rank}위` })),
}));
const ranks = ["4위", "3위", "2위", "1위"];
const labels = new Map(services.flatMap(service => service.data.map(point => [
  point.id, `${point.week} ${service.label} ${point.rank}`,
] as const)));
</script>

<template>
  <UIChart :dom="{ accessibilityLabel: '기능별 주간 사용량 순위', getAccessibleDatumLabel: id => labels.get(String(id)) ?? String(id) }">
    <UIChartLegend :items="services" />
    <UIChartCartesian>
      <UIChartXAxis id="week" scale="categorical" field="week" :ticks="releases.length" />
      <UIChartYAxis id="rank" scale="categorical" field="rank" :ticks="ranks.length" :domain="{ kind: 'categorical', values: ranks }" />
      <UIChartLine v-for="service in services" :id="service.id" :key="service.id" :data="service.data" :label="service.label" x-axis="week" y-axis="rank" />
    </UIChartCartesian>
    <UIChartPlot><UIChartRenderer /></UIChartPlot>
  </UIChart>
</template>
