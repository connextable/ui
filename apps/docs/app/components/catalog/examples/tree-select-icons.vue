<script setup lang="ts">
import { UITreeSelect } from "@connextable/ui";
import { Folder, Palette } from "@lucide/vue";
import { ref } from "vue";

const nodes = [
  { id: "design", parentID: null, label: "디자인", icon: Folder },
  { id: "brand", parentID: "design", label: "브랜드", icon: Palette },
];
const team = ref<readonly string[]>([]);
</script>

<template>
  <UITreeSelect
    v-model="team"
    :nodes="nodes"
    :default-expanded-values="['design']"
    label="팀 선택"
  />
</template>
