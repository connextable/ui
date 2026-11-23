<script setup lang="ts">
import { provideUIConfirmation, type UIConfirmOptions } from "./confirm";

defineSlots<{
  default(state: { confirm(request: UIConfirmOptions): Promise<boolean> }): unknown;
  dialog(state: { open: boolean; request: Readonly<UIConfirmOptions>; accept(): void; cancel(): void }): unknown;
}>();

const { open, request, settle, confirm: start } = provideUIConfirmation();
const owner = Symbol();
const confirm = (options: UIConfirmOptions) => start(options, owner);
const accept = () => settle(true);
const cancel = () => settle(false);
</script>

<template>
  <slot :confirm="confirm" />
  <slot v-if="request" name="dialog" :open="open" :request="request" :accept="accept" :cancel="cancel" />
</template>
