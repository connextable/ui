<script setup lang="ts">
import { UIButton } from "@connextable/ui";
import source from "./ButtonDisabledExample.vue?example-code&raw";
</script>

<template>
  <PlaygroundExample
    id="button-disabled"
    title="비활성"
    description="disabled를 지정하면 눌러도 동작하지 않습니다."
    :source="source"
    :heading-level="3"
  >
    <UIButton disabled>실행</UIButton>
  </PlaygroundExample>
</template>
