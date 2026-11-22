# 공통 입력 폼 계약

`UIFormField`의 `label`, `description`, `name`을 사용하면 입력에 이름과 도움말을 연결하고 값을 폼에 포함할 수 있다. 값이 비어 있을 때 형식이나 예시가 도움이 되는 입력에는 `placeholder`를 지정한다. 형식이나 필수 조건을 계속 보여줘야 한다면 `description`에 적는다. [W3C 폼 입력 안내](https://www.w3.org/WAI/tutorials/forms/instructions/)

## 입력을 폼에 연결하기

| 계약 | 동작 |
| --- | --- |
| 값 | `v-model`은 앱이 제어하는 값이고 `default-value`는 자체 상태의 초기값이다. 텍스트 초안이나 검색어를 제공하는 경우 전용 모델을 사용한다. |
| 접근성 이름과 설명 | `UIFormField`의 `label`과 `description`은 각각 이름과 도움말을 연결한다. 단독으로 쓰는 입력은 연결된 HTML 라벨, 자체 `label` 또는 접근성 이름을 지정한다. |
| 제출 | `name`은 제출 키다. 폼 밖에 배치하는 폼 입력은 `form`에 대상 폼 ID를 전달한다. 여러 값을 선택하면 같은 키를 반복하며, 시간 범위의 각 끝은 별도 경로로 제출된다. |
| 필수와 오류 | `required`는 입력에 맞는 값 확보 조건이다. `UIFormField`는 필수 표시를 라벨과 함께 보여 주고 검증 오류를 텍스트로 표시한다. 복합 입력은 실제 값을 대상으로 검증한다. |
| 입력 상태 | `readonly`는 값 변경을 잠그고 기존 제출값을 유지한다. `disabled`는 조작을 막고 제출 대상에서도 제외된다. 접근 가능한 편집 컨트롤의 필수 조건을 검증한다. |
| 지우기와 초기화 | `clearable`은 값이 없는 상태를 지원하는 입력에서 지우기 버튼을 추가한다. 폼 초기화는 자체 상태를 기본값으로 되돌린다. `v-model`을 연결한 상태는 앱이 제어한다. |
| 브라우저 입력 | 텍스트 입력은 입력 목적에 맞게 `type`, `autocomplete`, `inputmode` 등의 HTML 옵션을 사용한다. PIN의 일회용 코드 자동완성은 `otp`로 지정한다. |

폼 연결, 비활성 제출 제외 및 검증은 [HTML 폼 컨트롤 표준](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html)을 따른다.

입력이나 선택 버튼에 테두리가 있으면 지우기 버튼을 그 안에 배치한다. 목록과 트리는 항목과 별도로 같은 패널 안에 지우기 버튼을 둔다. 지운 뒤 키보드 포커스는 해당 컨트롤로 돌아간다.

## 46개 입력·선택 컴포넌트 점검

| 확인한 컴포넌트 | 점검 결과 |
| --- | --- |
| `UIInput`, `UINumberField`, `UIQuantityField`, `UISpinButton` | 네이티브 입력에서 이름·도움말과 필수 조건을 받는다. 표시 단위와 제출하는 숫자 값은 별도로 처리한다. `UIInput`의 제출 관련 속성을 공개 타입에 포함했다. |
| `UIEditable`, `UIGridEditor` | 인라인 편집기의 기본 입력에 `form`, `required`를 포함한 속성을 연결했다. 셀 편집기는 `UIFormField`의 라벨과 오류를 받을 수 있다. 그리드 안에서는 셀의 편집·저장 흐름을 따른다. |
| `UIPinInput`, `UITagsInput` | PIN은 모든 자리가 채워져야 필수 조건을 만족한다. 태그는 Enter 등으로 등록한 값이 하나 이상 필요하다. PIN은 한 문자열로, 태그는 이름이 반복되는 값으로 제출한다. |
| `UICheckbox`, `UISwitch`, `UIRadioGroup` | 제출 속성을 공개 타입에 포함했다. `UIFormField`를 쓰면 자체 라벨을 생략할 수 있다. 체크·스위치의 미선택은 네이티브 체크박스와 같이 제출값이 없다. |
| `UICheckboxGroup`, `UICheckboxTree`, `UIToggleGroup`, `UIToggleButton` | 그룹의 필수 조건은 선택값 한 개 이상이다. 체크 트리도 다른 다중 선택처럼 선택한 ID를 제출한다. 토글 버튼은 켜졌을 때만 `value`를 제출하며 기본값은 `on`이다. |
| `UISelect`, `UITreeSelect`, `UICombobox` | Select는 `label`과 오류 연결을 지원한다. TreeSelect는 필드의 라벨·도움말과 선택 ID를 입력과 제출 대상에 연결한다. Combobox의 네이티브 제출값은 입력 텍스트다. 선택 ID는 `v-model`로 관리한다. |
| `UIListbox`, `UICascadeSelect`, `UICascadeList`, `UITransfer` | 선택값 또는 Transfer의 대상 목록이 제출된다. 읽기 전용 상태가 필수 선택 검증으로 제출을 막지 않도록 했다. 열려 있는 목록은 화면에 선택지를 표시한다. |
| `UISlider`, `UIMultiThumbSlider`, `UIRating`, `UIColorPicker` | 슬라이더와 색상 선택기는 정의된 값으로 시작한다. 평가에는 빈 선택 상태가 있으며 필수 조건과 지우기를 적용할 수 있다. |
| `UICalendar`, `UIRangeCalendar` | 단일 날짜 또는 시작·종료 날짜를 제출한다. 읽기 전용일 때 연·월 탐색과 제출값을 유지한다. 달력에 추가한 시간은 `v-model:time` 또는 `v-model:start-time`과 `v-model:end-time`으로 관리한다. |
| `UIDateField`, `UIDateRangeField`, `UIDateTimeField`, `UIDateTimeRangeField`, `UITimeField`, `UITimeRangeField` | 네이티브 텍스트 입력과 범위의 시작·종료 입력을 사용한다. 안내와 확정 형식은 `UITemporalProvider` 설정에 맞춰 생성한다. |
| `UIDatePicker`, `UIDateRangePicker`, `UIDateTimePicker`, `UIDateTimeRangePicker`, `UITimePicker`, `UIMonthPicker`, `UIMonthRangePicker`, `UIYearPicker`, `UIYearRangePicker` | 기본 피커가 이름이 연결된 입력을 렌더링한다. `name`을 기준으로 분리 입력에는 `.date`와 `.time`, 범위에는 `.start`와 `.end`가 붙는다. `UIDateTimePicker`의 `input-layout="combined"`는 `name`을 그대로 쓰고, `UIDateTimeRangePicker`의 `input-layout="split"`은 `name.start.date`, `name.start.time`, `name.end.date`, `name.end.time`으로 제출한다. `UITimePicker inline`도 `name`, `required`, 폼 초기화를 지원한다. |
| `UIFileInput`, `UIFileUpload`, `UIFileUploadQueue` | 파일 제출에는 `UIFileInput`의 네이티브 파일 필드를 사용한다. 업로드와 대기열은 전송 상태와 실행을 제공한다. 파일 선택 안내에는 `picker-label`과 `hint`를 사용한다. |

## 확인 범위

- 공개 루트 46개의 props, 폼 참여와 상태 전달을 소스 및 서버 렌더링에서 대조했다.
- 회귀 테스트는 다중 선택·PIN의 필수 조건, 읽기 전용·비활성 제출, 검색·인라인·셀 편집의 필드 메타데이터, 달력과 날짜 범위의 제출값을 확인한다.
- 브라우저에서는 플레이그라운드의 **복합 입력 검증과 제출**에서 빈 값 검증, 오류 포커스, 선택 ID를 포함한 제출, 초기화까지 확인했다.
