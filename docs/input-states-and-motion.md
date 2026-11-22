# 입력 상태와 화면 전환

1. 파일 대기열에 기본 목록, 진행률, 실행·취소·재시도·초기화를 제공한다. 대기열을 교체하거나 순서를 바꾸면 각 항목의 식별자로 상태를 유지한다.
2. 입력·선택·날짜 및 시간 컴포넌트의 읽기 전용과 비활성화 상태를 확인하고, 기존 Sectile 상태 속성에 공통 스타일을 연결한다. 단일 체크박스, 그룹, 트리는 같은 체크 표시와 상태 색을 사용한다.
3. 처음부터 열린 펼침 영역은 첫 화면에 완전히 열린 높이로 표시한다. 렌더링 이후 닫고 열 때는 공통 전환을 사용한다. `prefers-reduced-motion`에서는 즉시 전환한다.

## 입력 상태 규칙

- 읽기 전용 입력은 값 변경을 막고 키보드 포커스와 값 탐색을 지원한다. 텍스트 입력은 네이티브 `readonly`를, 지원하는 사용자 정의 위젯 역할은 `aria-readonly`를 사용한다. 기본 커서와 공통 읽기 전용 표면을 사용하고 선택 표시를 유지한다. [WAI-ARIA 1.2](https://www.w3.org/TR/wai-aria-1.2/#aria-readonly)
- 비활성 입력은 조작이 중지되며 일반 Tab 순서에서 제외한다. 사용자 정의 위젯은 각 패턴의 포커스 규칙을 따르고 상태를 전달한다. 비활성 색과 `not-allowed` 커서를 사용한다. [HTML Standard](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#enabling-and-disabling-form-controls), [WAI-ARIA APG](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_disabled_controls)
- 두 상태가 함께 지정되면 비활성화가 우선한다. 펼치기처럼 값을 변경하지 않는 트리·달력 탐색은 읽기 전용에도 지원한다.

`control-attrs.ts`는 새 입력에서 폼의 상태를 상속하고 변경 가능 여부와 `data-ui-input-state`를 함께 제공한다. `input-state.css`는 네이티브 입력 속성과 Sectile의 상태 속성을 동일한 표면·텍스트·커서 토큰에 연결한다. 선택값은 상태 표면과 별도로 체크 표시나 선택 강조로 유지한다.

| 확인 범위 | 상태 적용부 |
| --- | --- |
| Input, Editable, PIN, Tags, Number, Quantity, SpinButton, GridEditor | 입력값, 내부 액션, 지우기 버튼 |
| Checkbox, CheckboxGroup, CheckboxTree, RadioGroup, Switch, ToggleButton, ToggleGroup | 체크·선택 표시와 값 변경 |
| Select, Combobox, TreeSelect, Listbox, CascadeSelect, CascadeList, Transfer | 검색 입력, 선택값, 목록의 조작 상태 |
| Slider, MultiThumbSlider, Rating, ColorPicker | 손잡이, 단계, 색상 값과 상태 표면 |
| Calendar, RangeCalendar, 날짜·시간·월·연도의 입력과 피커 | 입력, 날짜 선택, 달력 탐색 |
| FileInput, FileUpload, FileUploadQueue | 파일 선택, 전송 시작, 취소와 재시도 |

`appearance-motion.ts`는 첫 렌더링이 표시된 뒤 펼침 전환을 활성화한다. 기본 펼침 영역은 닫힌 동안에도 높이 0을 유지하고 키보드와 접근성 탐색에서 빠진다. 따라서 외부 목록이 처음 나타날 때 이미 열려 있는 그룹은 처음부터 실제 높이로 표시된다.

## 확인 항목

- 대기열 동시 실행과 진행률, 대기 중인 전송 취소, 실패한 파일 재시도, 완료 후 초기화를 확인한다.
- 대표 네이티브 및 사용자 정의 입력을 렌더링해 상태 속성, 포커스, 클릭·키 입력 때의 값, 배경과 커서를 확인한다.
- 코드 블록, Disclosure, Accordion, CheckboxTree, TreeView, TreeSelect의 초기 열린 상태와 이후 토글을 확인한다.

## 입력 상태 점검 결과

- 공개 값 입력·선택 컴포넌트 46개를 기본·읽기 전용·비활성 상태로 서버 렌더링해 실제 입력 요소와 위젯에 상태가 전달되는지 확인했다.
- PIN은 공통 상태 해석을 사용한다. 두 상태를 함께 켜면 비활성이 우선한다. 브라우저에서 읽기 전용 전환 후 포커스와 기존 값을 유지하고, 키 입력과 지우기를 막으며, 비활성 전환 후 Tab 순서에서 빠지는 것을 확인했다.
- 기본 Editable 미리보기 버튼은 `disabled`를 네이티브 버튼에 전달한다. 셀 편집기 `UIGridEditor`는 네이티브 `readonly`와 `disabled`를 지원한다. 브라우저에서 일반 셀 편집과 저장을 확인했다.
- PIN, 라디오 그룹, 토글 버튼의 기본 예제에서 두 상태를 바꾸고, 복사할 코드에서 해당 속성을 확인할 수 있다. 폼 필드의 상태 상속과 PIN·Editable·셀 편집기의 상태를 회귀 테스트에 포함했다.
