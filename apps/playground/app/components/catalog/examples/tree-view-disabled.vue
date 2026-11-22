<script setup lang="ts">
import { UITreeView } from "@connextable/ui";
import { FileCode, Folder } from "@lucide/vue";
import { ref } from "vue";

const nodes = [
  { id: "dashboard", parentID: null, label: "대시보드", icon: Folder },
  { id: "overview", parentID: "dashboard", label: "Overview.vue", icon: FileCode },
  { id: "settings", parentID: "dashboard", label: "Settings.vue", icon: FileCode },
];
const selected = ref<readonly string[]>(["overview"]);
</script>

<template>
  <UITreeView
    v-model="selected"
    :nodes="nodes"
    :disabled-items="['settings']"
    :default-expanded-values="['dashboard']"
    label="대시보드 프로젝트 파일"
  />
</template>
