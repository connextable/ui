<script setup lang="ts">
import { UIButton } from "@connextable/ui";
import source from "./ButtonVariantExample.vue?example-code&raw";
</script>

<template>
  <PlaygroundExample
    id="button-variant"
    title="스타일"
    description="variant만 바꿔 같은 크기의 버튼을 비교합니다."
    :source="source"
    :heading-level="3"
    inline
  >
    <UIButton variant="solid">solid</UIButton>
    <UIButton variant="soft">soft</UIButton>
    <UIButton variant="outline">outline</UIButton>
    <UIButton variant="ghost">ghost</UIButton>
  </PlaygroundExample>
</template>
