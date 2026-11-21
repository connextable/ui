<script setup lang="ts">
import {
  UIMenu,
  UIMenuItem,
  UIMenuSeparator,
} from "@connextable/ui";

import { ref } from 'vue'

const lastAction = ref('')
const labels: Record<string, string> = {
  'new-project': '새 프로젝트',
  'open-project': '프로젝트 열기',
  'save-project': '프로젝트 저장',
}
const items = [
  { id: 'new-project', parentID: null },
  { id: 'open-project', parentID: null },
  { id: 'save-project', parentID: null },
]

</script>

<template>
  <UIMenu :disabled-items="['save-project']" :items="items" @invoke="lastAction = $event">
    <UIMenuItem value="new-project">새 프로젝트 <kbd>⌘N</kbd></UIMenuItem>
    <UIMenuItem value="open-project">프로젝트 열기 <kbd>⌘O</kbd></UIMenuItem>
    <UIMenuSeparator />
    <UIMenuItem value="save-project">프로젝트 저장 <kbd>⌘S</kbd></UIMenuItem>
  </UIMenu>
  <p v-if="lastAction" role="status">{{ labels[lastAction] }} 실행</p>
</template>
