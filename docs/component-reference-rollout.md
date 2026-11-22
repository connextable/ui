# 카탈로그 참조 문서 개편

| 순서 | 범위 | 완료 기준 | 상태 |
| --- | --- | --- | --- |
| 1 | 업로드 대기열, 입력 상태, 초기 펼침 | 이전 변경의 커밋과 회귀 검사 확인 | 커밋 및 패키지 테스트 확인 |
| 2 | UIDataTreeGrid | 기본 소스, 그룹 펼침, 하위 행 요청, 그룹 선택과 편집의 예제 및 API 설명 검증 | 완료 |
| 3 | 공통 참조 레이아웃 | 컴포넌트를 역할별로 정렬하고 주요 API를 속성, 슬롯, 이벤트, 메서드, 스타일로 분류. 기존 앵커 유지 | 완료 |
| 4 | 페이지별 설명과 예제 | 공통 카탈로그 82개와 개별 페이지 11개에서 주요 API를 찾고, 관련 코드 예제로 이동 | 완료 |
| 5 | 검증 | 전체 경로의 참조 섹션과 앵커 확인, 대표 화면의 키보드·좁은 너비·선택 상태 검증 | 완료 |

기준점 `73cd7b7`에서 공통 카탈로그의 구성 항목은 530건, 주요 API는 379건이다. 구성 항목에는 컴포넌트, 컴포저블, 팩토리가 함께 들어 있다. `UINavigationMenuPopover`에는 구성 항목 설명이 없고, 개별 페이지의 참조 형식과 예제 깊이가 서로 다르다.

## 페이지별 반영 목록

| 분류 | 페이지 | 상태 |
| --- | --- | --- |
| 동작 | UIButton, UIToolbar | 2/2 |
| 입력·폼 | UIInput, UIEditable, UIPinInput, UITagsInput, UINumberField, UISpinButton, UIQuantityField, UISlider, UIMultiThumbSlider, UIFileInput, UIFileUpload, UIForm | 12/12 |
| 선택 | UICheckbox, UICheckboxGroup, UICheckboxTree, UIRadioGroup, UISwitch, UIToggleGroup, UISelect, UICombobox, UIListbox, UITreeSelect, UICascadeSelect, UICascadeList, UITransfer, UIColorPicker, UIRating | 15/15 |
| 날짜·시간 | UICalendar, UIRangeCalendar, UIDateField, UIDateRangeField, UIDatePicker, UIDateRangePicker, UITimeField, UITimeRangeField, UITimePicker, UIDateTimeField, UIDateTimeRangeField, UIDateTimePicker, UIDateTimeRangePicker, UIMonthPicker, UIMonthRangePicker, UIYearPicker, UIYearRangePicker, UITemporalProvider | 18/18 |
| 탐색 | UIAnchor, UITabs, UIPagination, UIStepper, UITreeView, UINavigationMenu, UIMenu, UIMenuButton, UIContextMenu, UIMenubar | 10/10 |
| 오버레이 | UIDialog, UIAlertDialog, UIDrawer, UISheet, UILightbox, UIPopover, UITooltip, UIToast | 8/8 |
| 레이아웃 | UIDashboard, UIWindowSplitter, UIScrollArea, UIDisclosure, UIAccordion, UICarousel, UIFeed, UIImage | 8/8 |
| 상태 표시 | UISpinner, UIProgress, UIMeter, UIMeterGroup, UITimer | 5/5 |
| 표와 그리드 | UIDataTable, UIGrid, UITreeGrid, UIDataGrid, UIDataTreeGrid | 5/5 |
| 데이터 | UIChart, UISequenceReorder, UITreeReorder | 3/3 |
| 가상화 | UIVirtualList, UIVirtualGrid, UIVirtualMasonry, UIVirtualSpatial, UIVirtualizer | 5/5 |
| 기반 | UIPrimitive, UIHostProvider | 2/2 |

## 검증 결과

- 워크스페이스 타입 검사, 플레이그라운드 프로덕션 빌드, UI 패키지 테스트 18개가 통과했다.
- 빌드 결과에서 93개 페이지의 참조 섹션과 설명, 공통 카탈로그 구성 앵커 530개, 예제 링크 822개를 확인했다. UIForm의 기존 필드 앵커도 각각 한 번만 나타난다.
- 브라우저에서 UIDataTreeGrid의 하위 행 요청, 일부 선택·전체 선택·해제, 편집 저장을 확인했다. 480px 화면에서는 참조 행이 한 열로 표시되고 참조 목록이 가로로 넘치지 않았다.
- 원격 그룹 선택 예제는 `loadGroupLeafIDs`로 접힌 하위 행까지 조회한다. 트리 그리드의 공통 컨트롤이 일부 선택·전체 선택·해제를 처리한다.

## 참조 유지보수

- `catalog.ts`는 구성 항목의 공개 이름을, `catalog-parts.ts`는 역할과 사용 설명을 관리한다. 개별 페이지의 직접 작성한 예제와 API는 `standalone-references.ts`에 연결한다.
- `catalog-guides.ts`에서 주요 API의 설명과 필요한 타입·기본값을 추가한다. 동작을 한 번에 확인할 예제가 명확한 경우 `example`으로 직접 연결한다. 공통 페이지에서는 구성 항목과 실제 코드에서 확인한 기본 속성·슬롯·이벤트도 예제에 연결한다.
- `node scripts/check-catalog-references.ts http://127.0.0.1:3099`로 실행 중인 빌드의 전체 참조 섹션, 구성 항목 앵커, 예제 링크를 검사한다.
