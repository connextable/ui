import type { ChartAxisLayout, ChartPlotRect } from "@sectile/chart/layout";
import type { ChartCommand, ChartState } from "@sectile/chart/interaction";
import {
  CHART_ARC_STRIDE,
  CHART_CELL_STRIDE,
  CHART_POINT_STRIDE,
  CHART_RECTANGLE_STRIDE,
  type ChartProjection,
  type ChartProjectionBatch,
} from "@sectile/chart/projection";
import type { ChartRootProps } from "@sectile/vue/chart";
import { chartSeriesColor, chartSeriesCount } from "./chart-colors";
import { projectCandlestickMarks, type ChartCandlestickLayers } from "./chart-candlesticks";
import {
  chartTransitionDurationToken,
  createChartFrameTween,
  easeChartProgress,
  sameChartAxes,
  sameChartViewport,
  type ChartPaintFrame,
  type ChartPaintLayout,
} from "./chart-motion";

type ChartDOM = NonNullable<ChartRootProps["dom"]>;
type Renderer = Exclude<NonNullable<ChartDOM["renderer"]>, string>;
type ViewPhase = Extract<ChartCommand, { type: "view-phase" }>["phase"];
export type ChartTickFormatter = (value: string | number, axis: ChartAxisLayout["axis"]) => string | undefined;
export type ChartGrid = "auto" | "x" | "y" | "both" | "none";
type GridOpacity = Readonly<{ x: number; y: number; categorical: number }>;

const dateFormatter = new Intl.DateTimeFormat("en-US", { month: "numeric", day: "numeric", timeZone: "UTC" });
const yearFormatter = new Intl.DateTimeFormat("en-CA", { year: "numeric", month: "numeric", day: "numeric", timeZone: "UTC" });
const timeFormatter = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "UTC" });
const secondsFormatter = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: "UTC" });
const numberFormatter = new Intl.NumberFormat(undefined, { maximumSignificantDigits: 5 });
const compactNumberFormatter = new Intl.NumberFormat(undefined, { notation: "compact", maximumSignificantDigits: 3 });

type MarkEmphasis = "hover" | "active" | "selected" | undefined;
type MarkHighlighter = (index: number) => MarkEmphasis;
interface MarkColors {
  surface: string;
  focus: string;
}

function emphasizeMark(context: CanvasRenderingContext2D, emphasis: MarkEmphasis, colors: MarkColors) {
  if (!emphasis) return;
  context.save();
  context.clip();
  if (emphasis === "hover") {
    context.fillStyle = colors.surface;
    context.globalAlpha = 0.22;
    context.fill();
    context.globalAlpha = 0.65;
    context.strokeStyle = colors.focus;
    context.lineWidth = 1.5;
    context.stroke();
  } else {
    context.strokeStyle = colors.surface;
    context.lineWidth = emphasis === "active" ? 3 : 4.5;
    context.stroke();
    context.strokeStyle = colors.focus;
    context.lineWidth = emphasis === "active" ? 1.25 : 2;
    context.stroke();
  }
  context.restore();
}

function tickLabel(axis: ChartAxisLayout["axis"], value: number | string, formatter: Intl.DateTimeFormat) {
  if (typeof value === "string" || axis.scale === "categorical") return String(value);
  if (axis.scale === "temporal" && Number.isFinite(new Date(value).getTime())) return formatter.format(value);
  return numberFormatter.format(value);
}

function fitAxisText(context: CanvasRenderingContext2D, text: string, limit: number) {
  const width = context.measureText(text).width;
  if (width <= limit) return { text, width };
  const ellipsis = "…";
  if (context.measureText(ellipsis).width > limit) return;
  const characters = Array.from(text);
  let start = 0;
  let end = characters.length;
  while (start < end) {
    const middle = Math.ceil((start + end) / 2);
    if (context.measureText(characters.slice(0, middle).join("") + ellipsis).width <= limit) start = middle;
    else end = middle - 1;
  }
  const fitted = characters.slice(0, start).join("") + ellipsis;
  return { text: fitted, width: context.measureText(fitted).width };
}

function wrapAxisText(context: CanvasRenderingContext2D, text: string, limit: number) {
  if (context.measureText(text).width <= limit) return [text];
  const lines: string[] = [];
  let line = "";
  for (const word of text.trim().split(/\s+/u)) {
    const joined = line ? `${line} ${word}` : word;
    if (context.measureText(joined).width <= limit) {
      line = joined;
      continue;
    }
    if (line) lines.push(line);
    line = word;
    if (context.measureText(word).width <= limit) continue;
    line = "";
    for (const character of word) {
      if (line && context.measureText(line + character).width > limit) {
        lines.push(line);
        line = "";
      }
      line += character;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function gridOpacity(layout: ChartPaintLayout | undefined, grid: ChartGrid): GridOpacity {
  if (grid === "auto") {
    const hasY = layout?.axes.some(({ axis }) => axis.orientation === "y" && axis.scale !== "categorical");
    return { x: hasY ? 0 : 1, y: hasY ? 1 : 0, categorical: 0 };
  }
  return { x: grid === "both" || grid === "x" ? 1 : 0, y: grid === "both" || grid === "y" ? 1 : 0, categorical: 1 };
}

function paintGrid(
  context: CanvasRenderingContext2D,
  layout: ChartPaintLayout,
  color: string,
  visibility: GridOpacity,
) {
  const { plot } = layout;
  context.save();
  context.strokeStyle = color;
  context.lineWidth = 1;
  for (const { axis, ticks } of layout.axes) {
    const opacityScale = visibility[axis.orientation] * (axis.scale === "categorical" ? visibility.categorical : 1);
    if (!opacityScale) continue;
    for (const { position, opacity = 1 } of ticks) {
      const start = axis.orientation === "y" ? plot.y : plot.x;
      const end = start + (axis.orientation === "y" ? plot.height : plot.width);
      if (opacity <= 0 || position < start - 0.5 || position > end + 0.5) continue;
      context.globalAlpha = opacity * opacityScale;
      context.beginPath();
      if (axis.orientation === "y") {
        context.moveTo(plot.x, position);
        context.lineTo(plot.x + plot.width, position);
      } else {
        context.moveTo(position, plot.y);
        context.lineTo(position, plot.y + plot.height);
      }
      context.stroke();
    }
  }
  context.restore();
}

function paintAxes(
  context: CanvasRenderingContext2D,
  layout: ChartPaintLayout,
  css: CSSStyleDeclaration,
  color: string,
  hasExternalTitles: boolean,
  formatTick?: ChartTickFormatter,
) {
  const { plot, viewport } = layout;
  const plotEndY = plot.y + plot.height;
  context.save();
  context.fillStyle = color;
  context.font = `500 ${css.fontSize} ${css.fontFamily}`;
  const textHeight = Number.parseFloat(css.fontSize);
  const lineHeight = Math.ceil(textHeight * 1.15);
  const edge = 4;
  const tickGap = 8;
  for (const { axis, ticks } of layout.axes) {
    const horizontal = axis.orientation === "x";
    const categorical = axis.scale === "categorical";
    const labelWidth = horizontal ? Math.min(120, viewport.width - 2 * edge) : plot.x - tickGap - edge;
    const order = [...ticks].sort((first, second) => (second.opacity ?? 1) - (first.opacity ?? 1) || first.position - second.position);
    let formatter = dateFormatter;
    if (axis.scale === "temporal") {
      const firstDate = new Date(Number(ticks[0]?.value));
      const lastDate = new Date(Number(ticks.at(-1)?.value));
      if (firstDate.getUTCFullYear() !== lastDate.getUTCFullYear()) {
        formatter = yearFormatter;
      } else if (firstDate.getUTCMonth() === lastDate.getUTCMonth() && firstDate.getUTCDate() === lastDate.getUTCDate()) {
        formatter = Math.abs(lastDate.getTime() - firstDate.getTime()) < 60 * 60 * 1000 ? secondsFormatter : timeFormatter;
      }
    }
    const plotStart = horizontal ? plot.x : plot.y;
    const plotEnd = plotStart + (horizontal ? plot.width : plot.height);
    const occupied: { start: number; end: number }[] = [];

    for (const { value, position, opacity = 1 } of order) {
      if (opacity < 0.12 || position < plotStart - 0.5 || position > plotEnd + 0.5) continue;
      const customLabel = formatTick?.(value, axis);
      let label = customLabel ?? tickLabel(axis, value, formatter);
      if (!label) continue;
      if (customLabel === undefined && typeof value === "number" && (axis.scale === "linear" || axis.scale === "logarithmic")
        && context.measureText(label).width > labelWidth) label = compactNumberFormatter.format(value);
      const lines = categorical ? wrapAxisText(context, label, labelWidth) : [label];
      if (!lines.length) continue;
      const width = Math.max(...lines.map(line => context.measureText(line).width));
      const height = lines.length * lineHeight;
      const top = horizontal ? plotEndY + tickGap : position - height / 2;
      const left = Math.max(edge, Math.min(position - width / 2, viewport.width - width - edge));
      if (width > labelWidth || top < edge || top + height > viewport.height - edge) continue;
      const start = horizontal ? left : top;
      const end = start + (horizontal ? width : height);
      if (occupied.some(interval => start < interval.end + tickGap && end > interval.start - tickGap)) continue;
      occupied.push({ start, end });
      context.globalAlpha = opacity;
      context.strokeStyle = color;
      context.lineWidth = 1;
      context.beginPath();
      if (horizontal) {
        context.moveTo(position, plotEndY);
        context.lineTo(position, plotEndY + 3);
      } else {
        context.moveTo(plot.x, position);
        context.lineTo(plot.x - 3, position);
      }
      context.stroke();
      context.textAlign = horizontal ? "center" : "right";
      context.textBaseline = "top";
      lines.forEach((line, index) => {
        context.fillText(line, horizontal ? left + width / 2 : plot.x - tickGap, top + index * lineHeight);
      });
    }

    if (hasExternalTitles) continue;
    const label = [axis.label, axis.unit].filter(Boolean).join(" · ");
    if (!label) continue;
    const fitted = fitAxisText(context, label, plot.width);
    if (!fitted) continue;
    context.globalAlpha = 1;
    context.textAlign = horizontal ? "center" : "left";
    context.textBaseline = "middle";
    context.fillText(fitted.text, horizontal ? plot.x + plot.width / 2 : plot.x, horizontal ? plot.y + plot.height + 32 : plot.y / 2);
  }
  context.restore();
}

function paintLine(
  context: CanvasRenderingContext2D,
  batch: Extract<ChartProjectionBatch, { type: "polyline" }>,
  baseline?: number,
) {
  const { offsets, positions } = batch;
  for (let segment = 0; segment + 1 < offsets.length; segment++) {
    const start = offsets[segment] * CHART_POINT_STRIDE;
    const end = offsets[segment + 1] * CHART_POINT_STRIDE;
    if (start >= end) continue;
    context.beginPath();
    context.moveTo(positions[start], positions[start + 1]);
    for (let index = start + CHART_POINT_STRIDE; index < end; index += CHART_POINT_STRIDE) {
      context.lineTo(positions[index], positions[index + 1]);
    }
    if (baseline !== undefined) {
      context.save();
      context.stroke();
      context.lineTo(positions[end - CHART_POINT_STRIDE], baseline);
      context.lineTo(positions[start], baseline);
      context.closePath();
      const gradient = context.createLinearGradient(0, 0, 0, context.canvas.clientHeight);
      const color = context.fillStyle;
      gradient.addColorStop(0, color as string);
      gradient.addColorStop(1, "transparent");
      context.fillStyle = gradient;
      context.globalAlpha = 0.23;
      context.fill();
      context.restore();
    } else {
      context.stroke();
    }
  }
}

function paintLineMarkers(
  context: CanvasRenderingContext2D,
  positions: Float32Array,
  colors: MarkColors,
  highlight: MarkHighlighter | undefined,
  plot?: ChartPlotRect,
) {
  const sparse = positions.length / CHART_POINT_STRIDE <= 16;
  if (!sparse && !highlight) return;

  // Projection positions are Float32, so compare against bounds at the same precision.
  const left = plot ? Math.fround(plot.x) : -Infinity;
  const right = plot ? Math.fround(plot.x + plot.width) : Infinity;
  const top = plot ? Math.fround(plot.y) : -Infinity;
  const bottom = plot ? Math.fround(plot.y + plot.height) : Infinity;
  const radius = 3.3;
  context.save();
  context.setLineDash([]);
  context.lineWidth = 1.5;
  context.strokeStyle = colors.surface;
  for (let index = 0; index < positions.length; index += CHART_POINT_STRIDE) {
    const x = positions[index];
    const y = positions[index + 1];
    if (x < left || x > right || y < top || y > bottom) continue;
    const emphasis = highlight?.(index / CHART_POINT_STRIDE);
    if (!sparse && !emphasis) continue;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill();
    context.stroke();
    emphasizeMark(context, emphasis, colors);
  }
  context.restore();
}

function paintCells(
  context: CanvasRenderingContext2D,
  { cells, reduction }: Extract<ChartProjectionBatch, { type: "cell" }>,
  ramp: readonly string[],
  colors: MarkColors,
  highlight?: MarkHighlighter,
) {
  let minimum = Infinity;
  let maximum = -Infinity;
  for (let index = 4; index < cells.length; index += CHART_CELL_STRIDE) {
    minimum = Math.min(minimum, cells[index]);
    maximum = Math.max(maximum, cells[index]);
  }
  for (let index = 0; index < cells.length; index += CHART_CELL_STRIDE) {
    const width = Math.max(2, cells[index + 2]);
    const height = Math.max(2, cells[index + 3]);
    const fraction = maximum === minimum ? 0.5 : (cells[index + 4] - minimum) / (maximum - minimum);
    context.fillStyle = ramp[Math.round(fraction * (ramp.length - 1))];
    context.beginPath();
    if (reduction === "density") {
      const radius = Math.min(13, 2 + Math.sqrt(cells[index + 4]) * 1.7);
      context.arc(cells[index] + width / 2, cells[index + 1] + height / 2, radius, 0, Math.PI * 2);
    } else {
      const inset = Math.min(2, width / 8, height / 8);
      context.roundRect(cells[index] + inset, cells[index + 1] + inset, width - inset * 2, height - inset * 2, 3);
    }
    context.fill();
    emphasizeMark(context, highlight?.(index / CHART_CELL_STRIDE), colors);
  }
}

function paintArcs(
  context: CanvasRenderingContext2D,
  batch: Extract<ChartProjectionBatch, { type: "arc" }>,
  palette: readonly string[],
  colors: MarkColors,
  highlight?: MarkHighlighter,
) {
  const { arcs, identityIndices } = batch;
  context.lineWidth = 2;
  context.strokeStyle = colors.surface;
  for (let index = 0; index < arcs.length; index += CHART_ARC_STRIDE) {
    const [x, y, inner, outer, start, end] = arcs.subarray(index, index + CHART_ARC_STRIDE);
    if (outer <= 0 || end <= start) continue;
    const fullCircle = end - start >= 2 * Math.PI - 1e-6;
    context.fillStyle = palette[identityIndices[index / CHART_ARC_STRIDE] % chartSeriesCount];
    context.beginPath();
    context.arc(x, y, outer, start, end);
    if (inner > 0) {
      if (fullCircle) context.moveTo(x + inner * Math.cos(end), y + inner * Math.sin(end));
      context.arc(x, y, inner, end, start, true);
    } else if (!fullCircle) {
      context.lineTo(x, y);
    }
    context.closePath();
    context.fill();
    context.stroke();
    emphasizeMark(context, highlight?.(index / CHART_ARC_STRIDE), colors);
  }
}

function paintCandles(
  context: CanvasRenderingContext2D,
  marks: NonNullable<ReturnType<typeof projectCandlestickMarks>>["marks"],
  css: CSSStyleDeclaration,
  colors: MarkColors,
  emphasisFor: (id: ChartProjectionBatchID | undefined) => MarkEmphasis,
) {
  const rise = css.getPropertyValue("--ui-chart-rise").trim();
  const fall = css.getPropertyValue("--ui-chart-fall").trim();
  for (const [index, { x, open, high, low, close, ids }] of marks.entries()) {
    const previous = marks[index - 1];
    const next = marks[index + 1];
    const spacing = Math.min(previous ? x - previous.x : Infinity, next ? next.x - x : Infinity);
    const width = Math.min(14, spacing * 0.64);
    const color = close <= open ? rise : fall;
    context.strokeStyle = color;
    context.lineWidth = 1;
    context.beginPath();
    context.moveTo(x, high);
    context.lineTo(x, low);
    context.stroke();
    context.fillStyle = color;
    context.beginPath();
    context.rect(x - width / 2, Math.min(open, close), width, Math.max(1.25, Math.abs(close - open)));
    context.fill();
    const emphasis = ids.map(emphasisFor);
    emphasizeMark(context, emphasis.find(value => value === "selected") ?? emphasis.find(Boolean), colors);
  }
}

type ChartProjectionBatchID = ChartCandlestickLayers["open"];

export function createUIChartRenderer(
  getCanvas: () => HTMLCanvasElement | null,
  hasAreaFill: () => boolean,
  getState: () => ChartState | undefined,
  getCandlesticks: () => ChartCandlestickLayers | undefined,
  shouldAnimate: () => boolean,
  getGrid: () => ChartGrid,
  getTickFormatter: () => ChartTickFormatter | undefined,
): Renderer & { handleCommand(command: ChartCommand): void; refreshAppearance(): void } {
  let canvas: HTMLCanvasElement | null = null;
  let context: CanvasRenderingContext2D | null = null;
  let root: HTMLElement | null = null;
  let drawCalls = 0;
  let shown: ChartPaintFrame | undefined;
  let target: ChartProjection | undefined;
  let shownGrid: GridOpacity | undefined;
  let targetGrid: GridOpacity | undefined;
  let lastView: ChartState["view"] | undefined;
  let viewPhase: ViewPhase | undefined;
  let frameId: number | undefined;

  function stopFrame() {
    if (frameId === undefined) return;
    canvas?.ownerDocument.defaultView?.cancelAnimationFrame(frameId);
    frameId = undefined;
  }

  function settle() {
    if (frameId === undefined) return;
    stopFrame();
    if (target) paint(target);
  }

  function settleForChartKey(event: KeyboardEvent) {
    if (event.shiftKey || !/^(Arrow(Up|Down|Left|Right)|Home|End|Enter| )$/.test(event.key)) return;
    const node = event.target;
    if (node === root || (node instanceof HTMLElement && node.matches('[role="option"]')
      && node.closest('[data-scope="chart"][data-part="root"]') === root)) settle();
  }

  function attach(element: HTMLCanvasElement | null) {
    stopFrame();
    canvas?.removeEventListener("pointerdown", settle, true);
    root?.removeEventListener("keydown", settleForChartKey, true);
    canvas = element;
    root = canvas?.closest<HTMLElement>("[data-ui-chart-themed]") ?? null;
    context = canvas?.getContext("2d") ?? null;
    canvas?.addEventListener("pointerdown", settle, true);
    root?.addEventListener("keydown", settleForChartKey, true);
    shown = undefined;
    target = undefined;
    shownGrid = undefined;
    targetGrid = undefined;
    lastView = undefined;
    viewPhase = undefined;
  }

  function paint(projection: ChartPaintFrame, visibility = gridOpacity(projection.layout, getGrid())) {
    const { viewport, layout, batches, identities } = projection;
    if (!canvas || !context) return;
    shown = projection;
    shownGrid = visibility;
    const state = getState();
    const selection = state?.selection;
    const selected = selection?.type === "points" && selection.ids.length ? new Set(selection.ids) : undefined;
    const active = root?.hasAttribute("data-ui-chart-shared-tooltip") ? undefined : state?.activeDatum ?? undefined;
    const cursor = state?.cursor ?? undefined;
    const hasEmphasis = selected !== undefined || active !== undefined || cursor !== undefined;
    const emphasisFor = (id: ChartProjectionBatchID | undefined): MarkEmphasis => {
      if (id === undefined) return;
      if (selected?.has(id)) return "selected";
      if (id === active) return "active";
      if (id === cursor) return "hover";
    };
    root?.toggleAttribute("data-ui-chart-region", !!selection && selection.type !== "points");
    const candleLayers = getCandlesticks();
    const candles = candleLayers && projectCandlestickMarks(projection, candleLayers);
    const css = getComputedStyle(canvas);
    const palette = Array.from({ length: chartSeriesCount }, (_, index) => css.getPropertyValue(chartSeriesColor(index)).trim());
    const grid = css.getPropertyValue("--ui-chart-grid").trim();
    const text = css.getPropertyValue("--ui-chart-label").trim();
    const colors = {
      surface: css.getPropertyValue("--ui-color-surface").trim(),
      focus: css.getPropertyValue("--ui-color-focus").trim(),
    };
    const low = css.getPropertyValue("--ui-chart-heatmap-low").trim();
    const high = css.getPropertyValue("--ui-chart-heatmap-high").trim();
    const ramp = batches.some(batch => batch.type === "cell")
      ? Array.from({ length: 17 }, (_, index) => `color-mix(in srgb, ${high} ${index * 6.25}%, ${low})`)
      : [];
    const histogram = css.getPropertyValue("--ui-chart-adjoining-bars").trim() === "1";
    const { width, height } = viewport;
    context.setTransform(canvas.width / width, 0, 0, canvas.height / height, 0, 0);
    context.clearRect(0, 0, width, height);
    const plotClip = layout && new Path2D();
    if (layout) {
      paintGrid(context, layout, grid, visibility);
      const { plot } = layout;
      plotClip?.rect(plot.x, plot.y, plot.width, plot.height);
    }

    const verticalAxis = layout?.axes.find(({ axis }) => axis.orientation === "y");
    const horizontalBars = verticalAxis?.axis.scale === "categorical";
    const bottom = layout ? layout.plot.y + layout.plot.height : height;
    const zero = verticalAxis?.geometryScale.normalize(0) ?? bottom;
    const baseline = hasAreaFill() ? Math.max(layout?.plot.y ?? 0, Math.min(bottom, zero)) : undefined;
    drawCalls = 0;
    for (const batch of batches) {
      if (candles?.layerIndices.has(batch.layerIndex)) continue;
      drawCalls++;
      const highlight = hasEmphasis
        ? (index: number) => emphasisFor(identities[batch.identityIndices[index]])
        : undefined;
      const color = palette[batch.layerIndex % chartSeriesCount];
      context.fillStyle = color;
      context.save();
      if (plotClip) context.clip(plotClip);
      context.strokeStyle = color;
      if (batch.type === "polyline") {
        context.lineWidth = 2.5;
        context.lineJoin = "round";
        context.lineCap = "round";
        context.setLineDash(batch.layerIndex === 0 ? [] : [5, 4]);
        paintLine(context, batch, baseline);
      } else if (batch.type === "point") {
        context.beginPath();
        for (let index = 0; index < batch.positions.length; index += CHART_POINT_STRIDE) {
          const x = batch.positions[index];
          const y = batch.positions[index + 1];
          context.moveTo(x + 3.5, y);
          context.arc(x, y, 3.5, 0, Math.PI * 2);
        }
        context.fill();
        if (highlight) {
          for (let index = 0; index < batch.positions.length; index += CHART_POINT_STRIDE) {
            const emphasis = highlight(index / CHART_POINT_STRIDE);
            if (!emphasis) continue;
            context.beginPath();
            context.arc(batch.positions[index], batch.positions[index + 1], 3.5, 0, Math.PI * 2);
            emphasizeMark(context, emphasis, colors);
          }
        }
      } else if (batch.type === "rectangle") {
        const { rectangles } = batch;
        for (let index = 0; index < rectangles.length; index += CHART_RECTANGLE_STRIDE) {
          const width = rectangles[index + 2];
          const height = rectangles[index + 3];
          if (width <= 0 || height <= 0) continue;
          const shortSide = horizontalBars ? height : width;
          const inset = histogram ? Math.min(0.5, shortSide / 4) : Math.max(shortSide * 0.17, (shortSide - 48) / 2);
          context.beginPath();
          context.roundRect(
            rectangles[index] + (horizontalBars ? 0 : inset),
            rectangles[index + 1] + (horizontalBars ? inset : 0),
            width - (horizontalBars ? 0 : inset * 2),
            height - (horizontalBars ? inset * 2 : 0),
            histogram ? 0 : 4,
          );
          context.fill();
          emphasizeMark(context, highlight?.(index / CHART_RECTANGLE_STRIDE), colors);
        }
      } else if (batch.type === "cell") {
        paintCells(context, batch, ramp, colors, highlight);
      } else {
        paintArcs(context, batch, palette, colors, highlight);
      }
      context.restore();
      if (batch.type === "polyline") {
        paintLineMarkers(context, batch.positions, colors, highlight, layout?.plot);
      }
    }
    if (candles) {
      context.save();
      if (plotClip) context.clip(plotClip);
      paintCandles(context, candles.marks, css, colors, emphasisFor);
      context.restore();
    }
    if (layout) {
      paintAxes(context, layout, css, text, canvas.parentElement?.classList.contains("ui-chart-plot__stage") === true, getTickFormatter());
    }
  }

  function render(projection: ChartProjection, appearanceChanged = false) {
    const element = getCanvas();
    if (element !== canvas) attach(element);
    if (!canvas || !context) return;

    const previousTarget = target;
    const nextGrid = gridOpacity(projection.layout, getGrid());
    const gridChanged = !targetGrid || targetGrid.x !== nextGrid.x || targetGrid.y !== nextGrid.y
      || targetGrid.categorical !== nextGrid.categorical;
    targetGrid = nextGrid;
    const currentView = getState()?.view;
    const viewChanged = lastView !== currentView;
    const directViewChange = viewChanged && viewPhase !== undefined && viewPhase !== "settled";
    const settledViewChange = viewChanged && viewPhase === "settled";
    lastView = currentView;
    viewPhase = undefined;
    target = projection;
    const view = canvas.ownerDocument.defaultView;
    const motion = shouldAnimate() ? view?.matchMedia("(prefers-reduced-motion: reduce)") : undefined;
    const animate = motion && view && !motion.matches;

    // An axis-only change can keep Sectile's data generation unchanged.
    const geometryChanged = animate && !directViewChange && (previousTarget?.generation !== projection.generation
      || (!!previousTarget && !sameChartAxes(previousTarget, projection)));
    if (animate && frameId !== undefined && previousTarget && !geometryChanged && !gridChanged
      && !viewChanged && sameChartViewport(previousTarget, projection)) {
      if (appearanceChanged && shown) paint(shown, shownGrid);
      return;
    }

    stopFrame();
    if (animate && shown && shownGrid && (geometryChanged || gridChanged)) {
      const durationToken = getComputedStyle(canvas)
        .getPropertyValue(chartTransitionDurationToken(previousTarget, projection)).trim();
      const duration = Number.parseFloat(durationToken) * (durationToken.endsWith("ms") ? 1 : 1000);
      const tween = duration > 0 && (geometryChanged || shown !== previousTarget)
        ? createChartFrameTween(shown, projection, settledViewChange)
        : undefined;
      if (duration > 0 && (tween || gridChanged)) {
        const fromGrid = shownGrid;
        const start = view.performance.now();
        const tick = (now: number) => {
          frameId = undefined;
          const progress = Math.min(1, Math.max(0, (now - start) / duration));
          if (progress >= 1 || motion?.matches || !shouldAnimate()) {
            if (target) paint(target);
            return;
          }
          const eased = easeChartProgress(progress);
          paint(tween?.(eased) ?? projection, {
            x: fromGrid.x + (nextGrid.x - fromGrid.x) * eased,
            y: fromGrid.y + (nextGrid.y - fromGrid.y) * eased,
            categorical: fromGrid.categorical + (nextGrid.categorical - fromGrid.categorical) * eased,
          });
          frameId = view.requestAnimationFrame(tick);
        };
        frameId = view.requestAnimationFrame(tick);
        return;
      }
    }
    paint(projection);
  }

  return {
    capabilities: { canvas2d: true, webgl2: false, asynchronousGPUTiming: false },
    getDiagnostics: () => ({ mode: "canvas2d", uploadedBytes: 0, drawCalls, liveResources: context ? 1 : 0 }),
    handleCommand(command) {
      if (command.type === "view-phase" && command.changed) viewPhase = command.phase;
    },
    refreshAppearance() {
      if (target) render(target, true);
    },
    render(projection) {
      render(projection);
    },
    flush: settle,
    disconnect: () => attach(null),
  };
}
