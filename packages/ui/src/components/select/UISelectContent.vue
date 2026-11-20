<script setup lang="ts">
import { SelectContent, SelectViewport } from "@sectile/vue/select";
import UISelectItem from "./UISelectItem.vue";
import { useSelectContext } from "./select-context";

defineProps<{ width?: "fit" | "trigger" }>();

const { options } = useSelectContext();
</script>

<template>
  <SelectContent class="ui-select-content" :data-width="width ?? 'fit'">
    <SelectViewport class="ui-select-content__viewport">
      <slot>
        <UISelectItem v-for="option in options" :key="option.value" v-bind="option" />
      </slot>
    </SelectViewport>
  </SelectContent>
</template>

<style scoped>
.ui-select-content {
  --ui-select-available-width: var(--sectile-position-available-width, calc(100vw - 1rem));
  --ui-select-anchor-width: min(
    var(--sectile-position-anchor-width, 9rem), var(--ui-select-available-width)
  );
  --ui-select-content-radius: var(--ui-radius-lg);
  --ui-select-content-padding: var(--ui-space-xs);

  z-index: var(--ui-layer-floating);
  box-sizing: border-box;
  inline-size: max-content;
  min-inline-size: var(--ui-select-anchor-width);
  max-inline-size: min(var(--ui-select-available-width), 25rem);
  padding: var(--ui-select-content-padding);
  border: 1px solid var(--ui-color-border);
  border-radius: var(--ui-select-content-radius);
  background: var(--ui-color-surface);
  color: var(--ui-color-text);
  font-family: var(--ui-font-sans);
  box-shadow: var(--ui-shadow-elevated);
  opacity: 0;
  scale: 1 0.98;
  transform-origin: center top;
  transition:
    opacity var(--ui-motion-fast) var(--ui-ease-out),
    scale var(--ui-motion-fast) var(--ui-ease-out);
}

.ui-select-content[data-side="top"] {
  transform-origin: center bottom;
}

.ui-select-content[data-width="trigger"] {
  inline-size: var(--ui-select-anchor-width);
  max-inline-size: var(--ui-select-available-width);
}

.ui-select-content[data-state="open"] {
  opacity: 1;
  scale: 1;
  transition:
    opacity var(--ui-motion-fast) var(--ui-ease-out),
    scale var(--ui-motion-standard) var(--ui-ease-out);
}

.ui-select-content[data-state="closed"] {
  pointer-events: none;
}

@starting-style {
  .ui-select-content[data-state="open"] {
    opacity: 0;
    scale: 1 0.96;
  }
}

.ui-select-content__viewport {
  max-block-size: min(18rem, calc(var(--sectile-position-available-height, 18rem) - var(--ui-select-content-padding) * 2 - 2px));
  overflow-y: auto;
  overscroll-behavior: contain;
}
</style>
