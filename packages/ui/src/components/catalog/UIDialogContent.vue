<script setup lang="ts">
import { DialogClose, DialogContent, type DialogPartProps } from "@sectile/vue/dialog";
import DialogLayout from "./DialogLayout.vue";
import OverlayPanelClose from "./OverlayPanelClose.vue";

const { as, asChild, showClose = true, closeLabel = "닫기" } = defineProps<DialogPartProps & {
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
  <DialogContent :as="as" :as-child="asChild" :class="{
    'ui-dialog-panel ui-inset-frame': !asChild,
    'ui-dialog-panel--with-close': !asChild && showClose,
  }">
    <slot v-if="asChild" />
    <DialogLayout v-else animate-size>
      <slot />
      <template v-if="$slots['footer-leading']" #footer-leading><slot name="footer-leading" /></template>
      <template v-if="$slots.actions" #actions><slot name="actions" /></template>
      <template v-if="showClose" #close>
        <OverlayPanelClose :part="DialogClose" :label="closeLabel" />
      </template>
    </DialogLayout>
  </DialogContent>
</template>
