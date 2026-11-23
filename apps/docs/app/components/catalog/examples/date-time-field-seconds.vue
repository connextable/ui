<script setup lang="ts">
import {
  UIDateTimeField,
} from "@connextable/ui";

import { ref } from 'vue'
const value = ref({ date: { year: 2026, month: 8, day: 22 }, time: { hour: 9, minute: 30, second: 0, millisecond: 0 } })
</script>

<template>
  <label>
    <span>시작 일시</span>
    <UIDateTimeField precision="second" v-model="value" />
  </label>
</template>
