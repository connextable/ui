<script setup lang="ts">
withDefaults(
  defineProps<{
    type?: "button" | "reset" | "submit";
    disabled?: boolean;
  }>(),
  { type: "button" },
);
</script>

<template>
  <button class="ui-button" :type="type" :disabled="disabled">
    <slot />
  </button>
</template>

<style scoped>
.ui-button {
  min-block-size: var(--ui-control-height);
  padding-inline: var(--ui-control-padding-inline);
  border: 1px solid transparent;
  border-radius: var(--ui-control-radius);
  background: var(--ui-color-accent);
  color: var(--ui-color-on-accent);
  font: inherit;
  cursor: pointer;
}

.ui-button:focus-visible {
  outline: 2px solid var(--ui-color-focus);
  outline-offset: 2px;
}

.ui-button:disabled {
  opacity: 0.5;
  cursor: default;
}
</style>
