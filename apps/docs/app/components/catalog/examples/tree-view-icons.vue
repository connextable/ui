<script setup lang="ts">
import { UITreeView } from "@connextable/ui";
import { FileCode, Folder } from "@lucide/vue";
import { ref } from "vue";

const nodes = [
  { id: "src", parentID: null, label: "src", icon: Folder },
  { id: "app", parentID: "src", label: "App.vue", icon: FileCode },
  { id: "tokens", parentID: "src", label: "tokens.ts", icon: FileCode },
];
const selected = ref<readonly string[]>([]);
</script>

<template>
  <UITreeView
    v-model="selected"
    :nodes="nodes"
    :default-expanded-values="['src']"
    label="프로젝트 파일"
  />
</template>
