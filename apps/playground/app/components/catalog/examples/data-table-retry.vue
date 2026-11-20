<script setup lang="ts">
import { ref } from "vue";
import { UIButton, UIDataActions, createUIDataTableComponents, useUIDataTable } from "@connextable/ui";

const failNext = ref(false);
const rows = [
  { kind: "leaf", id: "docs", cells: { service: "문서", status: "정상" } },
  { kind: "leaf", id: "search", cells: { service: "검색", status: "점검 완료" } },
] as const;

const table = useUIDataTable({
  source: async (request, { signal }) => {
    const fail = failNext.value;
    failNext.value = false;
    await new Promise<void>((resolve) => setTimeout(resolve, 400));
    signal.throwIfAborted();
    if (fail) throw new Error("일시적으로 응답하지 않습니다.");
    return {
      ...request, rows, viewRevision: request.requestID,
      matchingLeafCount: { kind: "known", value: rows.length },
      visibleRowCount: { kind: "known", value: rows.length },
      columnSchema: { revision: request.columnSchemaRevision, columns: [{ id: "service" }, { id: "status" }], headers: [] },
      removedRowIDs: [],
    };
  },
});
const Table = createUIDataTableComponents(table);

function simulateFailure() {
  failNext.value = true;
  table.reload();
}
</script>

<template>
  <Table.Provider>
  <Table.Root aria-label="서비스 상태" :aria-busy="table.status.value === 'loading'">
    <Table.Header>
      <Table.HeaderRow>
        <Table.ColumnHeader column="service">서비스</Table.ColumnHeader>
        <Table.ColumnHeader column="status">상태</Table.ColumnHeader>
      </Table.HeaderRow>
    </Table.Header>
    <Table.Body v-slot="{ row }">
      <Table.Cell column="service">{{ row.cells.service }}</Table.Cell>
      <Table.Cell column="status">{{ row.cells.status }}</Table.Cell>
    </Table.Body>
  </Table.Root>
  </Table.Provider>
  <UIDataActions>
    <output aria-live="polite">
      {{ table.status.value === 'error' ? '불러오지 못했습니다. 마지막 응답을 표시합니다.'
        : table.status.value === 'loading' ? '가상 응답을 기다리는 중' : '서비스 2개 · 최신 응답' }}
    </output>
    <UIButton v-if="table.status.value === 'error'" size="sm" @click="table.reload()">다시 시도</UIButton>
    <UIButton v-else size="sm" variant="outline" :loading="table.status.value === 'loading'" @click="simulateFailure">오류 재현</UIButton>
  </UIDataActions>
</template>
