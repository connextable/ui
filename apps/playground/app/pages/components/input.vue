<script setup lang="ts">
import InputLongValueExample from "~/components/examples/InputLongValueExample.vue";
import InputLongValueExampleSource from "~/components/examples/InputLongValueExample.vue?example-code&raw";
import InputExample from "~/components/examples/InputExample.vue";
import inputExampleSource from "~/components/examples/InputExample.vue?example-code&raw";
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
  category: "입력·폼",
  description: "텍스트를 입력하고 읽기 전용이나 오류 상태를 표시합니다.",
});
</script>

<template>
  <div>
    <PlaygroundExampleSection id="usage" title="기본 사용법">
      <PlaygroundExample :heading-level="3"
        id="input-example"
        title="텍스트 입력"
        description="v-model로 입력값을 연결합니다."
        :source="inputExampleSource"
      >
        <InputExample />
      </PlaygroundExample>
    </PlaygroundExampleSection>
    <PlaygroundExampleSection id="examples" title="동작별 예제">
      <PlaygroundExample :heading-level="3"
        id="input-multiline"
        title="여러 줄 입력"
        description="multiline을 사용하면 여러 줄을 입력할 수 있습니다. default-value로 초기 내용을 지정합니다."
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
        title="뒤쪽 슬롯"
        description="trailing 슬롯에 입력값을 지우는 버튼을 넣습니다."
        :source="inputTrailingSource"
      >
        <InputTrailingExample />
      </PlaygroundExample>
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
  </div>
</template>
