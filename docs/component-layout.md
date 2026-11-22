# 컴포넌트 공통 스타일

- 기본 표면에는 `--ui-color-surface` (`#F9FAFB`)를 사용한다. 호버와 누름에는 `--ui-color-surface-hover`, `--ui-color-surface-active`를 쓴다. 선택값의 배경은 `--ui-color-selected`와 해당 호버·누름 토큰으로 표현한다.
- 프레임은 테두리와 안쪽 여백을 한 곳에서 정의한다. `--ui-inset-distance`는 테두리와 여백의 합이다. 정사각형 액션은 `--ui-inset-size`를 양 축에 쓰고, 모서리 반경은 `--ui-inset-radius`를 사용한다. 이 반경은 프레임 반경에서 `--ui-inset-distance`를 뺀 값이다. 중첩된 프레임과 선택 목록에도 같은 관계를 적용한다.
- 내용이 바뀌는 컨트롤은 부모가 제공하는 너비를 기준으로 배치한다. 편집 전후와 단계 이동 전후에 상자의 치수를 비교한다. 짧은 값, 긴 값, 좁은 화면에서도 확인한다.
- 같은 역할의 인터랙션은 효과, 시간, 이징을 공유한다. Disclosure, Accordion, TreeView, CheckboxTree, TreeSelect의 펼침·접힘에는 같은 높이 전환 스타일과 모션 토큰을 쓴다. 애니메이션 도중 반대 방향으로 조작했을 때 현재 높이에서 이어지는지 확인한다. 닫히는 콘텐츠는 즉시 키보드와 접근성 탐색에서 빠지며, 모션 줄이기 설정에서는 상태를 즉시 반영한다.
- Dialog는 오른쪽 위에 기본 닫기 버튼을 두고 본문을 별도로 스크롤한다. Dialog와 AlertDialog 모두 `#actions`는 오른쪽 아래, `#footer-leading`은 왼쪽 아래에 둔다. AlertDialog의 취소와 확인은 `#actions`에서 함께 제공한다.
- 브라우저에서 프레임과 안쪽 요소의 경계 상자를 비교한다. Slider는 양 끝에서 손잡이의 세 인접 변, TagsInput은 이동·제거 버튼 양쪽, 메뉴는 입력과 패널의 위치 및 패널과 첫 행의 모서리를 확인한다.

입력의 읽기 전용·비활성 규칙과 펼침 초기 상태는 [입력 상태와 화면 전환](./input-states-and-motion.md)을 따른다.

## 값 지우기

`clearable`을 켜면 확정값이 있는 편집 가능한 컨트롤에 X 버튼을 표시한다. `clear-label`로 접근성 이름을 지정할 수 있다. Combobox와 TreeSelect는 선택값과 검색어를 함께 지운다. 버튼을 누르면 컨트롤의 평소 모델 갱신 경로를 거쳐 다음 빈 값으로 돌아간다.

| 빈 값 | 컴포넌트 |
| --- | --- |
| `null` | Select, Combobox, CascadeSelect, CascadeList, NumberField, QuantityField, 날짜·시간 필드와 피커, Calendar, RangeCalendar |
| `[]` | TreeSelect, 다중 Listbox, CheckboxGroup, CheckboxTree, ToggleGroup, TagsInput, FileInput |
| `""` | Input, Editable, PinInput, 단일 Listbox, RadioGroup, Rating |

피커의 X는 여는 버튼 옆에 배치한다. Listbox와 같은 조합형 그룹은 항목과 별도의 버튼을 배치한다. 기본 배치가 없는 사용자 정의 트리거에는 `UIFieldClear`를 조합할 수 있다. Rating의 X를 직접 배치할 때는 `UIRatingClear`를 사용한다. FileInput은 기본으로 제거 버튼을 표시하며 `:clearable="false"`로 숨길 수 있다. 자체 값을 관리하는 구성에는 `UIClearButton`을 사용한다.

Checkbox와 Switch는 컨트롤 자체로 해제한다. Slider, SpinButton, ColorPicker의 모델은 항상 값을 가진다. Transfer의 할당 결과는 목록 간 이동 버튼으로 변경한다.
