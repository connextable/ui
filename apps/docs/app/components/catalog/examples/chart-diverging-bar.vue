<script setup lang="ts">
import { UIChart, UIChartBar, UIChartCartesian, UIChartPlot, UIChartRenderer, UIChartXAxis, UIChartYAxis } from "@connextable/ui";

const changes = [
  { id: "hosting", area: "호스팅", change: -24 },
  { id: "storage", area: "저장소", change: 12 },
  { id: "network", area: "네트워크", change: -8 },
  { id: "compute", area: "연산", change: 28 },
  { id: "monitoring", area: "모니터링", change: 5 },
];
const signed = new Intl.NumberFormat("ko-KR", { signDisplay: "exceptZero" });
</script>

<template>
  <UIChart :dom="{ accessibilityLabel: '서비스별 비용 증감' }">
    <template #default>
      <UIChartCartesian>
        <UIChartXAxis id="area" scale="categorical" field="area" />
        <UIChartYAxis id="change" scale="linear" field="change" :domain="{ kind: 'numeric', minimum: -30, maximum: 30 }" :ticks="7" label="전월 대비 (만 원)" />
        <UIChartBar id="delta" :data="changes" x-axis="area" y-axis="change" label="비용 증감" />
      </UIChartCartesian>
      <UIChartPlot><UIChartRenderer /></UIChartPlot>
    </template>
    <template #tooltip="{ title, value }">
      <strong>{{ title }}</strong>
      <span>{{ signed.format(Number(value)) }}만 원</span>
    </template>
  </UIChart>
</template>
