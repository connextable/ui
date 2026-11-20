<script setup lang="ts">
import { createUIDataTableComponents, useUIDataTable } from "@connextable/ui";

const users = [
  { kind: "leaf", id: "1", cells: { name: "민지", team: "디자인" } },
  { kind: "leaf", id: "2", cells: { name: "서준", team: "개발" } },
] as const;

const table = useUIDataTable({
  source: (request) => {
    const query = String(request.query.filters.find((filter) => filter.id === "name-search")?.value ?? "");
    const rows = users.filter((row) => row.cells.name.includes(query));
    return {
      ...request,
      rows,
      viewRevision: request.requestID,
      matchingLeafCount: { kind: "known", value: rows.length },
      visibleRowCount: { kind: "known", value: rows.length },
      columnSchema: { revision: request.columnSchemaRevision, columns: [{ id: "name" }, { id: "team" }], headers: [] },
      removedRowIDs: [],
    };
  },
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
            <DataTable.FilterControl scope="column" column="name" id="name-search" predicate="contains" aria-label="이름 필터" />
          </DataTable.ColumnHeader>
          <DataTable.ColumnHeader column="team">팀</DataTable.ColumnHeader>
        </DataTable.HeaderRow>
      </DataTable.Header>
      <DataTable.Body>
        <template #default="{ row }">
          <DataTable.Cell column="name">{{ row.cells.name }}</DataTable.Cell>
          <DataTable.Cell column="team">{{ row.cells.team }}</DataTable.Cell>
        </template>
        <template #empty>
          <tr><td class="ui-tabular-empty" colspan="2">일치하는 사용자가 없습니다.</td></tr>
        </template>
      </DataTable.Body>
    </DataTable.Root>
  </DataTable.Provider>
</template>
