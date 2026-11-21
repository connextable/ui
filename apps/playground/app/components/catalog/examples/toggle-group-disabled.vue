<script setup lang="ts">
import { UIToggleGroup, UIToggleGroupItem } from "@connextable/ui";
const items = ["왼쪽", "가운데", "오른쪽"];
</script>

<template>
  <UIToggleGroup :disabled-items="['가운데']" :items="items" label="텍스트 정렬">
    <UIToggleGroupItem v-for="item in items" :key="item" :value="item">{{ item }}</UIToggleGroupItem>
  </UIToggleGroup>
</template>
