<script setup lang="ts">
import {
  UIListbox,
  UIListboxItem,
  UIListboxItemIndicator,
  UIListboxItemText,
} from "@connextable/ui";

const labels: Record<string, string> = { production: "운영", staging: "검증", development: "개발" };
const items = Object.keys(labels);
</script>

<template>
  <UIListbox
    :items="items"
    selection-mode="single"
    :default-value="'production'"
  >
    <UIListboxItem v-for="item in items" :key="item" :value="item">
      <UIListboxItemText>{{ labels[item] }}</UIListboxItemText>
      <UIListboxItemIndicator>선택됨</UIListboxItemIndicator>
    </UIListboxItem>
  </UIListbox>
</template>
