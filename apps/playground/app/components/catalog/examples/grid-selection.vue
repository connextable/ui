<script setup lang="ts">
import {
  UIGrid,
  UIGridCell,
  UIGridRow,
} from "@connextable/ui";

import { ref } from "vue";

const selected = ref<string | null>(null);
const rows = [['name', 'status'], ['Sectile', 'Ready']]

</script>

<template>
  <UIGrid :rows="rows" v-model="selected" label="선택할 셀">
    <UIGridRow v-for="row in rows" :key="row[0]">
      <UIGridCell v-for="cell in row" :key="cell" :value="cell">{{ cell }}</UIGridCell>
    </UIGridRow>
  </UIGrid>
  <output>{{ selected ?? "선택 없음" }}</output>
</template>
