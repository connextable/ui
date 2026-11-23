<script setup lang="ts">
import { UIChart, UIChartBar, UIChartCartesian, UIChartPlot, UIChartRenderer, UIChartXAxis, UIChartYAxis } from "@connextable/ui";

const requests = [
  { id: "support", team: "고객 지원", count: 42 },
  { id: "platform", team: "플랫폼", count: 31 },
  { id: "design", team: "디자인", count: 24 },
  { id: "operations", team: "운영", count: 16 },
  { id: "research", team: "리서치", count: 9 },
];
</script>

<template>
  <UIChart :dom="{
    accessibilityLabel: '팀별 요청 건수 순위',
    getAccessibleDatumLabel: id => {
      const request = requests.find(row => row.id === id);
      return request ? `${request.team} 요청 ${request.count}건` : String(id);
    },
  }">
    <UIChartCartesian>
      <UIChartXAxis id="count" scale="linear" field="count" :domain="{ kind: 'numeric', minimum: 0, maximum: 50 }" :ticks="6" label="요청 수 (건)" />
      <UIChartYAxis id="team" scale="categorical" field="team" :ticks="requests.length" :domain="{ kind: 'categorical', values: requests.map(({ team }) => team).reverse() }" />
      <UIChartBar id="requests" :data="requests" x-axis="count" y-axis="team" orientation="horizontal" label="요청 수 (건)" />
    </UIChartCartesian>
    <UIChartPlot><UIChartRenderer /></UIChartPlot>
  </UIChart>
</template>
