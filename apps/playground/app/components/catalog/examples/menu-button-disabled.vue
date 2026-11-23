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
const labels: Record<string, string> = {
  'new-file': '새 파일',
  'new-folder': '새 폴더',
  'import': '가져오기…',
}
const items = [
  { id: 'new-file', parentID: null },
  { id: 'new-folder', parentID: null },
  { id: 'import', parentID: null },
]

</script>

<template>
  <PlaygroundExample v-bind="$attrs as { id: string; title: string }">
    <UIMenuButton :disabled-items="['import']" :items="items" @invoke="lastAction = $event">
      <UIMenuButtonTrigger>만들기</UIMenuButtonTrigger>
      <UIMenuButtonContent>
        <UIMenuItem value="new-file">새 파일 <kbd>⌘ N</kbd></UIMenuItem>
        <UIMenuItem value="new-folder">새 폴더 <kbd>⇧ ⌘ N</kbd></UIMenuItem>
        <UIMenuSeparator />
        <UIMenuItem value="import">가져오기…</UIMenuItem>
      </UIMenuButtonContent>
    </UIMenuButton>
    <template #footer v-if="lastAction">
      <output>{{ labels[lastAction] }} 실행</output>
    </template>
  </PlaygroundExample>
</template>
