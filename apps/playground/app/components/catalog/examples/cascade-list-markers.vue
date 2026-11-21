<script setup lang="ts">
import {
  UICascadeList,
  UICascadeListColumn,
  UICascadeListItem,
  UICascadeListItemChevron,
  UICascadeListItemIndicator,
  UICascadeListValue,
} from "@connextable/ui";

import { Check, ChevronRight } from "@lucide/vue";

const nodes = [
  { id: "asia", parentID: null },
  { id: "kr", parentID: "asia" },
  { id: "jp", parentID: "asia" },
  { id: "seoul", parentID: "kr" },
  { id: "busan", parentID: "kr" },
  { id: "tokyo", parentID: "jp" },
  { id: "osaka", parentID: "jp" },
];
const labels: Record<string, string> = { asia: "아시아", kr: "한국", jp: "일본", seoul: "서울", busan: "부산", tokyo: "도쿄", osaka: "오사카" };
const levels = ["권역", "국가", "도시"];
</script>
<template>
  <UICascadeList :nodes="nodes" default-value="seoul" label="배송 지역" v-slot="{ columns }">
    <UICascadeListValue v-slot="{ valuePath }">{{ valuePath.length ? valuePath.map(id => labels[id]).join(' / ') : '배송 지역 선택' }}</UICascadeListValue>
    <UICascadeListColumn v-for="(_, depth) in columns" :key="depth" :depth="depth" :label="levels[depth]" v-slot="{ items }">
      <UICascadeListItem v-for="item in items" :key="item" :value="item">{{ labels[item] }}
          <UICascadeListItemChevron><ChevronRight :size="14" /></UICascadeListItemChevron>
          <UICascadeListItemIndicator><Check :size="14" /></UICascadeListItemIndicator>
        </UICascadeListItem>
    </UICascadeListColumn>
  </UICascadeList>
</template>
