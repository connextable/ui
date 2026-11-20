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
    slug: "grid",
    title: "UIGrid",
    category: "표와 그리드",
    description: "행과 열로 구성된 항목 사이를 이동합니다.",
    wide: true,
    parts: [
      "UIGridRow",
      "UIGridCell",
    ],
  },
  {
    slug: "data-table",
    title: "UIDataTable",
    category: "표와 그리드",
    description: "Sectile의 팩토리로 데이터 테이블을 구성합니다.",
    wide: true,
    parts: [
      "useUIDataTable",
      "createUIDataTableComponents",
      "useUIDataTableContext",
    ],
  },
  {
    slug: "data-grid",
    title: "UIDataGrid",
    category: "표와 그리드",
    description: "Sectile의 팩토리로 상호작용 가능한 데이터 그리드를 구성합니다.",
    wide: true,
    parts: [
      "useUIDataGrid",
      "createUIDataGridComponents",
      "useUIDataGridContext",
    ],
  },
  {
    slug: "data-tree-grid",
    title: "UIDataTreeGrid",
    category: "표와 그리드",
    description: "Sectile의 팩토리로 계층형 데이터 그리드를 구성합니다.",
    wide: true,
    parts: [
      "useUIDataTreeGrid",
      "createUIDataTreeGridComponents",
      "useUIDataTreeGridContext",
    ],
  },
  {
    slug: "tree-grid",
    title: "UITreeGrid",
    category: "표와 그리드",
    description: "계층형 행을 펼치고 셀 사이를 이동합니다.",
    wide: true,
    parts: [
      "UITreeGridHeader",
      "UITreeGridHeaderCell",
      "UITreeGridRow",
      "UITreeGridGroup",
      "UITreeGridCell",
      "UITreeGridDisclosure",
      "UITreeGridEditor",
    ],
  },
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
