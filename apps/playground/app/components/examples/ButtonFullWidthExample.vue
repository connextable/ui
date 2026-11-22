<script setup lang="ts">
import { UIButton, UISwitch } from "@connextable/ui";
import { computed, ref } from "vue";
import { buttonExampleCode } from "~/utils/button-example-code";

const block = ref(true);
const label = "결제 단계로 이동";
const code = computed(() => buttonExampleCode({ block: block.value }, { label }));
</script>

<template>
  <PlaygroundExample
    id="button-full-width"
    title="너비 채우기"
    description="block을 켜면 버튼이 부모 요소의 너비를 채웁니다. 링크 버튼에도 적용됩니다."
    :code="code"
    :heading-level="3"
  >
    <template #header>
      <UISwitch v-model="block" label="block" size="sm" />
    </template>
    <UIButton :block="block">{{ label }}</UIButton>
  </PlaygroundExample>
</template>
