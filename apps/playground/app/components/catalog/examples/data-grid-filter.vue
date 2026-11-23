<script setup lang="ts">
import { createUIDataGridComponents, UISelect, UISelectContent, UISelectTrigger, UITabularColumnHeading, UITabularFilterPopover, useDataGrid } from "@connextable/ui";
import { computed } from "vue";

const tasks = [
  { kind: "leaf", id: "review", cells: { task: "시안 검토", status: "완료" } },
  { kind: "leaf", id: "audit", cells: { task: "접근성 검사", status: "대기" } },
] as const;
const filterID = "status-search";
const statusOptions = [
  { value: "all", label: "전체 상태" },
  { value: "완료", label: "완료" },
  { value: "대기", label: "대기" },
];
const data = useDataGrid({
  source: (request) => {
    const query = String(request.query.filters.find(filter => filter.id === filterID)?.value ?? "");
    const rows = tasks.filter(row => !query || row.cells.status === query);
    return {
      ...request,
      rows,
      viewRevision: request.requestID,
      matchingLeafCount: { kind: "known", value: rows.length },
      visibleRowCount: { kind: "known", value: rows.length },
      columnSchema: { revision: request.columnSchemaRevision, columns: [{ id: "task" }, { id: "status", capabilities: ["filter"] }], headers: [] },
      removedRowIDs: [],
    };
  },
});
const DataGrid = createUIDataGridComponents(data);

const statusFilter = computed({
  get() {
    const filter = data.snapshot.value.tabular.state.query.filters.find(filter => filter.id === filterID);
    return String(filter?.value ?? "all");
  },
  set(status: string | null) {
    const query = data.snapshot.value.tabular.state.query;
    const filters = query.filters.filter(filter => filter.id !== filterID);
    if (status && status !== "all") {
      filters.push({ id: filterID, scope: "column", columnID: "status", predicate: "equals", value: status });
    }
    data.dispatch({ type: "set-query", query: { ...query, filters } });
  },
});
</script>

<template>
  <DataGrid.Provider>
    <DataGrid.Root aria-label="작업 상태 필터">
      <DataGrid.Header>
        <DataGrid.HeaderRow>
          <DataGrid.ColumnHeader column="task">작업</DataGrid.ColumnHeader>
          <DataGrid.ColumnHeader column="status">
            <UITabularColumnHeading>
              상태
              <template #actions>
                <UITabularFilterPopover
                  label="상태 필터"
                  :value="statusFilter === 'all' ? '' : statusFilter"
                >
                  <UISelect
                    aria-label="상태 선택"
                    size="sm"
                    :options="statusOptions"
                    v-model="statusFilter"
                  >
                    <UISelectTrigger />
                    <UISelectContent width="trigger" />
                  </UISelect>
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
