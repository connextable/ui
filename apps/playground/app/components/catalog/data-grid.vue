<script setup lang="ts">
import { UIDataStatus, createUIDataGridComponents, useUIDataGrid } from "@connextable/ui";

const tasks = [
  { kind: "leaf", id: "1", cells: { task: "시안 검토", owner: "민지", status: "완료" } },
  { kind: "leaf", id: "2", cells: { task: "접근성 검사", owner: "서준", status: "진행 중" } },
  { kind: "leaf", id: "3", cells: { task: "모바일 확인", owner: "다현", status: "대기" } },
] as const;

const grid = useUIDataGrid({
  source: (request) => ({
    ...request,
    rows: tasks,
    viewRevision: request.requestID,
    matchingLeafCount: { kind: "known", value: tasks.length },
    visibleRowCount: { kind: "known", value: tasks.length },
    columnSchema: { revision: request.columnSchemaRevision, columns: [{ id: "task" }, { id: "owner" }, { id: "status" }], headers: [] },
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
          <DataGrid.ColumnHeader column="task">작업</DataGrid.ColumnHeader>
          <DataGrid.ColumnHeader column="owner">담당자</DataGrid.ColumnHeader>
          <DataGrid.ColumnHeader column="status">상태</DataGrid.ColumnHeader>
        </DataGrid.HeaderRow>
      </DataGrid.Header>
      <DataGrid.Body v-slot="{ row }">
        <DataGrid.Cell column="task" data-ui-tabular-primary>{{ row.cells.task }}</DataGrid.Cell>
        <DataGrid.Cell column="owner">{{ row.cells.owner }}</DataGrid.Cell>
        <DataGrid.Cell column="status">
          <UIDataStatus :tone="row.cells.status === '완료' ? 'success' : row.cells.status === '진행 중' ? 'accent' : 'neutral'">
            {{ row.cells.status }}
          </UIDataStatus>
        </DataGrid.Cell>
      </DataGrid.Body>
    </DataGrid.Root>
  </DataGrid.Provider>
</template>
