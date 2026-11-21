<script setup lang="ts">
import { UIWindowSplitter, UIWindowSplitterHandle, UIWindowSplitterPane } from "@connextable/ui";

function formatWidth(value: string) {
  return `탐색 영역 ${value}퍼센트`;
}
</script>

<template>
  <UIWindowSplitter :min="25" :max="60" :step="5" :default-value="40" :format-value="formatWidth" label="탐색 영역 너비">
    <UIWindowSplitterPane side="before">탐색</UIWindowSplitterPane>
    <UIWindowSplitterHandle />
    <UIWindowSplitterPane side="after">본문</UIWindowSplitterPane>
  </UIWindowSplitter>
</template>
