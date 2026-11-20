<script setup lang="ts">
import { UIChart, UIChartCartesian, UIChartLine, UIChartPlot, UIChartRenderer, UIChartXAxis, UIChartYAxis } from "@connextable/ui";

const frequencies = [9, 18, 31, 22, 13, 5, 2];
let completed = 0;
const points = frequencies.flatMap((count, index) => {
  const seconds = (index + 1) * 5;
  const previous = completed;
  completed += count;
  return [
    { id: `${seconds}-before`, seconds, completed: previous },
    { id: `${seconds}-after`, seconds, completed },
  ];
});
</script>

<template>
  <UIChart :dom="{ accessibilityLabel: '작업 100건의 누적 완료율' }">
    <UIChartCartesian>
      <UIChartXAxis id="time" scale="linear" field="seconds" :domain="{ kind: 'numeric', minimum: 5, maximum: 35 }" :ticks="7" label="경과 시간 (초)" />
      <UIChartYAxis id="share" scale="linear" field="completed" :domain="{ kind: 'numeric', minimum: 0, maximum: 100 }" :ticks="6" label="누적 완료율 (%)" />
      <UIChartLine id="completed" :data="points" x-axis="time" y-axis="share" label="누적 완료율 (%)" />
    </UIChartCartesian>
    <UIChartPlot><UIChartRenderer /></UIChartPlot>
  </UIChart>
</template>
