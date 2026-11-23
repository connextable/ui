<script setup lang="ts">
import {
  UIButton,
  UIChart,
  UIChartActions,
  UIChartCartesian,
  UIChartLegend,
  UIChartLine,
  UIChartPlot,
  UIChartRenderer,
  UIChartXAxis,
  UIChartYAxis,
} from "@connextable/ui";
import { computed, onUnmounted, ref, shallowRef } from "vue";

const windowSize = 40;
const seconds = 1000;
const baseTime = Date.UTC(2026, 10, 21, 3);
const running = ref(false);
const updateLabel = ref("초기 관측");
const samples = shallowRef(Array.from({ length: windowSize }, (_, id) => ({
  id,
  time: baseTime + id * seconds,
  count: sample(id),
})));
const latest = computed(() => samples.value.at(-1)!);
const timeDomain = computed(() => ({
  kind: "temporal" as const,
  minimum: latest.value.time - (windowSize - 1) * seconds,
  maximum: latest.value.time,
}));
const countDomain = computed(() => {
  const counts = samples.value.slice(-windowSize).map(sample => sample.count);
  return {
    kind: "numeric" as const,
    minimum: Math.floor((Math.min(...counts) - 4) / 10) * 10,
    maximum: Math.ceil((Math.max(...counts) + 4) / 10) * 10,
  };
});
let timer: ReturnType<typeof setInterval> | undefined;
let reviseLatest = true;

function sample(id: number) {
  return Math.round(58 + 22 * Math.sin(id / 29) + 12 * Math.sin(id / 3) + 8 * Math.sin(id));
}

function tick() {
  const current = latest.value;
  if (reviseLatest) {
    samples.value = [...samples.value.slice(0, -1), { ...current, count: sample(current.id) + 4 }];
    updateLabel.value = "최근 값 수정";
  } else {
    const id = current.id + 1;
    // Keep one extra observation so the line can cross the moving left edge.
    samples.value = [...samples.value, { id, time: current.time + seconds, count: sample(id) }].slice(-(windowSize + 1));
    updateLabel.value = "새 관측 추가";
  }
  reviseLatest = !reviseLatest;
}

function toggleRunning() {
  running.value = !running.value;
  if (running.value) timer = setInterval(tick, seconds / 2);
  else clearInterval(timer);
}

onUnmounted(() => clearInterval(timer));
</script>

<template>
  <UIChart animate-updates :dom="{ accessibilityLabel: '실시간 요청 수 시뮬레이션' }">
    <UIChartLegend :items="[{ label: '초당 요청 수', value: `최근 ${windowSize}초` }]" />
    <UIChartCartesian>
      <UIChartXAxis id="time" scale="temporal" field="time" :ticks="6" :domain="timeDomain" />
      <UIChartYAxis id="count" scale="linear" field="count" :domain="countDomain" :ticks="5" label="요청 수 (건)" />
      <UIChartLine id="requests" label="초당 요청 수" :data="samples" x-axis="time" y-axis="count" />
    </UIChartCartesian>
    <UIChartPlot><UIChartRenderer /></UIChartPlot>
    <UIChartActions>
      <output aria-live="off">{{ updateLabel }} · 관측 #{{ latest.id + 1 }} · {{ latest.count }}건</output>
      <UIButton variant="outline" size="sm" @click="toggleRunning">
        {{ running ? "일시정지" : "재생" }}
      </UIButton>
    </UIChartActions>
  </UIChart>
</template>
