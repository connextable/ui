import { CHART_POINT_STRIDE, type ChartProjection } from "@sectile/chart/projection";

const priceFields = ["open", "high", "low", "close"] as const;
type PriceField = typeof priceFields[number];
type DatumID = ChartProjection["identities"][number];
export type ChartCandlestickLayers = Readonly<Record<PriceField, DatumID>>;

interface CandlestickMark {
  x: number;
  open: number;
  high: number;
  low: number;
  close: number;
  ids: readonly DatumID[];
}

export function projectCandlestickMarks(projection: ChartProjection, layers: ChartCandlestickLayers): {
  layerIndices: ReadonlyMap<number, PriceField>;
  marks: readonly CandlestickMark[];
} | undefined {
  const layerIndices = new Map<number, PriceField>();
  for (const field of priceFields) {
    const index = projection.layerRevisions?.findIndex(({ layerID }) => layerID === layers[field]) ?? -1;
    if (index >= 0) layerIndices.set(index, field);
  }
  if (layerIndices.size !== priceFields.length) return;

  const slots = new Map<number, Partial<Record<PriceField, number>> & { ids: DatumID[] }>();
  for (const batch of projection.batches) {
    const field = layerIndices.get(batch.layerIndex);
    if (!field || batch.type !== "point") continue;
    for (let index = 0; index < batch.positions.length; index += CHART_POINT_STRIDE) {
      const x = batch.positions[index];
      const slot = slots.get(x) ?? { ids: [] };
      slot[field] = batch.positions[index + 1];
      const id = projection.identities[batch.identityIndices[index / CHART_POINT_STRIDE]];
      if (id !== undefined) slot.ids.push(id);
      slots.set(x, slot);
    }
  }

  const marks: CandlestickMark[] = [];
  for (const [x, { open, high, low, close, ids }] of slots) {
    if (open === undefined || high === undefined || low === undefined || close === undefined) continue;
    marks.push({ x, open, high, low, close, ids });
  }
  marks.sort((first, second) => first.x - second.x);
  return { layerIndices, marks };
}
