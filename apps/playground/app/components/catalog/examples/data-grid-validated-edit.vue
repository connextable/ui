<script setup lang="ts">
import { onScopeDispose, ref } from "vue";
import { UIDataActions, UITabularEditTrigger, createUIDataGridComponents, useDataGrid } from "@connextable/ui";

const message = ref("수량 옆 편집 버튼을 누르세요.");
let rows = [
  { kind: "leaf" as const, id: "cable", cells: { name: "충전 케이블", quantity: 18 } },
  { kind: "leaf" as const, id: "adapter", cells: { name: "전원 어댑터", quantity: 24 } },
  { kind: "leaf" as const, id: "holder", cells: { name: "기기 거치대", quantity: 8 } },
];
const grid = useDataGrid({
  source: request => ({
    ...request, rows, viewRevision: request.requestID,
    matchingLeafCount: { kind: "known", value: rows.length },
    visibleRowCount: { kind: "known", value: rows.length },
    columnSchema: { revision: request.columnSchemaRevision, columns: [{ id: "name" }, { id: "quantity", capabilities: ["edit"] }], headers: [] },
    removedRowIDs: [],
  }),
});
const Grid = createUIDataGridComponents(grid);
onScopeDispose(grid.subscribeCommands((command) => {
  if (command.type === "cancel-edit") message.value = "변경을 취소했습니다.";
  if (command.type !== "commit-edit" || typeof command.value !== "number") return;
  const quantity = command.value;
  rows = rows.map(row => row.id === command.cell.rowID ? { ...row, cells: { ...row.cells, quantity } } : row);
  message.value = `${quantity}개로 저장했습니다.`;
  grid.reload();
}));

function parseQuantity(input: string) {
  const value = Number(input);
  if (input.trim() && Number.isInteger(value) && value >= 0 && value <= 999) return { ok: true, value } as const;
  message.value = "0부터 999 사이의 정수를 입력하세요.";
  return { ok: false, error: { class: "transition-rejection", code: "invalid-query-value", message: message.value } } as const;
}
</script>

<template>
  <Grid.Provider>
  <Grid.Root aria-label="재고 수량">
    <Grid.Header>
      <Grid.HeaderRow>
        <Grid.ColumnHeader column="name">품목</Grid.ColumnHeader>
        <Grid.ColumnHeader column="quantity">재고 수량</Grid.ColumnHeader>
      </Grid.HeaderRow>
    </Grid.Header>
    <Grid.Body v-slot="{ row }">
      <Grid.Cell column="name">{{ row.cells.name }}</Grid.Cell>
      <Grid.Cell column="quantity" data-ui-tabular-numeric>
        <Grid.Editor column="quantity" inputmode="numeric" :value="row.cells.quantity" :parse-value="parseQuantity" :aria-label="`${row.cells.name} 수량`" />
        <UITabularEditTrigger
          :aria-label="`${row.cells.name} 수량 편집, 현재 ${row.cells.quantity}개`"
          @click="grid.dispatch({ type: 'begin-edit', cell: { rowID: row.id, columnID: 'quantity' } })">
          {{ row.cells.quantity }}개
        </UITabularEditTrigger>
      </Grid.Cell>
    </Grid.Body>
  </Grid.Root>
  </Grid.Provider>
  <UIDataActions><output aria-live="polite">{{ message }}</output></UIDataActions>
</template>
