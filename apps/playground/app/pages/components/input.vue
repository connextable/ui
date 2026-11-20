<script setup lang="ts">
import InputExample from "~/components/examples/InputExample.vue";
import inputExampleSource from "~/components/examples/InputExample.vue?example-code&raw";
import InputReadonlyExample from "~/components/examples/InputReadonlyExample.vue";
import inputReadonlyExampleSource from "~/components/examples/InputReadonlyExample.vue?example-code&raw";
import InputStatesExample from "~/components/examples/InputStatesExample.vue";
import inputStatesExampleSource from "~/components/examples/InputStatesExample.vue?example-code&raw";

definePageMeta({
  title: "UIInput",
  category: "입력",
  description: "텍스트를 입력하고 읽기 전용이나 오류 상태를 표시합니다.",
});
</script>

<template>
  <div>
    <PlaygroundExample
      id="input-example"
      title="텍스트 입력"
      description="v-model로 입력값을 연결합니다."
      :source="inputExampleSource"
    >
      <InputExample />
    </PlaygroundExample>
    <PlaygroundExample
      id="input-readonly"
      title="읽기 전용"
      description="readonly를 지정하면 값을 읽고 복사할 수 있지만 수정할 수 없습니다."
      :source="inputReadonlyExampleSource"
    >
      <InputReadonlyExample />
    </PlaygroundExample>
    <PlaygroundExample
      id="input-states"
      title="오류 상태"
      description="이메일 형식에 맞게 입력해 aria-invalid에 따른 오류 표시를 확인합니다."
      :source="inputStatesExampleSource"
    >
      <InputStatesExample />
    </PlaygroundExample>
  </div>
</template>
