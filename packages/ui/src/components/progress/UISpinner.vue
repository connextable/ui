<script setup lang="ts">
import UISpinnerArc from "./UISpinnerArc.vue";
import UISpinnerSpokes from "./UISpinnerSpokes.vue";
import UISpinnerWave from "./UISpinnerWave.vue";

defineProps<{ label?: string; variant?: "spoke" | "wave" | "arc" }>();
</script>

<template>
  <span
    class="ui-spinner"
    :role="label ? 'status' : undefined"
    :aria-label="label"
    :aria-hidden="label ? undefined : true"
  >
    <UISpinnerWave v-if="variant === 'wave'" />
    <UISpinnerArc v-else-if="variant === 'arc'" />
    <UISpinnerSpokes v-else />
  </span>
</template>

<style scoped>
.ui-spinner {
  --ui-spinner-ease: cubic-bezier(0.645, 0.045, 0.355, 1);
  --ui-spinner-stagger: 120ms;

  display: inline-grid;
  flex: none;
  inline-size: var(--ui-control-size-icon, 1.25rem);
  block-size: var(--ui-control-size-icon, 1.25rem);
}
</style>
