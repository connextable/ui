<script setup lang="ts">
defineProps<{ value: string | number; label: string }>();
</script>

<template>
  <div class="ui-chart-center">
    <span class="ui-chart-center__summary">{{ value }} {{ label }}</span>
    <Transition name="ui-chart-center-content">
      <div :key="`${value}|${label}`" class="ui-chart-center__content" aria-hidden="true">
        <strong>{{ value }}</strong>
        <span>{{ label }}</span>
      </div>
    </Transition>
  </div>
</template>
