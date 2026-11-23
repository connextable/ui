<script setup lang="ts">
import { UIChart, UIChartCartesian, UIChartScatter, UIChartPlot, UIChartRenderer, UIChartXAxis, UIChartYAxis } from "@connextable/ui";
const rows = [
  [5, 42], [8, 37], [9, 45], [11, 36], [12, 42], [14, 28], [14, 36], [15, 34],
  [17, 39], [18, 27], [19, 31], [20, 34], [22, 28], [23, 33], [25, 26], [26, 29],
  [27, 24], [28, 28], [30, 22], [31, 19], [32, 26], [34, 16], [36, 22], [38, 14],
].map(([latency, count], id) => ({ id, latency, count }));
</script>

<template>
  <UIChart :dom="{ accessibilityLabel: '대기 시간과 처리량의 관계' }">
    <UIChartCartesian>
      <UIChartXAxis id="x" scale="linear" field="latency" :domain="{ kind: 'numeric', minimum: 0, maximum: 40 }" :ticks="5" label="대기 시간 (분)" />
      <UIChartYAxis id="y" scale="linear" field="count" :domain="{ kind: 'numeric', minimum: 0, maximum: 50 }" :ticks="6" label="처리량 (건)" />
      <UIChartScatter id="observations" :data="rows" x-axis="x" y-axis="y" label="관측값" />
    </UIChartCartesian>
    <UIChartPlot><UIChartRenderer /></UIChartPlot>
  </UIChart>
</template>
