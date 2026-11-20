<script setup lang="ts">
import { createUIDataTableComponents, useUIDataTable } from "@connextable/ui";

const users = [
  { kind: "leaf", id: "1", cells: { name: "민지", team: "제품 디자인", role: "디자이너", memberSince: "2024. 03." } },
  { kind: "leaf", id: "2", cells: { name: "서준", team: "플랫폼", role: "엔지니어", memberSince: "2024. 11." } },
  { kind: "leaf", id: "3", cells: { name: "다현", team: "제품 디자인", role: "리서처", memberSince: "2025. 02." } },
  { kind: "leaf", id: "4", cells: { name: "지우", team: "운영", role: "매니저", memberSince: "2025. 09." } },
] as const;

const table = useUIDataTable({
  source: (request) => ({
    ...request,
    rows: users,
    viewRevision: request.requestID,
    matchingLeafCount: { kind: "known", value: users.length },
    visibleRowCount: { kind: "known", value: users.length },
    columnSchema: {
      revision: request.columnSchemaRevision,
      columns: [{ id: "name" }, { id: "team" }, { id: "role" }, { id: "memberSince" }],
      headers: [],
    },
    removedRowIDs: [],
  }),
});
const DataTable = createUIDataTableComponents(table);
</script>

<template>
  <DataTable.Provider>
    <DataTable.Root aria-label="팀 구성원">
      <DataTable.Header>
        <DataTable.HeaderRow>
          <DataTable.ColumnHeader column="name">이름</DataTable.ColumnHeader>
          <DataTable.ColumnHeader column="team">팀</DataTable.ColumnHeader>
          <DataTable.ColumnHeader column="role">역할</DataTable.ColumnHeader>
          <DataTable.ColumnHeader column="memberSince">합류일</DataTable.ColumnHeader>
        </DataTable.HeaderRow>
      </DataTable.Header>
      <DataTable.Body v-slot="{ row }">
        <DataTable.Cell column="name">{{ row.cells.name }}</DataTable.Cell>
        <DataTable.Cell column="team">{{ row.cells.team }}</DataTable.Cell>
        <DataTable.Cell column="role">{{ row.cells.role }}</DataTable.Cell>
        <DataTable.Cell column="memberSince" data-ui-tabular-numeric>{{ row.cells.memberSince }}</DataTable.Cell>
      </DataTable.Body>
    </DataTable.Root>
  </DataTable.Provider>
</template>
