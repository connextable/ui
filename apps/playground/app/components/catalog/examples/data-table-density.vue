<script setup lang="ts">
import { UIButton, UIDataSurface, createUIDataTableComponents, useUIDataTable } from "@connextable/ui";
import { ref } from "vue";

const compact = ref(false);
const rows = [18, 54, 32, 9, 68, 41].map((count, index) => ({
  id: String(index), kind: "leaf" as const, cells: { hour: `${9 + index}:00`, count },
}));
const table = useUIDataTable({
  source: request => ({
    ...request, rows, viewRevision: request.requestID,
    matchingLeafCount: { kind: "known", value: rows.length },
    visibleRowCount: { kind: "known", value: rows.length },
    columnSchema: { revision: request.columnSchemaRevision, columns: [{ id: "hour" }, { id: "count" }], headers: [] },
    removedRowIDs: [],
  }),
});
const Table = createUIDataTableComponents(table);
</script>

<template>
  <UIDataSurface>
    <template #toolbar>
      <strong>시간대별 상담</strong>
      <UIButton size="sm" variant="outline" :aria-pressed="compact" @click="compact = !compact">촘촘하게</UIButton>
    </template>
    <Table.Provider>
      <Table.Root aria-label="시간대별 상담" data-ui-tabular-striped :data-ui-tabular-density="compact ? 'compact' : undefined">
        <Table.Header>
          <Table.HeaderRow>
            <Table.ColumnHeader column="hour">시간</Table.ColumnHeader>
            <Table.ColumnHeader column="count" data-ui-tabular-align="end">상담 건수</Table.ColumnHeader>
          </Table.HeaderRow>
        </Table.Header>
        <Table.Body v-slot="{ row }">
          <Table.Cell column="hour" data-ui-tabular-primary>{{ row.cells.hour }}</Table.Cell>
          <Table.Cell column="count" data-ui-tabular-numeric data-ui-tabular-align="end">{{ row.cells.count }}건</Table.Cell>
        </Table.Body>
      </Table.Root>
    </Table.Provider>
  </UIDataSurface>
</template>
