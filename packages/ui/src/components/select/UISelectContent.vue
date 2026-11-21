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
  overflow: clip;
}

.ui-select-content[data-width="trigger"] {
  --ui-popup-width: var(--ui-popup-anchor-width);
  --ui-popup-max-width: var(--ui-popup-available-width);
}

.ui-select-content__viewport {
  max-block-size: max(0px, calc(var(--ui-popup-max-height) - var(--ui-popup-padding) * 2 - 2px));
  overflow-y: auto;
  overscroll-behavior: contain;
}
</style>
