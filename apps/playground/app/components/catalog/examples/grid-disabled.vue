<script setup lang="ts">
import {
  UIGrid,
  UIGridCell,
  UIGridRow,
} from "@connextable/ui";

const rows = [['name', 'status'], ['Sectile', 'Ready']]

</script>

<template>
  <UIGrid :disabled-items="['Ready']" label="활성화 상태" :rows="rows">
    <UIGridRow v-for="row in rows" :key="row[0]">
      <UIGridCell v-for="cell in row" :key="cell" :value="cell">{{ cell }}</UIGridCell>
    </UIGridRow>
  </UIGrid>
</template>
