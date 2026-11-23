<script setup lang="ts">
import { UIButton, UIContextMenu } from "@connextable/ui";
import { Copy, Pin } from "@lucide/vue";

const commands = [
  { id: "copy", parentID: null, label: "문서 복제", icon: Copy },
  { id: "pin", parentID: null, label: "상단에 고정", icon: Pin },
];
</script>

<template>
  <UIContextMenu :items="commands" label="문서 작업">
    <template #trigger>
      <UIButton variant="outline" aria-keyshortcuts="Shift+F10">회의 기록</UIButton>
    </template>
  </UIContextMenu>
</template>
