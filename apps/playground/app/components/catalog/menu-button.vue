<script setup lang="ts">
import {
  UIMenuButton,
  UIMenuButtonContent,
  UIMenuButtonTrigger,
  UIMenuItem,
  UIMenuSeparator,
} from "@connextable/ui";
import { ref } from "vue";

const lastAction = ref("");
const commands = [
  { id: "new-file", parentID: null, label: "새 파일", shortcut: "⌘ N" },
  { id: "new-folder", parentID: null, label: "새 폴더", shortcut: "⇧ ⌘ N" },
];
const items = [...commands, { id: "import", parentID: null }];
const commandLabels = new Map([...commands.map(({ id, label }) => [id, label] as const), ["import", "가져오기…"]]);
</script>

<template>
  <div class="ui-field-layout">
    <UIMenuButton :items="items" @invoke="lastAction = $event">
      <UIMenuButtonTrigger>만들기</UIMenuButtonTrigger>
      <UIMenuButtonContent>
        <UIMenuItem v-for="{ id, label, shortcut } in commands" :key="id" :value="id">
          {{ label }} <kbd>{{ shortcut }}</kbd>
        </UIMenuItem>
        <UIMenuSeparator />
        <UIMenuItem value="import">가져오기…</UIMenuItem>
      </UIMenuButtonContent>
    </UIMenuButton>
    <output>{{ lastAction ? `실행한 명령 · ${commandLabels.get(lastAction)}` : "실행한 명령 없음" }}</output>
  </div>
</template>
