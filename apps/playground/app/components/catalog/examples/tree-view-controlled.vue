<script setup lang="ts">
import { UIButton, UITreeView } from "@connextable/ui";
import { FileCode, Folder } from "@lucide/vue";
import { ref } from "vue";

const nodes = [
  { id: "app", parentID: null, label: "앱", icon: Folder },
  { id: "views", parentID: "app", label: "화면", icon: Folder },
  { id: "overview", parentID: "views", label: "Overview.vue", icon: FileCode },
  { id: "tokens", parentID: "app", label: "tokens.ts", icon: FileCode },
];
const expandedValues = ref<readonly string[]>([]);
const selected = ref<readonly string[]>(["overview"]);
</script>

<template>
  <UIButton size="sm" @click="expandedValues = ['app', 'views']">모두 펼치기</UIButton>
  <UITreeView
    v-model="selected"
    v-model:expanded-values="expandedValues"
    :nodes="nodes"
    label="앱 프로젝트 파일"
  />
</template>
