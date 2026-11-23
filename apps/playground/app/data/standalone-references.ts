import { describeCatalogPart } from "./catalog-parts";
import { stateApiNotes, type ApiNote, type ApiNotes, type ReferenceExample, type ReferenceRow } from "./catalog-reference";
import { dashboardParts } from "./dashboard-parts";
import { disclosureParts } from "./disclosure-parts";
import { selectParts } from "./select-parts";

function example(id: string, title: string): ReferenceExample {
  return { id, title };
}

function note(description: string, usage: ReferenceExample, type?: string, initial?: string): ApiNote {
  return { description, example: usage, type, default: initial };
}

const buttonLink = example("button-link", "링크 버튼");
const buttonForm = example("form", "폼 버튼");
const checkbox = example("usage", "체크박스 기본 사용법");
const dashboard = example("dashboard-example", "사이드바와 본문");
const disclosure = example("disclosure-example", "펼치기와 접기");
const form = example("UIFormField", "필드와 라벨");
const input = example("usage", "입력 기본 사용법");
const progress = example("usage", "진행률 기본 사용법");
const radio = example("usage", "라디오 그룹 기본 사용법");
const select = example("select-example", "항목 선택과 해제");
const switchExample = example("usage", "스위치 기본 사용법");

export const standaloneApi: Readonly<Record<string, ApiNotes>> = {
  button: {
    variant: note("solid는 주요 동작, soft는 보조 강조, outline은 경계선, ghost는 투명 배경을 표시합니다.", example("button-variant", "버튼 스타일"), "'solid' | 'soft' | 'outline' | 'ghost'", "solid"),
    size: note("버튼 높이, 글자 크기, 안쪽 여백을 함께 바꿉니다.", example("button-size", "버튼 크기"), "'sm' | 'md' | 'lg'", "md"),
    block: note("텍스트 버튼과 링크 버튼이 부모 너비를 채웁니다. 아이콘 전용 버튼은 원형 크기를 유지합니다.", example("button-full-width", "전체 너비"), "boolean", "false"),
    disabled: note("버튼 실행과 Tab 진입을 막습니다.", example("button-disabled", "비활성 버튼"), "boolean", "false"),
    loading: note("버튼 너비를 유지하면서 가운데 진행 표시를 띄우고 실행을 막습니다.", example("button-loading", "로딩 상태"), "boolean", "false"),
    type: note("submit은 폼을 제출하고 reset은 초기화합니다.", buttonForm, "'button' | 'submit' | 'reset'", "button"),
    form: note("폼 밖의 버튼을 폼 요소의 id와 연결합니다.", buttonForm, "string"),
    "icon-only": note("아이콘 전용 원형 버튼을 만듭니다. UIIconButton에서도 같은 모양을 사용할 수 있습니다.", example("UIIconButton", "아이콘 버튼"), "boolean", "false"),
    "icon / trailing-icon": note("텍스트 앞과 뒤에 배치할 Vue 아이콘 컴포넌트를 전달합니다. 각 위치의 슬롯으로 표시 내용을 직접 구성할 수 있습니다.", example("button-leading-icon", "앞·뒤 아이콘"), "Component"),
    to: note("Nuxt 내부 경로 문자열이나 라우트 객체를 전달합니다. href보다 우선합니다.", buttonLink, "RouteLocationRaw"),
    href: note("일반 URL이나 파일 경로로 이동합니다. Nuxt 모듈 없이도 문자열 링크로 동작합니다.", buttonLink, "string"),
    "target / rel": note("_blank로 새 탭에서 열고 rel로 noopener 등의 링크 관계를 지정합니다.", buttonLink),
    "external / download": note("external은 NuxtLink에서 외부 이동을 강제합니다. download에는 파일명이나 boolean을 전달합니다.", buttonLink),
    "prefetch / no-prefetch": note("개별 링크의 프리패치를 제어합니다. 두 속성을 생략하면 Nuxt 설정을 따릅니다.", buttonLink),
    "prefetch-on": note("visibility, interaction 또는 트리거별 사용 여부를 지정합니다.", buttonLink),
    "#default": note("텍스트 라벨을 넣습니다.", example("button-example", "버튼 기본 사용법")),
    "#leading / #trailing": note("라벨 앞이나 뒤에 아이콘을 배치합니다.", example("button-leading-icon", "아이콘 위치")),
    "#loading": note("로딩 중 가운데 표시할 진행 표시를 직접 지정합니다.", example("UIIconButton", "아이콘 버튼 로딩")),
    "@click": note("실행 가능한 버튼을 누르면 MouseEvent를 받습니다.", example("button-example", "버튼 기본 사용법")),
    "IconButton icon": { ...note("버튼에 표시할 아이콘을 전달합니다. aria-label을 사용해 동작 이름을 붙입니다.", example("UIIconButton", "아이콘 버튼"), "Component"), owner: "UIIconButton", label: "icon" },
    "ToggleButton icon": { ...note("토글의 텍스트 옆에 아이콘을 표시합니다.", example("button-toggle-icon", "토글 버튼에 아이콘 표시"), "Component"), owner: "UIToggleButton", label: "icon / trailing-icon" },
    "ToggleButton readonly": { owner: "UIToggleButton", label: "readonly", group: "입력 상태", type: "boolean", description: "눌림 상태를 표시하고 사용자가 전환하는 동작을 막습니다.", example: example("UIToggleButton", "토글 버튼") },
    "ToggleButton disabled": { owner: "UIToggleButton", label: "disabled", group: "입력 상태", type: "boolean", description: "토글과 키보드 포커스를 비활성화합니다.", example: example("UIToggleButton", "토글 버튼") },
  },
  checkbox: {
    "v-model": note("선택은 true, 해제는 false, 일부 선택은 indeterminate로 표현합니다.", example("checkbox-select-all", "전체 선택"), "boolean | 'indeterminate'"),
    "label / description": note("label로 입력 이름을 지정하고 description으로 선택 조건을 보충합니다.", checkbox),
    icon: note("체크 표시와 라벨 사이에 아이콘을 표시합니다.", example("checkbox-icon", "체크박스 라벨 아이콘"), "Component"),
    readonly: note("포커스를 유지하며 클릭과 Space를 통한 값 변경을 막습니다.", example("checkbox-readonly", "읽기 전용"), "boolean", "false"),
    disabled: note("체크 동작과 Tab 진입을 막습니다.", example("checkbox-disabled", "비활성"), "boolean", "false"),
    "#indicator": note("선택되거나 일부 선택됐을 때 기본 체크 표시를 교체합니다.", example("UICheckboxIndicator", "체크 표시")),
    "name / value": note("폼 제출에 사용할 필드명과 선택값을 지정합니다.", example("checkbox-form", "폼 제출")),
  },
  dashboard: {
    "#sidebar": note("화면 탐색을 담당하는 UIDashboardSidebar를 배치합니다.", dashboard),
    "#default": note("UIDashboardPanel을 배치해 주요 화면을 구성합니다.", dashboard),
    "#aside": note("목록과 나란히 선택된 항목의 상세 정보를 표시합니다.", example("dashboard-aside", "목록과 상세 패널")),
    "Panel #header / #toolbar / #footer": { ...note("상단 제목, 본문 조작, 하단 동작을 패널 내부의 독립된 영역에 넣습니다.", example("dashboard-panel-slots", "패널의 헤더와 툴바")), owner: "UIDashboardPanel", label: "#header / #toolbar / #footer" },
  },
  disclosure: {
    "v-model": { type: "boolean", description: "true일 때 내용을 표시합니다. 열림 상태를 다른 동작과 공유할 수 있습니다." },
    disabled: note("트리거로 내용을 펼치거나 접는 동작을 막습니다.", example("disclosure-disabled", "비활성 트리거"), "boolean", "false"),
    "Trigger icon": { ...note("트리거의 라벨 앞에 아이콘을 표시합니다.", example("UIDisclosureTrigger", "트리거 구성"), "Component"), owner: "UIDisclosureTrigger", label: "icon" },
    "Content divided": { ...note("본문 윗부분에 경계선을 표시합니다.", example("UIDisclosureContent", "본문 구성"), "boolean", "false"), owner: "UIDisclosureContent", label: "divided" },
    "#default": note("UIDisclosureTrigger와 UIDisclosureContent를 연결합니다.", disclosure),
  },
  form: {
    "@submit": note("UIFormSubmitEvent의 values에서 필드 이름으로 제출값을 읽습니다. 중첩 경로는 객체와 배열로 조립되며, schema가 있으면 검증·변환된 값이 전달됩니다.", example("form-submit", "기본 제출"), "UIFormSubmitEvent"),
    schema: note("필드 값을 검증하고 지원하는 스키마 변환을 제출 데이터에 적용합니다.", example("form-schema", "스키마 검사와 제출")),
    "Field name": { ...note("제출 객체에서 사용할 필드 키입니다. 같은 필드 안에 라벨과 입력을 배치합니다.", form, "string"), owner: "UIFormField", label: "name" },
    "Field required": { ...note("라벨에 필수 표시를 추가합니다. PIN은 모든 자리, 다중 선택은 한 개 이상의 값이 필요합니다.", example("composite-fields", "복합 입력 검증과 제출"), "boolean"), owner: "UIFormField", label: "required" },
    "Field form": { owner: "UIFormField", label: "form", type: "string", description: "입력을 연결할 폼의 id입니다." },
    "Field readonly": { owner: "UIFormField", label: "readonly", type: "boolean", description: "지정하면 하위 입력이 읽기 전용 상태를 상속합니다. UIFormFieldGroup에도 적용할 수 있습니다." },
    "Field disabled": { owner: "UIFormField", label: "disabled", type: "boolean", description: "하위 입력을 비활성화합니다. UIFormFieldGroup에도 적용할 수 있습니다." },
    "Field Group v-model": { ...note("서로 관련된 입력의 값을 하나의 객체로 관리합니다. 기본 슬롯의 field(key)로 이름과 모델 바인딩을 함께 연결할 수 있습니다.", example("UIFormFieldGroup", "객체 값으로 필드 그룹 연결")), owner: "UIFormFieldGroup", label: "v-model" },
    "Control get-value / reset": { ...note("get-value로 현재 입력 모델을 읽고 reset에서 처음 값으로 되돌립니다. 기본 슬롯에는 부모 필드에서 상속한 입력 상태를 전달합니다.", example("UIFormControl", "직접 만든 입력을 폼에 연결")), owner: "UIFormControl", label: "get-value / reset" },
    useUIFormControl: { group: "컴포저블", description: "복합 위젯의 제어 요소, 포커스 대상, 제출 요소를 UIFormField에 등록합니다. 결과의 controlProps와 flags를 해당 요소에 연결합니다." },
    useUINativeFormControl: { group: "컴포저블", description: "스크립트에서 직접 관리하는 input 또는 textarea를 등록합니다. controlProps를 입력에 적용하고 reset을 연결할 수 있습니다." },
    "#default": note("필드, 오류 요약, 제출·초기화 버튼을 한 폼으로 조합합니다.", example("UIFormActions", "폼 동작")),
    "#output": note("제출 결과를 폼 하단에 표시합니다.", example("UIFormActions", "폼 동작")),
  },
  input: {
    variant: note("outline은 테두리를 표시하고 soft는 배경으로 입력 영역을 구분합니다.", example("input-example", "텍스트 입력"), "'outline' | 'soft'", "outline"),
    size: note("글자 크기와 입력 영역의 최소 높이를 조절합니다.", example("input-example", "텍스트 입력"), "'sm' | 'md' | 'lg'", "md"),
    "v-model": note("입력 중 텍스트와 바깥 모델을 연결합니다.", input),
    placeholder: note("빈 입력창에 입력할 내용이나 형식의 예를 표시합니다.", example("input-leading", "주소의 고정 접두사와 접미사"), "string"),
    icon: note("입력 앞에 아이콘을 표시합니다. 사용자 정의 내용은 leading 슬롯에 넣습니다.", example("input-long", "좁은 검색창에서 아이콘 표시"), "Component"),
    multiline: note("여러 줄 입력으로 표시합니다.", example("input-multiline", "여러 줄 입력"), "boolean", "false"),
    rows: note("여러 줄 입력의 초기 표시 줄 수입니다.", example("input-multiline", "여러 줄 입력"), "number"),
    clearable: note("편집할 수 있는 값이 있을 때 지우기 버튼을 표시합니다.", example("input-long", "좁은 입력과 지우기"), "boolean", "false"),
    readonly: note("값을 읽거나 복사할 수 있고 입력은 잠깁니다.", example("input-readonly", "읽기 전용"), "boolean", "false"),
    disabled: note("입력과 키보드 포커스를 비활성화합니다.", example("input-states", "입력 상태"), "boolean", "false"),
    "#leading": note("입력 앞에 아이콘 또는 접두사를 배치합니다.", example("input-leading", "주소의 고정 접두사와 접미사")),
    "#trailing": note("입력 뒤에 접미사나 보조 콘텐츠를 배치합니다.", example("input-leading", "주소의 고정 접두사와 접미사")),
  },
  progress: {
    value: note("현재 진행량을 숫자로 전달합니다. null이면 완료 비율이 정해지지 않은 상태를 표시합니다.", example("progress-indeterminate", "미확정 진행률"), "number | null"),
    max: note("value가 도달할 완료 값을 지정합니다.", example("progress-max", "완료 기준값"), "number"),
    label: note("어떤 작업의 진행 상태인지 보조 기술에 알립니다.", progress, "string"),
    "#default": note("트랙, 진행 표시, 현재 값 텍스트를 직접 배치합니다.", example("progress-value", "값 표시")),
  },
  "radio-group": {
    options: note("각 선택지의 value와 label을 전달합니다. description, icon과 disabled는 선택 사항입니다.", example("radio-example", "한 항목 선택"), "readonly UIRadioGroupOption[]"),
    "options[].icon": note("각 선택지의 라벨 앞에 표시할 Vue 아이콘 컴포넌트입니다.", example("radio-icons", "라디오 옵션 아이콘"), "Component"),
    "v-model": note("선택된 항목의 value를 읽고 변경합니다.", radio, "string"),
    orientation: note("항목의 배치 방향과 그룹 내부의 방향키 탐색을 지정합니다.", example("radio-horizontal", "가로 배치")),
    readonly: note("선택값을 유지하며 읽고 탐색할 수 있습니다.", example("radio-readonly", "읽기 전용"), "boolean", "false"),
    disabled: note("그룹의 모든 선택지를 비활성화합니다.", example("radio-example", "한 항목 선택"), "boolean", "false"),
    name: note("폼으로 보낼 선택값의 필드 이름입니다.", example("radio-form", "폼에 연결"), "string"),
  },
  select: {
    options: note("value와 label로 선택지를 구성합니다. disabled로 지정한 항목은 선택할 수 없습니다.", select, "readonly UISelectOption[]"),
    "options[].icon": note("목록 항목과 선택값의 이름 앞에 표시할 Vue 아이콘 컴포넌트입니다.", example("select-icons", "선택지와 선택값의 아이콘"), "Component"),
    "Item icon": { ...note("UISelectItem을 직접 조합할 때 항목 이름 앞에 표시할 아이콘을 지정합니다. leading 슬롯으로 바꿀 수 있습니다.", example("select-icons", "선택지와 선택값의 아이콘"), "Component"), owner: "UISelectItem", label: "icon" },
    "v-model": note("현재 value를 받습니다. 지우면 null로 돌아갑니다.", select, "string | null"),
    placeholder: note("아직 항목을 선택하지 않았을 때 표시할 문구입니다.", select, "string", "선택"),
    "v-model:open": { type: "boolean", description: "선택 목록의 열림 상태를 연결합니다." },
    clearable: note("값이 있는 편집 가능한 Select에 지우기 버튼을 표시합니다.", select, "boolean", "false"),
    readonly: note("현재 선택을 확인할 수 있고 팝업은 닫힌 상태를 유지합니다.", example("select-readonly", "읽기 전용 선택값"), "boolean", "false"),
    disabled: note("트리거를 비활성화합니다. 선택지가 빈 배열인 경우에도 비활성화됩니다.", select, "boolean", "false"),
    "#default": note("트리거, 값, 내용, 항목, 포털을 직접 조합할 때 사용합니다.", example("UISelectPortal", "포털에 선택 목록 배치")),
  },
  spinner: {
    variant: note("spoke, wave, arc 중 표시 형태를 고릅니다.", example("spinner-wave", "파형 스피너"), "'spoke' | 'wave' | 'arc'", "spoke"),
    label: note("작업 설명을 지정하면 상태로 노출됩니다. 텍스트 옆 장식으로 사용하는 경우 생략할 수 있습니다.", example("spinner-status", "접근성 상태 이름"), "string"),
  },
  switch: {
    "v-model": note("켜짐과 꺼짐을 true와 false로 연결합니다.", switchExample, "boolean"),
    "default-value": note("v-model을 생략한 스위치의 최초 켜짐 상태입니다.", example("switch-default", "초기 상태"), "boolean", "false"),
    readonly: note("현재 상태를 읽을 수 있고 클릭과 Space로 전환되지 않습니다.", example("switch-readonly", "읽기 전용"), "boolean", "false"),
    disabled: note("조작과 Tab 포커스를 비활성화합니다.", example("switch-disabled", "비활성"), "boolean", "false"),
    size: note("트랙과 손잡이 크기를 함께 변경합니다.", example("switch-size", "스위치 크기"), "'sm' | 'md' | 'lg'", "md"),
    variant: note("outline은 테두리와 손잡이 색으로 상태를 구분합니다. card는 라벨과 설명까지 하나의 카드로 묶습니다.", switchExample, "'plain' | 'outline' | 'card'", "plain"),
    icon: note("스위치 라벨 앞에 아이콘을 표시합니다.", example("switch-icon", "스위치 라벨 아이콘"), "Component"),
  },
};

const partDescriptions: Readonly<Record<string, string>> = {
  ...dashboardParts, ...disclosureParts, ...selectParts,
  UIIconButton: "텍스트가 없는 원형 버튼입니다. 아이콘과 접근성 이름을 지정하고 loading으로 진행 상태를 표시합니다.",
  UIToggleButton: "v-model로 눌림과 해제를 연결하고 aria-pressed 상태를 함께 표시하는 버튼입니다.",
  UIFormField: "입력을 필드 이름, 라벨, 도움말, 검증 상태에 연결합니다.",
  UIFormLabel: "필드 이름을 입력의 접근성 이름으로 연결합니다. UIFormField의 label을 쓰면 기본 라벨이 생성됩니다.",
  UIFormDescription: "입력 조건이나 예시를 연결합니다. UIFormField의 description을 쓰면 기본 도움말이 생성됩니다.",
  UIFormMessage: "필드의 검증 메시지를 표시합니다. UIFormField는 기본 오류 메시지를 렌더링합니다.",
  UIFormFieldGroup: "관련 입력을 하나의 필드셋으로 묶고 모델 객체의 각 키를 개별 입력에 연결합니다.",
  UIFormActions: "제출과 초기화 등 폼 전체에 적용하는 동작을 한 줄에 배치합니다.",
  UIFormSubmit: "폼을 제출합니다. 제출을 처리하는 동안 진행 표시를 제공하고 중복 제출을 막습니다.",
  UIFormReset: "입력값과 검증 상태를 폼의 초기 상태로 되돌립니다.",
  UIFormSummary: "폼 전체의 검증 오류나 서버에서 받은 제출 실패를 요약합니다.",
  UIFormSelector: "폼 전체에서 선택한 상태를 구독합니다. 수정된 필드가 있는지 표시할 때 사용할 수 있습니다.",
  UIFormFieldSelector: "지정한 이름의 필드에서 필요한 상태만 구독합니다. 필드 방문 상태 등을 표시할 때 사용할 수 있습니다.",
  UIFormControl: "별도 래퍼 없이 input 또는 textarea에 필드 이름, 라벨 연결, 입력 상태를 적용합니다.",
};

const formPartExamples: Readonly<Record<string, ReferenceExample>> = {
  UIFormLabel: form,
  UIFormDescription: form,
  UIFormMessage: example("required-field", "필수 입력 오류"),
};

export function standaloneReference(slug: string, names: readonly string[]) {
  const notes = standaloneApi[slug];
  if (!notes) return;
  const anchorsInReference = ["input", "progress", "radio-group"].includes(slug);
  const parts = names.map((name): ReferenceRow => {
    const description = partDescriptions[name] ?? describeCatalogPart(name);
    if (!description) throw new Error(`Missing reference description for ${slug} / ${name}`);
    return {
      name,
      description,
      anchor: anchorsInReference || formPartExamples[name] ? name : undefined,
      example: formPartExamples[name] ?? (anchorsInReference
        ? slug === "input" ? example("input-long", "좁은 입력과 지우기") : slug === "progress" ? example("progress-value", "값 표시") : radio
        : slug === "dashboard" ? dashboard : example(name, name)),
    };
  });
  const stateNotes = stateApiNotes(slug);
  const apiNotes = { ...notes };
  for (const [name, value] of Object.entries(stateNotes)) apiNotes[name] ??= value;
  const api = Object.entries(apiNotes)
    .map(([name, value]): ReferenceRow => {
      const stateNote = stateNotes[name];
      return { name, ...(typeof stateNote === "object" ? stateNote : {}), ...(typeof value === "string" ? { description: value } : value) };
    });
  const headingAnchors: Record<string, string> | undefined = slug === "button"
    ? { props: "button-props", links: "button-link-props", slots: "button-slots-events" }
    : slug === "form" ? { display: "form-field-parts" } : undefined;
  return { parts, api, headingAnchors };
}
