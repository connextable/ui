<script setup lang="ts">
defineProps<{ minimum: number; maximum: number; label: string }>();
</script>

<template>
  <div class="ui-chart-scale-legend" role="group" :aria-label="label">
    <span>{{ label }}</span>
    <span>{{ minimum }}</span>
    <span class="ui-chart-scale-legend__ramp" aria-hidden="true" />
    <span>{{ maximum }}</span>
  </div>
</template>
