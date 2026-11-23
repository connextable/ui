<script setup lang="ts">
import { createUIDataTableComponents, useDataTable } from "@connextable/ui";

const stages = ["초안", "검토 중", "공개"];
const names = ["이용 가이드", "릴리스 노트", "운영 매뉴얼", "구성 안내"];
const rows = Array.from({ length: 24 }, (_, index) => ({
  kind: "leaf" as const, id: String(index + 1),
  cells: { name: `${names[index % names.length]} ${index + 1}`, owner: ["민지", "서준", "지우"][index % 3]!, stage: stages[index % 3]! },
}));
const table = useDataTable({
  source: request => ({
    ...request, rows, viewRevision: request.requestID,
    matchingLeafCount: { kind: "known", value: rows.length },
    visibleRowCount: { kind: "known", value: rows.length },
    columnSchema: { revision: request.columnSchemaRevision, columns: [{ id: "name" }, { id: "owner" }, { id: "stage" }], headers: [] },
    removedRowIDs: [],
  }),
});
const Table = createUIDataTableComponents(table);
</script>

<template>
  <div class="document-scroll" data-ui-tabular-scroll tabindex="0" role="region" aria-label="문서 목록 스크롤">
    <Table.Provider>
      <Table.Root aria-label="문서 목록">
        <Table.Header>
          <Table.HeaderRow>
            <Table.ColumnHeader column="name">문서</Table.ColumnHeader>
            <Table.ColumnHeader column="owner">담당자</Table.ColumnHeader>
            <Table.ColumnHeader column="stage">상태</Table.ColumnHeader>
          </Table.HeaderRow>
        </Table.Header>
        <Table.Body v-slot="{ row }">
          <Table.Cell column="name">{{ row.cells.name }}</Table.Cell>
          <Table.Cell column="owner">{{ row.cells.owner }}</Table.Cell>
          <Table.Cell column="stage">{{ row.cells.stage }}</Table.Cell>
        </Table.Body>
      </Table.Root>
    </Table.Provider>
  </div>
</template>

<style scoped>
.document-scroll {
  max-block-size: 15rem;
}
</style>
