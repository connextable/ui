import { computed, onBeforeUnmount, onMounted, shallowRef } from "vue";

export function useAppearanceMotion(fromHidden: () => boolean) {
  const ready = shallowRef<true>();
  let frame = 0;

  onMounted(() => {
    // Allow the browser to paint the initial geometry before enabling entry transitions.
    frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => { ready.value = true; });
    });
  });
  onBeforeUnmount(() => cancelAnimationFrame(frame));

  return computed(() => ({
    "data-ui-motion-ready": ready.value,
    "data-ui-motion-from-hidden": fromHidden() || undefined,
  }));
}
