<script setup lang="ts">
import { UIButton } from "@connextable/ui";
import { ref } from "vue";
import source from "./ButtonExample.vue?example-code&raw";

const count = ref(0);
</script>

<template>
  <PlaygroundExample
    id="button-example"
    title="기본 동작"
    description="click 이벤트로 버튼 동작을 연결합니다."
    :source="source"
  >
    <UIButton @click="count++">실행</UIButton>
    <template #footer>
      <output>실행 횟수 {{ count }}</output>
    </template>
  </PlaygroundExample>
</template>
