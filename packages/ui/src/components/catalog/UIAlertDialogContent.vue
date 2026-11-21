<script setup lang="ts">
import { AlertDialogContent } from "@sectile/vue/alert-dialog";
import type { Component } from "vue";
import DialogLayout from "./DialogLayout.vue";

const { as, asChild } = defineProps<{ as?: string | Component; asChild?: boolean }>();
defineSlots<{
  default?(): unknown;
  "footer-leading"?(): unknown;
  actions?(): unknown;
}>();
</script>

<template>
  <AlertDialogContent :as="as" :as-child="asChild" :class="{ 'ui-dialog-panel': !asChild }">
    <slot v-if="asChild" />
    <DialogLayout v-else animate-size>
      <slot />
      <template v-if="$slots['footer-leading']" #footer-leading><slot name="footer-leading" /></template>
      <template v-if="$slots.actions" #actions><slot name="actions" /></template>
    </DialogLayout>
  </AlertDialogContent>
</template>
