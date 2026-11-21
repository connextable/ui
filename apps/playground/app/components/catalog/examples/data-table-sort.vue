<script setup lang="ts">
import { UITabularColumnAction, UITabularColumnHeading, UITabularRows, createUIDataTableComponents, useUIDataTable } from "@connextable/ui";

const users = [
  { kind: "leaf", id: "1", cells: { name: "서준", team: "플랫폼" } },
  { kind: "leaf", id: "2", cells: { name: "지우", team: "운영" } },
  { kind: "leaf", id: "3", cells: { name: "다현", team: "디자인" } },
  { kind: "leaf", id: "4", cells: { name: "민지", team: "제품" } },
] as const;

const table = useUIDataTable({
  source: (request) => {
    const sort = request.query.sort.find((entry) => entry.columnID === "name");
    const original = users;
    const rows = sort ? [...original].sort((a, b) => {
      const order = a.cells.name.localeCompare(b.cells.name, "ko");
      return sort.direction === "ascending" ? order : -order;
    }) : original;
    return {
    ...request,
    rows,
    viewRevision: request.requestID,
    matchingLeafCount: { kind: "known", value: users.length },
    visibleRowCount: { kind: "known", value: users.length },
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
            <UITabularColumnHeading>
              이름
              <template #actions>
                <DataTable.SortTrigger column="name" as-child>
                  <UITabularColumnAction kind="sort" label="이름 정렬" />
                </DataTable.SortTrigger>
              </template>
            </UITabularColumnHeading>
          </DataTable.ColumnHeader>
          <DataTable.ColumnHeader column="team">팀</DataTable.ColumnHeader>
        </DataTable.HeaderRow>
      </DataTable.Header>
      <DataTable.Body manual v-slot="{ rows }">
        <UITabularRows>
          <DataTable.Row v-for="row in rows" :key="row.id" :row-i-d="row.id">
            <DataTable.Cell :row-i-d="row.id" column="name">{{ row.cells.name }}</DataTable.Cell>
            <DataTable.Cell :row-i-d="row.id" column="team">{{ row.cells.team }}</DataTable.Cell>
          </DataTable.Row>
        </UITabularRows>
      </DataTable.Body>
    </DataTable.Root>
  </DataTable.Provider>
</template>
