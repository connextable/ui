# 카탈로그 문서 개편

## 사이드바와 페이지 순서

| 점검 범위 | 반영 내용 |
| --- | --- |
| 사이드바 | 93개 경로를 `catalog-navigation.ts`의 14개 분류에 한 번씩 등록했다. 탐색과 메뉴를 분리하고, 이미지·캐러셀·라이트박스·피드는 콘텐츠·미디어에, 토스트는 상태 표시에 배치했다. |
| 메뉴 조작과 검색 | 컴포넌트 이름을 누르면 페이지로 이동하고 화살표를 누르면 구성 항목을 펼친다. 검색은 컴포넌트, 구성 항목, 분류와 설명을 확인한다. 하위 항목만 일치하면 결과를 자동으로 펼친다. |
| 페이지 본문 | 기본 사용법과 인터랙션 스타일 다음에 설정과 동작, 실전 예제, 조합과 확장을 배치한다. 공통 페이지 82개와 개별 페이지 11개를 확인했다. 해당 내용이 있는 단계만 표시한다. |
| 구성과 API | 구성 항목을 역할별로 묶고, 한 페이지에서 여러 컴포넌트를 설명할 때는 API를 소속별로 표시한다. 공통 분류에서 모델을 먼저 읽고 입력 상태, 슬롯, 이벤트 등을 찾아볼 수 있다. |
| 페이지 목차 | 좁은 화면에서는 본문 앞에서 접고 펼친다. 넓은 화면에서는 긴 제목을 줄바꿈하고 목차를 독립적으로 스크롤한다. |

새 페이지의 경로는 `catalog-navigation.ts`에 등록하고, 상세 예제는 `catalog-guides.ts`에서 설정, 실전 예제, 조합 중 성격에 맞는 단계에 배치한다. `scripts/check-catalog-references.ts`는 전체 경로, 사이드바 순서, 예제 파일 등록과 제목 계층, 처음부터 펼쳐진 Vue 코드, 참조 앵커, 예제 링크를 검사한다.

### 최종 검증

- 타입 검사, 플레이그라운드 프로덕션 빌드, UI 패키지 테스트 34개가 통과했다.
- 프로덕션 빌드에서 전체 93개 페이지의 첫 코드 블록, 상세 예제 433건, 사이드바 구성 링크 567건, 참조에서 예제로 이동하는 링크 838건을 확인했다. 개편 전 제목 링크 1,529건의 주소도 모두 확인했다.
- 브라우저에서 메뉴 이동과 펼치기, 이름·분류·구성 항목 검색, 지우기 후 포커스, 시트와 폼의 본문 순서를 확인했다. 1,440px 화면에서 차트 목차의 마지막 항목까지 이동했고, 480px 화면에서 목차가 접힌 상태로 시작하고 링크로 본문에 이동하는 것을 확인했다.

## Sectile 0.22.0에서 별도로 확인한 문제

- 트리 선택에서 선택한 항목의 이름이 검색 입력에 표시되지 않는다. [Sectile #243](https://github.com/sectile/sectile/issues/243)
- 일시 피커의 분 단위 입력값이 밀리초까지 표시된다. 시간과 일시를 표시하고 편집하는 정밀도를 공개 API로 지정할 수 있어야 한다. [Sectile #244](https://github.com/sectile/sectile/issues/244)
- 원격 그룹의 일부 또는 모든 하위 행을 선택해도 그룹 체크박스가 미선택 상태로 표시된다. [Sectile #245](https://github.com/sectile/sectile/issues/245)

## 이전 참조 문서 개편 기록

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

- 워크스페이스 타입 검사, 플레이그라운드 프로덕션 빌드, UI 패키지 테스트 21개가 통과했다.
- 빌드 결과에서 93개 페이지의 참조 섹션과 설명, 공통 카탈로그 구성 앵커 530개, 예제 링크 827개를 확인했다. 입력 문서 43개에서 읽기 전용과 비활성 API를 확인했다.
- 파일 업로드 페이지에서 본체·대기열·업로드 도구의 제목 계층과 앵커를 확인했다. 375px와 720px 뷰포트에서는 참조 항목이 한 열로 배치되고 가로로 넘치지 않았다.
- 브라우저에서 UIDataTreeGrid의 하위 행 요청, 일부 선택·전체 선택·해제, 편집 저장을 확인했다. 480px 화면에서는 참조 행이 한 열로 표시되고 참조 목록이 가로로 넘치지 않았다.
- 원격 그룹 선택 예제는 `loadGroupLeafIDs`로 접힌 하위 행까지 조회한다. 트리 그리드의 공통 컨트롤이 일부 선택·전체 선택·해제를 처리한다.

## 참조 유지보수

- 기본 예제는 텍스트 라벨과 컴포넌트의 기본 조작만 보여 준다. 선택 사항인 아이콘 속성은 별도 예제에서 설명하고 주요 API에서 해당 예제로 연결한다.
- `catalog.ts`는 구성 항목의 공개 이름을, `catalog-parts.ts`는 역할과 사용 설명을 관리한다. 개별 페이지의 직접 작성한 예제와 API는 `standalone-references.ts`에 연결한다.
- `catalog-guides.ts`에서 주요 API의 설명과 필요한 타입·기본값을 추가한다. 동작을 한 번에 확인할 예제가 명확한 경우 `example`으로 직접 연결한다. 공통 페이지에서는 구성 항목과 실제 코드에서 확인한 기본 속성·슬롯·이벤트도 예제에 연결한다.
- 한 페이지에서 여러 컴포넌트를 설명하면 `owner`로 각 API의 소속을 표시한다. `label`에 실제 속성이나 메서드 이름을 써서 중복된 이름도 각 컴포넌트에서 그대로 읽을 수 있게 한다. `readonly`와 `disabled`는 입력 상태 묶음에서 확인할 수 있다.
- `node scripts/check-catalog-references.ts http://127.0.0.1:3099`로 실행 중인 빌드의 전체 참조 섹션, 구성 항목 앵커, 예제 링크를 검사한다.
