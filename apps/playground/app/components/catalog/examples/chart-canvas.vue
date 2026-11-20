<script setup lang="ts">
import {
  UIChart,
  UIChartActions,
  UIChartCanvas,
  UIChartCartesian,
  UIChartLegend,
  UIChartLine,
  UIChartPlot,
  UIChartXAxis,
  UIChartYAxis,
} from "@connextable/ui";
import { nextTick, useTemplateRef } from "vue";

const samples = Array.from({ length: 4_800 }, (_, id) => {
  const time = id / 4;
  const bursts = Math.exp(-(((time - 360) / 75) ** 2)) + 0.8 * Math.exp(-(((time - 810) / 100) ** 2));
  return {
    id,
    time,
    amplitude: (0.16 + bursts) * Math.sin(id * 0.16) + 0.12 * Math.sin(id * 0.63),
  };
});
const views = [
  { label: "기본 Canvas 해상도", scale: 1 },
  { label: "낮은 해상도", scale: 0.25 },
];
const number = new Intl.NumberFormat("ko-KR");
const voltage = new Intl.NumberFormat("ko-KR", { maximumFractionDigits: 3 });
const timeDomain = { kind: "numeric", minimum: 0, maximum: 1200 } as const;
const amplitudeDomain = { kind: "numeric", minimum: -1.5, maximum: 1.5 } as const;
const comparison = useTemplateRef<HTMLDivElement>("comparison");
type Projection = NonNullable<Parameters<NonNullable<InstanceType<typeof UIChart>["$slots"]["default"]>>[0]["projection"]>;
type Viewport = Projection["viewport"];
type Plot = NonNullable<Projection["layout"]>["plot"];
const copied = new WeakMap<HTMLCanvasElement, string>();

function bitmapSize(viewport: Viewport) {
  const ratio = viewport.devicePixelRatio ?? 1;
  const width = Math.round(viewport.width * ratio);
  const height = Math.round(viewport.height * ratio);
  return `${number.format(width)} × ${number.format(height)} px · ${number.format(width * height)} 픽셀`;
}

function detailBounds(plot: Plot) {
  const width = Math.min(64, plot.width);
  const height = Math.min(32, plot.height);
  return {
    x: Math.max(plot.x, plot.x + plot.width * 0.3 - width / 2),
    y: Math.max(plot.y, plot.y + plot.height * 0.19 - height / 2),
    width,
    height,
  };
}

function detailStyle(plot: Plot) {
  const { x, y, width, height } = detailBounds(plot);
  return { left: `${x}px`, top: `${y}px`, width: `${width}px`, height: `${height}px` };
}

function copyDetail(scale: number, { layout, viewport }: Projection) {
  if (!layout) return;
  void nextTick(() => {
    const panel = comparison.value?.querySelector(`[data-render-scale="${scale}"]`);
    const source = panel?.querySelector<HTMLCanvasElement>('canvas[data-part="renderer"]');
    const detail = panel?.querySelector<HTMLCanvasElement>(".canvas-comparison__detail");
    const context = detail?.getContext("2d");
    if (!source || !detail || !context) return;

    const bounds = detailBounds(layout.plot);
    const scaleX = source.width / viewport.width;
    const scaleY = source.height / viewport.height;
    const x = Math.round(bounds.x * scaleX);
    const y = Math.round(bounds.y * scaleY);
    const width = Math.max(1, Math.round((bounds.x + bounds.width) * scaleX) - x);
    const height = Math.max(1, Math.round((bounds.y + bounds.height) * scaleY) - y);
    const key = `${source.width},${source.height},${x},${y},${width},${height}`;
    if (copied.get(detail) === key) return;

    context.clearRect(0, 0, detail.width, detail.height);
    context.imageSmoothingEnabled = false;
    context.drawImage(source, x, y, width, height, 0, 0, detail.width, detail.height);
    copied.set(detail, key);
  });
}
</script>

<template>
  <div class="canvas-comparison">
    <p class="canvas-comparison__hint">
      {{ number.format(samples.length) }}개 표본을 같은 크기로 그린 뒤, 점선 안의 실제 픽셀을 확대합니다.
      여러 차트를 자주 다시 그릴 때 렌더 배율을 낮추면 그릴 픽셀을 줄일 수 있습니다.
    </p>
    <div ref="comparison" class="canvas-comparison__panels">
      <div v-for="view in views" :key="view.scale" :data-render-scale="view.scale">
        <UIChart
          v-slot="{ projection }"
          :dom="{
            accessibilityLabel: `진동 센서 파형 · ${view.label}`,
            accessibilityLimit: 48,
            renderPolicy: { type: 'fixed', renderScale: view.scale, maximumRepresentatives: 2_400 },
            onProjectionChange: next => copyDetail(view.scale, next),
            getAccessibleDatumLabel: id => {
              const sample = samples[Number(id)];
              return sample ? `${sample.time} ms · ${voltage.format(sample.amplitude)} V` : String(id);
            },
          }"
        >
          <UIChartLegend :items="[{ label: view.label, value: `${view.scale}×` }]" />
          <UIChartCartesian>
            <UIChartXAxis id="time" scale="linear" field="time" :domain="timeDomain" :ticks="4" label="시간 (ms)" />
            <UIChartYAxis id="amplitude" scale="linear" field="amplitude" :domain="amplitudeDomain" :ticks="5" label="진폭 (V)" />
            <UIChartLine id="waveform" :data="samples" x-axis="time" y-axis="amplitude" label="진폭 (V)" />
          </UIChartCartesian>
          <UIChartPlot>
            <UIChartCanvas />
            <span v-if="projection?.layout" class="canvas-comparison__area" :style="detailStyle(projection.layout.plot)" aria-hidden="true" />
          </UIChartPlot>
          <UIChartActions>
            <output v-if="projection" aria-live="off">{{ bitmapSize(projection.viewport) }}</output>
          </UIChartActions>
        </UIChart>
        <figure class="canvas-comparison__closeup">
          <figcaption>점선 영역 확대</figcaption>
          <canvas
            class="canvas-comparison__detail"
            width="384"
            height="192"
            role="img"
            :aria-label="`${view.label}에서 그린 파형의 픽셀 확대`"
          />
        </figure>
      </div>
    </div>
  </div>
</template>

<style scoped>
.canvas-comparison {
  display: grid;
  gap: var(--ui-space-md);
}

.canvas-comparison__hint {
  margin: 0;
  color: var(--ui-color-text-muted);
  font-size: var(--ui-font-size-body-sm);
  word-break: keep-all;
}

.canvas-comparison__panels {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 20rem), 1fr));
  gap: calc(2 * var(--ui-space-md));
}

.canvas-comparison__area {
  position: absolute;
  box-sizing: border-box;
  border: 1px dashed var(--ui-color-accent);
  pointer-events: none;
}

.canvas-comparison__closeup {
  display: grid;
  gap: var(--ui-space-xs);
  margin: var(--ui-space-md) 0 0;
  color: var(--ui-color-text-muted);
  font-size: var(--ui-font-size-body-sm);
}

.canvas-comparison__detail {
  display: block;
  box-sizing: border-box;
  inline-size: 100%;
  block-size: auto;
  border: 1px solid var(--ui-color-divider);
  border-radius: var(--ui-radius-md);
  image-rendering: pixelated;
}
</style>
