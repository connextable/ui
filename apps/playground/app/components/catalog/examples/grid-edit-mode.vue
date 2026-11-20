<script setup lang="ts">
import { UIGrid, UIGridCell, UIGridRow } from "@connextable/ui";
import { ref } from "vue";

const rows = [["제목", "상태"], ["계획", "검토 중"]];
const active = ref<string | null>(null);
</script>

<template>
  <div>
    <UIGrid :rows="rows" label="편집 모드가 있는 셀 배치"
      @edit-start="active = $event" @edit-commit="active = null" @edit-cancel="active = null">
      <UIGridRow v-for="row in rows" :key="row[0]">
        <UIGridCell v-for="cell in row" :key="cell" :value="cell">{{ cell }}</UIGridCell>
      </UIGridRow>
    </UIGrid>
    <output>{{ active ? `${active} 셀 편집 모드` : "탐색 모드" }}</output>
  </div>
</template>
