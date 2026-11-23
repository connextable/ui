<script setup lang="ts">
import {
  UIChart,
  UIChartActions,
  UIChartAxisView,
  UIChartCartesian,
  UIChartLegend,
  UIChartLine,
  UIChartNavigation,
  UIChartPlot,
  UIChartRenderer,
  UIChartViewToolbar,
  UIChartXAxis,
  UIChartYAxis,
} from "@connextable/ui";
import { onMounted, ref, shallowRef, unref, useTemplateRef, watch } from "vue";

type Sample = { id: number; time: number; count: number };
type TimeWindow = { minimum: number; maximum: number };
type OnViewChange = NonNullable<InstanceType<typeof UIChart>["$props"]["onUpdate:view"]>;
type ViewState = Parameters<OnViewChange>[0];

const minute = 60_000;
const minutesPerDay = 24 * 60;
const day = minutesPerDay * minute;
const dateLimit = 8_640_000_000_000_000;
const timeDomain = { kind: "temporal", minimum: -dateLimit, maximum: dateLimit } as const;
const initial = {
  kind: "continuous",
  minimum: Date.UTC(2026, 6, 1),
  maximum: Date.UTC(2026, 6, 4),
} as const;
const navigationWindow = { initial, minimumSpan: 60 * minute, maximumSpan: 7 * day };
const viewCapabilities = [{ axisID: "time", ...navigationWindow }];
const countDomain = { kind: "numeric", minimum: 20, maximum: 100 } as const;
const line = { id: "requests", xAxis: "time", yAxis: "count", label: "분당 요청 수 (건)" };
const emptySamples: Sample[] = [];
const navigationAxes = ["time"];
const toolbarAxes = [{ id: "time", label: "시간축" }];
const controlLabels = { backward: "과거로 이동", forward: "미래로 이동", zoomIn: "확대", zoomOut: "축소", reset: "시작 범위로 돌아가기" };
const number = new Intl.NumberFormat("ko-KR");
const time = new Intl.DateTimeFormat("ko-KR", {
  year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", hourCycle: "h23", timeZone: "UTC",
});
const tickTime = new Intl.DateTimeFormat("ko-KR", {
  month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit", hourCycle: "h23", timeZone: "UTC",
});
const chart = useTemplateRef<InstanceType<typeof UIChart>>("chart");
const visibleWindow = shallowRef<TimeWindow>(initial);
const sampleCount = ref(0);
let chunks = new Map<number, Sample[]>();

function requestCount(id: number) {
  const index = id - initial.minimum / minute;
  return Math.round(60 + 13 * Math.sin(index / 225) + 7 * Math.cos(index / 37) + (index % 397 === 0 ? 16 : 0));
}

function loadWindow({ minimum, maximum }: TimeWindow) {
  // Retain one day before and after the visible window, within the Date range.
  const first = Math.max(-dateLimit / day, Math.floor(minimum / day) - 1);
  const last = Math.min(dateLimit / day - 1, Math.floor(maximum / day) + 1);
  if (chunks.size === last - first + 1 && chunks.has(first) && chunks.has(last)) return;

  const controller = unref(chart.value?.controller);
  const current = controller?.getDefinition();
  if (!controller || !current) return;

  const nextChunks = new Map<number, Sample[]>();
  const data: Sample[] = [];
  for (let index = first; index <= last; index++) {
    const chunk = chunks.get(index) ?? Array.from({ length: minutesPerDay }, (_, offset) => {
      // A timestamp always produces the same demo value, even after eviction.
      const id = index * minutesPerDay + offset;
      return { id, time: id * minute, count: requestCount(id) };
    });
    nextChunks.set(index, chunk);
    data.push(...chunk);
  }
  // Replace the data without republishing the navigation declaration during a drag.
  const result = controller.replaceDefinition({
    coordinate: current.coordinate,
    layers: [{ ...line, kind: "line", data, getId: sample => sample.id }],
  }, viewCapabilities);
  if (!result.ok) throw new Error(result.error.message);
  chunks = nextChunks;
  sampleCount.value = data.length;
}

function timeWindow(view: ViewState) {
  const visible = view?.axes.find(axis => axis.axisID === "time")?.visible;
  return visible?.kind === "continuous" ? visible : initial;
}

function windowLabel(view: ViewState) {
  const { minimum, maximum } = timeWindow(view);
  return time.formatRange(minimum, maximum);
}

const onViewChange: OnViewChange = (view) => {
  const { minimum, maximum } = timeWindow(view);
  if (minimum !== visibleWindow.value.minimum || maximum !== visibleWindow.value.maximum) {
    visibleWindow.value = { minimum, maximum };
  }
};

onMounted(() => loadWindow(visibleWindow.value));
watch(visibleWindow, loadWindow, { flush: "post" });

const dom = {
  accessibilityLabel: "시간 범위에 따라 불러오는 분당 요청 수",
  accessibilityLimit: 48,
  renderPolicy: { type: "fixed", maximumRepresentatives: 16_384 } as const,
  getAccessibleDatumLabel: (id: number | string) =>
    typeof id === "number" ? `${time.format(id * minute)} · ${number.format(requestCount(id))}건` : String(id),
};
</script>

<template>
  <UIChart
    v-slot="{ projection, state }"
    ref="chart"
    animate-updates
    :dom="dom"
    :format-tick="(value, axis) => axis.id === 'time' && typeof value === 'number' ? tickTime.format(value) : undefined"
    @update:view="onViewChange"
  >
    <UIChartLegend :items="[{ label: '분당 요청 수' }]" />
    <UIChartCartesian>
      <UIChartXAxis id="time" scale="temporal" field="time" :domain="timeDomain" :ticks="6" label="관측 시각 (UTC)">
        <UIChartAxisView v-bind="navigationWindow" />
      </UIChartXAxis>
      <UIChartYAxis id="count" scale="linear" field="count" :domain="countDomain" :ticks="5" label="분당 요청 수 (건)" />
      <UIChartLine v-bind="line" :data="emptySamples" />
      <UIChartNavigation :axes="navigationAxes" drag="pan" wheel="zoom" wheel-modifier="control" pinch keyboard />
    </UIChartCartesian>
    <UIChartPlot data-ui-chart-pan>
      <UIChartRenderer />
      <template #controls>
        <UIChartViewToolbar :axes="toolbarAxes" label="시간축 조작" :labels="controlLabels" />
      </template>
    </UIChartPlot>
    <UIChartActions>
      <output v-if="projection" aria-live="off">
        {{ windowLabel(state?.view ?? null) }} UTC
        <br>
        캐시 {{ sampleCount / minutesPerDay }}일 · {{ number.format(sampleCount) }}개 관측값
        · 그린 점 {{ number.format(projection.diagnostics.emittedPrimitives) }}개
      </output>
    </UIChartActions>
  </UIChart>
</template>
