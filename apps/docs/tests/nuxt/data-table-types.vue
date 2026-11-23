<script setup lang="ts">
import { createTableData, UIDataGrid, UIDataTable, type TableRow } from "@connextable/ui";

interface Invoice {
  amount: number;
  status: "paid" | "overdue";
  paidOn?: string;
}

const rows: readonly TableRow<Invoice>[] = [{ id: "invoice", cells: { amount: 125000, status: "paid" } }];
const data = createTableData({
  rows,
  columns: [{ id: "amount", label: "Amount" }, { id: "status", label: "Status" }],
});
const dateData = createTableData({ rows, columns: [{ id: "paidOn", label: "Paid on" }] });
const emptyData = createTableData({ rows: [], columns: [{ id: "amount", label: "Amount" }] });

// @ts-expect-error Column IDs are checked against the row model.
createTableData({ rows, columns: [{ id: "amout", label: "Amount" }] });
// @ts-expect-error Cell data must be serializable by the table source.
createTableData({ rows: [{ id: "invoice", cells: { paidOn: new Date() } }], columns: [{ id: "paidOn", label: "Paid on" }] });
</script>

<template>
  <UIDataTable :data="data" label="Invoices">
    <template #cell="{ columnID, row, value }">
      <span v-if="columnID === 'amount'">{{ value.toFixed(0) }} ({{ row.cells.status }})</span>
      <span v-else>{{ value.toUpperCase() }}</span>
    </template>
  </UIDataTable>
  <UIDataGrid :data="dateData" label="Invoice grid">
    <template #cell="{ columnID, value, row }">
      <span>{{ value?.toUpperCase() }} ({{ row.cells.amount.toFixed(0) }})</span>
      <!-- @vue-expect-error The slot only receives registered columns. -->
      <span v-if="columnID === 'amount'">{{ value }}</span>
      <!-- @vue-expect-error A missing cell produces null. -->
      <span :title="value.toUpperCase()" />
    </template>
  </UIDataGrid>
  <UIDataTable :data="emptyData" label="Empty invoices" />
</template>
