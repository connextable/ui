<script setup lang="ts">
import { UICascadeList } from "@connextable/ui";
import { Earth, Flag, MapPin } from "@lucide/vue";
import { ref } from "vue";

const nodes = [
  { id: "아시아", parentID: null, icon: Earth },
  { id: "한국", parentID: "아시아", icon: Flag },
  { id: "서울", parentID: "한국", icon: MapPin },
];
const region = ref<string | null>("서울");
</script>

<template>
  <UICascadeList v-model="region" :nodes="nodes" label="배송 지역" />
</template>
