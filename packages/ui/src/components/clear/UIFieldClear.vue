<script setup lang="ts">
import { nextTick } from "vue";
import UIClearButton from "./UIClearButton.vue";
import { useFieldClear } from "./clearable";
import { clearFocusTarget } from "./clear-focus";

defineProps<{ label?: string }>();
const context = useFieldClear();
const visible = context?.visible;
const label = context?.label;
async function clear(event: MouseEvent) {
  if (!context) return;
  const target = clearFocusTarget(event);
  context.clear();
  await nextTick();
  target?.focus({ preventScroll: true });
}
</script>

<template>
  <UIClearButton v-if="visible" :label="$props.label ?? label" @click="clear" />
</template>
