<script setup lang="ts">
import { createUIDataGridComponents, useUIDataGrid } from "@connextable/ui";

const tasks = [
  { kind: "leaf", id: "review", cells: { task: "시안 검토", status: "완료" } },
  { kind: "leaf", id: "audit", cells: { task: "접근성 검사", status: "대기" } },
] as const;
const data = useUIDataGrid({
  source: (request) => {
    const query = String(request.query.filters.find(filter => filter.id === "status-search")?.value ?? "");
    const rows = tasks.filter(row => row.cells.status.includes(query));
    return {
      ...request,
      rows,
      viewRevision: request.requestID,
      matchingLeafCount: { kind: "known", value: rows.length },
      visibleRowCount: { kind: "known", value: rows.length },
      columnSchema: { revision: request.columnSchemaRevision, columns: [{ id: "task" }, { id: "status" }], headers: [] },
      removedRowIDs: [],
    };
  },
});
const DataGrid = createUIDataGridComponents(data);
</script>

<template>
  <DataGrid.Provider>
    <DataGrid.Root aria-label="작업 상태 필터">
      <DataGrid.Header>
        <DataGrid.HeaderRow>
          <DataGrid.ColumnHeader column="task">작업</DataGrid.ColumnHeader>
          <DataGrid.ColumnHeader column="status">
            상태
            <DataGrid.FilterControl scope="column" column="status" id="status-search" predicate="contains" aria-label="상태 검색" />
          </DataGrid.ColumnHeader>
        </DataGrid.HeaderRow>
      </DataGrid.Header>
      <DataGrid.Body>
        <template #default="{ row }">
          <DataGrid.Cell column="task">{{ row.cells.task }}</DataGrid.Cell>
          <DataGrid.Cell column="status">{{ row.cells.status }}</DataGrid.Cell>
        </template>
        <template #empty>
          <div role="row">
            <div class="ui-tabular-empty" role="gridcell" aria-colspan="2">일치하는 작업이 없습니다.</div>
          </div>
        </template>
      </DataGrid.Body>
    </DataGrid.Root>
  </DataGrid.Provider>
</template>
