<script setup lang="ts">
import { TextField } from "@sectile/vue/text";

const props = defineProps<{
  id?: string;
  name?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  placeholder?: string;
}>();

const value = defineModel<string>({ required: true });
</script>

<template>
  <TextField
    v-bind="props"
    class="ui-input"
    :model-value="value"
    @update:model-value="value = String($event)"
  />
</template>

<style scoped>
.ui-input {
  box-sizing: border-box;
  inline-size: 100%;
  min-block-size: var(--ui-control-height);
  padding-inline: var(--ui-control-padding-inline);
  border: 1px solid var(--ui-color-border);
  border-radius: var(--ui-control-radius);
  background: var(--ui-color-surface);
  color: var(--ui-color-text);
  font: inherit;
}

.ui-input:focus-visible {
  outline: 2px solid var(--ui-color-focus);
  outline-offset: 2px;
}

.ui-input:disabled {
  opacity: 0.5;
}
</style>
