<script setup lang="ts">
import {
  UITimeField,
} from "@connextable/ui";

import { ref } from 'vue'
const value = ref({ hour: 9, minute: 30, second: 0, millisecond: 0 })
</script>

<template>
  <label>
    <span>시작 시각</span>
    <UITimeField v-model="value" />
  </label>
</template>
