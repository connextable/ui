export interface CatalogExample {
  id: string;
  title: string;
  description: string;
  section?: string;
  parts?: readonly string[];
}

export interface CatalogExampleSection {
  id: string;
  title: string;
  section?: string;
}

interface CatalogGuide {
  title: string;
  description: string;
  api?: Record<string, string>;
  sections?: readonly CatalogExampleSection[];
  examples?: readonly CatalogExample[];
}

export const catalogGuides: Readonly<Record<string, CatalogGuide>> = {
  chart: {
    title: "선 차트",
    description: "주간 매출처럼 시간에 따라 달라지는 값을 선으로 연결합니다. 날짜와 매출 필드를 각 축에 연결하고 UIChartLine에 데이터를 전달합니다.",
    api: {
      dom: "접근성 이름과 렌더러 등 Sectile의 DOM 설정입니다. 기본 테마를 사용하거나 renderer로 Canvas2D·WebGL2 렌더러를 선택합니다.",
      fill: "area를 지정하면 기본 테마가 선 아래를 채웁니다.",
      "animate-updates": "기본 Canvas 테마에서 마크와 눈금이 빠르게 이동하고 끝에서 부드럽게 감속합니다. 범주형 막대는 항목이 추가되거나 삭제될 때 기준선에서 펼쳐지거나 접힙니다. 모션을 줄이는 시스템 설정을 따릅니다.",
      grid: "기본 Canvas 테마의 보조선 방향입니다. x는 세로, y는 가로, both는 두 방향, none은 숨김, auto는 주 수치축을 따릅니다.",
      "format-tick": "기본 Canvas 테마의 축 눈금 텍스트를 바꿉니다. 빈 문자열은 라벨을 숨기고, undefined는 기본 서식을 사용합니다.",
      tooltip: "기본값은 true이며 가리키거나 포커스한 지점을 표시합니다. shared를 지정하면 같은 축 위치의 계열을 색상칩과 함께 표시합니다. :tooltip=\"false\"로 끌 수 있습니다.",
      "tooltip-group": "공유 툴팁에서 축 값을 같은 그룹 이름으로 묶습니다. 그룹 막대 차트의 월별 비교에 사용합니다.",
      "#tooltip": "id, title, series, x, y, value로 내용을 구성합니다. 공유 툴팁에서는 items에 계열 정보가, 집계 마크에서는 aggregate에 평균 등 집계 정보가 들어 있습니다.",
      candlesticks: "시가·고가·저가·종가를 담은 네 점 계열의 ID를 연결합니다. 각 계열은 같은 X축과 캔들당 하나의 고유한 시점을 사용합니다.",
      "XAxis / YAxis field": "축의 값을 읽을 데이터 키입니다. domain과 ticks로 표시 범위와 눈금 밀도를 조절합니다.",
      UIChartNavigation: "UIChartAxisView로 설정한 축에서 드래그 이동, 휠과 핀치 확대·축소, 키보드 탐색을 연결합니다.",
      "UIChartPlot #controls": "플롯 안쪽에 보조 컨트롤을 배치합니다. 마우스 사용자는 호버할 때, 키보드 사용자는 포커스할 때 접근할 수 있습니다.",
      "UIChartLegend items": "표시할 계열이나 구간의 이름과 값을 전달합니다. 색은 계열 순서를 따르며 colorIndex 또는 color로 지정할 수 있습니다.",
    },
    sections: [
      { id: "chart-types", title: "추이와 변화", section: "trends" },
      { id: "chart-comparison", title: "크기 비교", section: "comparison" },
      { id: "chart-distribution", title: "분포와 밀도", section: "distribution" },
      { id: "chart-composition", title: "구성 비율", section: "composition" },
      { id: "examples", title: "데이터 변경과 실시간 갱신", section: "updates" },
      { id: "chart-navigation", title: "범위 탐색과 대용량 시계열", section: "navigation" },
      { id: "chart-interaction", title: "툴팁과 선택", section: "interaction" },
      { id: "chart-rendering", title: "축과 렌더링", section: "rendering" },
    ],
    examples: [
      { id: "chart-multiple-lines", section: "trends", title: "다중 선 차트", description: "데스크톱과 모바일 방문 추이를 같은 축에서 비교합니다.", parts: ["UIChartLine"] },
      { id: "chart-area", section: "trends", title: "영역형 선 차트", description: "선 아래를 채워 월별 방문 규모와 추이를 함께 보여줍니다." },
      { id: "chart-slope", section: "trends", title: "전후 비교 슬로프 차트", description: "서비스별 개선 전후 응답 시간을 선으로 연결해 변화량과 순위를 비교합니다." },
      { id: "chart-bump", section: "trends", title: "순위 변동 차트", description: "4개 기능의 사용량 순위를 8주 동안 추적합니다. 선이 교차한 주에 순위가 뒤집힙니다." },
      { id: "chart-bar", section: "comparison", title: "세로 막대 차트", description: "팀별 요청 수를 공통 기준선에서 비교합니다.", parts: ["UIChartBar"] },
      { id: "chart-bars", section: "comparison", title: "그룹 막대 차트", description: "월별 묶음을 가리키면 웹·앱·제휴 주문이 색상칩과 함께 한 툴팁에 표시됩니다.", parts: ["UIChartBars", "UIChartLegend"] },
      { id: "chart-horizontal-bar", section: "comparison", title: "가로 막대 차트", description: "팀 이름을 왼쪽에 읽기 쉽게 배치하고 요청이 많은 순으로 비교합니다." },
      { id: "chart-diverging-bar", section: "comparison", title: "증감 막대 차트", description: "서비스별 비용 변화를 0을 기준으로 위아래에 표시합니다." },
      { id: "chart-combination", section: "comparison", title: "막대와 선의 조합", description: "월별 실제 처리 건수는 막대, 목표는 선으로 비교합니다." },
      { id: "chart-pareto", section: "comparison", title: "파레토 차트", description: "장애 원인을 빈도순으로 놓고 누적 비중을 선으로 표시합니다. 상위 원인 몇 개가 전체 장애의 어느 정도를 설명하는지 확인합니다." },
      { id: "chart-histogram", section: "distribution", title: "히스토그램", description: "응답 시간을 10초 단위로 집계하고 각 구간의 빈도를 막대로 표시합니다." },
      { id: "chart-cumulative", section: "distribution", title: "누적 분포 계단 차트", description: "작업 100건 중 각 시간까지 완료된 비중을 계단형 선으로 표시합니다." },
      { id: "chart-scatter", section: "distribution", title: "산점도", description: "대기 시간과 처리량을 개별 점으로 표시해 두 값의 관계를 살펴봅니다.", parts: ["UIChartScatter"] },
      { id: "chart-log-scatter", section: "distribution", title: "로그-로그 산점도", description: "크기가 수천 배 차이 나는 파일의 전송 시간을 두 로그 축으로 비교합니다." },
      { id: "chart-density", section: "distribution", title: "밀도 산점도", description: "같은 관측값을 개별 점과 밀도 원으로 비교합니다. 밀도 원에 마우스를 올리면 그 구역에 모인 관측 수를 확인할 수 있습니다." },
      { id: "chart-heatmap", section: "distribution", title: "히트맵", description: "요일·시간대별 요청이 몰리는 패턴을 표시합니다.", parts: ["UIChartHeatmap", "UIChartScaleLegend"] },
      { id: "chart-aggregate-heatmap", section: "distribution", title: "평균 집계 히트맵", description: "지역·시간대가 같은 응답 시간 네 건을 셀 하나로 집계합니다. 셀의 툴팁에서 표본 수와 평균 응답 시간을 확인할 수 있습니다." },
      { id: "chart-pie", section: "composition", title: "원형 차트", description: "작업 분야별 비중을 원의 각도로 표시합니다.", parts: ["UIChartPie", "UIChartRadial"] },
      { id: "chart-donut", section: "composition", title: "도넛 차트", description: "작업 상태별 비중을 고리로 표현하고 가운데에 완료율을 표시합니다.", parts: ["UIChartDonut", "UIChartCenter"] },
      { id: "chart-live-series", section: "updates", title: "실시간 선과 양쪽 축 갱신", description: "재생하면 최근 40초를 따라 시간축이 이동하고 Y축은 요청 수에 맞춰 바뀝니다. 아래에서 최신 값을 수정했는지 새 관측을 추가했는지 확인할 수 있습니다." },
      { id: "chart-bar-categories", section: "updates", title: "막대 차트의 X축 항목 추가와 삭제", description: "9월을 추가하면 새 막대와 눈금이 나타납니다. 7월을 빼면 막대가 기준선으로 접히고 양쪽 막대가 이동해 빈자리를 채웁니다." },
      { id: "chart-live-bars", section: "updates", title: "실시간 막대 누적", description: "재생하면 집계 중인 시간의 막대가 단계적으로 자랍니다. 다음 시간이 시작되면 새 막대가 들어오고 시간축과 건수 범위가 갱신됩니다." },
      { id: "chart-live-ranking", section: "updates", title: "실시간 가로 막대 순위", description: "재생하면 지역별 동시 접속자가 달라집니다. 가장 긴 막대를 기준으로 X축 범위가 바뀌며 순위가 바뀐 막대가 새 Y축 위치로 이동합니다." },
      { id: "chart-live-scatter", section: "updates", title: "실시간 산점도와 범위 조정", description: "재생하면 조회·저장·검색 표본이 새 위치로 이동합니다. 동시 요청 수와 응답 시간에 맞춰 두 축의 범위가 각각 바뀝니다." },
      { id: "chart-live-heatmap", section: "updates", title: "실시간 히트맵", description: "재생하면 최근 12분의 지역별 재시도 건수가 한 칸씩 이동합니다. 색상 범례는 화면에 보이는 데이터의 최솟값과 최댓값을 표시합니다." },
      { id: "chart-pie-distribution", section: "updates", title: "원형 차트에 새 구간 추가", description: "다음 달로 이동하면 추천 방문이 추가되면서 새 구간이 펼쳐집니다. 4월로 돌아가면 추천 구간이 닫힙니다." },
      { id: "chart-live-donut", section: "updates", title: "실시간 도넛 비중", description: "재생하거나 한 단계씩 진행해 보세요. 600건의 작업이 처리되면서 고리 구간과 중앙 완료율이 바뀝니다." },
      { id: "chart-combination-update", section: "updates", title: "목표선과 주문 실적 갱신", description: "확정 실적을 적용하면 바뀐 달의 막대가 움직입니다. 같은 달의 목표는 그대로 유지되어 달성 여부를 비교할 수 있습니다." },
      { id: "chart-candlestick", section: "updates", title: "실시간 주가 캔들스틱", description: "재생하면 가상 시세에 따라 현재 봉의 종가·고가·저가가 변하고, 약 3초마다 새 일봉이 열립니다. 시간축은 새 봉을 따라가고 가격축은 최근 봉 20개의 고가와 저가에 맞춰 바뀝니다." },
      { id: "chart-zoom", section: "navigation", title: "X·Y축 확대와 드래그 이동", description: "산점도를 드래그해 두 축을 함께 이동하거나, 축 가까이의 버튼으로 한 축씩 조절합니다.", parts: ["UIChartNavigation", "UIChartAxisView", "UIChartViewControls", "UIChartViewToolbar"] },
      { id: "chart-external-controls", section: "navigation", title: "플롯 밖의 확대 버튼", description: "확대 버튼으로 주간 작업량의 범위를 좁힌 뒤 다음 구간으로 이동해 보세요. 차트와 아래의 날짜 범위가 함께 바뀝니다.", parts: ["UIChartExternalViewControls", "UIChartActions"] },
      { id: "chart-large-series", section: "navigation", title: "관측값 10만 개 탐색", description: "드래그로 이동하고 Ctrl + 휠로 시간축을 확대해 보세요. Sectile이 확대 범위에 맞춰 화면에 필요한 대표점을 고릅니다." },
      { id: "chart-windowed-series", section: "navigation", title: "필요한 구간만 불러오는 시간축", description: "차트를 양쪽으로 드래그하면 이동한 날짜의 가상 관측값을 하루 단위로 불러옵니다. 보이는 구간과 앞뒤 하루를 캐시에 두고, Ctrl + 휠로 한 시간에서 일주일까지 확대·축소합니다." },
      { id: "chart-tooltip", section: "interaction", title: "툴팁 이동과 고정", description: "세 막대를 차례로 가리키면 같은 툴팁이 이동하면서 내용에 맞춰 크기가 바뀝니다. 막대를 클릭하면 그 툴팁이 유지됩니다." },
      { id: "chart-selection-summary", section: "interaction", title: "선택한 팀의 처리량 합산", description: "버튼으로 팀을 여러 개 선택하거나 막대를 눌러 한 팀을 선택합니다. 선택한 막대가 강조되고 처리 건수가 합산됩니다.", parts: ["useUIChartSelector"] },
      { id: "chart-provider", section: "interaction", title: "외부 컨트롤과 도넛 차트 연결", description: "차트 밖 버튼과 도넛 구간이 같은 선택 상태를 공유합니다. 가운데에는 선택한 방문 경로의 비중이 표시됩니다.", parts: ["UIChartProvider", "useUIChart", "createUIChartComponents", "useUIChartContext"] },
      { id: "chart-layer-summary", section: "interaction", title: "비교 계열 변경", description: "비교할 주를 바꾸면 점선과 범례가 함께 바뀝니다. 차트 아래에는 비교 계열의 월요일 값이 표시됩니다.", parts: ["useUIChartLayerSelector"] },
      { id: "chart-grid-lines", section: "rendering", title: "눈금과 보조선", description: "세로·가로 보조선을 각각 켜고 끌 수 있습니다. ‘촘촘한 눈금’을 켜면 축의 숫자 사이가 더 잘게 나뉘고 보조선도 같은 위치를 따릅니다.", parts: ["UIChartXAxis", "UIChartYAxis"] },
      { id: "chart-axis-summary", section: "rendering", title: "선형·로그 축 비교", description: "같은 요청 데이터를 선형 축과 로그 축으로 바꿔 보세요. 선과 점이 이동하고 눈금이 바뀝니다. 로그 축에서 10→100과 1,000→10,000은 같은 세로 간격입니다.", parts: ["useUIChartAxisSelector"] },
      { id: "chart-canvas", section: "rendering", title: "Canvas 해상도 비교", description: "렌더 배율에 따른 비트맵 크기와 실제 픽셀의 차이를 살펴봅니다.", parts: ["UIChartCanvas"] },
    ],
  },
};
