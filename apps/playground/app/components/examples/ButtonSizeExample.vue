<script setup lang="ts">
import { UIButton, UISelect } from "@connextable/ui";
import { computed, ref } from "vue";

const sizes = (["sm", "md", "lg"] as const).map((value) => ({ value, label: value }));
const size = ref<string | null>("md");
const buttonSize = computed(() => sizes.find((option) => option.value === size.value)?.value);
</script>

<template>
  <div class="button-size">
    <UISelect v-model="size" label="크기" :options="sizes" size="sm" />
    <UIButton :size="buttonSize">버튼</UIButton>
  </div>
</template>

<style scoped>
.button-size {
  display: flex;
  align-items: end;
  flex-wrap: wrap;
  gap: 0.75rem;
}
</style>
