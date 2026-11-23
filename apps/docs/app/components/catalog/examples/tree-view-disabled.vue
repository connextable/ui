<script setup lang="ts">
import { UITreeView } from "@connextable/ui";
import { ref } from "vue";

const nodes = [
  { id: "dashboard", parentID: null, label: "대시보드" },
  { id: "overview", parentID: "dashboard", label: "Overview.vue" },
  { id: "settings", parentID: "dashboard", label: "Settings.vue" },
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
