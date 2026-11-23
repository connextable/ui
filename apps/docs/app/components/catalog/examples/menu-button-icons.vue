<script setup lang="ts">
import { UIMenuButton } from "@connextable/ui";
import { FilePlus, FolderPlus, Plus } from "@lucide/vue";

const commands = [
  { id: "file", parentID: null, label: "새 파일", icon: FilePlus },
  { id: "folder", parentID: null, label: "새 폴더", icon: FolderPlus },
];
</script>

<template>
  <UIMenuButton :items="commands" trigger-label="만들기" :trigger-icon="Plus" />
</template>
