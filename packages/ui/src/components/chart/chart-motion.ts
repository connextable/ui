import type { ChartAxisLayout, ChartPlotLayout } from "@sectile/chart/layout";
import {
  CHART_ARC_STRIDE,
  CHART_CELL_STRIDE,
  CHART_POINT_STRIDE,
  CHART_RECTANGLE_STRIDE,
  type ChartPolylineBatch,
  type ChartProjection,
  type ChartProjectionBatch,
} from "@sectile/chart/projection";
import type { ChartTick } from "@sectile/chart/scale";

export interface ChartPaintTick extends ChartTick {
  readonly opacity?: number;
}

type ChartPaintAxis = Omit<ChartAxisLayout, "ticks"> & { readonly ticks: readonly ChartPaintTick[] };
export type ChartPaintLayout = Omit<ChartPlotLayout, "axes"> & { readonly axes: readonly ChartPaintAxis[] };
type DatumID = ChartProjection["identities"][number];
type ChartPaintBatch = ChartProjectionBatch & {
  readonly retainedIDs?: ReadonlyMap<number, DatumID>;
  readonly lineData?: Float64Array;
};
export type ChartPaintFrame = Omit<ChartProjection, "layout" | "batches"> & {
  readonly layout?: ChartPaintLayout;
  readonly batches: readonly ChartPaintBatch[];
};
const paintOnlyIndex = 0xffffffff;

export function easeChartProgress(progress: number) {
  return progress * (2 - progress);
}

function mix(from: number, to: number, progress: number) {
  return from + (to - from) * progress;
}

function paintDatumID(frame: ChartPaintFrame, batch: ChartPaintBatch, index: number) {
  return frame.identities[batch.identityIndices[index]] ?? batch.retainedIDs?.get(index);
}

function barBaseline(start: number, size: number, zero: number | null | undefined, horizontal: boolean) {
  return Math.min(start + size, Math.max(start, zero ?? (horizontal ? start : start + size)));
}

function tickTransition(previous: ChartPaintAxis, next: ChartPaintAxis) {
  const previousByValue = new Map(previous.ticks.map(tick => [tick.value, tick]));
  const nextValues = new Set(next.ticks.map(tick => tick.value));
  const entering = next.ticks.map(tick => {
    const before = previousByValue.get(tick.value);
    return {
      value: tick.value,
      from: before?.position ?? previous.scale.normalize(tick.value) ?? tick.position,
      to: tick.position,
      opacityFrom: before ? (before.opacity ?? 1) : 0,
      opacityTo: 1,
    };
  });
  const exiting = previous.ticks.filter(tick => !nextValues.has(tick.value) && tick.opacity !== 0).map(tick => ({
    value: tick.value,
    from: tick.position,
    to: next.scale.normalize(tick.value) ?? tick.position,
    opacityFrom: tick.opacity ?? 1,
    opacityTo: 0,
  }));
  const transitions = [...entering, ...exiting];

  return (progress: number): ChartPaintAxis => ({
    ...next,
    ticks: transitions.map(tick => ({
      value: tick.value,
      position: mix(tick.from, tick.to, progress),
      opacity: mix(tick.opacityFrom, tick.opacityTo, progress),
    })).sort((first, second) => first.position - second.position),
  });
}

export function sameChartViewport(first: ChartPaintFrame, second: ChartProjection) {
  return first.viewport.width === second.viewport.width
    && first.viewport.height === second.viewport.height
    && first.viewport.devicePixelRatio === second.viewport.devicePixelRatio;
}

export function sameChartAxes(previous: ChartProjection, next: ChartProjection) {
  if (previous.layout === next.layout) return true;
  const old = previous.layout?.axes ?? [];
  const current = next.layout?.axes ?? [];
  if (old.length !== current.length) return false;
  return current.every(({ axis }, index) => {
    const before = old[index]!.axis;
    if (before.id !== axis.id || before.orientation !== axis.orientation
      || before.scale !== axis.scale || before.ticks !== axis.ticks) return false;
    const oldDomain = before.domain;
    const domain = axis.domain;
    if (oldDomain === domain) return true;
    if (oldDomain.kind === "categorical" && domain.kind === "categorical") {
      return oldDomain.values.length === domain.values.length
        && domain.values.every((value, index) => value === oldDomain.values[index]);
    }
    return oldDomain.kind !== "categorical" && domain.kind !== "categorical" && oldDomain.kind === domain.kind
      && oldDomain.minimum === domain.minimum && oldDomain.maximum === domain.maximum;
  });
}

export function chartTransitionDurationToken(previous: ChartProjection | undefined, next: ChartProjection) {
  const oldAxes = previous?.layout?.axes;
  const axes = next.layout?.axes;
  if (axes?.some(({ axis }) => {
    const old = oldAxes?.find(item => item.axis.id === axis.id)?.axis.domain;
    const domain = axis.domain;
    return old?.kind === "categorical" && domain.kind === "categorical"
      && (old.values.length !== domain.values.length || domain.values.some((value, index) => value !== old.values[index]));
  })) return "--ui-chart-category-duration";

  return "--ui-motion-standard";
}

function batchGeometry(batch: ChartProjectionBatch) {
  switch (batch.type) {
    case "point":
    case "polyline": return { key: "positions", values: batch.positions, stride: CHART_POINT_STRIDE } as const;
    case "rectangle": return { key: "rectangles", values: batch.rectangles, stride: CHART_RECTANGLE_STRIDE } as const;
    case "cell": return { key: "cells", values: batch.cells, stride: CHART_CELL_STRIDE } as const;
    case "arc": return { key: "arcs", values: batch.arcs, stride: CHART_ARC_STRIDE } as const;
  }
}

function categoryTravel(previous?: ChartPaintAxis, next?: ChartAxisLayout) {
  if (!previous || !next) return 0;
  const from = previous.axis.domain;
  const to = next.axis.domain;
  if (from.kind !== "categorical" || to.kind !== "categorical" || from.values.length !== to.values.length) return 0;

  const first = to.values[0];
  if (first === undefined) return 0;
  const offset = from.values.indexOf(first);
  if (offset < 1 || !from.values.slice(offset).every((value, index) => value === to.values[index])) return 0;

  return (previous.scale.normalize(first) ?? 0) - (next.scale.normalize(first) ?? 0);
}

function retainLineEdges(
  previous: ChartPaintFrame,
  batch: ChartPolylineBatch,
  data: Float64Array,
  from: Float32Array,
  x: ChartAxisLayout,
  y: ChartAxisLayout,
) {
  const before = previous.batches.find(item => item.layerIndex === batch.layerIndex && item.type === "polyline");
  const geometry = previous.dataBatches?.find(item => item.layerIndex === batch.layerIndex)?.geometry;
  const beforeData = before?.lineData ?? (geometry?.type === "polyline" ? geometry.positions : undefined);
  const plot = previous.layout?.plot;
  if (!plot || before?.type !== "polyline" || before.offsets.length !== 2 || !beforeData?.length) return;

  const stride = CHART_POINT_STRIDE;
  let first = 0;
  let last = beforeData.length;
  // Repeated navigation can interrupt a tween. Keep at most one point past each visible edge.
  while (first + stride < last && before.positions[first + stride] < plot.x) first += stride;
  while (last - stride > first && before.positions[last - 2 * stride] > plot.x + plot.width) last -= stride;
  const minimum = data[0];
  const maximum = data[data.length - stride];
  if (beforeData[first] > maximum || beforeData[last - stride] < minimum) return;

  let left = first;
  let right = last;
  while (beforeData[left] < minimum) left += stride;
  while (beforeData[right - stride] > maximum) right -= stride;
  if (first === left && right === last) return;

  const lead = left - first;
  const end = lead + data.length;
  const positions = new Float32Array(end + last - right);
  const lineData = new Float64Array(positions.length);
  lineData.set(beforeData.subarray(first, left));
  lineData.set(data, lead);
  lineData.set(beforeData.subarray(right, last), end);
  const identityIndices = new Uint32Array(positions.length / stride).fill(paintOnlyIndex);
  identityIndices.set(batch.identityIndices, lead / stride);
  const retainedIDs = new Map<number, DatumID>();
  const starts = new Float32Array(positions.length);
  const ends = new Float32Array(positions.length);
  starts.set(from, lead);
  ends.set(batch.positions, lead);

  // The old edges move with the axis until the plot clip hides them.
  for (let index = 0; index < positions.length; index += stride) {
    if (index >= lead && index < end) continue;
    const origin = index < lead ? first + index : right + index - end;
    const id = paintDatumID(previous, before, origin / stride);
    if (id !== undefined) retainedIDs.set(index / stride, id);
    starts[index] = before.positions[origin];
    starts[index + 1] = before.positions[origin + 1];
    ends[index] = x.geometryScale.normalize(lineData[index]) ?? starts[index];
    ends[index + 1] = y.geometryScale.normalize(lineData[index + 1]) ?? starts[index + 1];
  }

  const painted = { ...batch, positions, identityIndices, retainedIDs, lineData,
    offsets: Uint32Array.of(0, identityIndices.length) };
  return (progress: number) => {
    for (let index = 0; index < positions.length; index++) positions[index] = mix(starts[index], ends[index], progress);
    return painted;
  };
}

export function createChartFrameTween(previous: ChartPaintFrame, next: ChartProjection, navigating = false) {
  if (!sameChartViewport(previous, next) || previous.coordinate !== next.coordinate) return;

  const oldAxes = new Map(previous.layout?.axes.map(axis => [axis.axis.id, axis]));
  // A distant reset has no shared window to slide through.
  if (navigating && next.layout?.axes.some(({ axis, descriptor }) => {
    const before = oldAxes.get(axis.id);
    if (axis.orientation !== "x" || axis.scale === "categorical" || before?.axis.scale !== axis.scale) return false;
    const from = before.descriptor.geometryDomain;
    const to = descriptor.geometryDomain;
    return from.maximum <= to.minimum || to.maximum <= from.minimum;
  })) return;

  const axes = next.layout?.axes.map(axis => {
    const old = oldAxes.get(axis.axis.id);
    if (old && old.axis.orientation === axis.axis.orientation) return tickTransition(old, axis);
    return () => axis;
  });
  const oldPositions = new Map<DatumID, { type: ChartProjectionBatch["type"]; values: Float32Array; offset: number }>();
  for (const batch of previous.batches) {
    const { values, stride } = batchGeometry(batch);
    for (let offset = 0; offset < values.length; offset += stride) {
      const id = paintDatumID(previous, batch, offset / stride);
      if (id !== undefined) oldPositions.set(id, { type: batch.type, values, offset });
    }
  }

  const layout = next.layout;
  let hasAnimatedMarks = false;
  const plans = next.batches.map(batch => {
    const data = next.dataBatches?.find(({ layerIndex }) => layerIndex === batch.layerIndex);
    const x = layout?.axes.find(({ axis }) => axis.id === data?.xAxisID)
      ?? layout?.axes.find(({ axis }) => axis.orientation === "x");
    const y = layout?.axes.find(({ axis }) => axis.id === data?.yAxisID)
      ?? layout?.axes.find(({ axis }) => axis.orientation === "y");
    const horizontal = y?.axis.scale === "categorical";
    const categoryAxis = horizontal ? y : x;
    const categoricalBars = batch.type === "rectangle" && categoryAxis?.axis.scale === "categorical";
    const categoryOffset = horizontal ? 1 : 0;
    const valueOffset = horizontal ? 0 : 1;
    const zero = batch.type === "rectangle" ? (horizontal ? x : y)?.geometryScale.normalize(0) : undefined;
    const barTravel = categoricalBars && categoryAxis
      ? categoryTravel(oldAxes.get(categoryAxis.axis.id), categoryAxis)
      : 0;
    const rawCells = batch.type === "cell" && !batch.reduction;
    const scrollX = rawCells && x ? categoryTravel(oldAxes.get(x.axis.id), x) : 0;
    const scrollY = rawCells && y ? categoryTravel(oldAxes.get(y.axis.id), y) : 0;
    const oldX = x && oldAxes.get(x.axis.id);
    const oldY = y && oldAxes.get(y.axis.id);
    const lineData = data?.geometry.type === "polyline" ? data.geometry.positions : undefined;
    const movingLineWindow = navigating && batch.type === "polyline" && oldX && x
      && x.axis.scale !== "categorical" && oldX.axis.scale === x.axis.scale;
    const { key, stride, values: target } = batchGeometry(batch);
    const from = target.slice();
    const values = target.slice();
    const frame = { ...batch, [key]: values };
    const enteringBars: number[] = [];
    let anchor: { values: Float32Array; offset: number } | undefined;
    for (let index = 0; index < target.length; index += stride) {
      const id = next.identities[batch.identityIndices[index / stride]];
      const known = id !== undefined ? oldPositions.get(id) : undefined;
      if (known?.type === batch.type) {
        hasAnimatedMarks = true;
        anchor = known;
        for (let offset = 0; offset < stride; offset++) from[index + offset] = known.values[known.offset + offset];
      } else if (batch.type === "polyline" && anchor && !movingLineWindow && previous.generation !== next.generation) {
        from[index] = anchor.values[anchor.offset];
        from[index + 1] = anchor.values[anchor.offset + 1];
      } else if (batch.type === "point" || batch.type === "polyline") {
        const xValue = movingLineWindow && lineData ? lineData[index] : x?.scale.invert(target[index]);
        const yValue = movingLineWindow && lineData && y?.axis.scale !== "categorical"
          ? lineData[index + 1] : y?.scale.invert(target[index + 1]);
        if (xValue != null) from[index] = oldX?.scale.normalize(xValue) ?? target[index];
        if (yValue != null) from[index + 1] = oldY?.scale.normalize(yValue) ?? target[index + 1];
      } else if (batch.type === "rectangle") {
        const offset = index + valueOffset;
        from[offset] = barBaseline(target[offset], target[offset + 2], zero, horizontal);
        from[offset + 2] = 0;
        if (categoricalBars) {
          from[index + categoryOffset] += barTravel;
          enteringBars.push(offset);
        }
      } else if (batch.type === "arc") {
        from[index + 5] = from[index + 4];
      } else if (batch.type === "cell") {
        from[index] += scrollX;
        from[index + 1] += scrollY;
      }
    }

    function interpolate(output: Float32Array, progress: number) {
      for (let index = 0; index < target.length; index++) output[index] = mix(from[index], target[index], progress);
      const grow = progress ** 1.5;
      for (const offset of enteringBars) {
        output[offset] = mix(from[offset], target[offset], grow);
        output[offset + 2] = target[offset + 2] * grow;
      }
    }

    if (movingLineWindow && batch.offsets.length === 2 && lineData?.length && y && oldY?.axis.scale === y.axis.scale
      && y.axis.scale !== "categorical") {
      const tween = retainLineEdges(previous, batch, lineData, from, x, y);
      if (tween) return tween;
    }

    if (categoricalBars && previous.generation !== next.generation) {
      const layerID = next.layerRevisions?.[batch.layerIndex]?.layerID;
      const previousLayer = layerID === undefined
        ? batch.layerIndex
        : previous.layerRevisions?.findIndex(layer => layer.layerID === layerID);
      const previousBars = previous.batches.find(item => item.layerIndex === previousLayer);
      if (previousBars?.type === "rectangle") {
        const active = new Set(Array.from(batch.identityIndices, index => next.identities[index]));
        const departing: { id: DatumID; rectangle: Float32Array; baseline: number }[] = [];
        for (let index = 0; index < previousBars.identityIndices.length; index++) {
          const id = paintDatumID(previous, previousBars, index);
          if (id === undefined || active.has(id)) continue;
          const origin = index * CHART_RECTANGLE_STRIDE;
          const rectangle = previousBars.rectangles.slice(origin, origin + CHART_RECTANGLE_STRIDE);
          const baseline = barBaseline(rectangle[valueOffset], rectangle[valueOffset + 2], zero, horizontal);
          departing.push({ id, rectangle, baseline });
        }
        if (departing.length) {
          hasAnimatedMarks = true;
          const rectangles = new Float32Array(target.length + departing.length * CHART_RECTANGLE_STRIDE);
          const identityIndices = new Uint32Array(batch.identityIndices.length + departing.length).fill(paintOnlyIndex);
          identityIndices.set(batch.identityIndices);
          // Keep exits in the paint frame so a reversal can resume them from their visible geometry.
          const retainedIDs = new Map(departing.map(({ id }, index) => [batch.identityIndices.length + index, id]));
          const painted = { ...batch, rectangles, identityIndices, retainedIDs };
          return (progress: number) => {
            interpolate(rectangles, progress);
            const collapse = 1 - (1 - progress) ** 2;
            for (const [index, { rectangle, baseline }] of departing.entries()) {
              const offset = target.length + index * CHART_RECTANGLE_STRIDE;
              rectangles.set(rectangle, offset);
              rectangles[offset + categoryOffset] -= barTravel * progress;
              rectangles[offset + valueOffset] = mix(rectangle[valueOffset], baseline, collapse);
              rectangles[offset + valueOffset + 2] = mix(rectangle[valueOffset + 2], 0, collapse);
            }
            return painted;
          };
        }
      }
    }
    const previousCell = scrollX || scrollY
      ? previous.batches.find(item => item.type === "cell" && item.layerIndex === batch.layerIndex)
      : undefined;
    if (batch.type === "cell" && previousCell?.type === "cell") {
      const nextIds = new Set(Array.from(batch.identityIndices, index => next.identities[index]));
      const exiting = Array.from(previousCell.identityIndices, (index, item) =>
        nextIds.has(previous.identities[index]) ? -1 : item * CHART_CELL_STRIDE,
      ).filter(offset => offset >= 0);
      const cells = new Float32Array(target.length + exiting.length * CHART_CELL_STRIDE);
      const identityIndices = new Uint32Array(batch.identityIndices.length + exiting.length).fill(paintOnlyIndex);
      identityIndices.set(batch.identityIndices);
      const painted = { ...batch, cells, identityIndices };
      return (progress: number) => {
        interpolate(cells, progress);
        for (const [item, origin] of exiting.entries()) {
          const offset = target.length + item * CHART_CELL_STRIDE;
          cells.set(previousCell.cells.subarray(origin, origin + CHART_CELL_STRIDE), offset);
          cells[offset] -= scrollX * progress;
          cells[offset + 1] -= scrollY * progress;
        }
        return painted;
      };
    }
    return (progress: number) => {
      interpolate(values, progress);
      return frame;
    };
  });
  if (!hasAnimatedMarks && sameChartAxes(previous, next)) return;

  // These are drawing buffers. Neither the source projection nor the controller is changed.
  return (progress: number): ChartPaintFrame => ({
    ...next,
    layout: layout && axes ? { ...layout, axes: axes.map(frame => frame(progress)) } : undefined,
    batches: plans.map(frame => frame(progress)),
  });
}
