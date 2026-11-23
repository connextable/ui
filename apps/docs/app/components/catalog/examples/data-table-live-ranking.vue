<script setup lang="ts">
import { UIButton, UIDataSurface, UITabularRows, createUIDataTableComponents, useDataTable } from "@connextable/ui";
import { ref, watchEffect } from "vue";

let rows = ["문서 검색", "파일 다운로드", "알림 조회", "계정 설정", "팀 초대"].map((service, index) => ({
  id: service, kind: "leaf" as const, cells: { service, calls: 220 - index * 12 },
}));
const running = ref(false);
const updateCount = ref(0);
const table = useDataTable({
  source: request => ({
    ...request, rows, viewRevision: request.requestID,
    matchingLeafCount: { kind: "known", value: rows.length },
    visibleRowCount: { kind: "known", value: rows.length },
    columnSchema: { revision: request.columnSchemaRevision, columns: [{ id: "service" }, { id: "calls" }], headers: [] },
    removedRowIDs: [],
  }),
});
const Table = createUIDataTableComponents(table);

function update() {
  updateCount.value++;
  rows = rows.map(row => ({
    ...row, cells: { ...row.cells, calls: row.cells.calls + ((row.id.length * 13 + updateCount.value * 31 + row.id.charCodeAt(0)) % 83) },
  })).sort((a, b) => b.cells.calls - a.cells.calls);
  table.reload();
}

watchEffect(onCleanup => {
  if (!running.value) return;
  const timer = setInterval(update, 1400);
  onCleanup(() => clearInterval(timer));
});
</script>

<template>
  <UIDataSurface>
    <template #toolbar>
      <output>가상 집계 · {{ updateCount }}회 갱신</output>
      <UIButton size="sm" variant="outline" @click="running = !running">{{ running ? "일시정지" : "재생" }}</UIButton>
    </template>
    <Table.Provider>
      <Table.Root aria-label="기능별 요청 수 순위">
        <Table.Header>
          <Table.HeaderRow>
            <Table.ColumnHeader column="service">기능</Table.ColumnHeader>
            <Table.ColumnHeader column="calls" data-ui-tabular-align="end">요청 수</Table.ColumnHeader>
          </Table.HeaderRow>
        </Table.Header>
        <Table.Body manual v-slot="{ rows: ranked }">
          <UITabularRows>
            <Table.Row v-for="row in ranked" :key="row.id" :row-i-d="row.id">
              <Table.Cell :row-i-d="row.id" column="service" data-ui-tabular-primary>{{ row.cells.service }}</Table.Cell>
              <Table.Cell :row-i-d="row.id" column="calls" data-ui-tabular-numeric data-ui-tabular-align="end">{{ row.cells.calls }}건</Table.Cell>
            </Table.Row>
          </UITabularRows>
        </Table.Body>
      </Table.Root>
    </Table.Provider>
    <template #footer><UIButton size="sm" variant="ghost" @click="update">한 번 갱신</UIButton></template>
  </UIDataSurface>
</template>
