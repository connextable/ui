<script setup lang="ts">
import { Check, ChevronRight } from "@lucide/vue";
import {
  UICascadeSelect,
  UICascadeSelectColumn,
  UICascadeSelectContent,
  UICascadeSelectItem,
  UICascadeSelectItemChevron,
  UICascadeSelectItemIndicator,
  UICascadeSelectTrigger,
  UICascadeSelectValue,
} from "@connextable/ui";

const nodes = [
  { id: "asia", parentID: null },
  { id: "kr", parentID: "asia" },
  { id: "seoul", parentID: "kr" },
  { id: "busan", parentID: "kr" },
  { id: "jp", parentID: "asia" },
  { id: "tokyo", parentID: "jp" },
  { id: "europe", parentID: null },
  { id: "fr", parentID: "europe" },
  { id: "paris", parentID: "fr" },
];
const labels: Record<string, string> = {
  asia: "아시아", kr: "대한민국", seoul: "서울", busan: "부산",
  jp: "일본", tokyo: "도쿄", europe: "유럽", fr: "프랑스", paris: "파리",
};
const label = (id: string) => labels[id] ?? id;
</script>
<template>
  <UICascadeSelect :nodes="nodes" :text-value="label" default-value="seoul" v-slot="{ columns }">
    <UICascadeSelectTrigger><UICascadeSelectValue placeholder="도시 선택" /></UICascadeSelectTrigger>
    <UICascadeSelectContent>
      <UICascadeSelectColumn v-for="(_, depth) in columns" :key="depth" :depth="depth" v-slot="{ items }">
        <UICascadeSelectItem v-for="item in items" :key="item" :value="item">
          {{ label(item) }}
          <UICascadeSelectItemChevron><ChevronRight :size="16" aria-hidden="true" /></UICascadeSelectItemChevron>
          <UICascadeSelectItemIndicator><Check :size="16" aria-hidden="true" /></UICascadeSelectItemIndicator>
        </UICascadeSelectItem>
      </UICascadeSelectColumn>
    </UICascadeSelectContent>
  </UICascadeSelect>
</template>
