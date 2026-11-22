export interface ReferenceExample {
  id: string;
  title: string;
}

export interface ApiNote {
  description: string;
  label?: string;
  type?: string;
  default?: string;
  example?: ReferenceExample;
  group?: string;
  owner?: string;
}

export type ApiNotes = Readonly<Record<string, string | ApiNote>>;

export interface ReferenceRow extends ApiNote {
  name: string;
  anchor?: string;
  route?: string;
}

export interface ReferenceGroup {
  id: string;
  title: string;
  entries: ReferenceRow[];
}

const partGroups = ["완성 컴포넌트", "구조와 배치", "팝업과 위치", "값 입력과 선택", "탐색과 동작", "값과 상태 표시"] as const;
const apiGroups = ["속성과 모델", "입력 상태", "데이터 소스와 컨트롤러", "링크", "슬롯", "이벤트와 명령", "메서드", "컴포저블", "팩토리와 유틸리티", "스타일"] as const;
const sectionIDs: Readonly<Record<string, string>> = {
  "완성 컴포넌트": "composed", "구조와 배치": "structure", "팝업과 위치": "popup", "값 입력과 선택": "input",
  "탐색과 동작": "action", "값과 상태 표시": "display", "속성과 모델": "props", "입력 상태": "input-state", "데이터 소스와 컨트롤러": "source",
  "링크": "links", "슬롯": "slots", "이벤트와 명령": "events", "메서드": "methods", "컴포저블": "composables",
  "팩토리와 유틸리티": "factories", "스타일": "styles",
};

export function helperGroup(name: string) {
  if (/^use[A-Z]/.test(name)) return "컴포저블";
  if (/^(?:create|track)[A-Z]/.test(name)) return "팩토리와 유틸리티";
}

export function componentGroup(name: string) {
  if (/^UI(?:IconButton|ToggleButton|FileUploadQueue|NavigationMenuPopover)$/.test(name)) return partGroups[0];
  if (/(Portal|Overlay|Backdrop|Anchor|Arrow|SubContent|Viewport)$/.test(name)) return partGroups[2];
  if (/(?:SelectionControl|Editor|Input|Select|Slider|Thumb|Cell|Picker|EditTrigger)$/.test(name) && !/(HeaderCell|ColumnHeader)$/.test(name)) return partGroups[3];
  if (/(?:Trigger|Disclosure|Close|Previous\w*|Next\w*|First|Last|Clear|Handle|Move|Link|Pause|Reset|Submit|Delete|Increment|Decrement|LoadEarlier|LoadNewer|Control|Dropzone)$/.test(name)) return partGroups[4];
  if (/(?:Indicator|Value(?:Text)?|Label|Description|Title|Status|Message|Legend|GridLines|Heading|Caption|Thumb|Icon|Preview|Swatch|Range|Track|Segment|Empty|Series|Line|Bar|Bars|Scatter|Pie|Donut|Heatmap|Candlesticks)$/.test(name)) return partGroups[5];
  return partGroups[1];
}

export function orderedReferenceParts(parts: readonly string[]) {
  const order: readonly string[] = [...partGroups, "컴포저블", "팩토리와 유틸리티"];
  return [...parts].sort((a, b) => order.indexOf(helperGroup(a) ?? componentGroup(a)) - order.indexOf(helperGroup(b) ?? componentGroup(b)));
}

export function apiGroup(name: string, description: string) {
  if (name.startsWith("--") || name.startsWith("data-") || name.includes("CSS 변수")) return "스타일";
  if (name.startsWith("@") || /^(?:commit-edit|move-cell|edit-start|request-bulk-selection|set-row-selection|request-window|plan-change)\b/.test(name)) return "이벤트와 명령";
  if (name.includes("#")) return "슬롯";
  if (/^(?:to|href|external|rel|target|download|prefetch(?:-on)?)(?:\b|\s)/.test(name)) return "링크";
  if (name.startsWith("useUI")) return "컴포저블";
  if (name.startsWith("createUI")) return "팩토리와 유틸리티";
  if (/^(?:(?:source|defaultAccessState|defaultExpansion|rowSelection|expansion|isCellDisabled)\b|controller\.)/.test(name)) return "데이터 소스와 컨트롤러";
  if (name.includes("(") || /^scroll(?:To|By)/.test(name)) return "메서드";
  if (description.endsWith("이벤트입니다.")) return "이벤트와 명령";
  return "속성과 모델";
}

const inputStatePages = new Set([
  "input", "editable", "pin-input", "tags-input", "number-field", "spin-button", "quantity-field",
  "slider", "multi-thumb-slider", "file-input", "file-upload",
  "checkbox", "checkbox-group", "checkbox-tree", "radio-group", "switch", "toggle-group",
  "select", "combobox", "listbox", "tree-select", "cascade-select", "cascade-list", "transfer", "color-picker", "rating",
  "calendar", "range-calendar", "date-field", "date-range-field", "date-picker", "date-range-picker",
  "time-field", "time-range-field", "time-picker", "date-time-field", "date-time-range-field", "date-time-picker",
  "date-time-range-picker", "month-picker", "month-range-picker", "year-picker", "year-range-picker",
]);

export function stateApiNotes(slug: string): ApiNotes {
  if (!inputStatePages.has(slug)) return {};
  return {
    readonly: { group: "입력 상태", type: "boolean", description: "값을 유지하고 사용자 조작으로 변경되는 것을 막습니다. 읽기와 탐색은 계속 지원합니다." },
    disabled: { group: "입력 상태", type: "boolean", description: "입력과 선택을 비활성화합니다. 네이티브 입력은 Tab 순서에서 빠집니다." },
  };
}

export function referenceBlocks(entries: readonly ReferenceRow[], kind: "parts" | "api", component: string) {
  if (kind === "parts" || !entries.some(entry => entry.owner)) {
    return [{ id: "", owner: undefined, groups: groupReferences(entries, kind) }];
  }

  const byOwner = new Map<string, ReferenceRow[]>([[component, []]]);
  for (const entry of entries) {
    const owner = entry.owner ?? component;
    const rows = byOwner.get(owner);
    if (rows) rows.push(entry);
    else byOwner.set(owner, [entry]);
  }
  const usedGroups = new Set<string>();
  return [...byOwner].filter(([, rows]) => rows.length).map(([owner, rows]) => {
    const id = owner.replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/\s+/g, "-").toLowerCase();
    const groups = groupReferences(rows, kind).map(group => {
      const groupId = usedGroups.has(group.id) ? `${id}-${group.id}` : group.id;
      usedGroups.add(group.id);
      return { ...group, id: groupId };
    });
    return { id, owner, groups };
  });
}

export function groupReferences(entries: readonly ReferenceRow[], kind: "parts" | "api"): ReferenceGroup[] {
  const order: readonly string[] = kind === "parts" ? partGroups : apiGroups;
  const groups = new Map<string, ReferenceRow[]>();
  for (const entry of entries) {
    const group = entry.group ?? (kind === "parts" ? componentGroup(entry.name) : apiGroup(entry.name, entry.description));
    const rows = groups.get(group);
    if (rows) rows.push(entry);
    else groups.set(group, [entry]);
  }
  return [...groups].sort(([a], [b]) => order.indexOf(a) - order.indexOf(b)).map(([title, entries]) => ({ id: sectionIDs[title] ?? title, title, entries }));
}
