interface CatalogEntry {
  slug: string;
  title: string;
  category: string;
  description: string;
  wide?: boolean;
  deferPreviews?: boolean;
  parts?: readonly string[];
}

export const catalog: readonly CatalogEntry[] = [
  {
    slug: "chart",
    title: "UIChart",
    category: "데이터",
    description: "추이, 비교, 분포, 비중에 맞는 차트를 구성합니다.",
    wide: true,
    deferPreviews: true,
    parts: [
      "UIChartProvider",
      "UIChartCartesian",
      "UIChartRadial",
      "UIChartXAxis",
      "UIChartYAxis",
      "UIChartLine",
      "UIChartScatter",
      "UIChartBar",
      "UIChartBars",
      "UIChartHeatmap",
      "UIChartPie",
      "UIChartDonut",
      "UIChartCenter",
      "UIChartAxisView",
      "UIChartNavigation",
      "UIChartViewControls",
      "UIChartViewToolbar",
      "UIChartExternalViewControls",
      "UIChartPanControl",
      "UIChartZoomControl",
      "UIChartResetView",
      "UIChartPlot",
      "UIChartActions",
      "UIChartRenderer",
      "UIChartCanvas",
      "UIChartGrid",
      "UIChartGridLines",
      "UIChartLegend",
      "UIChartScaleLegend",
      "UIChartAxisTicks",
      "UIChartTicks",
      "useUIChart",
      "createUIChartComponents",
      "useUIChartContext",
      "useUIChartSelector",
      "useUIChartLayerSelector",
      "useUIChartAxisSelector",
    ],
  },
];

export const catalogBySlug = new Map(catalog.map(entry => [entry.slug, entry]));
