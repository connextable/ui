<script setup lang="ts">
import {
  UIDateField,
} from "@connextable/ui";

import { ref } from 'vue'
const value = ref({ year: 2026, month: 8, day: 22 })
</script>

<template>
  <label>
    <span>배포 날짜</span>
    <UIDateField readonly v-model="value" />
  </label>
</template>
