export interface ReferenceExample {
  id: string;
  title: string;
}

export interface ApiNote {
  description: string;
  type?: string;
  default?: string;
  example?: ReferenceExample;
  group?: string;
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
const apiGroups = ["속성과 모델", "데이터 소스와 컨트롤러", "링크", "슬롯", "이벤트와 명령", "메서드", "컴포저블", "팩토리와 유틸리티", "스타일"] as const;
const sectionIDs: Readonly<Record<string, string>> = {
  "완성 컴포넌트": "composed", "구조와 배치": "structure", "팝업과 위치": "popup", "값 입력과 선택": "input",
  "탐색과 동작": "action", "값과 상태 표시": "display", "속성과 모델": "props", "데이터 소스와 컨트롤러": "source",
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

export function stateApiNotes(category: string, slug: string): ApiNotes {
  if (!["입력·폼", "선택", "날짜·시간"].includes(category) || slug === "temporal-provider") return {};
  return {
    readonly: { type: "boolean", description: "사용자 조작으로 값이 변경되지 않습니다. 값 읽기와 키보드 탐색을 지원합니다." },
    disabled: { type: "boolean", description: "입력과 선택을 비활성화합니다. 네이티브 입력은 Tab 순서에서 빠집니다." },
  };
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
