<script setup lang="ts">
import { UICascadeList } from "@connextable/ui";
import { Earth, Flag, MapPin } from "@lucide/vue";
import { ref } from "vue";

const nodes = [
  { id: "아시아", parentID: null, icon: Earth },
  { id: "한국", parentID: "아시아", icon: Flag },
  { id: "일본", parentID: "아시아", icon: Flag },
  { id: "서울", parentID: "한국", icon: MapPin },
  { id: "부산", parentID: "한국", icon: MapPin },
  { id: "도쿄", parentID: "일본", icon: MapPin },
  { id: "오사카", parentID: "일본", icon: MapPin },
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
