<script setup lang="ts">
import { createUIDataGridComponents, useDataGrid } from "@connextable/ui";

const tasks = [
  { kind: "leaf", id: "1", cells: { selected: null, task: "시안 검토", status: "완료" } },
  { kind: "leaf", id: "2", cells: { selected: null, task: "접근성 검사", status: "대기" } },
] as const;

const grid = useDataGrid({
  source: (request) => ({
    ...request,
    rows: tasks,
    viewRevision: request.requestID,
    matchingLeafCount: { kind: "known", value: tasks.length },
    visibleRowCount: { kind: "known", value: tasks.length },
    columnSchema: { revision: request.columnSchemaRevision, columns: [{ id: "selected" }, { id: "task" }, { id: "status" }], headers: [] },
    removedRowIDs: [],
  }),
});
const DataGrid = createUIDataGridComponents(grid);
</script>

<template>
  <DataGrid.Provider>
    <DataGrid.Root aria-label="작업 상태">
      <DataGrid.Header>
        <DataGrid.HeaderRow>
          <DataGrid.ColumnHeader column="selected">선택</DataGrid.ColumnHeader>
          <DataGrid.ColumnHeader column="task">작업</DataGrid.ColumnHeader>
          <DataGrid.ColumnHeader column="status">상태</DataGrid.ColumnHeader>
        </DataGrid.HeaderRow>
      </DataGrid.Header>
      <DataGrid.Body v-slot="{ row }">
      <DataGrid.Cell column="selected">
        <DataGrid.RowSelectionControl name="task" :value="row.id" :aria-label="`${row.cells.task} 선택`" />
      </DataGrid.Cell>
        <DataGrid.Cell column="task">{{ row.cells.task }}</DataGrid.Cell>
        <DataGrid.Cell column="status">{{ row.cells.status }}</DataGrid.Cell>
      </DataGrid.Body>
    </DataGrid.Root>
  </DataGrid.Provider>
</template>
