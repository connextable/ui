<script setup lang="ts">
import { UICheckbox } from "@connextable/ui";
import { Bell } from "@lucide/vue";
import { ref } from "vue";

const alerts = ref(false);
</script>

<template>
  <UICheckbox v-model="alerts" :icon="Bell" label="프로젝트 알림" />
</template>
