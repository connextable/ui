<script setup lang="ts">
import { UICombobox } from "@connextable/ui";
import { FlaskConical, Server } from "@lucide/vue";
import { ref } from "vue";

const items = [
  { id: "production", label: "운영", icon: Server },
  { id: "staging", label: "검증", icon: FlaskConical },
];
const environment = ref<string | null>(null);
</script>

<template>
  <UICombobox v-model="environment" :items="items" label="실행 환경" placeholder="환경 검색" />
</template>
