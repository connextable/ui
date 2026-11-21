<script setup lang="ts">
import ButtonFormExample from "~/components/examples/ButtonFormExample.vue";
import formSource from "~/components/examples/ButtonFormExample.vue?example-code&raw";
import ButtonExample from "~/components/examples/ButtonExample.vue";
import buttonExampleSource from "~/components/examples/ButtonExample.vue?example-code&raw";
import ButtonVariantExample from "~/components/examples/ButtonVariantExample.vue";
import buttonVariantExampleSource from "~/components/examples/ButtonVariantExample.vue?example-code&raw";
import ButtonSizeExample from "~/components/examples/ButtonSizeExample.vue";
import buttonSizeExampleSource from "~/components/examples/ButtonSizeExample.vue?example-code&raw";
import ButtonDisabledExample from "~/components/examples/ButtonDisabledExample.vue";
import buttonDisabledExampleSource from "~/components/examples/ButtonDisabledExample.vue?example-code&raw";

definePageMeta({
  title: "UIButton",
  category: "동작",
  description: "강조 수준과 크기를 골라 화면에서 각 동작의 우선순위를 표현합니다.",
});
</script>

<template>
  <div>
    <PlaygroundExample
      id="button-example"
      title="기본 동작"
      description="click 이벤트로 버튼 동작을 연결합니다."
      :source="buttonExampleSource"
    >
      <ButtonExample />
    </PlaygroundExample>
    <PlaygroundExample
      id="button-variant"
      title="스타일"
      description="variant만 바꿔 같은 크기의 버튼을 비교합니다."
      :source="buttonVariantExampleSource"
    >
      <ButtonVariantExample />
    </PlaygroundExample>
    <PlaygroundExample
      id="button-size"
      title="크기"
      description="크기를 선택해 size에 따른 버튼 높이를 비교합니다."
      :source="buttonSizeExampleSource"
    >
      <ButtonSizeExample />
    </PlaygroundExample>
    <PlaygroundExample
      id="button-disabled"
      title="비활성"
      description="disabled를 지정하면 눌러도 동작하지 않습니다."
      :source="buttonDisabledExampleSource"
    >
      <ButtonDisabledExample />
    </PlaygroundExample>
    <PlaygroundExample
      id="button-submit"
      title="폼 밖에서 제출"
      description="type이 submit인 버튼은 form 속성으로 연결한 폼을 제출합니다."
      :source="formSource"
      :heading-level="3"
    >
      <ButtonFormExample />
    </PlaygroundExample>
  </div>
</template>
