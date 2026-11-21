<script setup lang="ts">
import { UIButton, UIDataSurface, createUIDataTableComponents, useUIDataTable } from "@connextable/ui";

const total = 37;
const sizes = [4, 8, 12];
const pageAccess = (page: number, itemsPerPage: number) => ({
  kind: "page" as const, page, itemsPerPage, visibleRowCount: null, pagination: null,
});
const table = useUIDataTable({
  defaultAccessState: pageAccess(3, sizes[0]!),
  source: request => {
    const { page, itemsPerPage } = request.access.kind === "page" ? request.access : pageAccess(1, sizes[0]!);
    const start = (page - 1) * itemsPerPage;
    const rows = Array.from({ length: Math.min(itemsPerPage, total - start) }, (_, index) => {
      const id = start + index + 1;
      return { id: String(id), kind: "leaf" as const, cells: { title: `정산 내역 #${id}` } };
    });
    return {
      ...request, rows, viewRevision: request.requestID,
      matchingLeafCount: { kind: "known", value: total },
      visibleRowCount: { kind: "known", value: total },
      columnSchema: { revision: request.columnSchemaRevision, columns: [{ id: "title" }], headers: [] },
      removedRowIDs: [],
    };
  },
});
const Table = createUIDataTableComponents(table);

function setSize(size: number, page: number, previousSize: number) {
  const first = (page - 1) * previousSize;
  table.dispatch({ type: "set-access", accessState: pageAccess(Math.floor(first / size) + 1, size) });
}
</script>

<template>
  <Table.Provider v-slot="{ accessState, rows }">
    <UIDataSurface v-if="accessState.kind === 'page'">
      <template #toolbar>
        <strong>페이지당 행</strong>
        <div>
          <UIButton v-for="size in sizes" :key="size" size="sm" variant="ghost"
            :aria-pressed="size === accessState.itemsPerPage" @click="setSize(size, accessState.page, accessState.itemsPerPage)">
            {{ size }}행
          </UIButton>
        </div>
      </template>
      <Table.Root aria-label="정산 내역">
        <Table.Header>
          <Table.HeaderRow><Table.ColumnHeader column="title">내역</Table.ColumnHeader></Table.HeaderRow>
        </Table.Header>
        <Table.Body v-slot="{ row }"><Table.Cell column="title">{{ row.cells.title }}</Table.Cell></Table.Body>
      </Table.Root>
      <template #footer>
        <output aria-live="polite">전체 {{ total }}건 중 {{ rows[0]?.id }}–{{ rows.at(-1)?.id }}번 표시</output>
      </template>
    </UIDataSurface>
  </Table.Provider>
</template>
