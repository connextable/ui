<script setup lang="ts">
import { UISelect } from "@connextable/ui";
import { LayoutGrid, List } from "@lucide/vue";
import { ref } from "vue";

const options = [
  { value: "list", label: "목록", icon: List },
  { value: "grid", label: "격자", icon: LayoutGrid },
];
const layout = ref<string | null>("list");
</script>

<template>
  <UISelect v-model="layout" :options="options" label="보기 방식" />
</template>
