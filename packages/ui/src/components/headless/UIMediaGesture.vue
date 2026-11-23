<script setup lang="ts">
import { useMediaGesture, type MediaGestureEnd, type MediaGestureErrorCode, type MediaGestureInput,
  type MediaPointerAdmission, type UseMediaGestureOptions, type UseMediaGestureReturn } from "@sectile/vue/media-gesture";
import { Primitive, type PrimitiveAs } from "@sectile/vue/primitive";
import { computed, shallowRef } from "vue";

const props = defineProps<{
  as?: PrimitiveAs;
  asChild?: boolean;
  disabled?: boolean;
  start: UseMediaGestureOptions["onStart"];
  admitPointer?: (input: MediaPointerAdmission) => boolean;
  dragThreshold?: number;
}>();
const emit = defineEmits<{ move: [input: MediaGestureInput]; end: [reason: MediaGestureEnd] }>();
defineSlots<{
  default(state: Pick<UseMediaGestureReturn, "cancel" | "measure"> & { error: MediaGestureErrorCode | undefined }): unknown;
}>();

const element = shallowRef<HTMLElement | null>(null);
function setElement(value: unknown) {
  element.value = value instanceof HTMLElement ? value : null;
}
const { cancel, measure, error } = useMediaGesture({
  element,
  active: computed(() => !props.disabled),
  dragThreshold: props.dragThreshold ?? 4,
  admitPointer: input => props.admitPointer?.(input) ?? !input.protectedOrigin,
  onStart: input => props.start(input),
  onMove: input => emit("move", input),
  onEnd: reason => emit("end", reason),
});
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :element-ref="setElement">
    <slot :cancel="cancel" :measure="measure" :error="error" />
  </Primitive>
</template>
