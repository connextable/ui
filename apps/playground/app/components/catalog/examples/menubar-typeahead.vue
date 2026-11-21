<script setup lang="ts">
import {
  UIMenubar,
  UIMenubarContent,
  UIMenubarItem,
  UIMenubarSeparator,
} from "@connextable/ui";

import { ref } from 'vue'

const lastAction = ref('')
const items = [
  { id: 'file', parentID: null },
  { id: 'new-project', parentID: 'file' },
  { id: 'open-project', parentID: 'file' },
  { id: 'edit', parentID: null },
  { id: 'undo', parentID: 'edit' },
  { id: 'redo', parentID: 'edit' },
  { id: 'help', parentID: null },
  { id: 'shortcuts', parentID: 'help' },
]

const labels: Record<string, string> = {
  file: '파일',
  'new-project': '새 프로젝트',
  'open-project': '프로젝트 열기',
  edit: '편집',
  undo: '실행 취소',
  redo: '다시 실행',
  help: '도움말',
  shortcuts: '키보드 단축키',
}
const searchAliases: Record<string, string> = { undo: 'Undo', redo: 'Redo' }
const textValue = (id: string) => searchAliases[id] ?? labels[id] ?? id

</script>

<template>
  <UIMenubar
    :items="items"
    :text-value="textValue"
    default-highlighted-value="file"
    label="팀 도구 메뉴"
    @invoke="lastAction = $event"
  >
    <UIMenubarItem value="file" as="button">파일</UIMenubarItem>
    <UIMenubarContent for="file">
      <UIMenubarItem value="new-project" as="button">새 프로젝트</UIMenubarItem>
      <UIMenubarSeparator />
      <UIMenubarItem value="open-project" as="button">프로젝트 열기</UIMenubarItem>
    </UIMenubarContent>
    <UIMenubarItem value="edit" as="button">편집</UIMenubarItem>
    <UIMenubarContent for="edit">
      <UIMenubarItem value="undo" as="button">실행 취소</UIMenubarItem>
      <UIMenubarItem value="redo" as="button">다시 실행</UIMenubarItem>
    </UIMenubarContent>
    <UIMenubarItem value="help" as="button">도움말</UIMenubarItem>
    <UIMenubarContent for="help">
      <UIMenubarItem value="shortcuts" as="button">키보드 단축키</UIMenubarItem>
    </UIMenubarContent>
  </UIMenubar>
  <p role="status">{{ lastAction ? labels[lastAction] + ' 실행' : '명령을 선택하세요.' }}</p>
</template>
