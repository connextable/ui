<script setup lang="ts">
import { UIMenubar } from "@connextable/ui";
import { ref } from "vue";

const commands = [
  { id: "file", parentID: null, label: "파일" },
  { id: "new-project", parentID: "file", label: "새 프로젝트" },
  { id: "open-project", parentID: "file", label: "프로젝트 열기", separatorBefore: true },
  { id: "edit", parentID: null, label: "편집" },
  { id: "undo", parentID: "edit", label: "실행 취소" },
  { id: "redo", parentID: "edit", label: "다시 실행" },
  { id: "help", parentID: null, label: "도움말" },
  { id: "shortcuts", parentID: "help", label: "키보드 단축키" },
];
const lastAction = ref("");
</script>

<template>
  <PlaygroundExample v-bind="$attrs as { id: string; title: string }">
    <UIMenubar :items="commands" label="앱 명령" @invoke="lastAction = $event" />
    <template #footer>
      <output>{{ commands.find(item => item.id === lastAction)?.label ?? "실행한 명령 없음" }}</output>
    </template>
  </PlaygroundExample>
</template>
