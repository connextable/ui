<script setup lang="ts">
import InputLongValueExample from "~/components/examples/InputLongValueExample.vue";
import InputLongValueExampleSource from "~/components/examples/InputLongValueExample.vue?example-code&raw";
import InputExample from "~/components/examples/InputExample.vue";
import InputMultilineExample from "~/components/examples/InputMultilineExample.vue";
import multilineSource from "~/components/examples/InputMultilineExample.vue?example-code&raw";
import InputLeadingExample from "~/components/examples/InputLeadingExample.vue";
import inputLeadingSource from "~/components/examples/InputLeadingExample.vue?example-code&raw";
import InputTrailingExample from "~/components/examples/InputTrailingExample.vue";
import inputTrailingSource from "~/components/examples/InputTrailingExample.vue?example-code&raw";
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
        <PlaygroundExample :heading-level="3"
          id="input-multiline"
          title="여러 줄 입력"
          description="multiline을 사용하면 여러 줄을 입력할 수 있습니다. v-model에 연결한 상태에 초기 내용을 지정합니다."
          :source="multilineSource"
        >
          <InputMultilineExample />
        </PlaygroundExample>
        <PlaygroundExample :heading-level="3"
          id="input-leading"
          title="앞쪽 슬롯"
          description="leading 슬롯에 입력값 앞에 표시할 접두사를 넣습니다."
          :source="inputLeadingSource"
        >
          <InputLeadingExample />
        </PlaygroundExample>
        <PlaygroundExample :heading-level="3"
          id="input-trailing"
          title="입력값 지우기"
          description="clearable을 지정하면 값이 있을 때 지우기 버튼이 표시됩니다. clear-label로 버튼 이름을 지정합니다."
          :source="inputTrailingSource"
        >
          <InputTrailingExample />
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
    </PlaygroundExampleSection>
    <PlaygroundExampleSection id="practical-examples" title="실전 예제">
      <PlaygroundExampleSection id="examples" title="좁은 너비의 입력">
        <PlaygroundExample id="input-long" title="좁은 입력 영역"
          description="긴 검색어의 끝으로 이동하고 앞 아이콘과 지우기 버튼이 제자리를 유지하는지 확인합니다." :source="InputLongValueExampleSource" :heading-level="3">
          <InputLongValueExample />
        </PlaygroundExample>
      </PlaygroundExampleSection>
      <PlaygroundFormSection>
        <PlaygroundExample
          id="input-form"
          title="입력값 제출"
          description="UIFormField의 name을 키로 사용해 입력값을 FormData에서 읽습니다."
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
