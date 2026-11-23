<script setup lang="ts">
import { UIButton, UIChart, UIChartActions, UIChartCartesian, UIChartHeatmap, UIChartPlot, UIChartRenderer, UIChartScaleLegend, UIChartXAxis, UIChartYAxis } from "@connextable/ui";
import { computed, ref, watchEffect } from "vue";

const minute = ref(0);
const running = ref(false);
const windowSize = 12;
const regions = ["서울", "도쿄", "싱가포르", "프랑크푸르트", "버지니아"];
const columns = computed(() => Array.from({ length: windowSize }, (_, offset) => {
  const time = minute.value + offset;
  return { time, label: `${String((9 + Math.floor(time / 60)) % 24).padStart(2, "0")}:${String(time % 60).padStart(2, "0")}` };
}));
const readings = computed(() => regions.flatMap((region, index) => columns.value.map(({ time, label }) => {
  const wave = 9 * (1 + Math.sin(time / 3 - index));
  const burst = 53 * Math.exp(-((time % 28 - 9 - index * 2) ** 2) / 12);
  return { id: `${region}-${time}`, region, label, retries: Math.round(3 + wave + burst) };
})));
const retryCounts = computed(() => readings.value.map(row => row.retries));

watchEffect(onCleanup => {
  if (!running.value) return;
  const timer = setInterval(() => { minute.value++; }, 800);
  onCleanup(() => clearInterval(timer));
});
</script>

<template>
  <UIChart animate-updates :dom="{
    accessibilityLabel: '지역별 재시도 히트맵',
    getAccessibleDatumLabel: id => {
      const row = readings.find(reading => reading.id === id);
      return row ? `${row.label} ${row.region} 재시도 ${row.retries}건` : String(id);
    },
  }">
    <UIChartScaleLegend label="재시도 (건)" :minimum="Math.min(...retryCounts)" :maximum="Math.max(...retryCounts)" />
    <UIChartCartesian>
      <UIChartXAxis id="time" scale="categorical" field="label" :ticks="windowSize" />
      <UIChartYAxis id="region" scale="categorical" field="region" :ticks="regions.length" :domain="{ kind: 'categorical', values: [...regions].reverse() }" />
      <UIChartHeatmap id="retries" label="재시도" :data="readings" value-field="retries" x-axis="time" y-axis="region" />
    </UIChartCartesian>
    <UIChartPlot><UIChartRenderer /></UIChartPlot>
    <UIChartActions>
      <output aria-live="off">최근 {{ windowSize }}분 ({{ columns[0]?.label }}–{{ columns.at(-1)?.label }})</output>
      <UIButton size="sm" variant="outline" @click="running = !running">{{ running ? "일시정지" : "재생" }}</UIButton>
    </UIChartActions>
  </UIChart>
</template>
