<script setup lang="ts">
import UIButton, { type UIButtonProps } from "./UIButton.vue";

defineOptions({ inheritAttrs: false });
const props = withDefaults(defineProps<Omit<UIButtonProps, "block" | "iconOnly">>(), {
  prefetch: undefined,
  noPrefetch: undefined,
});
const emit = defineEmits<{ click: [event: MouseEvent] }>();
defineSlots<{
  default?(): unknown;
  loading?(): unknown;
}>();
</script>

<template>
  <UIButton v-bind="{ ...$attrs, ...props }" icon-only @click="emit('click', $event)">
    <template #leading><slot /></template>
    <template v-if="$slots.loading" #loading><slot name="loading" /></template>
  </UIButton>
</template>
