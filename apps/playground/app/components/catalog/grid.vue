<script setup lang="ts">
import {
  UIGrid,
  UIGridCell,
  UIGridRow,
} from "@connextable/ui";

const times = ["09:00", "10:30", "13:00", "14:30"];
const days = ["월요일", "화요일", "수요일"];
const rows = days.map(day => times.map(time => `${day} ${time}`));
</script>

<template>
  <UIGrid :rows="rows" label="요일별 예약 시간">
    <UIGridRow v-for="row in rows" :key="row[0]">
      <UIGridCell v-for="cell in row" :key="cell" :value="cell" :aria-label="cell" data-ui-tabular-numeric>
        {{ cell }}
      </UIGridCell>
    </UIGridRow>
  </UIGrid>
</template>
