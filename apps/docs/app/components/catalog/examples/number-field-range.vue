<script setup lang="ts">
import { UINumberField } from "@connextable/ui";
import { ref } from "vue";

const value = ref<string | null>("50");
const policies = { min: "0", max: "100" };
</script>

<template>
  <PlaygroundExample v-bind="$attrs as { id: string; title: string }">
    <label class="ui-field">
      할인율 (%)
      <UINumberField v-model="value" :policies="policies" placeholder="예: 10" />
    </label>
    <template #footer><output>확정한 값 · {{ value ?? "없음" }}</output></template>
  </PlaygroundExample>
</template>
