<script setup lang="ts">
import {
  UIListbox,
  UIListboxItem,
  UIListboxItemIndicator,
  UIListboxItemText,
} from "@connextable/ui";
import { ref } from "vue";

const labels: Record<string, string> = { production: "운영", staging: "검증", development: "개발" };
const items = Object.keys(labels);

const selected = ref('production');
</script>

<template>
  <UIListbox aria-label="실행 환경"
    :items="items"
    :text-value="id => id"
    selection-mode="single"
    v-model="selected"
  >
    <UIListboxItem v-for="item in items" :key="item" :value="item">
      <UIListboxItemText>{{ labels[item] }}</UIListboxItemText>
      <UIListboxItemIndicator>선택됨</UIListboxItemIndicator>
    </UIListboxItem>
  </UIListbox>
</template>
