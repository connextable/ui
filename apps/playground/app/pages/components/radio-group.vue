<script setup lang="ts">
import RadioGroupExample from "~/components/examples/RadioGroupExample.vue";
import radioGroupExampleSource from "~/components/examples/RadioGroupExample.vue?example-code&raw";
import RadioGroupDisabledExample from "~/components/examples/RadioGroupDisabledExample.vue";
import radioGroupDisabledExampleSource from "~/components/examples/RadioGroupDisabledExample.vue?example-code&raw";

definePageMeta({
  title: "UIRadioGroup",
  category: "입력",
  description: "여러 선택지 중 하나를 선택합니다. 목록과 카드에서 같은 선택 상태를 비교할 수 있습니다.",
});
</script>

<template>
  <div>
    <PlaygroundExample
      id="radio-example"
      title="선택지 배치"
      description="가로 카드를 켜거나 끄면서 선택지 배치를 비교합니다."
      :source="radioGroupExampleSource"
      wide
    >
      <RadioGroupExample />
    </PlaygroundExample>
    <PlaygroundExample
      id="radio-disabled"
      title="비활성 옵션"
      description="방향키로 이동하면 disabled 옵션을 건너뜁니다."
      :source="radioGroupDisabledExampleSource"
    >
      <RadioGroupDisabledExample />
    </PlaygroundExample>
  </div>
</template>
