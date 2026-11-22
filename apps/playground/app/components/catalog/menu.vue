<script setup lang="ts">
import { FolderOpen, Plus, Save } from "@lucide/vue";
import { UIMenu } from "@connextable/ui";
import { ref } from "vue";

const commands = [
  { id: "new-project", parentID: null, label: "새 프로젝트", icon: Plus },
  { id: "open-project", parentID: null, label: "프로젝트 열기", icon: FolderOpen },
  { id: "save-project", parentID: null, label: "프로젝트 저장", icon: Save },
];
const lastAction = ref("");
</script>

<template>
  <PlaygroundExample v-bind="$attrs as { id: string; title: string }">
    <UIMenu :items="commands" label="프로젝트 명령" @invoke="lastAction = $event" />
    <template #footer>
      <output>{{ commands.find(item => item.id === lastAction)?.label ?? "실행한 명령 없음" }}</output>
    </template>
  </PlaygroundExample>
</template>
