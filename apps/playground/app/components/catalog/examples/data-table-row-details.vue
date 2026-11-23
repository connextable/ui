<script setup lang="ts">
import { ref } from "vue";
import { ArrowUpRight, Receipt } from "@lucide/vue";
import { UIButton, UIDataLabel, UIDataSurface, createUIDataTableComponents, useDataTable } from "@connextable/ui";

const rows = [
  { kind: "leaf", id: "EX-018", cells: { name: "장비 대여", amount: 86000, note: "워크숍에서 사용할 프로젝터 1대와 화면을 대여했습니다." } },
  { kind: "leaf", id: "EX-027", cells: { name: "회의실 이용", amount: 145000, note: "외부 인터뷰 3회에 사용한 회의실 비용입니다." } },
  { kind: "leaf", id: "EX-031", cells: { name: "자료 인쇄", amount: 32000, note: "참가자에게 나눠 준 안내 자료 40부를 출력했습니다." } },
] as const;
const opened = ref<(typeof rows)[number]>();
const won = new Intl.NumberFormat("ko-KR");
const table = useDataTable({
  source: request => ({
    ...request, rows, viewRevision: request.requestID,
    matchingLeafCount: { kind: "known", value: rows.length },
    visibleRowCount: { kind: "known", value: rows.length },
    columnSchema: {
      revision: request.columnSchemaRevision,
      columns: [{ id: "name" }, { id: "amount" }, { id: "note" }], headers: [],
    },
    removedRowIDs: [],
  }),
});
const Table = createUIDataTableComponents(table);
</script>

<template>
  <UIDataSurface>
    <Table.Provider>
      <Table.Root aria-label="비용 내역">
        <Table.Header>
          <Table.HeaderRow>
            <Table.ColumnHeader column="name">항목</Table.ColumnHeader>
            <Table.ColumnHeader column="amount" data-ui-tabular-align="end">금액</Table.ColumnHeader>
            <Table.ColumnHeader column="note" data-ui-tabular-align="end">상세</Table.ColumnHeader>
          </Table.HeaderRow>
        </Table.Header>
        <Table.Body v-slot="{ row }">
          <Table.Cell column="name"><UIDataLabel :label="row.cells.name" :detail="String(row.id)" :icon="Receipt" /></Table.Cell>
          <Table.Cell column="amount" data-ui-tabular-align="end" data-ui-tabular-numeric>{{ won.format(row.cells.amount) }}원</Table.Cell>
          <Table.Cell column="note" data-ui-tabular-align="end">
            <UIButton size="sm" variant="ghost" icon-only :aria-label="`${row.cells.name} 상세`"
              :aria-pressed="opened?.id === row.id" @click="opened = rows.find(item => item.id === row.id)">
              <ArrowUpRight aria-hidden="true" />
            </UIButton>
          </Table.Cell>
        </Table.Body>
      </Table.Root>
    </Table.Provider>
    <template #footer>
      <output aria-live="polite">{{ opened ? `${opened.cells.name} · ${opened.cells.note}` : "상세 버튼을 눌러 사용 목적을 확인하세요." }}</output>
    </template>
  </UIDataSurface>
</template>
