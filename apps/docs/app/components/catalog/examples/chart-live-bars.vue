<script setup lang="ts">
import { UIButton, UIChart, UIChartActions, UIChartBar, UIChartCartesian, UIChartLegend, UIChartPlot, UIChartRenderer, UIChartXAxis, UIChartYAxis } from "@connextable/ui";
import { computed, ref, watchEffect } from "vue";

const step = ref(0);
const running = ref(false);
const windowSize = 8;
const samplesPerHour = 3;
const baseHour = 9;
const currentHour = computed(() => baseHour + windowSize - 1 + Math.floor(step.value / samplesPerHour));
const requests = computed(() => Array.from({ length: windowSize }, (_, index) => {
  const hour = currentHour.value - windowSize + 1 + index;
  const volume = Math.round(170 + 65 * Math.sin(hour / 2.4) + 23 * Math.cos(hour * 1.2));
  const progress = index === windowSize - 1 ? (step.value % samplesPerHour + 1) / samplesPerHour : 1;
  return { id: hour, hour: `${String(hour % 24).padStart(2, "0")}:00`, count: Math.round(volume * progress) };
}));
const countDomain = computed(() => ({
  kind: "numeric" as const,
  minimum: 0,
  maximum: Math.ceil((Math.max(...requests.value.map(row => row.count)) + 10) / 50) * 50,
}));
const latest = computed(() => requests.value.at(-1)!);

watchEffect(onCleanup => {
  if (!running.value) return;
  const timer = setInterval(() => { step.value++; }, 700);
  onCleanup(() => clearInterval(timer));
});
</script>

<template>
  <UIChart animate-updates :dom="{
    accessibilityLabel: '시간대별 주문 집계',
    getAccessibleDatumLabel: id => {
      const row = requests.find(request => request.id === id);
      return row ? `${row.hour} 주문 ${row.count}건` : String(id);
    },
  }">
    <UIChartLegend :items="[{ label: '시간대별 주문' }]" />
    <UIChartCartesian>
      <UIChartXAxis id="hour" scale="categorical" field="hour" :ticks="windowSize" />
      <UIChartYAxis id="count" scale="linear" field="count" :domain="countDomain" :ticks="5" label="주문 건수" />
      <UIChartBar id="orders" label="주문" :data="requests" x-axis="hour" y-axis="count" />
    </UIChartCartesian>
    <UIChartPlot><UIChartRenderer /></UIChartPlot>
    <UIChartActions>
      <output aria-live="off">{{ latest.hour }} 집계 중 · {{ latest.count }}건</output>
      <UIButton size="sm" variant="outline" @click="running = !running">{{ running ? "일시정지" : "재생" }}</UIButton>
    </UIChartActions>
  </UIChart>
</template>
