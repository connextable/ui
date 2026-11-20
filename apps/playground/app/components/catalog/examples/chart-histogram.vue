<script setup lang="ts">
import { UIChart, UIChartBar, UIChartCartesian, UIChartPlot, UIChartRenderer, UIChartXAxis, UIChartYAxis } from "@connextable/ui";

const responses = [4, 8, 15, 18, 21, 21, 22, 26, 28, 29, 32, 34, 35, 35, 36, 38, 39, 39, 43, 44, 45, 46, 49, 52, 55, 62, 71];
const bins = Array.from({ length: 8 }, (_, index) => {
  const minimum = index * 10;
  const maximum = minimum + 10;
  return {
    id: minimum,
    range: `${minimum}–${maximum}`,
    count: responses.filter(value => minimum <= value && value < maximum).length,
  };
});
</script>

<template>
  <UIChart :dom="{ accessibilityLabel: '응답 시간 구간별 빈도' }">
    <UIChartCartesian>
      <UIChartXAxis id="time" scale="categorical" field="range" label="응답 시간 (초)" />
      <UIChartYAxis id="frequency" scale="linear" field="count" :domain="{ kind: 'numeric', minimum: 0, maximum: 10 }" :ticks="6" label="빈도 (건)" />
      <UIChartBar id="responses" :data="bins" x-axis="time" y-axis="frequency" />
    </UIChartCartesian>
    <UIChartPlot data-ui-chart-adjoining-bars><UIChartRenderer /></UIChartPlot>
  </UIChart>
</template>
