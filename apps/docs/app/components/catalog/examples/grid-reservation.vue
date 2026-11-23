<script setup lang="ts">
import { ref } from "vue";
import { UIDataStatus, UIDataSurface, UIGrid, UIGridCell, UIGridRow } from "@connextable/ui";

const days = ["월요일", "화요일", "수요일"];
const times = ["09:00", "10:30", "13:00", "14:30"];
const rows = days.map(day => times.map(time => `${day} ${time}`));
const taken = [rows[0]![1]!, rows[1]![0]!, rows[2]![2]!];
const selection = ref<string | null>(null);
</script>

<template>
  <UIDataSurface>
    <template #toolbar><strong>회의실 예약 시간</strong></template>
    <UIGrid v-model="selection" :rows="rows" :disabled-items="taken" label="회의실 예약 시간">
      <UIGridRow v-for="(row, index) in rows" :key="days[index]">
        <UIGridCell v-for="(cell, column) in row" :key="cell" :value="cell"
          :aria-label="taken.includes(cell) ? `${cell} 예약됨` : cell" data-ui-tabular-numeric>
          <UIDataStatus v-if="taken.includes(cell)">{{ times[column] }} 예약됨</UIDataStatus>
          <span v-else>{{ times[column] }}</span>
        </UIGridCell>
      </UIGridRow>
    </UIGrid>
    <template #footer><output aria-live="polite">{{ selection ? `선택한 시간 · ${selection}` : "예약 가능한 시간을 선택하세요." }}</output></template>
  </UIDataSurface>
</template>
