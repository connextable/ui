<script setup lang="ts">
import { UISlider } from "@connextable/ui";
import { ref } from "vue";

const value = ref("40");
const formatValue = (value: string) => `${value} 퍼센트`;
</script>

<template>
  <PlaygroundExample v-bind="$attrs as { id: string; title: string }">
    <UISlider v-model="value" label="음량" min="0" max="100" step="1" :format-value="formatValue" />
    <template #footer><output>음량 <strong>{{ value }}%</strong></output></template>
  </PlaygroundExample>
</template>
