<script setup lang="ts">
import { computed, ref } from "vue";
import { Archive } from "@lucide/vue";
import { UIButton, UIDataSurface, UITabularRows, createUIDataTableComponents, useUIDataTable } from "@connextable/ui";

const initialRows = ["오류 추적", "검색 리뉴얼", "분석 이벤트", "접근성 점검"].map((name, index) => ({
  id: String(index + 1), kind: "leaf" as const, cells: { select: null, name },
}));
let rows = initialRows;
const archived = ref(0);
const table = useUIDataTable({
  source: request => ({
    ...request, rows, viewRevision: request.requestID,
    matchingLeafCount: { kind: "known", value: rows.length },
    visibleRowCount: { kind: "known", value: rows.length },
    columnSchema: { revision: request.columnSchemaRevision, columns: [{ id: "select" }, { id: "name" }], headers: [] },
    removedRowIDs: initialRows.filter(row => !rows.includes(row)).map(row => row.id),
  }),
});
const Table = createUIDataTableComponents(table);
const selected = computed(() => {
  const selection = table.snapshot.value.state.rowSelection;
  return rows.filter(row => selection.kind === "all-matching"
    ? !selection.excludedRowIDs.includes(row.id)
    : selection.rowIDs.includes(row.id));
});

function archive() {
  const marked = selected.value;
  rows = rows.filter(row => !marked.includes(row));
  archived.value += marked.length;
  table.dispatch({ type: "set-row-selection", selection: { kind: "explicit-rows", rowIDs: [] } });
  table.reload();
}

function reset() {
  rows = initialRows;
  archived.value = 0;
  table.reload();
}
</script>

<template>
  <UIDataSurface>
    <template #toolbar>
      <output aria-live="polite">{{ selected.length }}개 선택 · {{ archived }}개 보관</output>
      <UIButton size="sm" :disabled="!selected.length" @click="archive">
        <template #leading><Archive /></template>선택 항목 보관
      </UIButton>
    </template>
    <Table.Provider>
      <Table.Root aria-label="보관할 프로젝트">
        <Table.Header>
          <Table.HeaderRow>
            <Table.ColumnHeader column="select">
              <Table.BulkSelectionControl :target="{ kind: 'all-matching' }" aria-label="프로젝트 모두 선택" />
            </Table.ColumnHeader>
            <Table.ColumnHeader column="name">프로젝트</Table.ColumnHeader>
          </Table.HeaderRow>
        </Table.Header>
        <Table.Body manual v-slot="{ rows: currentRows }">
          <UITabularRows>
            <Table.Row v-for="row in currentRows" :key="row.id" :row-i-d="row.id">
              <Table.Cell :row-i-d="row.id" column="select">
                <Table.SelectionControl :row-i-d="row.id" name="projects" :value="row.id" :aria-label="`${row.cells.name} 선택`" />
              </Table.Cell>
              <Table.Cell :row-i-d="row.id" column="name" data-ui-tabular-primary>{{ row.cells.name }}</Table.Cell>
            </Table.Row>
          </UITabularRows>
        </Table.Body>
      </Table.Root>
    </Table.Provider>
    <template v-if="archived === initialRows.length" #footer>
      <output>모든 프로젝트를 보관했습니다.</output>
      <UIButton size="sm" variant="outline" @click="reset">예제 초기화</UIButton>
    </template>
  </UIDataSurface>
</template>
