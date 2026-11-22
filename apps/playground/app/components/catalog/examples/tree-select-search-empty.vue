<script setup lang="ts">
import { UITreeSelect } from "@connextable/ui";
import { ref } from "vue";

const nodes = [
  { id: "design", parentID: null, label: "디자인" },
  { id: "ui", parentID: "design", label: "화면" },
  { id: "brand", parentID: "design", label: "브랜드" },
];
const teams = ref<readonly string[]>([]);
</script>

<template>
  <UITreeSelect
    v-model="teams"
    :nodes="nodes"
    :default-expanded-values="['design']"
    label="팀 검색"
    placeholder="예시: 화면"
  />
</template>
