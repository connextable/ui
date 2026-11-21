<script setup lang="ts">
import { MenuButtonTrigger, type MenuPartProps, type MenuRootSlotProps } from "@sectile/vue/menu";
import { onBeforeUnmount } from "vue";
import UIPopupTriggerContent from "./UIPopupTriggerContent.vue";

defineOptions({ inheritAttrs: false });
const { as, asChild, size = "md", variant = "outline" } = defineProps<MenuPartProps & {
  size?: "sm" | "md" | "lg";
  variant?: "outline" | "soft";
}>();
defineSlots<{
  default?(state: MenuRootSlotProps): unknown;
  leading?(): unknown;
  trailing?(): unknown;
}>();

let pointerOpening: AbortController | undefined;
onBeforeUnmount(() => pointerOpening?.abort());

function keepTriggerFocusOnPointerOpen(event: MouseEvent) {
  pointerOpening?.abort();
  const trigger = event.currentTarget;
  if (!(trigger instanceof HTMLElement) || event.detail === 0 || event.defaultPrevented ||
    trigger.getAttribute("aria-expanded") !== "false") return;

  const popup = trigger.ownerDocument.getElementById(trigger.getAttribute("aria-controls") ?? "");
  if (!popup) return;

  // Sectile moves focus as soon as the opening menu finishes positioning.
  const opening = pointerOpening = new AbortController();
  const listen = { once: true, signal: opening.signal };
  popup.addEventListener("focusin", () => {
    opening.abort();
    trigger.focus({ preventScroll: true });
  }, listen);
  popup.addEventListener("pointerdown", () => opening.abort(), { ...listen, capture: true });
  trigger.addEventListener("keydown", () => opening.abort(), { ...listen, capture: true });

  // Wait for the native click handler before checking whether the menu accepted the open.
  window.setTimeout(() => {
    if (trigger.getAttribute("aria-expanded") !== "true") opening.abort();
  }, 0);
}
</script>

<template>
  <MenuButtonTrigger
    v-bind="$attrs"
    v-slot="state"
    :as="as"
    :as-child="asChild"
    :class="asChild ? undefined : 'ui-field-control ui-popup-trigger'"
    :data-ui-control-size="asChild ? undefined : size"
    :data-variant="asChild ? undefined : variant"
    @click.capture="keepTriggerFocusOnPointerOpen"
  >
    <slot v-if="asChild" v-bind="state" />
    <UIPopupTriggerContent v-else>
      <template v-if="$slots.leading" #leading><slot name="leading" /></template>
      <slot v-bind="state" />
      <template v-if="$slots.trailing" #trailing><slot name="trailing" /></template>
    </UIPopupTriggerContent>
  </MenuButtonTrigger>
</template>
