<script setup lang="ts">
import { UIButton, UIChart, UIChartActions, UIChartCartesian, UIChartLegend, UIChartPlot, UIChartRenderer, UIChartScatter, UIChartXAxis, UIChartYAxis } from "@connextable/ui";
import { computed, ref, watchEffect } from "vue";

const phase = ref(0);
const running = ref(false);
const routes = [
  { id: "read", label: "조회", load: 22, latency: 60 },
  { id: "write", label: "저장", load: 10, latency: 110 },
  { id: "search", label: "검색", load: 15, latency: 150 },
];
const cohorts = computed(() => {
  const demand = 1.2 + 0.7 * Math.sin(phase.value / 5);
  return routes.map(route => ({
    ...route,
    data: Array.from({ length: 12 }, (_, index) => {
      const load = Math.round((route.load + index * 2.4 + 5 * Math.cos(index * 4.2)) * demand);
      return {
        id: `${route.id}-${index}`,
        load,
        latency: Math.round(route.latency + load * 1.3 + 25 * Math.sin(index * 2 + phase.value / 3)),
      };
    }),
  }));
});
const sample = computed(() => cohorts.value.flatMap(layer => layer.data));
const loadDomain = computed(() => ({
  kind: "numeric" as const, minimum: 0,
  maximum: Math.ceil((Math.max(...sample.value.map(point => point.load)) + 5) / 20) * 20,
}));
const latencyDomain = computed(() => ({
  kind: "numeric" as const, minimum: 0,
  maximum: Math.ceil((Math.max(...sample.value.map(point => point.latency)) + 10) / 50) * 50,
}));
watchEffect(onCleanup => {
  if (!running.value) return;
  const timer = setInterval(() => { phase.value++; }, 760);
  onCleanup(() => clearInterval(timer));
});
</script>

<template>
  <UIChart animate-updates :dom="{ accessibilityLabel: '동시 요청 수와 응답 시간의 실시간 분포' }">
    <UIChartLegend :items="routes" />
    <UIChartCartesian>
      <UIChartXAxis id="load" scale="linear" field="load" :domain="loadDomain" :ticks="6" label="동시 요청 (건)" />
      <UIChartYAxis id="latency" scale="linear" field="latency" :domain="latencyDomain" :ticks="6" label="응답 시간 (ms)" />
      <UIChartScatter v-for="route in cohorts" :id="route.id" :key="route.id" :data="route.data" :label="route.label" x-axis="load" y-axis="latency" />
    </UIChartCartesian>
    <UIChartPlot><UIChartRenderer /></UIChartPlot>
    <UIChartActions>
      <output aria-live="off">
        관측 #{{ phase + 1 }} ({{ sample.length }}점), X축 0–{{ loadDomain.maximum }}건, Y축 0–{{ latencyDomain.maximum }}ms
      </output>
      <UIButton size="sm" variant="outline" @click="running = !running">{{ running ? "일시정지" : "재생" }}</UIButton>
    </UIChartActions>
  </UIChart>
</template>
