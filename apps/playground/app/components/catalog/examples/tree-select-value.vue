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
  <PlaygroundExample v-bind="$attrs as { id: string; title: string }">
    <UITreeSelect v-model="teams" :nodes="nodes" :default-expanded-values="['design']" label="팀 검색" />
    <template #footer>
      <output>{{ teams.length ? teams.join(", ") : "선택 없음" }}</output>
    </template>
  </PlaygroundExample>
</template>
