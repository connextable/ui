# 컴포넌트 플레이그라운드 개편 계획

`UIButton`과 `UIIconButton` 문서를 출발점으로 삼는다. 사용자는 기본 프로퍼티로 완성된 컴포넌트를 사용하고, 플레이그라운드에서 값을 바꾸고, 그 상태를 재현하는 Vue SFC를 복사할 수 있다. 기본 속성과 상태는 사용법에서 설명하고, 실제 조합과 특수 동작은 별도 예제로 다룬다.

## 조사와 진행도

개편 전 사이드바의 93개 페이지를 브라우저에서 열었다. 92개에서 첫 Vue SFC가 기본으로 펼쳐져 있었고, 페이지네이션은 500을 반환했다. 카탈로그에서 등록한 상세 예제 425개와 파일 425개가 일치했다. 공통 카탈로그 82개 중 67개는 예제 분류를 자동 생성한다. 12개 예제 소스에 플레이그라운드 내부 import가 있다. 이 수치는 개편 전 기준이다. 아래 작업표에는 버튼 페이지에서 다루는 `UIIconButton`과 `UIToggleButton`을 별도 항목으로 넣었다.

| 순서 | 작업 | 상태 |
| --- | --- | --- |
| 1 | 페이지네이션 500 복구 | 완료 |
| 2 | 공통 예제 레이아웃, 코드 생성 및 분류 경로 | 완료 |
| 3 | 동작·폼 → 선택 → 날짜·시간 → 탐색·오버레이 → 레이아웃·상태 → 표·데이터·가상화 | 진행 중 |
| 4 | 공개 API 및 전체 경로 대조, 프로덕션 검증 | 대기 |

컴포넌트는 아래 완료 조건을 검증한 뒤 체크한다. 기존 버튼의 공개 동작도 이 기준으로 확인한다.

### 검증 기록

- 페이지네이션 초기 렌더링과 첫 코드 열린 상태를 확인했다. 브라우저에서 마지막 페이지와 첫 페이지로 이동했을 때 `7 / 7`과 `1 / 7`이 표시됐다. 페이지 크기를 20에서 40으로 바꾸면 마지막 페이지가 12에서 6으로 변경됐고, 인접 페이지 예제에서 6에서 7로 이동하면 7이 현재 페이지로 표시됐다.
- 공통 프레임에서 카탈로그 예제가 헤더와 푸터를 채울 수 있고, 정적·실시간 코드를 동일한 버튼으로 복사할 수 있다. 브라우저에서 두 종류의 클립보드 결과를 코드 영역과 대조했다.
- 툴바의 가로 서식 적용, 세로 방향키 이동, 비활성 도구 건너뛰기, 복제 결과를 확인했다. 첫 코드에서 공통 레이아웃과 푸터를 제외한 Vue SFC를 확인했다.
- 입력의 크기·모양·초기화·비활성 설정을 바꿨을 때 동작과 코드가 일치했다. 편집과 초기화 결과, 읽기 전용과 오류 상태, 폼 제출을 브라우저에서 확인했다.

## 공통 완료 조건

- 기본 예제는 가능한 한 단일 루트에 props와 `v-model`을 사용한다. 여러 컴포넌트가 실제로 협력하는 예제에는 해당 조합을 보여 준다. 기존 슬롯으로 직접 조립하거나 스타일을 바꾸는 경로를 유지한다.
- 공통 예제 프레임은 조작할 설정이 있을 때 헤더, 표시할 결과가 있을 때 푸터를 렌더링한다. 두 경계선은 전체 너비를 차지한다. 코드 접기 버튼은 푸터 뒤에 배치하며 첫 코드는 기본으로 열린다.
- 코드는 필요한 import와 데이터가 들어 있는 `<script setup lang="ts">`, `<template>`, 필요한 경우 `<style scoped>`로 구성한다. Vue 포매터를 적용한다. 상태를 편집하는 예제는 `v-model`을 사용하고 true인 Vue boolean props는 축약한다. 실시간 조작값과 예제 코드의 props가 일치한다.
- 기존 링크, 목차 앵커, 키보드 동작과 좁은 화면 레이아웃을 유지한다. 컴포넌트 묶음마다 대표 예제의 조작과 복사를 브라우저에서 확인하고 단위별로 커밋한다.
- 마지막에 전체 93개 페이지의 정상 렌더링과 첫 코드 열림, 상세 예제의 등록과 파일 일치, 공개 내보내기의 문서 색인 포함 여부를 확인한다. 처음 조사에서 색인 밖에 있던 UI 컴포넌트 15개와 `useUI*` 19개도 확인한다. 각 항목은 관련 루트의 API 또는 독립 안내에서 찾을 수 있어야 한다.

## 색인에서 확인할 공개 API

- 선택·폼: `UICheckboxTreeIndicator`, `UIClearButton`, `UIFieldClear`, `UIRadioGroupItem`, `UIRadioGroupIndicator`, `UIFormDescription`, `UIFormLabel`, `UIFormMessage`
- 날짜·진행 상태: `UIDatePickerValue`, `UIProgressIndicator`, `UIProgressTrack`, `UIProgressValueText`
- 표: `UITabularColumnAction`, `UITabularColumnHeading`, `UITabularFilterPopover`

## 컴포넌트별 완료 조건

### 동작·폼

- [ ] `UIButton` · 기준 문서. 기본 속성, 링크, 로딩/너비, 실용 예제
- [ ] `UIIconButton` · 기본·사용자 지정 스피너, 원형과 입력 안 모양, 접근성 이름
- [ ] `UIToggleButton` · 눌림 상태, 앞뒤 아이콘, 폼 안 동작
- [x] `UIToolbar` · 가로·세로, 구분선, 비활성, 방향키 이동
- [x] `UIInput` · 모델, 아이콘과 초기화, 오류, 읽기 전용, 폼 제출
- [ ] `UIEditable` · 편집과 확정, Escape·blur, 검증
- [ ] `UIPinInput` · 길이, 마스킹, 붙여넣기, 완료와 수정
- [ ] `UITagsInput` · 칩 표면 대비, 추가·삭제·초기화, 붙여넣기와 중복·IME
- [ ] `UINumberField` · 빈 값, 소수, 범위, 읽기 전용, 편집·제출
- [ ] `UISpinButton` · 증분, 큰 단위 이동, 범위, 키보드
- [ ] `UIQuantityField` · 단위 props, 표시 단위 전환, 확정값 출력
- [ ] `UISlider` · 방향, 증분, 읽기 전용, 키보드, 값 표시
- [ ] `UIMultiThumbSlider` · 손잡이 사이 채움, 최소 간격, 겹친 끝점, 세로 높이
- [ ] `UIFileInput` · 단일·다중, 드롭·붙여넣기, 삭제, 개수·총합 제한
- [ ] `UIFileUpload` · 기본 파일 선택, 어댑터, 묶음, 취소·재시도
- [ ] `UIForm` · 필드·제출·초기화, 스키마와 서버 오류, 재검증, 동적 필드

### 선택

- [ ] `UICheckbox` · 선택·혼합 상태, 전체 선택
- [ ] `UICheckboxGroup` · 옵션 배열, 필수·비활성, 초기화·제출
- [ ] `UICheckboxTree` · 노드 데이터, 부모의 혼합 상태, 잠긴 가지, 일괄 선택
- [ ] `UIRadioGroup` · 초기화, 방향, 설명, 방향키, 폼
- [ ] `UISwitch` · 크기, 읽기 전용·비활성, 손잡이 슬롯
- [ ] `UIToggleGroup` · 단일·다중, 재선택, 세로 배치, 방향키
- [ ] `UISelect` · 빈 값으로 초기화, 우측 화살표, 긴 항목, 검색, 포털
- [ ] `UICombobox` · 검색어, 초기화, 빈 결과, 비동기 항목과 편집
- [ ] `UIListbox` · 단일·다중, 빈 값, 비활성 옵션, 키보드 검색
- [ ] `UITreeSelect` · 기본 노드 렌더링, 펼치기 아이콘, 선택 표시, 입력과 커서
- [ ] `UICascadeSelect` · 트리거, 계층 열과 화살표, 선택·비활성, 경로
- [ ] `UICascadeList` · 열과 노드, 경로 출력 및 초기화
- [ ] `UITransfer` · 원본·대상 이동, 잠긴 항목, 일괄 이동, 이동 규칙
- [ ] `UIColorPicker` · 색 영역·색조·텍스트, 투명도, 표기 형식, 네이티브 입력
- [ ] `UIRating` · 값, 아이콘, 초기화, 읽기 전용, 키보드

### 날짜·시간

- [ ] `UICalendar` · 연도·월 표기, 주 시작, 정사각형 날짜, 선택 제한
- [ ] `UIRangeCalendar` · 초안과 확정 범위, 행 경계와 양 끝
- [ ] `UIDateField` · 입력 형식, 잘못된 값, 확정·제출
- [ ] `UIDateRangeField` · 한 줄, 초기화, 시작·종료 순서
- [ ] `UIDatePicker` · 직접 입력, 달력 탐색과 범위 제한, 포털
- [ ] `UIDateRangePicker` · 날짜 범위 초안, 표시 형식, 양 끝 편집
- [ ] `UITimeField` · 12·24시간제, 초, 잘못된 값, 키보드
- [ ] `UITimeRangeField` · 한 줄 입력, 초와 제한, 순서
- [ ] `UITimePicker` · 시·분·초 선택, 제한, 가장자리 효과, 중앙 위치와 수동 스크롤
- [ ] `UIDateTimeField` · 공통 입력 스타일, 표시 및 확정 형식
- [ ] `UIDateTimeRangeField` · 한 줄, 초, 빈 값, 폼 제출
- [ ] `UIDateTimePicker` · 날짜·시간 패널, 분리 입력, 제한과 포털
- [ ] `UIDateTimeRangePicker` · 좌우 시각 선택, 한 줄 입력, 날짜 경계, 정밀도와 스크롤
- [ ] `UIMonthPicker` · 연·월 전환, 범위 제한, 포털
- [ ] `UIMonthRangePicker` · 같은 해 종료 월 축약, 다른 해 연·월, 제한
- [ ] `UIYearPicker` · 연도 페이지 탐색, 제어 모델, 제한
- [ ] `UIYearRangePicker` · 연도 페이지를 넘는 범위, 초안과 양 끝
- [ ] `UITemporalProvider` · 공통 로케일, 기준일, 표시·입력 형식, 중첩 적용

### 탐색·오버레이

- [ ] `UIAnchor` · 내부·외부 링크, 현재 위치·비활성, Nuxt 프리패치 기본값
- [ ] `UITabs` · 항목·패널, 제어 모델, 수동 활성화, 세로 및 외부 제어
- [ ] `UIPagination` · 첫·끝, 현재 페이지, 페이지 크기, 인접 숫자, 빈 결과
- [ ] `UIStepper` · 단계와 패널, 이전·다음, 비활성, 세로
- [ ] `UITreeView` · 계층 데이터, 펼치기와 외부 제어, 비활성
- [ ] `UINavigationMenu` · 직접 링크, 링크 그룹 및 팝오버, 키보드 탐색
- [ ] `UIMenu` · 명령·구분선·서브메뉴, 키보드와 비활성
- [ ] `UIMenuButton` · 트리거, 명령·링크, Esc 후 포커스
- [ ] `UIContextMenu` · 마우스·키보드 열기, 적용 범위, 중첩과 비활성
- [ ] `UIMenubar` · 방향키·문자 검색, 서브메뉴
- [ ] `UIDialog` · 기본 오버레이와 제목·닫기, 폼, 초기·복귀 포커스
- [ ] `UIAlertDialog` · 취소·확인, 실행 중 상태, 포커스
- [ ] `UIDrawer` · 포털, 방향, 스크롤, 바깥 클릭
- [ ] `UISheet` · 방향, 크기·block과 CSS 너비, 핸들·스와이프
- [ ] `UILightbox` · 이미지·영상, 반복 열기 애니메이션, 순환, 모바일 스와이프
- [ ] `UIPopover` · 트리거, 정렬·충돌 회피, 폼·앵커·스크롤
- [ ] `UITooltip` · 문구, 배치, 지연, 화살표, 키보드
- [ ] `UIToast` · 알림 큐, 고정 및 액션, 갱신, 닫기

### 레이아웃·상태

- [ ] `UIDashboard` · 사이드바·고정 헤더·본문, 모바일과 빠른 목록 스크롤
- [ ] `UIWindowSplitter` · 방향·제한, 키보드, 그립 슬롯, 연속 드래그
- [ ] `UIScrollArea` · 방향·스크롤바, 가장자리 효과, 양축 sticky, 외부 이동 및 재시도
- [ ] `UIDisclosure` · 제어 모델과 트리거, 구획, 전환 도중 다시 누르기
- [ ] `UIAccordion` · 단일·복수, 닫기·비활성, 외부 토글과 공통 간격
- [ ] `UICarousel` · 수동·순환, 표시점, 자동재생과 멈춤
- [ ] `UIFeed` · 항목·시간, 이전·새 항목과 포커스
- [ ] `UIImage` · 비율, 반응형 소스, 대체 콘텐츠, 크기
- [ ] `UISpinner` · 모양, 접근성, 비동기 상태
- [ ] `UIProgress` · 확정·미확정, 진행 트랙·눈금·값
- [ ] `UIMeter` · 범위, 임곗값, 권장값, 표시 단위
- [ ] `UIMeterGroup` · 여러 값, 범례, 0 처리와 서식
- [ ] `UITimer` · 경과·카운트다운, 시작·정지·초기화, 자동 시작
- [ ] `UIPrimitive` · as, as-child와 ref
- [ ] `UIHostProvider` · 포털, 방향, 중첩

### 표·데이터·가상화

- [ ] `UIGrid` · 포커스·선택, F2 편집, Enter 확정, Esc 취소
- [ ] `UITreeGrid` · 행 확장, 행·열 이동, 셀 편집과 포커스
- [ ] `UIDataTable` · 로컬 데이터 기본 구성, 원격 정렬·필터·선택·고정·페이지
- [ ] `UIDataGrid` · 셀 커서, 검증과 취소, 스프레드시트 동작
- [ ] `UIDataTreeGrid` · 그룹·자식·비동기 로드와 선택·편집
- [ ] `UIChart` · 기본 단일 시리즈, 상세 40개 예제의 속성 및 사용 사례
- [ ] `UISequenceReorder` · 포인터·키보드, 핸들, 취소·확정, 잠금
- [ ] `UITreeReorder` · 그룹 안팎 이동, 용량·유형 제한, 빈 그룹·취소
- [ ] `UIVirtualList` · 고정·측정 높이, 외부 스크롤, 목록 앞 추가·스트림, 표시 범위
- [ ] `UIVirtualGrid` · 반응형 열, 행 높이, 이동·선택, 실시간 목록
- [ ] `UIVirtualMasonry` · 높이 측정, 재배치, 확장
- [ ] `UIVirtualSpatial` · 좌표·겹침, 여백, 일정, 위치 이동
- [ ] `UIVirtualizer` · 뷰포트, 오버스캔, 어댑터와 useUIVirtualizer
