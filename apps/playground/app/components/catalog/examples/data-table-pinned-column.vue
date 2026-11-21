<script setup lang="ts">
import { UIDataSurface, createUIDataTableComponents, useUIDataTable } from "@connextable/ui";

const periods = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월"] as const;
const rows = [
  { kind: "leaf", id: "web", cells: { channel: "웹", periods: [630, 720, 850, 970, 1010, 1120, 1080, 1150] } },
  { kind: "leaf", id: "app", cells: { channel: "앱", periods: [410, 490, 530, 600, 710, 760, 810, 940] } },
  { kind: "leaf", id: "other", cells: { channel: "제휴", periods: [230, 235, 270, 250, 280, 310, 320, 340] } },
] as const;
const table = useUIDataTable({
  source: request => ({
    ...request,
    rows: rows.map(row => ({
      ...row, cells: {
        channel: row.cells.channel,
        ...Object.fromEntries(periods.map((period, index) => [period, row.cells.periods[index]!])) as Record<(typeof periods)[number], number>,
      },
    })),
    viewRevision: request.requestID,
    matchingLeafCount: { kind: "known", value: rows.length },
    visibleRowCount: { kind: "known", value: rows.length },
    columnSchema: {
      revision: request.columnSchemaRevision,
      columns: [{ id: "channel" }, ...periods.map(id => ({ id }))], headers: [],
    },
    removedRowIDs: [],
  }),
});
const Table = createUIDataTableComponents(table);
const number = new Intl.NumberFormat("ko-KR");
</script>

<template>
  <UIDataSurface>
    <template #toolbar><strong>채널별 월간 요청</strong><output>1–8월 · 건</output></template>
    <div data-ui-tabular-scroll tabindex="0" role="region" aria-label="월간 요청 가로 스크롤">
      <Table.Provider>
        <Table.Root class="monthly-table" aria-label="채널별 월간 요청">
          <Table.Header>
            <Table.HeaderRow>
              <Table.ColumnHeader column="channel" data-ui-tabular-pin-start>채널</Table.ColumnHeader>
              <Table.ColumnHeader v-for="period in periods" :key="period" :column="period" data-ui-tabular-align="end">
                {{ period }}
              </Table.ColumnHeader>
            </Table.HeaderRow>
          </Table.Header>
          <Table.Body v-slot="{ row }">
            <Table.Cell column="channel" data-ui-tabular-pin-start data-ui-tabular-primary>{{ row.cells.channel }}</Table.Cell>
            <Table.Cell v-for="period in periods" :key="period" :column="period" data-ui-tabular-numeric data-ui-tabular-align="end">
              {{ number.format(row.cells[period]) }}
            </Table.Cell>
          </Table.Body>
        </Table.Root>
      </Table.Provider>
    </div>
  </UIDataSurface>
</template>

<style scoped>
.monthly-table { min-inline-size: 64rem; table-layout: fixed; }
</style>
