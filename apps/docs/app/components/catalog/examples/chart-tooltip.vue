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
  { id: "web", team: "웹", count: 18 },
  { id: "platform", team: "플랫폼", count: 28 },
  { id: "design", team: "디자인", count: 12 },
];
const notes = new Map<string | number, string>([
  ["platform", "신규 연동 요청 8건이 포함됩니다."],
]);
</script>

<template>
  <UIChart :dom="{ accessibilityLabel: '팀별 요청 수와 상세 정보' }">
    <template #default>
      <UIChartCartesian>
        <UIChartXAxis id="team" scale="categorical" field="team" />
        <UIChartYAxis id="count" scale="linear" field="count" :domain="{ kind: 'numeric', minimum: 0, maximum: 30 }" :ticks="4" />
        <UIChartBar id="requests" :data="requests" x-axis="team" y-axis="count" label="요청 수" />
      </UIChartCartesian>
      <UIChartPlot><UIChartRenderer /></UIChartPlot>
    </template>
    <template #tooltip="{ id, title, value }">
      <strong>{{ title }}</strong>
      <span>요청 {{ value }}건</span>
      <small v-if="id !== null && notes.has(id)">{{ notes.get(id) }}</small>
    </template>
  </UIChart>
</template>
