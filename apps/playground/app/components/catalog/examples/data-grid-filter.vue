<script setup lang="ts">
import { createUIDataGridComponents, UITabularColumnHeading, UITabularFilterPopover, useUIDataGrid } from "@connextable/ui";

const tasks = [
  { kind: "leaf", id: "review", cells: { task: "시안 검토", status: "완료" } },
  { kind: "leaf", id: "audit", cells: { task: "접근성 검사", status: "대기" } },
] as const;
const data = useUIDataGrid({
  source: (request) => {
    const query = String(request.query.filters.find(filter => filter.id === "status-search")?.value ?? "");
    const rows = tasks.filter(row => !query || row.cells.status === query);
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
          <DataGrid.ColumnHeader column="status" v-slot="{ query }">
            <UITabularColumnHeading>
              상태
              <template #actions>
                <UITabularFilterPopover
                  label="상태 필터"
                  :value="String(query.filters.find(filter => filter.id === 'status-search')?.value ?? '')"
                  v-slot="{ value }"
                >
                  <DataGrid.FilterControl
                    as="select"
                    scope="column"
                    column="status"
                    id="status-search"
                    predicate="equals"
                    aria-label="상태 선택"
                    class="ui-field-control"
                    data-ui-control-size="sm"
                    :value="value"
                  >
                    <option value="">전체 상태</option>
                    <option value="완료">완료</option>
                    <option value="대기">대기</option>
                  </DataGrid.FilterControl>
                </UITabularFilterPopover>
              </template>
            </UITabularColumnHeading>
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
