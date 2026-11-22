<script setup lang="ts">
import UISpinner from "../progress/UISpinner.vue";
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
    <template v-if="$slots.default" #leading><slot /></template>
    <template #loading><slot name="loading"><UISpinner /></slot></template>
  </UIButton>
</template>
