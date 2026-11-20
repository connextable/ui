export const chartSeriesCount = 6;

export function chartSeriesColor(index: number) {
  return `--ui-chart-series-${index % chartSeriesCount + 1}`;
}
