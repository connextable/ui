<script setup lang="ts">
import { createUIDataTableComponents, useUIDataTable } from "@connextable/ui";

import { ref } from "vue";

const selected = ref(false);
const users = [
  { kind: "leaf", id: "1", cells: { selected: null, name: "민지", team: "디자인" } },
  { kind: "leaf", id: "2", cells: { selected: null, name: "서준", team: "개발" } },
] as const;

const table = useUIDataTable({
  onRowSelectionChange: (value) => { selected.value = value.kind === "all-matching" || value.rowIDs.length > 0; },
  source: (request) => ({
    ...request,
    rows: users,
    viewRevision: request.requestID,
    matchingLeafCount: { kind: "known", value: users.length },
    visibleRowCount: { kind: "known", value: users.length },
    columnSchema: { revision: request.columnSchemaRevision, columns: [{ id: "selected" }, { id: "name" }, { id: "team" }], headers: [] },
    removedRowIDs: [],
  }),
});
const DataTable = createUIDataTableComponents(table);
</script>

<template>
  <DataTable.Provider>
    <DataTable.Root>
      <DataTable.Caption>사용자</DataTable.Caption>
      <DataTable.Header>
        <DataTable.HeaderRow>
          <DataTable.ColumnHeader column="selected">선택</DataTable.ColumnHeader>
          <DataTable.ColumnHeader column="name">이름</DataTable.ColumnHeader>
          <DataTable.ColumnHeader column="team">팀</DataTable.ColumnHeader>
        </DataTable.HeaderRow>
      </DataTable.Header>
      <DataTable.Body v-slot="{ row }">
        <DataTable.Cell column="selected">
          <DataTable.SelectionControl name="row" :value="row.id" :aria-label="`${row.cells.name} 선택`" />
        </DataTable.Cell>
        <DataTable.Cell column="name">{{ row.cells.name }}</DataTable.Cell>
        <DataTable.Cell column="team">{{ row.cells.team }}</DataTable.Cell>
      </DataTable.Body>
    </DataTable.Root>
  </DataTable.Provider>
  <output>{{ selected ? '선택된 행이 있습니다.' : '선택된 행이 없습니다.' }}</output>
</template>
