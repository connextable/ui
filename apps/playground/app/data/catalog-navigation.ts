export const catalogNavigation = [
  { title: "동작", slugs: ["button", "toolbar"] },
  { title: "입력·폼", slugs: [
    "input", "editable", "pin-input", "tags-input",
    "number-field", "spin-button", "quantity-field", "slider", "multi-thumb-slider",
    "file-input", "file-upload", "form",
  ] },
  { title: "선택", slugs: [
    "checkbox", "checkbox-group", "checkbox-tree", "radio-group", "switch", "toggle-group",
    "select", "listbox", "combobox", "cascade-list", "cascade-select", "tree-select",
    "transfer", "color-picker", "rating",
  ] },
  { title: "날짜·시간", slugs: [
    "calendar", "date-field", "date-picker", "range-calendar", "date-range-field", "date-range-picker",
    "time-field", "time-picker", "time-range-field",
    "date-time-field", "date-time-picker", "date-time-range-field", "date-time-range-picker",
    "month-picker", "month-range-picker", "year-picker", "year-range-picker", "temporal-provider",
  ] },
  { title: "탐색", slugs: ["anchor", "tabs", "navigation-menu", "pagination", "stepper", "tree-view"] },
  { title: "메뉴", slugs: ["menu-button", "menu", "context-menu", "menubar"] },
  { title: "오버레이", slugs: ["dialog", "alert-dialog", "drawer", "sheet", "popover", "tooltip"] },
  { title: "레이아웃", slugs: ["dashboard", "window-splitter", "scroll-area", "disclosure", "accordion"] },
  { title: "콘텐츠·미디어", slugs: ["image", "carousel", "lightbox", "feed"] },
  { title: "상태 표시", slugs: ["toast", "spinner", "progress", "meter", "meter-group", "timer"] },
  { title: "표와 그리드", slugs: ["data-table", "grid", "data-grid", "tree-grid", "data-tree-grid"] },
  { title: "데이터", slugs: ["chart", "reorder", "tree-reorder"] },
  { title: "가상화", slugs: ["virtual-list", "virtual-grid", "virtual-masonry", "virtual-spatial", "virtualizer"] },
  { title: "기반", slugs: ["primitive", "host-provider"] },
] as const;
