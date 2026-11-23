<script setup lang="ts">
import { useFullscreen, type FullscreenErrorCode, type FullscreenSnapshot, type UseFullscreenReturn } from "@sectile/vue/fullscreen";
import { Primitive, type PrimitiveAs } from "@sectile/vue/primitive";
import { computed, shallowRef } from "vue";

const props = defineProps<{ as?: PrimitiveAs; asChild?: boolean; disabled?: boolean }>();
type FullscreenControls = Pick<UseFullscreenReturn, "enter" | "exit">;
defineSlots<{
  default(state: FullscreenControls & { snapshot: FullscreenSnapshot | undefined; error: FullscreenErrorCode | undefined }): unknown;
}>();

const element = shallowRef<HTMLElement | null>(null);
function setElement(value: unknown) {
  element.value = value instanceof HTMLElement ? value : null;
}
const { snapshot, error, enter, exit } = useFullscreen({ element, active: computed(() => !props.disabled) });
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :element-ref="setElement">
    <slot :snapshot="snapshot" :error="error" :enter="enter" :exit="exit" />
  </Primitive>
</template>
