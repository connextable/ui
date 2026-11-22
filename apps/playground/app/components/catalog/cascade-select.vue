<script setup lang="ts">
import { UICascadeSelect } from "@connextable/ui";
import { ref } from "vue";

const nodes = [
  { id: "아시아", parentID: null },
  { id: "대한민국", parentID: "아시아" },
  { id: "서울", parentID: "대한민국" },
  { id: "부산", parentID: "대한민국" },
  { id: "일본", parentID: "아시아" },
  { id: "도쿄", parentID: "일본" },
  { id: "유럽", parentID: null },
  { id: "프랑스", parentID: "유럽" },
  { id: "파리", parentID: "프랑스" },
];
const region = ref<string | null>("서울");
</script>

<template>
  <UICascadeSelect
    v-model="region"
    :nodes="nodes"
    :column-labels="['권역', '국가', '도시']"
    label="배송 지역"
    placeholder="도시 선택"
    clearable
  />
</template>
