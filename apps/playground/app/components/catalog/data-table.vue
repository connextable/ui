<script setup lang="ts">
import { UIDataLabel, UIDataStatus, UIDataSurface, createUIDataTableComponents, useUIDataTable } from "@connextable/ui";
import { UserRound } from "@lucide/vue";

const users = [
  { kind: "leaf", id: "1", cells: { name: "김민지", team: "제품 디자인", role: "디자이너", status: "활성", memberSince: "2024. 03." } },
  { kind: "leaf", id: "2", cells: { name: "이서준", team: "플랫폼", role: "엔지니어", status: "활성", memberSince: "2024. 11." } },
  { kind: "leaf", id: "3", cells: { name: "박다현", team: "제품 디자인", role: "리서처", status: "초대 대기", memberSince: "—" } },
  { kind: "leaf", id: "4", cells: { name: "정지우", team: "운영", role: "매니저", status: "활성", memberSince: "2025. 09." } },
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
      columns: [{ id: "name" }, { id: "team" }, { id: "status" }, { id: "memberSince" }],
      headers: [],
    },
    removedRowIDs: [],
  }),
});
const DataTable = createUIDataTableComponents(table);
</script>

<template>
  <UIDataSurface>
    <template #toolbar><strong>팀 구성원</strong><output>구성원 {{ users.length }}명</output></template>
    <DataTable.Provider>
      <DataTable.Root aria-label="팀 구성원">
        <DataTable.Header>
          <DataTable.HeaderRow>
            <DataTable.ColumnHeader column="name">이름</DataTable.ColumnHeader>
            <DataTable.ColumnHeader column="team">팀</DataTable.ColumnHeader>
            <DataTable.ColumnHeader column="status">상태</DataTable.ColumnHeader>
            <DataTable.ColumnHeader column="memberSince" data-ui-tabular-align="end">합류일</DataTable.ColumnHeader>
          </DataTable.HeaderRow>
        </DataTable.Header>
        <DataTable.Body v-slot="{ row }">
          <DataTable.Cell column="name">
            <UIDataLabel :label="row.cells.name" :detail="row.cells.role">
              <template #icon><UserRound :size="15" aria-hidden="true" /></template>
            </UIDataLabel>
          </DataTable.Cell>
          <DataTable.Cell column="team">{{ row.cells.team }}</DataTable.Cell>
          <DataTable.Cell column="status">
            <UIDataStatus :tone="row.cells.status === '활성' ? 'success' : 'warning'">{{ row.cells.status }}</UIDataStatus>
          </DataTable.Cell>
          <DataTable.Cell column="memberSince" data-ui-tabular-numeric data-ui-tabular-align="end">{{ row.cells.memberSince }}</DataTable.Cell>
        </DataTable.Body>
      </DataTable.Root>
    </DataTable.Provider>
  </UIDataSurface>
</template>
