<script setup lang="ts">
import { UIListbox, UIListboxItem, UIListboxItemIndicator, UIListboxItemText } from "@connextable/ui";
import { CircleCheck } from "@lucide/vue";

const items = ["최근 수정", "이름", "생성일"];
</script>

<template>
  <UIListbox :items="items" default-value="최근 수정" label="정렬 기준">
    <UIListboxItem v-for="item in items" :key="item" :value="item">
      <UIListboxItemText>{{ item }}</UIListboxItemText>
      <UIListboxItemIndicator><CircleCheck :size="16" aria-hidden="true" /></UIListboxItemIndicator>
    </UIListboxItem>
  </UIListbox>
</template>
