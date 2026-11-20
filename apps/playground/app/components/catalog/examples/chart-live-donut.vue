<script setup lang="ts">
import { UIButton, UIChart, UIChartActions, UIChartCenter, UIChartDonut, UIChartLegend, UIChartPlot, UIChartRadial, UIChartRenderer } from "@connextable/ui";
import { computed, ref, watchEffect } from "vue";

const step = ref(0);
const running = ref(false);
const total = 600;
const cycleLength = 20;
const states = computed(() => {
  const progress = step.value % cycleLength;
  const failures = 4 + Math.floor(progress / 4);
  const completed = Math.min(total - failures - 2, 120 + progress * 25);
  const processing = Math.min(total - failures - completed - 1, 38 + (progress % 4) * 5);
  return [
    { id: "completed", label: "완료", count: completed },
    { id: "processing", label: "처리 중", count: processing },
    { id: "queued", label: "대기", count: total - completed - failures - processing },
    { id: "failed", label: "실패", count: failures },
  ];
});
const percent = computed(() => Math.round((states.value[0]?.count ?? 0) / total * 100));
watchEffect(onCleanup => {
  if (!running.value) return;
  const timer = setInterval(() => { step.value++; }, 750);
  onCleanup(() => clearInterval(timer));
});

function reset() {
  running.value = false;
  step.value = 0;
}
</script>

<template>
  <UIChart animate-updates :dom="{
    accessibilityLabel: '배치 작업의 진행 상태별 비중',
    getAccessibleDatumLabel: id => {
      const state = states.find(row => row.id === id);
      return state ? `${state.label} ${state.count}건` : String(id);
    },
  }">
    <template #default>
      <UIChartLegend :items="states.map(row => ({ label: row.label, value: `${row.count}건` }))" />
      <UIChartRadial>
        <UIChartDonut id="jobs" :data="states" value-field="count" label-field="label" :inner-radius="0.64" :outer-radius="0.9" />
      </UIChartRadial>
      <UIChartPlot>
        <UIChartRenderer />
        <UIChartCenter label="완료율" :value="`${percent}%`" />
      </UIChartPlot>
      <UIChartActions>
        <output aria-live="off">배치 #{{ Math.floor(step / cycleLength) + 1 }} · 총 {{ total }}건</output>
        <UIButton size="sm" variant="outline" :disabled="step === 0 && !running" @click="reset">초기화</UIButton>
        <UIButton size="sm" variant="outline" :disabled="running" @click="step++">한 단계 진행</UIButton>
        <UIButton size="sm" variant="outline" @click="running = !running">{{ running ? "일시정지" : "재생" }}</UIButton>
      </UIChartActions>
    </template>
    <template #tooltip="{ id, title, description }">
      <strong>{{ title }}</strong>
      <div class="ui-chart-tooltip__value">
        <span>{{ states.find(row => row.id === id)?.count }}건</span>
        <strong>{{ description }}</strong>
      </div>
    </template>
  </UIChart>
</template>
