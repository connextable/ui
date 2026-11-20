<script setup lang="ts">
import { ArrowDown, ArrowUp, ArrowUpDown } from "@lucide/vue";
import { createUIDataGridComponents, useUIDataGrid } from "@connextable/ui";

const tasks = [
  { kind: "leaf", id: "1", cells: { task: "시안 검토", status: "완료" } },
  { kind: "leaf", id: "2", cells: { task: "접근성 검사", status: "대기" } },
] as const;

const grid = useUIDataGrid({
  source: (request) => {
    const sort = request.query.sort.find((entry) => entry.columnID === "task");
    const original = tasks;
    const rows = sort ? [...original].sort((a, b) => {
      const order = a.cells.task.localeCompare(b.cells.task, "ko");
      return sort.direction === "ascending" ? order : -order;
    }) : original;
    return {
    ...request,
    rows,
    viewRevision: request.requestID,
    matchingLeafCount: { kind: "known", value: tasks.length },
    visibleRowCount: { kind: "known", value: tasks.length },
    columnSchema: { revision: request.columnSchemaRevision, columns: [{ id: "task" }, { id: "status" }], headers: [] },
    removedRowIDs: [],
    };
  },
});
const DataGrid = createUIDataGridComponents(grid);
</script>

<template>
  <DataGrid.Provider>
    <DataGrid.Root aria-label="작업 상태">
      <DataGrid.Header>
        <DataGrid.HeaderRow>
          <DataGrid.ColumnHeader column="task">
            <DataGrid.SortTrigger column="task" aria-label="작업 정렬">
              작업
              <ArrowUpDown :size="14" aria-hidden="true" />
              <ArrowUp :size="14" aria-hidden="true" />
              <ArrowDown :size="14" aria-hidden="true" />
            </DataGrid.SortTrigger>
          </DataGrid.ColumnHeader>
          <DataGrid.ColumnHeader column="status">상태</DataGrid.ColumnHeader>
        </DataGrid.HeaderRow>
      </DataGrid.Header>
      <DataGrid.Body v-slot="{ row }">
        <DataGrid.Cell column="task">{{ row.cells.task }}</DataGrid.Cell>
        <DataGrid.Cell column="status">{{ row.cells.status }}</DataGrid.Cell>
      </DataGrid.Body>
    </DataGrid.Root>
  </DataGrid.Provider>
</template>
