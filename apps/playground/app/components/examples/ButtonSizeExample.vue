<script setup lang="ts">
import { UIButton, UISelect } from "@connextable/ui";
import { computed, ref, useId } from "vue";
import source from "./ButtonSizeExample.vue?example-code&raw";

const sizes = (["sm", "md", "lg"] as const).map((value) => ({ value, label: value }));
const size = ref<string | null>("md");
const buttonSize = computed(() => sizes.find((option) => option.value === size.value)?.value);
const id = useId();
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
      <label :for="id">크기</label>
      <UISelect :id="id" v-model="size" :options="sizes" size="sm" />
    </template>
    <UIButton :size="buttonSize">버튼</UIButton>
  </PlaygroundExample>
</template>
