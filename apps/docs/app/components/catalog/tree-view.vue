<script setup lang="ts">
import { UITreeView } from "@connextable/ui";
import { ref } from "vue";

const nodes = [
  { id: "atlas", parentID: null, label: "아틀라스 작업 공간" },
  { id: "apps", parentID: "atlas", label: "앱" },
  { id: "dashboard", parentID: "apps", label: "대시보드" },
  { id: "overview", parentID: "dashboard", label: "Overview.vue" },
  { id: "settings", parentID: "dashboard", label: "Settings.vue" },
  { id: "packages", parentID: "atlas", label: "패키지" },
  { id: "tokens", parentID: "packages", label: "tokens.ts" },
];
const expanded = ref(["atlas", "apps", "dashboard", "packages"]);
const selected = ref<readonly string[]>(["settings"]);
</script>

<template>
  <UITreeView
    v-model="selected"
    v-model:expanded-values="expanded"
    :nodes="nodes"
    label="아틀라스 프로젝트 파일"
  />
</template>
