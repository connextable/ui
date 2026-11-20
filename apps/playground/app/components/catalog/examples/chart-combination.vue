<script setup lang="ts">
import { UIChart, UIChartBar, UIChartCartesian, UIChartLegend, UIChartLine, UIChartPlot, UIChartRenderer, UIChartXAxis, UIChartYAxis } from "@connextable/ui";

const activity = [37, 48, 44, 63, 57, 74].map((count, index) => ({
  id: `actual-${index}`,
  month: `${index + 1}월`,
  count,
}));
const targets = activity.map(({ month }, index) => ({
  id: `target-${index}`,
  month,
  count: 42 + index * 5,
}));
</script>

<template>
  <UIChart tooltip="shared" :dom="{ accessibilityLabel: '월별 처리 건수와 목표' }">
    <UIChartLegend :items="[{ label: '처리 건수' }, { label: '월별 목표' }]" />
    <UIChartCartesian>
      <UIChartXAxis id="month" scale="categorical" field="month" />
      <UIChartYAxis id="count" scale="linear" field="count" :domain="{ kind: 'numeric', minimum: 0, maximum: 80 }" :ticks="5" label="건수" />
      <UIChartBar id="actual" :data="activity" x-axis="month" y-axis="count" label="처리 건수" />
      <UIChartLine id="target" :data="targets" x-axis="month" y-axis="count" label="월별 목표" />
    </UIChartCartesian>
    <UIChartPlot><UIChartRenderer /></UIChartPlot>
  </UIChart>
</template>
