<script setup lang="ts">
import {
  createUIDataTableComponents,
  createUITabularSource,
  UIDataStatus,
  UIRadioGroup,
  UITabularColumnAction,
  UITabularColumnHeading,
  UITabularFilterPopover,
  useDataTable,
} from "@connextable/ui";
import { computed } from "vue";

const expenseRequests = [
  { kind: "leaf", id: "E-121", cells: { title: "촬영 장비 임대", status: "대기", amount: 320000 } },
  { kind: "leaf", id: "E-122", cells: { title: "테스트 기기 구매", status: "승인", amount: 1250000 } },
  { kind: "leaf", id: "E-123", cells: { title: "세미나 장소 대관", status: "대기", amount: 960000 } },
  { kind: "leaf", id: "E-124", cells: { title: "워크숍 자료 인쇄", status: "대기", amount: 85000 } },
  { kind: "leaf", id: "E-125", cells: { title: "디자인 도구 구독", status: "승인", amount: 220000 } },
] as const;
const statusOptions = [
  { value: "all", label: "모든 상태" },
  { value: "대기", label: "대기" },
  { value: "승인", label: "승인" },
];
const won = new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW" });

const source = createUITabularSource({
  columns: [{ id: "title" }, { id: "status", capabilities: ["filter"] }, { id: "amount", capabilities: ["sort"] }],
  load({ query }) {
    const status = query.filters.find(filter => filter.id === "approval-status")?.value;
    const sort = query.sort.find(entry => entry.columnID === "amount");
    const rows = expenseRequests.filter(row => !status || row.cells.status === status);
    if (sort) {
      const direction = sort.direction === "ascending" ? 1 : -1;
      rows.sort((a, b) => direction * (a.cells.amount - b.cells.amount));
    }
    return { rows };
  },
});
const table = useDataTable({ source });
const Table = createUIDataTableComponents(table);

const statusFilter = computed({
  get() {
    return String(table.snapshot.value.state.query.filters.find(filter => filter.id === "approval-status")?.value ?? "all");
  },
  set(value: string) {
    const query = table.snapshot.value.state.query;
    const filters = query.filters.filter(filter => filter.id !== "approval-status");
    if (value !== "all") {
      filters.push({ id: "approval-status", scope: "column", columnID: "status", predicate: "equals", value });
    }
    table.dispatch({ type: "set-query", query: { ...query, filters } });
  },
});
</script>

<template>
  <PlaygroundExample v-bind="$attrs as { id: string; title: string }">
    <Table.Provider>
      <Table.Root aria-label="비용 승인 요청">
        <Table.Header>
          <Table.HeaderRow>
            <Table.ColumnHeader column="title">비용 항목</Table.ColumnHeader>
            <Table.ColumnHeader column="status">
              <UITabularColumnHeading>
                승인 상태
                <template #actions>
                  <UITabularFilterPopover label="승인 상태 필터" :value="statusFilter === 'all' ? '' : statusFilter">
                    <UIRadioGroup v-model="statusFilter" :options="statusOptions" aria-label="승인 상태 선택" />
                  </UITabularFilterPopover>
                </template>
              </UITabularColumnHeading>
            </Table.ColumnHeader>
            <Table.ColumnHeader column="amount" data-ui-tabular-align="end">
              <UITabularColumnHeading class="amount-heading">
                요청 금액
                <template #actions>
                  <Table.SortTrigger column="amount" as-child>
                    <UITabularColumnAction kind="sort" label="요청 금액 정렬" />
                  </Table.SortTrigger>
                </template>
              </UITabularColumnHeading>
            </Table.ColumnHeader>
          </Table.HeaderRow>
        </Table.Header>
        <Table.Body v-slot="{ row }">
          <Table.Cell column="title">{{ row.cells.title }}</Table.Cell>
          <Table.Cell column="status">
            <UIDataStatus :tone="row.cells.status === '승인' ? 'success' : 'warning'">
              {{ row.cells.status }}
            </UIDataStatus>
          </Table.Cell>
          <Table.Cell column="amount" data-ui-tabular-align="end" data-ui-tabular-numeric>
            {{ won.format(row.cells.amount) }}
          </Table.Cell>
        </Table.Body>
      </Table.Root>
    </Table.Provider>
    <template #footer>
      <output v-if="table.acceptedViewState.value.kind !== 'none'" aria-live="polite">
        표시 중인 요청 {{ table.acceptedViewState.value.view.rows.length }}건
      </output>
    </template>
  </PlaygroundExample>
</template>

<style scoped>
.amount-heading {
  justify-content: flex-end;
}
</style>
