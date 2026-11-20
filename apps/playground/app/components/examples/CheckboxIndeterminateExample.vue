<script setup lang="ts">
import { UIButton, UICheckbox, type UICheckboxValue } from "@connextable/ui";
import { ref } from "vue";

const checked = ref<UICheckboxValue>("indeterminate");
</script>

<template>
  <div class="checkbox-indeterminate">
    <UICheckbox v-model="checked" label="선택 상태" />
    <UIButton variant="outline" size="sm" @click="checked = 'indeterminate'">혼합 상태로 되돌리기</UIButton>
  </div>
</template>

<style scoped>
.checkbox-indeterminate {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
}
</style>
