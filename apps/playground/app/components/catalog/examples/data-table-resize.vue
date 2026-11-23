<script setup lang="ts">
import { createUIDataTableComponents, useDataTable } from "@connextable/ui";

const users = [
  { kind: "leaf", id: "1", cells: { name: "민지", team: "디자인" } },
  { kind: "leaf", id: "2", cells: { name: "서준", team: "개발" } },
] as const;

const table = useDataTable({
  defaultColumnSizeState: { name: 160, team: 100 },
  source: (request) => ({
    ...request,
    rows: users,
    viewRevision: request.requestID,
    matchingLeafCount: { kind: "known", value: users.length },
    visibleRowCount: { kind: "known", value: users.length },
    columnSchema: { revision: request.columnSchemaRevision, columns: [{ id: "name" }, { id: "team" }], headers: [] },
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
          <DataTable.ColumnHeader column="name">
            이름
            <DataTable.ColumnResizeHandle column="name" :min-size="80" :max-size="320" aria-label="이름 열 너비 조절" />
          </DataTable.ColumnHeader>
          <DataTable.ColumnHeader column="team">팀</DataTable.ColumnHeader>
        </DataTable.HeaderRow>
      </DataTable.Header>
      <DataTable.Body v-slot="{ row }">
        <DataTable.Cell column="name">{{ row.cells.name }}</DataTable.Cell>
        <DataTable.Cell column="team">{{ row.cells.team }}</DataTable.Cell>
      </DataTable.Body>
    </DataTable.Root>
  </DataTable.Provider>
</template>
