<script setup lang="ts">
import { UIButton, UIChart, UIChartActions, UIChartBar, UIChartCartesian, UIChartPlot, UIChartRenderer, UIChartXAxis, UIChartYAxis } from "@connextable/ui";
import { computed, ref, watchEffect } from "vue";

const hour = ref(0);
const running = ref(false);
const regions = [
  { id: "seoul", name: "서울", base: 62, amplitude: 40, peak: 2 },
  { id: "incheon", name: "인천", base: 34, amplitude: 26, peak: 6 },
  { id: "daejeon", name: "대전", base: 40, amplitude: 24, peak: 4 },
  { id: "busan", name: "부산", base: 55, amplitude: 39, peak: 8 },
  { id: "gwangju", name: "광주", base: 27, amplitude: 36, peak: 10 },
  { id: "daegu", name: "대구", base: 46, amplitude: 34, peak: 12 },
];
const traffic = computed(() => regions.map(region => ({
  ...region,
  users: Math.round(region.base + region.amplitude * Math.exp(-((hour.value % 16 - region.peak) ** 2) / 12)),
})));
const rank = computed(() => traffic.value.toSorted((a, b) => a.users - b.users));
const leader = computed(() => rank.value.at(-1)!);
const timeLabel = computed(() => `${8 + hour.value % 16}:00`);
const countDomain = computed(() => ({
  kind: "numeric" as const,
  minimum: 0,
  maximum: Math.ceil((leader.value.users + 5) / 20) * 20,
}));

watchEffect(onCleanup => {
  if (!running.value) return;
  const timer = setInterval(() => { hour.value++; }, 900);
  onCleanup(() => clearInterval(timer));
});
</script>

<template>
  <UIChart animate-updates :dom="{
    accessibilityLabel: '지역별 동시 접속자 순위',
    getAccessibleDatumLabel: id => {
      const row = traffic.find(region => region.id === id);
      return row ? `${row.name} ${row.users}명` : String(id);
    },
  }">
    <UIChartCartesian>
      <UIChartXAxis id="users" scale="linear" field="users" :domain="countDomain" :ticks="6" label="동시 접속자 (명)" />
      <UIChartYAxis id="region" scale="categorical" field="name" :ticks="rank.length" :domain="{ kind: 'categorical', values: rank.map(row => row.name) }" />
      <UIChartBar id="traffic" orientation="horizontal" :data="traffic" label="접속자" x-axis="users" y-axis="region" />
    </UIChartCartesian>
    <UIChartPlot><UIChartRenderer /></UIChartPlot>
    <UIChartActions>
      <output aria-live="off">{{ timeLabel }} · 1위 {{ leader.name }} {{ leader.users }}명</output>
      <UIButton size="sm" variant="outline" @click="running = !running">{{ running ? "일시정지" : "재생" }}</UIButton>
    </UIChartActions>
  </UIChart>
</template>
