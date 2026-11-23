<script setup lang="ts">
import { UIChart, UIChartCartesian, UIChartLegend, UIChartPlot, UIChartRenderer, UIChartScatter, UIChartXAxis, UIChartYAxis } from "@connextable/ui";

const sizes = [1, 2, 4, 8, 15, 28, 60, 125, 280, 550, 1300, 2800];
const original = sizes.map((size, index) => ({
  id: `original-${index}`,
  size,
  time: Math.round(14 + 2.1 * size + (index * 19) % 42),
}));
const optimized = sizes.map((size, index) => ({
  id: `optimized-${index}`,
  size,
  time: Math.round(10 + 0.62 * size + (index * 13) % 27),
}));
</script>

<template>
  <UIChart :dom="{ accessibilityLabel: '로그 축으로 비교하는 파일 크기와 전송 시간' }">
    <UIChartLegend :items="[{ label: '기본 전송' }, { label: '최적화 전송' }]" />
    <UIChartCartesian>
      <UIChartXAxis id="size" scale="logarithmic" field="size" :domain="{ kind: 'numeric', minimum: 1, maximum: 10000 }" :ticks="5" label="파일 크기 (MB)" />
      <UIChartYAxis id="time" scale="logarithmic" field="time" :domain="{ kind: 'numeric', minimum: 10, maximum: 10000 }" :ticks="4" label="전송 시간 (ms)" />
      <UIChartScatter id="original" :data="original" x-axis="size" y-axis="time" label="기본 전송" />
      <UIChartScatter id="optimized" :data="optimized" x-axis="size" y-axis="time" label="최적화 전송" />
    </UIChartCartesian>
    <UIChartPlot><UIChartRenderer /></UIChartPlot>
  </UIChart>
</template>
