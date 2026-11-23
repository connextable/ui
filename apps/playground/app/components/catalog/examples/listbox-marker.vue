<script setup lang="ts">
import { UIListbox, UIListboxItem, UIListboxItemIndicator, UIListboxItemText } from "@connextable/ui";
import { CircleCheck } from "@lucide/vue";
import { ref } from "vue";

const items = ["최근 수정", "이름", "생성일"];

const selected = ref("최근 수정");
</script>

<template>
  <UIListbox v-model="selected" :items="items" aria-label="정렬 기준">
    <UIListboxItem v-for="item in items" :key="item" :value="item">
      <UIListboxItemText>{{ item }}</UIListboxItemText>
      <UIListboxItemIndicator><CircleCheck :size="16" aria-hidden="true" /></UIListboxItemIndicator>
    </UIListboxItem>
  </UIListbox>
</template>
