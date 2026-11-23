<script setup lang="ts">
import { computed } from "vue";
import { UIButton, UIDataSurface, createUIDataTableComponents, useDataTable } from "@connextable/ui";

const columns = [
  { id: "filename", label: "문서" },
  { id: "owner", label: "담당자" },
  { id: "version", label: "버전" },
] as const;
const rows = [
  { kind: "leaf", id: "1", cells: { filename: "접근성 안내", owner: "민지", version: "1.8" } },
  { kind: "leaf", id: "2", cells: { filename: "서비스 정책", owner: "서준", version: "3.1" } },
  { kind: "leaf", id: "3", cells: { filename: "예약 관리", owner: "지우", version: "2.4" } },
] as const;

const table = useDataTable({
  source: request => ({
    ...request, rows, viewRevision: request.requestID,
    matchingLeafCount: { kind: "known", value: rows.length },
    visibleRowCount: { kind: "known", value: rows.length },
    columnSchema: { revision: request.columnSchemaRevision, columns, headers: [] },
    removedRowIDs: [],
  }),
});
const Table = createUIDataTableComponents(table);
const columnState = computed(() => table.snapshot.value.state.columnState);
const visible = computed(() => columns.filter(column => !columnState.value.hidden.includes(column.id)));

function toggleColumn(id: string) {
  const state = columnState.value;
  const hidden = state.hidden.includes(id) ? state.hidden.filter(value => value !== id) : [...state.hidden, id];
  table.dispatch({ type: "set-column-state", columnState: { ...state, hidden } });
}
</script>

<template>
  <UIDataSurface>
    <template #toolbar>
      <output>{{ visible.length }}개 열 표시</output>
      <UIButton v-for="column in columns.slice(1)" :key="column.id" variant="outline" size="sm"
        :aria-pressed="!columnState.hidden.includes(column.id)" @click="toggleColumn(column.id)">
        {{ column.label }}
      </UIButton>
    </template>
    <Table.Provider>
      <Table.Root aria-label="문서 버전 목록">
        <Table.Header>
          <Table.HeaderRow>
            <Table.ColumnHeader v-for="column in visible" :key="column.id" :column="column.id">{{ column.label }}</Table.ColumnHeader>
          </Table.HeaderRow>
        </Table.Header>
        <Table.Body v-slot="{ row }">
          <Table.Cell v-for="column in visible" :key="column.id" :column="column.id">{{ row.cells[column.id] }}</Table.Cell>
        </Table.Body>
      </Table.Root>
    </Table.Provider>
  </UIDataSurface>
</template>
