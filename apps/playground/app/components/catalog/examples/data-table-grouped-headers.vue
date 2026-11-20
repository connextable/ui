<script setup lang="ts">
import { createUIDataTableComponents, useUIDataTable } from "@connextable/ui";

const rows = [
  { kind: "leaf", id: "web", cells: { channel: "웹", march: 680, april: 810, may: 990, june: 1040 } },
  { kind: "leaf", id: "app", cells: { channel: "앱", march: 430, april: 528, may: 610, june: 860 } },
  { kind: "leaf", id: "partner", cells: { channel: "제휴", march: 210, april: 245, may: 310, june: 390 } },
] as const;
const columns = ["channel", "march", "april", "may", "june"] as const;
const table = useUIDataTable({
  source: request => ({
    ...request, rows, viewRevision: request.requestID,
    matchingLeafCount: { kind: "known", value: rows.length },
    visibleRowCount: { kind: "known", value: rows.length },
    columnSchema: {
      revision: request.columnSchemaRevision,
      columns: columns.map(id => ({ id })),
      headers: [
        { kind: "column", id: "channel", columnID: "channel" },
        { kind: "group", id: "baseline", children: [
          { kind: "column", id: "march", columnID: "march" },
          { kind: "column", id: "april", columnID: "april" },
        ] },
        { kind: "group", id: "experiment", children: [
          { kind: "column", id: "may", columnID: "may" },
          { kind: "column", id: "june", columnID: "june" },
        ] },
      ],
    },
    removedRowIDs: [],
  }),
});
const Table = createUIDataTableComponents(table);
const number = new Intl.NumberFormat("ko-KR");
</script>

<template>
  <Table.Provider>
  <Table.Root aria-label="도입 전후 채널별 요청 수">
    <Table.Header>
      <Table.HeaderRow>
        <Table.ColumnHeader column="channel">채널</Table.ColumnHeader>
        <Table.ColumnHeader header="baseline">도입 전</Table.ColumnHeader>
        <Table.ColumnHeader header="experiment">도입 후</Table.ColumnHeader>
      </Table.HeaderRow>
      <Table.HeaderRow>
        <Table.ColumnHeader column="march">3월</Table.ColumnHeader>
        <Table.ColumnHeader column="april">4월</Table.ColumnHeader>
        <Table.ColumnHeader column="may">5월</Table.ColumnHeader>
        <Table.ColumnHeader column="june">6월</Table.ColumnHeader>
      </Table.HeaderRow>
    </Table.Header>
    <Table.Body v-slot="{ row }">
      <Table.Cell column="channel">{{ row.cells.channel }}</Table.Cell>
      <Table.Cell v-for="month in columns.slice(1)" :key="month" :column="month" data-ui-tabular-numeric>
        {{ number.format(Number(row.cells[month])) }}
      </Table.Cell>
    </Table.Body>
  </Table.Root>
  </Table.Provider>
</template>
