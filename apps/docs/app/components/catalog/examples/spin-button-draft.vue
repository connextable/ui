<script setup lang="ts">
import { UISpinButton } from "@connextable/ui";
import { ref } from "vue";

const amount = ref("24");
</script>

<template>
  <PlaygroundExample v-bind="$attrs as { id: string; title: string }">
    <UISpinButton v-model="amount" min="0" max="120" step="0.5" label="예상 처리 시간" placeholder="예: 12.5" unit="분" layout="field" />
    <template #footer><output>확정 시간 <strong>{{ amount }}분</strong></output></template>
  </PlaygroundExample>
</template>
