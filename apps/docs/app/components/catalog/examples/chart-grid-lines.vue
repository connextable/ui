<script setup lang="ts">
import {
  UIButton,
  UIChart,
  UIChartActions,
  UIChartCartesian,
  UIChartPlot,
  UIChartRenderer,
  UIChartScatter,
  UIChartXAxis,
  UIChartYAxis,
} from "@connextable/ui";
import { computed, ref } from "vue";

const readings = [
  { id: "a", load: 8, latency: 26 },
  { id: "b", load: 14, latency: 53 },
  { id: "c", load: 20, latency: 45 },
  { id: "d", load: 23, latency: 74 },
  { id: "e", load: 30, latency: 108 },
  { id: "f", load: 34, latency: 91 },
  { id: "g", load: 40, latency: 123 },
  { id: "h", load: 45, latency: 138 },
  { id: "i", load: 52, latency: 159 },
  { id: "j", load: 57, latency: 172 },
];
const vertical = ref(true);
const horizontal = ref(true);
const dense = ref(false);
const grid = computed(() => vertical.value
  ? (horizontal.value ? "both" : "x")
  : (horizontal.value ? "y" : "none"));
const ticks = computed(() => dense.value ? 7 : 4);
const loadDomain = { kind: "numeric", minimum: 0, maximum: 60 } as const;
const latencyDomain = { kind: "numeric", minimum: 0, maximum: 180 } as const;
</script>

<template>
  <UIChart
    v-slot="{ projection }"
    animate-updates
    :grid="grid"
    :dom="{
      accessibilityLabel: '동시 요청 수와 응답 시간의 눈금 비교',
      getAccessibleDatumLabel: id => {
        const reading = readings.find(row => row.id === id);
        return reading ? `동시 요청 ${reading.load}건에 ${reading.latency} ms` : String(id);
      },
    }"
  >
    <UIChartCartesian>
      <UIChartXAxis id="load" scale="linear" field="load" :domain="loadDomain" :ticks="ticks" label="동시 요청 (건)" />
      <UIChartYAxis id="latency" scale="linear" field="latency" :domain="latencyDomain" :ticks="ticks" label="응답 시간 (ms)" />
      <UIChartScatter id="readings" :data="readings" x-axis="load" y-axis="latency" label="응답 시간 (ms)" />
    </UIChartCartesian>
    <UIChartPlot><UIChartRenderer /></UIChartPlot>
    <UIChartActions>
      <output v-if="projection?.layout">
        세로 {{ vertical ? "켜짐" : "꺼짐" }}, 가로 {{ horizontal ? "켜짐" : "꺼짐" }},
        축마다 눈금 {{ projection.layout.axes[0]?.ticks.length }}개
      </output>
      <UIButton size="sm" variant="outline" :aria-pressed="vertical" @click="vertical = !vertical">세로 보조선</UIButton>
      <UIButton size="sm" variant="outline" :aria-pressed="horizontal" @click="horizontal = !horizontal">가로 보조선</UIButton>
      <UIButton size="sm" variant="outline" :aria-pressed="dense" @click="dense = !dense">촘촘한 눈금</UIButton>
    </UIChartActions>
  </UIChart>
</template>
