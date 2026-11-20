type DashboardPart = Exclude<
  Extract<keyof typeof import("@connextable/ui"), `UIDashboard${string}`>,
  "UIDashboard"
>;

export const dashboardParts = {
  UIDashboardSidebar: "탐색 그룹을 담는 사이드바입니다. 상단과 하단에 별도 콘텐츠를 배치할 수 있습니다.",
  UIDashboardNavGroup: "사이드바의 메뉴 항목을 제목 아래에 묶습니다.",
  UIDashboardNavItem: "메뉴의 링크 하나를 감싸고, 현재 위치와 키보드 포커스를 표시합니다.",
  UIDashboardPanel: "본문을 담는 패널입니다. 헤더, 툴바, 푸터를 각각 넣을 수 있습니다.",
  UIDashboardNavbar: "패널 상단에 화면 제목과 주요 동작을 배치합니다.",
  UIDashboardToolbar: "본문에 적용되는 필터와 상태를 한 영역에 모읍니다.",
} satisfies Record<DashboardPart, string>;
