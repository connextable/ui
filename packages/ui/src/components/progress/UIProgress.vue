<script setup lang="ts">
import { ProgressIndicator, ProgressRoot, ProgressTrack } from "@sectile/vue/progress";

defineProps<{ label: string; value: number; max?: number }>();
</script>

<template>
  <ProgressRoot v-slot="{ percentage }" :label="label" :value="value" :max="max">
    <ProgressTrack class="ui-progress__track">
      <ProgressIndicator class="ui-progress__fill" :style="{ width: `${percentage}%` }" />
    </ProgressTrack>
  </ProgressRoot>
</template>

<style scoped>
.ui-progress__track {
  overflow: hidden;
  block-size: var(--ui-progress-height, 0.625rem);
  border-radius: 999px;
  background: var(--ui-color-accent-soft);
}

.ui-progress__fill {
  block-size: 100%;
  border-radius: inherit;
  background: var(--ui-color-accent);
  transition: width var(--ui-motion-standard) var(--ui-ease-out);
}

@media (forced-colors: active) {
  .ui-progress__track {
    outline: 1px solid CanvasText;
  }

  .ui-progress__fill {
    forced-color-adjust: none;
    background: Highlight;
  }
}
</style>
