<script setup lang="ts">
import {
  UIMenuButton,
  UIMenuButtonContent,
  UIMenuButtonTrigger,
  UIMenuItem,
  UIMenuSeparator,
} from "@connextable/ui";

import { ref } from 'vue'

const lastAction = ref('')
const items = [
  { id: 'new-file', parentID: null },
  { id: 'new-folder', parentID: null },
  { id: 'import', parentID: null },
]

</script>

<template>
  <UIMenuButton :disabled-items="['import']" :items="items" @invoke="lastAction = $event">
    <UIMenuButtonTrigger>Create</UIMenuButtonTrigger>
    <UIMenuButtonContent>
      <UIMenuItem value="new-file">New file <kbd>⌘N</kbd></UIMenuItem>
      <UIMenuItem value="new-folder">New folder <kbd>⇧⌘N</kbd></UIMenuItem>
      <UIMenuSeparator />
      <UIMenuItem value="import">Import…</UIMenuItem>
    </UIMenuButtonContent>
  </UIMenuButton>
  <p v-if="lastAction" role="status">{{ lastAction }} invoked</p>
</template>
