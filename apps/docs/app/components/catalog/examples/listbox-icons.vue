<script setup lang="ts">
import { UIListbox } from "@connextable/ui";
import { FlaskConical, Server } from "@lucide/vue";
import { ref } from "vue";

const options = [
  { value: "production", label: "운영", icon: Server },
  { value: "staging", label: "검증", icon: FlaskConical },
];
const environment = ref("production");
</script>

<template>
  <UIListbox v-model="environment" :options="options" aria-label="실행 환경" />
</template>
