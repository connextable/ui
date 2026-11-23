<script setup lang="ts">
import { UIMenuButton } from "@connextable/ui";
import { ref } from "vue";

const commands = [
  { id: "new-file", parentID: null, label: "새 파일", shortcut: "⌘ N" },
  { id: "new-folder", parentID: null, label: "새 폴더", shortcut: "⇧ ⌘ N" },
  { id: "import", parentID: null, label: "가져오기…", separatorBefore: true },
];
const lastAction = ref("");
</script>

<template>
  <PlaygroundExample v-bind="$attrs as { id: string; title: string }">
    <UIMenuButton :items="commands" trigger-label="만들기" @invoke="lastAction = $event" />
    <template #footer>
      <output>{{ commands.find(item => item.id === lastAction)?.label ?? "실행한 명령 없음" }}</output>
    </template>
  </PlaygroundExample>
</template>
