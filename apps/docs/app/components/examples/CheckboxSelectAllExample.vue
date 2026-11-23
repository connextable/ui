<script setup lang="ts">
import { UICheckbox, type UICheckboxValue } from "@connextable/ui";
import { computed, ref } from "vue";

const build = ref<UICheckboxValue>(false);
const typecheck = ref<UICheckboxValue>(false);

const all = computed<UICheckboxValue>({
  get: () => build.value === true && typecheck.value === true,
  set: (checked) => {
    build.value = checked === true;
    typecheck.value = checked === true;
  },
});
</script>

<template>
  <div role="group" aria-label="실행할 검사">
    <UICheckbox v-model="all" label="모두 선택" />
    <div class="checkbox-select-all__items">
      <UICheckbox v-model="build" label="빌드" />
      <UICheckbox v-model="typecheck" label="타입 검사" />
    </div>
  </div>
</template>

<style scoped>
.checkbox-select-all__items {
  display: grid;
  justify-items: start;
  margin-inline-start: 0.5rem;
  padding-inline-start: 0.5rem;
  border-inline-start: 1px solid var(--ui-color-divider);
}
</style>
