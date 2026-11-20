import type { ChartAggregateRepresentative } from "@sectile/chart/contract";
import type { ChartAxisLayout, ChartPlotRect } from "@sectile/chart/layout";
import {
  CHART_ARC_STRIDE,
  CHART_CELL_STRIDE,
  CHART_POINT_STRIDE,
  CHART_RECTANGLE_STRIDE,
  type ChartProjection,
  type ChartProjectionBatch,
} from "@sectile/chart/projection";
import type { ChartAggregateHit } from "@sectile/chart/query";
import type { ChartRootProps, ChartRootSlotProps } from "@sectile/vue/chart";

export type ChartTooltipID = ChartProjection["identities"][number];
type AxisValue = string | number | null;
export type ChartTooltipGroup = (value: NonNullable<AxisValue>) => NonNullable<AxisValue>;

interface ChartTooltipItem {
  readonly colorIndex: number;
  readonly series: string;
  readonly description: string;
  readonly value: AxisValue;
}

export interface ChartTooltipDatum<ID extends ChartTooltipID = ChartTooltipID> {
  readonly id: ID | null;
  readonly aggregate?: ChartAggregateRepresentative;
  readonly label: string;
  readonly series: string;
  readonly x: AxisValue;
  readonly y: AxisValue;
  readonly value: AxisValue;
  readonly title: string;
  readonly description: string | null;
  readonly items?: readonly ChartTooltipItem[];
}

export interface ChartTooltipTarget {
  readonly datum: ChartTooltipDatum;
  readonly anchor: { x: number; y: number };
  readonly viewport: ChartProjection["viewport"];
  readonly band?: ChartPlotRect;
}

interface SharedTooltipTarget extends ChartTooltipTarget {
  readonly key: string;
  readonly band: ChartPlotRect;
}

interface SharedChartTooltip {
  readonly byId: ReadonlyMap<ChartTooltipID, SharedTooltipTarget>;
  at(point: { x: number; y: number }): SharedTooltipTarget | undefined;
}

const date = new Intl.DateTimeFormat(undefined, { month: "numeric", day: "numeric", timeZone: "UTC" });
const time = new Intl.DateTimeFormat(undefined, { hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: "UTC" });
const number = new Intl.NumberFormat(undefined, { maximumSignificantDigits: 6 });
const percent = new Intl.NumberFormat(undefined, { style: "percent", maximumFractionDigits: 1 });

function displayValue(value: AxisValue, axis?: ChartAxisLayout) {
  if (value === null) return null;
  if (typeof value === "string") return value;
  if (axis?.axis.scale === "temporal") {
    const domain = axis.descriptor.geometryDomain;
    return (domain.maximum - domain.minimum < 86_400_000 ? time : date).format(value);
  }
  const formatted = number.format(value);
  return axis?.axis.unit ? `${formatted} ${axis.axis.unit}` : formatted;
}

function axisValue(axis: ChartAxisLayout | undefined, value: number) {
  if (axis?.axis.scale !== "categorical") return value;
  const position = axis.geometryScale.normalize(value);
  return position === null ? null : axis.scale.invert(position);
}

function markAnchor(batch: ChartProjectionBatch, index: number) {
  if (batch.type === "point" || batch.type === "polyline") {
    const offset = index * CHART_POINT_STRIDE;
    return { x: batch.positions[offset], y: batch.positions[offset + 1] };
  }
  if (batch.type === "rectangle" || batch.type === "cell") {
    const values = batch.type === "rectangle" ? batch.rectangles : batch.cells;
    const offset = index * (batch.type === "rectangle" ? CHART_RECTANGLE_STRIDE : CHART_CELL_STRIDE);
    return { x: values[offset] + values[offset + 2] / 2, y: values[offset + 1] + values[offset + 3] / 2 };
  }
  const offset = index * CHART_ARC_STRIDE;
  const radius = (batch.arcs[offset + 2] + batch.arcs[offset + 3]) / 2;
  const angle = (batch.arcs[offset + 4] + batch.arcs[offset + 5]) / 2;
  return { x: batch.arcs[offset] + Math.cos(angle) * radius, y: batch.arcs[offset + 1] + Math.sin(angle) * radius };
}

function tooltipLayer(
  { definition, projection }: Pick<ChartRootSlotProps, "definition" | "projection">,
  batch: ChartProjectionBatch,
) {
  const layer = definition?.layers[batch.layerIndex];
  const data = projection?.dataBatches?.find(data => data.layerIndex === batch.layerIndex);
  const geometry = data?.geometry;
  const xAxis = projection?.layout?.axes.find(axis => axis.axis.id === (layer?.xAxis ?? data?.xAxisID));
  const yAxis = projection?.layout?.axes.find(axis => axis.axis.id === (layer?.yAxis ?? data?.yAxisID));
  const horizontalBar = batch.type === "rectangle" && yAxis?.axis.scale === "categorical";
  const valueAxis = horizontalBar ? xAxis : yAxis;
  const series = layer?.label || (valueAxis?.axis.scale !== "categorical" ? valueAxis?.axis.label : undefined) || "";
  return { geometry, xAxis, yAxis, horizontalBar, series };
}

function tooltipMark(
  projection: ChartProjection,
  batch: ChartProjectionBatch,
  { geometry, xAxis, yAxis, horizontalBar, series }: ReturnType<typeof tooltipLayer>,
  index: number,
  id: ChartTooltipID | null,
  label: string,
  aggregate?: ChartAggregateRepresentative,
): ChartTooltipTarget | undefined {
  const anchor = markAnchor(batch, index);
  const plot = projection.layout?.plot;
  if (plot && (anchor.x < plot.x - 0.5 || anchor.x > plot.x + plot.width + 0.5
    || anchor.y < plot.y - 0.5 || anchor.y > plot.y + plot.height + 0.5)) return;

  let x: AxisValue = null;
  let y: AxisValue = null;
  let value: AxisValue = null;
  let description: string | null = null;
  if (geometry?.type === "point" || geometry?.type === "polyline") {
    x = axisValue(xAxis, geometry.positions[index * CHART_POINT_STRIDE]);
    y = axisValue(yAxis, geometry.positions[index * CHART_POINT_STRIDE + 1]);
  } else if (geometry?.type === "rectangle") {
    const offset = index * CHART_RECTANGLE_STRIDE;
    const [x1, y1, x2, y2] = geometry.segments.subarray(offset, offset + CHART_RECTANGLE_STRIDE);
    x = axisValue(xAxis, xAxis?.axis.scale === "categorical" ? (x1 + x2) / 2 : x2);
    y = axisValue(yAxis, yAxis?.axis.scale === "categorical" ? (y1 + y2) / 2 : y2);
  } else if (batch.type === "cell") {
    x = xAxis?.scale.invert(anchor.x) ?? null;
    y = yAxis?.scale.invert(anchor.y) ?? null;
    value = batch.cells[index * CHART_CELL_STRIDE + 4];
  } else if (batch.type === "arc") {
    const offset = index * CHART_ARC_STRIDE;
    value = Math.max(0, Math.min(1, (batch.arcs[offset + 5] - batch.arcs[offset + 4]) / (2 * Math.PI)));
    description = percent.format(value);
  }

  const xLabel = displayValue(x, xAxis);
  const yLabel = displayValue(y, yAxis);
  const title = batch.type === "cell"
    ? [xLabel, yLabel].filter(Boolean).join(" · ") || label
    : (horizontalBar ? yLabel : xLabel) ?? label;
  description ??= batch.type === "cell" ? displayValue(value) : horizontalBar ? xLabel : yLabel;
  const datum: ChartTooltipDatum = {
    id, label, series, x, y, title, description,
    value: value ?? (horizontalBar ? x : y),
    aggregate,
  };
  return { datum, anchor, viewport: projection.viewport };
}

export function resolveChartTooltip(
  scope: ChartRootSlotProps,
  candidate: ChartTooltipID | ChartAggregateHit,
  getLabel?: NonNullable<ChartRootProps["dom"]>["getAccessibleDatumLabel"],
): ChartTooltipTarget | undefined {
  const { controller, projection } = scope;
  if (!projection) return;
  const hit = typeof candidate === "object" ? candidate : undefined;
  const id = typeof candidate === "object" ? null : candidate;
  const identityIndex = id === null ? -1 : (controller?.getModel().indexOf(id) ?? projection.identities.indexOf(id));
  if (id !== null && identityIndex < 0) return;
  const batches = hit ? [projection.batches[hit.batchIndex]] : projection.batches;
  for (const batch of batches) {
    if (!batch) continue;
    const index = hit?.primitiveIndex ?? batch.identityIndices.indexOf(identityIndex);
    if (index < 0) continue;
    const layer = tooltipLayer(scope, batch);
    const label = id === null ? layer.series : (getLabel?.(id, identityIndex) ?? String(id));
    return tooltipMark(projection, batch, layer, index, id, label, hit?.representative);
  }
}

export function createSharedChartTooltip(
  scope: Pick<ChartRootSlotProps, "definition" | "projection">,
  groupValue?: ChartTooltipGroup,
): SharedChartTooltip | undefined {
  const { projection } = scope;
  const plot = projection?.layout?.plot;
  if (!projection || !plot) return;

  const layers = projection.batches
    .filter(batch => batch.type === "rectangle" || batch.type === "polyline" || batch.type === "point")
    .map(batch => ({ batch, layer: tooltipLayer(scope, batch) }));
  const firstLayer = layers[0]?.layer;
  const horizontal = firstLayer?.horizontalBar === true;
  const groupAxis = horizontal ? firstLayer?.yAxis : firstLayer?.xAxis;
  if (!groupAxis) return;

  const groups = new Map<NonNullable<AxisValue>, {
    first: ChartTooltipTarget;
    minimum: number;
    maximum: number;
    ids: ChartTooltipID[];
    items: Map<number, ChartTooltipItem>;
  }>();
  for (const { batch, layer } of layers) {
    const axis = horizontal ? layer.yAxis : layer.xAxis;
    if (axis?.axis.id !== groupAxis.axis.id) continue;
    for (const [index, identityIndex] of batch.identityIndices.entries()) {
      const id = projection.identities[identityIndex];
      if (id === undefined) continue;
      const mark = tooltipMark(projection, batch, layer, index, id, String(id));
      if (!mark || mark.datum.description === null) continue;
      const value = horizontal ? mark.datum.y : mark.datum.x;
      if (value === null) continue;

      const key = groupValue?.(value) ?? value;
      const position = horizontal ? mark.anchor.y : mark.anchor.x;
      let group = groups.get(key);
      if (!group) {
        group = { first: mark, minimum: position, maximum: position, ids: [], items: new Map() };
        groups.set(key, group);
      }
      group.minimum = Math.min(group.minimum, position);
      group.maximum = Math.max(group.maximum, position);
      group.ids.push(id);
      if (!group.items.has(batch.layerIndex)) {
        group.items.set(batch.layerIndex, {
          colorIndex: batch.layerIndex,
          series: mark.datum.series,
          value: mark.datum.value,
          description: mark.datum.description,
        });
      }
    }
  }

  const byId = new Map<ChartTooltipID, SharedTooltipTarget>();
  const start = horizontal ? plot.y : plot.x;
  const end = start + (horizontal ? plot.height : plot.width);
  const ordered = [...groups].map(([value, group]) => ({
    value, group, position: (group.minimum + group.maximum) / 2,
  })).sort((a, b) => a.position - b.position);
  const bands = ordered.map(({ value, group, position }, index) => {
    const before = ordered[index - 1];
    const after = ordered[index + 1];
    const low = before ? (before.position + position) / 2 : start;
    const high = after ? (position + after.position) / 2 : end;
    const band = horizontal
      ? { ...plot, y: low, height: high - low }
      : { ...plot, x: low, width: high - low };
    const target: SharedTooltipTarget = {
      ...group.first,
      key: `group:${typeof value}:${value}`,
      anchor: horizontal ? { x: group.first.anchor.x, y: position } : { x: position, y: group.first.anchor.y },
      band,
      datum: {
        ...group.first.datum,
        title: displayValue(value, groupAxis) ?? String(value),
        items: [...group.items.values()].sort((a, b) => a.colorIndex - b.colorIndex),
      },
    };
    for (const id of group.ids) byId.set(id, target);
    return { high, target };
  });

  return {
    byId,
    at(point: { x: number; y: number }) {
      if (point.x < plot.x || point.x > plot.x + plot.width || point.y < plot.y || point.y > plot.y + plot.height) return;
      const position = horizontal ? point.y : point.x;
      let low = 0;
      let high = bands.length;
      while (low < high) {
        const center = Math.floor((low + high) / 2);
        if (position > bands[center]!.high) low = center + 1;
        else high = center;
      }
      return bands[low]?.target;
    },
  };
}
