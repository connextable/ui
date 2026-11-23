<script setup lang="ts">
import { ChevronLeft, ChevronRight } from "@lucide/vue";
import { UIButton, UIDataActions, createUIDataTableComponents, useDataTable } from "@connextable/ui";

const total = 25_000;
const pageSize = 6;
const lastPage = Math.ceil(total / pageSize);
const number = new Intl.NumberFormat("ko-KR");
const pageAccess = (page: number) => ({
  kind: "page" as const, page, itemsPerPage: pageSize, visibleRowCount: null, pagination: null,
});
const table = useDataTable({
  defaultAccessState: pageAccess(1),
  source: (request) => {
    const first = request.access.kind === "page" ? (request.access.page - 1) * request.access.itemsPerPage : request.access.start;
    const count = request.access.kind === "page" ? request.access.itemsPerPage : request.access.count;
    const rows = Array.from({ length: Math.min(count, total - first) }, (_, offset) => {
      const id = first + offset + 1;
      return {
        kind: "leaf" as const, id: String(id),
        cells: { code: `REQ-${String(id).padStart(5, "0")}`, channel: ["웹", "앱", "제휴"][id % 3]!, count: 20 + (id * 37) % 480 },
      };
    });
    return {
      ...request, rows, viewRevision: request.requestID,
      matchingLeafCount: { kind: "known", value: total },
      visibleRowCount: { kind: "known", value: total },
      columnSchema: { revision: request.columnSchemaRevision, columns: [{ id: "code" }, { id: "channel" }, { id: "count" }], headers: [] },
      removedRowIDs: [],
    };
  },
});
const Table = createUIDataTableComponents(table);
</script>

<template>
  <Table.Provider v-slot="{ accessState }">
    <PlaygroundExample v-if="accessState.kind === 'page'" v-bind="$attrs as { id: string; title: string }">
      <Table.Root aria-label="요청 목록">
        <Table.Header>
          <Table.HeaderRow>
            <Table.ColumnHeader column="code">요청 번호</Table.ColumnHeader>
            <Table.ColumnHeader column="channel">채널</Table.ColumnHeader>
            <Table.ColumnHeader column="count" data-ui-tabular-align="end">처리 건수</Table.ColumnHeader>
          </Table.HeaderRow>
        </Table.Header>
        <Table.Body v-slot="{ row }">
          <Table.Cell column="code" data-ui-tabular-numeric>{{ row.cells.code }}</Table.Cell>
          <Table.Cell column="channel">{{ row.cells.channel }}</Table.Cell>
          <Table.Cell column="count" data-ui-tabular-align="end" data-ui-tabular-numeric>{{ number.format(row.cells.count) }}</Table.Cell>
        </Table.Body>
      </Table.Root>
      <UIDataActions>
        <UIButton size="sm" variant="outline" icon-only aria-label="이전 페이지" :disabled="accessState.page <= 1"
          @click="table.dispatch({ type: 'set-access', accessState: pageAccess(accessState.page - 1) })"><ChevronLeft /></UIButton>
        <UIButton size="sm" variant="outline" icon-only aria-label="다음 페이지" :disabled="accessState.page >= lastPage"
          @click="table.dispatch({ type: 'set-access', accessState: pageAccess(accessState.page + 1) })"><ChevronRight /></UIButton>
      </UIDataActions>
      <template #footer>
        <output>{{ number.format(accessState.page) }} / {{ number.format(lastPage) }} 페이지 (총 {{ number.format(total) }}건)</output>
      </template>
    </PlaygroundExample>
  </Table.Provider>
</template>
