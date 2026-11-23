<script setup lang="ts">
import { UISlider } from "@connextable/ui";
import { ref } from "vue";

const volume = ref("50");
</script>

<template>
  <PlaygroundExample v-bind="$attrs as { id: string; title: string }">
    <UISlider v-model="volume" min="0" max="100" step="25" label="볼륨" />
    <template #footer><output>볼륨 <strong>{{ volume }}%</strong></output></template>
  </PlaygroundExample>
</template>
