<script setup lang="ts">
import { UINumberField } from "@connextable/ui";
import { ref } from "vue";

const value = ref<string | null>("2");
</script>

<template>
  <PlaygroundExample v-bind="$attrs as { id: string; title: string }">
    <label class="ui-field">
      온도 편차 (°C)
      <UINumberField v-model="value" placeholder="예: -3" />
    </label>
    <template #footer><output>확정한 편차 · {{ value ?? "없음" }}</output></template>
  </PlaygroundExample>
</template>
