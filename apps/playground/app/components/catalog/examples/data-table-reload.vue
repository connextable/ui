<script setup lang="ts">
import { UIButton, UIDataActions, createUIDataTableComponents, useDataTable } from "@connextable/ui";

const users = [
  { kind: "leaf", id: "1", cells: { name: "민지", team: "디자인" } },
  { kind: "leaf", id: "2", cells: { name: "서준", team: "개발" } },
] as const;

const table = useDataTable({
  source: async (request) => {
    await new Promise<void>((resolve) => setTimeout(resolve, 700));
    return {
    ...request,
    rows: users,
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
          <DataTable.ColumnHeader column="name">이름</DataTable.ColumnHeader>
          <DataTable.ColumnHeader column="team">팀</DataTable.ColumnHeader>
        </DataTable.HeaderRow>
      </DataTable.Header>
      <DataTable.Body v-slot="{ row }">
        <DataTable.Cell column="name">{{ row.cells.name }}</DataTable.Cell>
        <DataTable.Cell column="team">{{ row.cells.team }}</DataTable.Cell>
      </DataTable.Body>
    </DataTable.Root>
  </DataTable.Provider>
  <UIDataActions>
    <output aria-live="polite">{{ table.status.value === 'loading' ? '표를 불러오는 중' : '사용자 2명' }}</output>
    <UIButton size="sm" variant="outline" :loading="table.status.value === 'loading'" @click="table.reload()">다시 불러오기</UIButton>
  </UIDataActions>
</template>
