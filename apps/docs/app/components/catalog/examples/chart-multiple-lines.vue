<script setup lang="ts">
import { UIChart, UIChartCartesian, UIChartLegend, UIChartLine, UIChartPlot, UIChartRenderer, UIChartXAxis, UIChartYAxis } from "@connextable/ui";

const week = ["월", "화", "수", "목", "금", "토", "일"];
const desktop = [80, 74, 92, 88, 96, 63, 58].map((visits, index) => ({
  id: `desktop-${index}`,
  day: week[index],
  visits,
}));
const mobile = [58, 68, 71, 76, 88, 93, 78].map((visits, index) => ({
  id: `mobile-${index}`,
  day: week[index],
  visits,
}));
</script>

<template>
  <UIChart tooltip="shared" :dom="{ accessibilityLabel: '기기별 주간 방문 수' }">
    <UIChartLegend :items="[{ label: '데스크톱' }, { label: '모바일' }]" />
    <UIChartCartesian>
      <UIChartXAxis id="day" scale="categorical" field="day" />
      <UIChartYAxis id="visits" scale="linear" field="visits" :domain="{ kind: 'numeric', minimum: 40, maximum: 100 }" :ticks="4" label="방문 (천 회)" />
      <UIChartLine id="desktop" :data="desktop" x-axis="day" y-axis="visits" label="데스크톱" />
      <UIChartLine id="mobile" :data="mobile" x-axis="day" y-axis="visits" label="모바일" />
    </UIChartCartesian>
    <UIChartPlot><UIChartRenderer /></UIChartPlot>
  </UIChart>
</template>
