<script setup lang="ts">
import { UIDataSurface, UIGrid, UIGridCell, UIGridEditor, UIGridRow } from "@connextable/ui";
import { ref } from "vue";

const rows = [["title-1", "status-1"], ["title-2", "status-2"]];
const values = ref<Record<string, string>>({
  "title-1": "일정 계획", "status-1": "검토 중",
  "title-2": "예약 화면", "status-2": "대기",
});
const draft = ref("");
const feedback = ref("");

function beginEdit(id: string) {
  draft.value = values.value[id] ?? "";
  feedback.value = "";
}

function commitEdit(id: string) {
  values.value[id] = draft.value;
  feedback.value = "셀 값을 저장했습니다.";
}
</script>

<template>
  <UIDataSurface>
    <template #toolbar><strong>작업 제목과 상태</strong></template>
    <UIGrid :rows="rows" default-highlighted-value="title-1" label="작업 제목과 상태"
      @edit-start="beginEdit" @edit-commit="commitEdit" @edit-cancel="feedback = '편집을 취소했습니다.'">
      <UIGridRow v-for="(row, index) in rows" :key="row[0]">
        <UIGridCell v-for="(id, column) in row" :key="id" :value="id" v-slot="cell">
          <UIGridEditor v-if="cell.highlighted && cell.editMode === 'editing'" v-model="draft"
            :aria-label="`${index + 1}행 ${column === 0 ? '제목' : '상태'}`" />
          <span :style="{ visibility: cell.highlighted && cell.editMode === 'editing' ? 'hidden' : undefined }">
            {{ values[id] || '빈 셀' }}
          </span>
        </UIGridCell>
      </UIGridRow>
    </UIGrid>
    <template #footer><output role="status">{{ feedback }}</output></template>
  </UIDataSurface>
</template>
