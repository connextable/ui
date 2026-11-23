<script setup lang="ts">
import { UIMenu } from "@connextable/ui";
import { FolderOpen, Plus, Save } from "@lucide/vue";

const commands = [
  { id: "new", parentID: null, label: "새 프로젝트", icon: Plus },
  { id: "open", parentID: null, label: "프로젝트 열기", icon: FolderOpen },
  { id: "save", parentID: null, label: "저장", icon: Save },
];
</script>

<template>
  <UIMenu :items="commands" label="프로젝트 명령" />
</template>
