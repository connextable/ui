<script setup lang="ts">
import { UITreeSelect } from "@connextable/ui";
import { ref } from "vue";

const nodes = [
  { id: "design", parentID: null, label: "디자인" },
  { id: "ui", parentID: "design", label: "제품 디자인" },
  { id: "brand", parentID: "design", label: "브랜드" },
];

const team = ref<readonly string[]>([]);
</script>

<template>
  <UITreeSelect
    v-model="team"
    :nodes="nodes"
    :default-expanded-values="['design']"
    label="팀 검색"
    placeholder="팀을 검색하거나 선택하세요"
    clearable
  />
</template>
