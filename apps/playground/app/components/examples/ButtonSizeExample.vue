<script setup lang="ts">
import { UIButton } from "@connextable/ui";
import { computed, ref } from "vue";
import source from "./ButtonSizeExample.vue?example-code&raw";

const sizes = (["sm", "md", "lg"] as const).map((value) => ({ value, label: value }));
const size = ref<string | null>("md");
const buttonSize = computed(() => sizes.find((option) => option.value === size.value)?.value);
</script>

<template>
  <PlaygroundExample
    id="button-size"
    title="크기"
    description="크기를 선택해 size에 따른 버튼 높이를 비교합니다."
    :source="source"
    :heading-level="3"
  >
    <template #header>
      <span aria-hidden="true">크기</span>
      <UISelect v-model="size" :options="sizes" aria-label="크기" size="sm" />
    </template>
    <UIButton :size="buttonSize">버튼</UIButton>
  </PlaygroundExample>
</template>
