<script setup lang="ts">
import { UITabularEditTrigger, createUIDataGridComponents, createUITabularSource, useDataGrid } from "@connextable/ui";

import { onScopeDispose, ref } from "vue";

const message = ref("");
let tasks = [
  { kind: "leaf", id: "1", cells: { task: "시안 검토", status: "완료" } },
  { kind: "leaf", id: "2", cells: { task: "접근성 검사", status: "대기" } },
] satisfies { kind: "leaf"; id: string; cells: { task: string; status: string } }[];

const grid = useDataGrid({
  source: createUITabularSource({
    columns: [{ id: "task" }, { id: "status", capabilities: ["edit"] }],
    load: () => ({ rows: tasks }),
  }),
});
const unsubscribe = grid.subscribeCommands((command) => {
  if (command.type !== "commit-edit" || command.cell.columnID !== "status") return;
  const value = String(command.value ?? "");
  tasks = tasks.map((row) => row.id === command.cell.rowID ? { ...row, cells: { ...row.cells, status: value } } : row);
  message.value = `${value} 상태로 저장했습니다.`;
  grid.reload();
});
onScopeDispose(unsubscribe);

const DataGrid = createUIDataGridComponents(grid);
</script>

<template>
  <PlaygroundExample v-bind="$attrs as { id: string; title: string }">
    <DataGrid.Provider>
      <DataGrid.Root aria-label="작업 상태">
        <DataGrid.Header>
          <DataGrid.HeaderRow>
            <DataGrid.ColumnHeader column="task">작업</DataGrid.ColumnHeader>
            <DataGrid.ColumnHeader column="status">상태</DataGrid.ColumnHeader>
          </DataGrid.HeaderRow>
        </DataGrid.Header>
        <DataGrid.Body v-slot="{ row }">
          <DataGrid.Cell column="task">{{ row.cells.task }}</DataGrid.Cell>
          <DataGrid.Cell column="status">
            <DataGrid.Editor column="status" :value="row.cells.status" aria-label="새 상태" />
            <UITabularEditTrigger
              :aria-label="`${row.cells.task} 상태 편집, 현재 ${row.cells.status}`"
              @click="grid.dispatch({ type: 'begin-edit', cell: { rowID: row.id, columnID: 'status' } })">
              {{ row.cells.status }}
            </UITabularEditTrigger>
          </DataGrid.Cell>
        </DataGrid.Body>
      </DataGrid.Root>
    </DataGrid.Provider>
    <template #footer>
      <output aria-live="polite">{{ message }}</output>
    </template>
  </PlaygroundExample>
</template>
