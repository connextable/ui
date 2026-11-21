<script setup lang="ts">
import { UIButton, UISelect } from "@connextable/ui";
import { computed, ref, useId } from "vue";

const sizes = (["sm", "md", "lg"] as const).map((value) => ({ value, label: value }));
const size = ref<string | null>("md");
const buttonSize = computed(() => sizes.find((option) => option.value === size.value)?.value);
const id = useId();
</script>

<template>
  <div class="button-size">
    <div class="ui-field">
      <label :for="id">크기</label>
      <UISelect :id="id" v-model="size" :options="sizes" size="sm" />
    </div>
    <UIButton :size="buttonSize">버튼</UIButton>
  </div>
</template>

<style scoped>
.button-size {
  display: flex;
  align-items: end;
  flex-wrap: wrap;
  gap: var(--ui-space-md);
}
</style>
