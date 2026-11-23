<script setup lang="ts">
import CheckboxIconExample from "~/components/examples/CheckboxIconExample.vue";
import iconSource from "~/components/examples/CheckboxIconExample.vue?example-code&raw";
import CheckboxReadonlyExample from "~/components/examples/CheckboxReadonlyExample.vue";
import CheckboxReadonlyExampleSource from "~/components/examples/CheckboxReadonlyExample.vue?example-code&raw";
import CheckboxIndicatorExample from "~/components/examples/CheckboxIndicatorExample.vue";
import CheckboxIndicatorExampleSource from "~/components/examples/CheckboxIndicatorExample.vue?example-code&raw";
import CheckboxExample from "~/components/examples/CheckboxExample.vue";
import CheckboxSelectAllExample from "~/components/examples/CheckboxSelectAllExample.vue";
import selectAllSource from "~/components/examples/CheckboxSelectAllExample.vue?example-code&raw";
import CheckboxIndeterminateExample from "~/components/examples/CheckboxIndeterminateExample.vue";
import indeterminateSource from "~/components/examples/CheckboxIndeterminateExample.vue?example-code&raw";
import CheckboxDisabledExample from "~/components/examples/CheckboxDisabledExample.vue";
import disabledSource from "~/components/examples/CheckboxDisabledExample.vue?example-code&raw";
import CheckboxFormExample from "~/components/form/CheckboxFormExample.vue";
import formSource from "~/components/form/CheckboxFormExample.vue?example-code&raw";

definePageMeta({
  title: "UICheckbox",
  componentParts: ["UICheckboxIndicator"],
  description: "독립 항목을 선택하거나, 일부만 선택된 상태를 표시합니다.",
});
</script>

<template>
  <div>
    <PlaygroundExampleSection id="usage" title="기본 사용법">
      <CheckboxExample />
    </PlaygroundExampleSection>
    <PlaygroundExampleSection id="settings-and-behavior" title="설정과 동작">
      <PlaygroundExampleSection id="checkbox-states" title="선택 상태">
        <PlaygroundExample :heading-level="3"
          id="checkbox-indeterminate"
          title="혼합 상태"
          description="indeterminate를 전달하면 체크 대신 가로선이 표시됩니다."
          :source="indeterminateSource"
        >
          <CheckboxIndeterminateExample />
        </PlaygroundExample>
        <PlaygroundExample :heading-level="3"
          id="checkbox-disabled"
          title="비활성"
          description="disabled를 지정하면 사용자가 체크 상태를 바꿀 수 없습니다."
          :source="disabledSource"
        >
          <CheckboxDisabledExample />
        </PlaygroundExample>
        <PlaygroundExample id="checkbox-readonly" title="읽기 전용"
          description="켜진 상태를 표시합니다. 사용자 입력으로는 상태가 바뀌지 않습니다." :source="CheckboxReadonlyExampleSource" :heading-level="3">
          <CheckboxReadonlyExample />
        </PlaygroundExample>
        <PlaygroundExample
          id="checkbox-icon"
          title="체크박스 라벨 아이콘"
          description="icon을 지정하면 체크 표시와 라벨 사이에 아이콘이 나타납니다."
          :source="iconSource"
        >
          <CheckboxIconExample />
        </PlaygroundExample>
      </PlaygroundExampleSection>
      <PlaygroundFormSection>
        <PlaygroundExample
          id="checkbox-form"
          title="선택값 제출"
          description="체크하면 해당 값이 values.notifications로 제출됩니다."
          :source="formSource"
          :heading-level="3"
        >
          <CheckboxFormExample />
        </PlaygroundExample>
      </PlaygroundFormSection>
    </PlaygroundExampleSection>
    <PlaygroundExampleSection id="practical-examples" title="실전 예제">
      <PlaygroundExampleSection id="examples" title="목록에서 일괄 선택">
        <PlaygroundExample
          id="checkbox-select-all"
          title="전체 선택"
          description="모두 선택을 누르면 두 검사 항목의 선택이 함께 바뀝니다."
          :source="selectAllSource"
          :heading-level="3"
        >
          <CheckboxSelectAllExample />
        </PlaygroundExample>
      </PlaygroundExampleSection>
    </PlaygroundExampleSection>
    <PlaygroundExampleSection id="composition-and-extension" title="조합과 확장">
      <PlaygroundExample id="UICheckboxIndicator" title="UICheckboxIndicator"
        description="indicator 슬롯에서 선택된 체크박스의 기호를 바꿉니다." :source="CheckboxIndicatorExampleSource" :heading-level="3">
        <CheckboxIndicatorExample />
      </PlaygroundExample>
    </PlaygroundExampleSection>
  </div>
</template>
