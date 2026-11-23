<script setup lang="ts">
import { UITreeSelect } from "@connextable/ui";
import { ref } from "vue";

const nodes = [
  { id: "design", parentID: null, label: "디자인" },
  { id: "ui", parentID: "design", label: "제품 디자인" },
  { id: "brand", parentID: "design", label: "브랜드" },
];
const teams = ref<readonly string[]>([]);
</script>

<template>
  <UITreeSelect v-model="teams" :nodes="nodes" label="팀 검색" />
</template>
