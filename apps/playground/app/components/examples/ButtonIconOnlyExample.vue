<script setup lang="ts">
import { UIButton } from "@connextable/ui";
import { Plus } from "@lucide/vue";
import { ref } from "vue";
import source from "./ButtonIconOnlyExample.vue?example-code&raw";

const quantity = ref(1);
</script>

<template>
  <PlaygroundExample
    id="button-icon-only"
    title="아이콘 전용 버튼"
    description="icon-only로 원형 버튼을 만들고 aria-label로 동작을 설명합니다."
    :source="source"
    :heading-level="3"
  >
    <UIButton icon-only variant="outline" aria-label="수량 늘리기" @click="quantity++">
      <template #leading><Plus /></template>
    </UIButton>
    <template #footer>
      <output>수량 {{ quantity }}</output>
    </template>
  </PlaygroundExample>
</template>
