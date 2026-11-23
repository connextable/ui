<script setup lang="ts">
import {
  UIChart,
  UIChartAxisView,
  UIChartCartesian,
  UIChartNavigation,
  UIChartPlot,
  UIChartRenderer,
  UIChartScatter,
  UIChartViewToolbar,
  UIChartXAxis,
  UIChartYAxis,
} from "@connextable/ui";
import { useId } from "vue";

const instructionsId = useId();
const axes = [{ id: "load", label: "X축", orientation: "x" }, { id: "latency", label: "Y축", orientation: "y" }] as const;
const axisIds = axes.map(({ id }) => id);
const controlLabels = { backward: "이전 범위", forward: "다음 범위", zoomIn: "확대", zoomOut: "축소", reset: "초기화" };
const loadDomain = { kind: "numeric", minimum: 0, maximum: 120 } as const;
const latencyDomain = { kind: "numeric", minimum: 0, maximum: 180 } as const;
const initialLoad = { kind: "continuous", minimum: 20, maximum: 100 } as const;
const initialLatency = { kind: "continuous", minimum: 30, maximum: 150 } as const;
const samples = Array.from({ length: 64 }, (_, id) => {
  const load = 10 + (id * 13) % 110;
  const jitter = Math.sin(id * 184.3) * 22 + Math.cos(id * 91.1) * 9;
  return { id, load, latency: Math.round(49 + load * 0.7 + jitter) };
});
</script>

<template>
  <UIChart
    v-slot="{ state }"
    animate-updates
    :dom="{ accessibilityLabel: '동시 요청 수와 응답 시간 탐색' }"
    :aria-describedby="instructionsId"
  >
    <UIChartCartesian>
      <UIChartXAxis id="load" scale="linear" field="load" label="동시 요청 (건)" :domain="loadDomain" :ticks="5">
        <UIChartAxisView :minimum-span="10" :initial="initialLoad" />
      </UIChartXAxis>
      <UIChartYAxis id="latency" scale="linear" field="latency" label="응답 시간 (ms)" :domain="latencyDomain" :ticks="5">
        <UIChartAxisView :minimum-span="15" :initial="initialLatency" />
      </UIChartYAxis>
      <UIChartScatter id="requests" :data="samples" x-axis="load" y-axis="latency" label="응답 시간" />
      <UIChartNavigation :axes="axisIds" drag="pan" wheel="zoom" wheel-modifier="control" pinch keyboard />
    </UIChartCartesian>
    <UIChartPlot data-ui-chart-pan>
      <UIChartRenderer />
      <template #controls>
        <UIChartViewToolbar :axes="axes" label="축 조작" :labels="controlLabels" />
      </template>
    </UIChartPlot>
    <p :id="instructionsId" class="ui-chart-view-hint">
      드래그로 이동하고 Ctrl + 휠 또는 두 손가락 핀치로 확대하거나 축소합니다.
      각 축 가까이에 있는 버튼으로 한 축씩 조절할 수 있습니다.
    </p>
    <output aria-live="off">
      <span v-for="({ axisID, visible }, index) in state?.view?.axes" :key="axisID">
        <template v-if="visible.kind === 'continuous'">
          {{ index ? ", " : "" }}{{ axes.find(axis => axis.id === axisID)?.label }}
          {{ visible.minimum.toFixed(0) }}–{{ visible.maximum.toFixed(0) }}
        </template>
      </span>
    </output>
  </UIChart>
</template>
