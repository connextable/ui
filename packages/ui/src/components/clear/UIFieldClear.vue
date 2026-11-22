<script setup lang="ts">
import { nextTick } from "vue";
import UIClearButton from "./UIClearButton.vue";
import { useFieldClear } from "./clearable";
import { resolveClearFocus } from "./clear-focus";

defineProps<{ label?: string; text?: boolean; footer?: boolean }>();
const context = useFieldClear();
const visible = context?.visible;
const label = context?.label;
async function clear(event: MouseEvent) {
  if (!context) return;
  const restoreFocus = resolveClearFocus(event);
  context.clear();
  await nextTick();
  restoreFocus();
}
</script>

<template>
  <div v-if="visible && footer" class="ui-clearable-footer">
    <UIClearButton :label="$props.label ?? label" @click="clear" />
  </div>
  <UIClearButton v-else-if="visible" :label="$props.label ?? label" :text="text" @click="clear" />
</template>
