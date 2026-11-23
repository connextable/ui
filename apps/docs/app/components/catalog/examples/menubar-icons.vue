<script setup lang="ts">
import { UIMenubar } from "@connextable/ui";
import { FolderOpen, Save } from "@lucide/vue";

const commands = [
  { id: "file", parentID: null, label: "파일" },
  { id: "open", parentID: "file", label: "프로젝트 열기", icon: FolderOpen },
  { id: "save", parentID: "file", label: "저장", icon: Save },
];
</script>

<template>
  <UIMenubar :items="commands" label="프로젝트 메뉴" />
</template>
