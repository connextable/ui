<script setup lang="ts">
import { useSelectContext } from "./select-context";

const { uid, triggerId, label } = useSelectContext();
</script>

<template>
  <label :id="`${uid}-label`" :for="triggerId" class="ui-select-label">
    <slot>{{ label }}</slot>
  </label>
</template>

<style scoped>
.ui-select-label {
  font-family: var(--ui-font-sans);
  font-size: var(--ui-font-size-body-sm);
  font-weight: 600;
  line-height: 1.35;
}
</style>
