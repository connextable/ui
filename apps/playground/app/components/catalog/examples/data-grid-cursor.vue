<script setup lang="ts">
import { createUIDataGridComponents, useUIDataGrid, useUIDataGridContext } from "@connextable/ui";
import { defineComponent, h } from "vue";

const tasks = [
  { kind: "leaf", id: "review", cells: { task: "시안 검토", status: "완료" } },
  { kind: "leaf", id: "audit", cells: { task: "접근성 검사", status: "대기" } },
] as const;
const data = useUIDataGrid({
  source: (request) => ({
    ...request,
    rows: tasks,
    viewRevision: request.requestID,
    matchingLeafCount: { kind: "known", value: tasks.length },
    visibleRowCount: { kind: "known", value: tasks.length },
    columnSchema: { revision: request.columnSchemaRevision, columns: [{ id: "task" }, { id: "status" }], headers: [] },
    removedRowIDs: [],
  }),
});
const DataGrid = createUIDataGridComponents(data);

const CursorSummary = defineComponent({
  setup() {
    const { snapshot } = useUIDataGridContext();
    return () => {
      const address = snapshot.value.cursor.current;
      const row = tasks.find(task => task.id === address?.rowID);
      const column = address?.columnID === "status" ? "상태" : "작업";
      return h("p", { "aria-live": "polite" }, row ? `현재 셀 ${row.cells.task} · ${column}` : "현재 셀 없음");
    };
  },
});
</script>

<template>
  <div>
    <DataGrid.Provider>
      <DataGrid.Root aria-label="현재 셀 관찰">
        <DataGrid.Header>
          <DataGrid.HeaderRow>
          <DataGrid.ColumnHeader column="task">작업</DataGrid.ColumnHeader>
            <DataGrid.ColumnHeader column="status">상태</DataGrid.ColumnHeader>
          </DataGrid.HeaderRow>
        </DataGrid.Header>
        <DataGrid.Body v-slot="{ row }">
          <DataGrid.Cell column="task">{{ row.cells.task }}</DataGrid.Cell>
          <DataGrid.Cell column="status">{{ row.cells.status }}</DataGrid.Cell>
        </DataGrid.Body>
      </DataGrid.Root>
      <CursorSummary />
    </DataGrid.Provider>
  </div>
</template>
