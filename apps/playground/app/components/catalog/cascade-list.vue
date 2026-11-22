<script setup lang="ts">
import { UICascadeList } from "@connextable/ui";
import { ref } from "vue";

const nodes = [
  { id: "아시아", parentID: null },
  { id: "한국", parentID: "아시아" },
  { id: "일본", parentID: "아시아" },
  { id: "서울", parentID: "한국" },
  { id: "부산", parentID: "한국" },
  { id: "도쿄", parentID: "일본" },
  { id: "오사카", parentID: "일본" },
];
const region = ref<string | null>("서울");
</script>

<template>
  <UICascadeList
    v-model="region"
    :nodes="nodes"
    :column-labels="['권역', '국가', '도시']"
    label="배송 지역"
    clearable
  />
</template>
