<script setup lang="ts">
import { UICascadeSelect } from "@connextable/ui";
import { Earth, Flag, MapPin } from "@lucide/vue";
import { ref } from "vue";

const nodes = [
  { id: "아시아", parentID: null, icon: Earth },
  { id: "대한민국", parentID: "아시아", icon: Flag },
  { id: "서울", parentID: "대한민국", icon: MapPin },
  { id: "부산", parentID: "대한민국", icon: MapPin },
  { id: "일본", parentID: "아시아", icon: Flag },
  { id: "도쿄", parentID: "일본", icon: MapPin },
  { id: "유럽", parentID: null, icon: Earth },
  { id: "프랑스", parentID: "유럽", icon: Flag },
  { id: "파리", parentID: "프랑스", icon: MapPin },
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
