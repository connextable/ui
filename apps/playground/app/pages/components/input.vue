<script setup lang="ts">
import InputLongValueExample from "~/components/examples/InputLongValueExample.vue";
import InputLongValueExampleSource from "~/components/examples/InputLongValueExample.vue?example-code&raw";
import InputExample from "~/components/examples/InputExample.vue";
import InputLeadingExample from "~/components/examples/InputLeadingExample.vue";
import inputLeadingSource from "~/components/examples/InputLeadingExample.vue?example-code&raw";
import InputReadonlyExample from "~/components/examples/InputReadonlyExample.vue";
import inputReadonlyExampleSource from "~/components/examples/InputReadonlyExample.vue?example-code&raw";
import InputStatesExample from "~/components/examples/InputStatesExample.vue";
import inputStatesExampleSource from "~/components/examples/InputStatesExample.vue?example-code&raw";
import InputFormExample from "~/components/form/InputFormExample.vue";
import formSource from "~/components/form/InputFormExample.vue?example-code&raw";

definePageMeta({
  title: "UIInput",
  description: "텍스트를 입력하고 읽기 전용이나 오류 상태를 표시합니다.",
  componentParts: ["UIClearButton", "UIFieldClear"],
});
</script>

<template>
  <div class="input-document">
    <PlaygroundExampleSection id="usage" title="기본 사용법">
      <InputExample />
    </PlaygroundExampleSection>
    <PlaygroundExampleSection id="settings-and-behavior" title="설정과 동작">
      <PlaygroundExampleSection id="input-layouts" title="입력 모양과 안쪽 액션">
        <InputExample multiline />
        <PlaygroundExample :heading-level="3"
          id="input-leading"
          title="주소의 고정 접두사와 접미사"
          description="leading과 trailing으로 주소의 고정 부분을 배치합니다. 입력 모델에는 사용자가 입력한 팀 주소만 들어갑니다."
          :source="inputLeadingSource"
        >
          <InputLeadingExample />
        </PlaygroundExample>
      </PlaygroundExampleSection>
      <PlaygroundExampleSection id="input-states-section" title="읽기 전용과 오류">
        <PlaygroundExample :heading-level="3"
          id="input-readonly"
          title="읽기 전용"
          description="readonly를 지정하면 값을 읽고 복사할 수 있지만 수정할 수 없습니다."
          :source="inputReadonlyExampleSource"
        >
          <InputReadonlyExample />
        </PlaygroundExample>
        <PlaygroundExample :heading-level="3"
          id="input-states"
          title="오류 상태"
          description="이메일 형식에 맞게 입력해 aria-invalid에 따른 오류 표시를 확인합니다."
          :source="inputStatesExampleSource"
        >
          <InputStatesExample />
        </PlaygroundExample>
      </PlaygroundExampleSection>
      <PlaygroundExampleSection id="examples" title="좁은 너비의 입력">
        <PlaygroundExample id="input-long" title="좁은 검색창에서 아이콘 표시"
          description="icon으로 검색 아이콘을 지정합니다. 긴 검색어의 끝으로 이동해도 아이콘과 지우기 버튼은 제자리를 유지합니다." :source="InputLongValueExampleSource" :heading-level="3">
          <InputLongValueExample />
        </PlaygroundExample>
      </PlaygroundExampleSection>
      <PlaygroundFormSection>
        <PlaygroundExample
          id="input-form"
          title="입력값 제출"
          description="UIFormField에 name을 지정하고 제출 핸들러에서 values.name으로 입력값을 읽습니다."
          :source="formSource"
          :heading-level="3"
        >
          <InputFormExample />
        </PlaygroundExample>
      </PlaygroundFormSection>
    </PlaygroundExampleSection>
  </div>
</template>

<style scoped>
.input-document :deep(.playground-example__preview > :is(.ui-input, .ui-field)) {
  inline-size: min(100%, 26rem);
}
</style>
