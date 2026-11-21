<script setup lang="ts">
import { DrawerClose, DrawerContent, type DrawerPartProps } from "@sectile/vue/drawer";
import DialogLayout from "./DialogLayout.vue";
import OverlayPanelClose from "./OverlayPanelClose.vue";

const { as, asChild, showClose = true, closeLabel = "닫기" } = defineProps<DrawerPartProps & {
  showClose?: boolean;
  closeLabel?: string;
}>();

defineSlots<{
  default?(): unknown;
  "footer-leading"?(): unknown;
  actions?(): unknown;
}>();
</script>

<template>
  <DrawerContent :as="as" :as-child="asChild" class="ui-drawer-panel" :class="{
    'ui-dialog-panel ui-inset-frame': !asChild,
    'ui-dialog-panel--with-close': !asChild && showClose,
  }">
    <slot v-if="asChild" />
    <DialogLayout v-else>
      <slot />
      <template v-if="$slots['footer-leading']" #footer-leading><slot name="footer-leading" /></template>
      <template v-if="$slots.actions" #actions><slot name="actions" /></template>
      <template v-if="showClose" #close>
        <OverlayPanelClose :part="DrawerClose" :label="closeLabel" />
      </template>
    </DialogLayout>
  </DrawerContent>
</template>
