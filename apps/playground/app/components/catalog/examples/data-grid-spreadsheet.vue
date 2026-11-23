<script setup lang="ts">
import { onScopeDispose, ref } from "vue";
import { UIDataSurface, UITabularEditTrigger, createUIDataGridComponents, useDataGrid } from "@connextable/ui";

const total = ref(1200);
let rows = [["교육", 320], ["장비", 640], ["도서", 240]].map(([subject, budget], index) => ({
  id: String(index), kind: "leaf" as const, cells: { subject: String(subject), budget: Number(budget) },
}));
const grid = useDataGrid({
  source: request => ({
    ...request, rows, viewRevision: request.requestID,
    matchingLeafCount: { kind: "known", value: rows.length },
    visibleRowCount: { kind: "known", value: rows.length },
    columnSchema: { revision: request.columnSchemaRevision, columns: [{ id: "subject" }, { id: "budget", capabilities: ["edit"] }], headers: [] },
    removedRowIDs: [],
  }),
});
const Grid = createUIDataGridComponents(grid);
const number = new Intl.NumberFormat("ko-KR");

onScopeDispose(grid.subscribeCommands(command => {
  if (command.type !== "commit-edit" || typeof command.value !== "number") return;
  const budget = command.value;
  rows = rows.map(row => row.id === command.cell.rowID ? { ...row, cells: { ...row.cells, budget } } : row);
  total.value = rows.reduce((sum, row) => sum + row.cells.budget, 0);
  grid.reload();
}));

function parseBudget(input: string) {
  const value = Number(input);
  return input.trim() && Number.isSafeInteger(value) && value >= 0
    ? { ok: true, value } as const
    : { ok: false, error: { class: "transition-rejection", code: "invalid-query-value", message: "0 이상의 정수를 입력하세요." } } as const;
}
</script>

<template>
  <UIDataSurface>
    <Grid.Provider>
      <Grid.Root aria-label="팀 예산">
        <Grid.Header>
          <Grid.HeaderRow>
            <Grid.ColumnHeader column="subject">항목</Grid.ColumnHeader>
            <Grid.ColumnHeader column="budget" data-ui-tabular-align="end">월 예산 (천 원)</Grid.ColumnHeader>
          </Grid.HeaderRow>
        </Grid.Header>
        <Grid.Body v-slot="{ row }">
          <Grid.Cell column="subject" data-ui-tabular-primary>{{ row.cells.subject }}</Grid.Cell>
          <Grid.Cell column="budget" data-ui-tabular-align="end" data-ui-tabular-numeric>
            <Grid.Editor column="budget" inputmode="numeric" :value="row.cells.budget" :parse-value="parseBudget" :aria-label="`${row.cells.subject} 예산`" />
            <UITabularEditTrigger
              :aria-label="`${row.cells.subject} 예산 편집, 현재 ${number.format(row.cells.budget)}천 원`"
              @click="grid.dispatch({ type: 'begin-edit', cell: { rowID: row.id, columnID: 'budget' } })">
              {{ number.format(row.cells.budget) }}
            </UITabularEditTrigger>
          </Grid.Cell>
        </Grid.Body>
      </Grid.Root>
    </Grid.Provider>
    <template #footer><output aria-live="polite">월 예산 합계 {{ number.format(total) }}천 원</output></template>
  </UIDataSurface>
</template>
