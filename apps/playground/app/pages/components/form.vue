<script setup lang="ts">
import InputFormExample from "~/components/form/InputFormExample.vue";
import inputSource from "~/components/form/InputFormExample.vue?example-code&raw";
import InputRequiredExample from "~/components/form/InputRequiredExample.vue";
import inputRequiredSource from "~/components/form/InputRequiredExample.vue?example-code&raw";
import SelectRequiredExample from "~/components/form/SelectRequiredExample.vue";
import selectRequiredSource from "~/components/form/SelectRequiredExample.vue?example-code&raw";
import SelectFormExample from "~/components/form/SelectFormExample.vue";
import selectSource from "~/components/form/SelectFormExample.vue?example-code&raw";
import CheckboxFormExample from "~/components/form/CheckboxFormExample.vue";
import checkboxSource from "~/components/form/CheckboxFormExample.vue?example-code&raw";
import DynamicFieldsExample from "~/components/form/DynamicFieldsExample.vue";
import dynamicFieldsSource from "~/components/form/DynamicFieldsExample.vue?example-code&raw";
import RadioGroupFormExample from "~/components/form/RadioGroupFormExample.vue";
import radioSource from "~/components/form/RadioGroupFormExample.vue?example-code&raw";
import SwitchFormExample from "~/components/form/SwitchFormExample.vue";
import switchSource from "~/components/form/SwitchFormExample.vue?example-code&raw";

definePageMeta({
  title: "UIForm",
  category: "폼",
  description: "입력과 동작을 묶어 유효성을 검사하고 값을 제출합니다.",
  componentParts: ["UIFormField", "UIFormActions"],
});
</script>

<template>
  <div class="form-examples">
    <PlaygroundExample
      id="input-form"
      title="기본 제출"
      description="UIForm의 submit 이벤트에서 name이 지정된 입력을 FormData로 읽습니다."
      :source="inputSource"
    >
      <InputFormExample />
    </PlaygroundExample>
    <PlaygroundExample
      id="dynamic-fields"
      title="동적 필드"
      description="목록에서 입력 필드를 추가하거나 삭제합니다. 화면에 있는 필드만 필수값을 검사하며, 같은 name의 값은 FormData.getAll()로 읽습니다."
      :source="dynamicFieldsSource"
    >
      <DynamicFieldsExample />
    </PlaygroundExample>
    <PlaygroundExample
      id="UIFormField"
      title="UIFormField"
      description="control 슬롯 속성을 입력에 전달하면 라벨과 도움말이 연결됩니다. 빈 값으로 제출하면 required가 있는 입력에서 브라우저가 제출을 막습니다."
      :source="inputRequiredSource"
    >
      <InputRequiredExample />
    </PlaygroundExample>
    <PlaygroundExample
      id="select-required"
      title="필수 선택"
      description="required가 설정된 선택을 비워 두고 제출하면 필수값 오류가 표시됩니다."
      :source="selectRequiredSource"
    >
      <SelectRequiredExample />
    </PlaygroundExample>
    <PlaygroundExample
      id="UIFormActions"
      title="UIFormActions"
      description="UIFormActions는 제출 버튼을 오른쪽에 정렬합니다. 제출 결과는 UIForm의 output 슬롯에 표시합니다."
      :source="selectSource"
    >
      <SelectFormExample />
    </PlaygroundExample>
    <PlaygroundExample
      id="checkbox-form"
      title="체크박스 제출"
      description="name과 value를 지정하면 체크한 항목의 값이 FormData에 포함됩니다."
      :source="checkboxSource"
    >
      <CheckboxFormExample />
    </PlaygroundExample>
    <PlaygroundExample
      id="radio-form"
      title="라디오 그룹 제출"
      description="name을 지정하면 그룹에서 선택한 값이 FormData에 포함됩니다."
      :source="radioSource"
    >
      <RadioGroupFormExample />
    </PlaygroundExample>
    <PlaygroundExample
      id="switch-form"
      title="스위치 제출"
      description="스위치가 켜졌을 때 name에 해당하는 값이 FormData에 들어갑니다."
      :source="switchSource"
    >
      <SwitchFormExample />
    </PlaygroundExample>
  </div>
</template>

<style scoped>
.form-examples {
  --ui-form-max-inline-size: 26rem;
}
</style>
