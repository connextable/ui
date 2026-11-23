<script setup lang="ts">
import { UIDataLabel, UIDataStatus, UIDataTable, type UIDataColumn } from "@connextable/ui";

const columns = [
  { id: "customer", label: "고객" },
  { id: "status", label: "결제 상태" },
  { id: "amount", label: "청구 금액", align: "end" },
  { id: "paidOn", label: "결제일", align: "end" },
] satisfies readonly UIDataColumn[];

const invoices = [
  { id: "INV-1042", cells: { customer: "모노 스튜디오", status: "paid", amount: 1250000, paidOn: "2026-08-12" } },
  { id: "INV-1043", cells: { customer: "오후 서점", status: "awaiting", amount: 96000, paidOn: null } },
  { id: "INV-1044", cells: { customer: "나무 공방", status: "overdue", amount: 415000, paidOn: null } },
];

const status = {
  paid: { label: "결제 완료", tone: "success" },
  awaiting: { label: "결제 대기", tone: "neutral" },
  overdue: { label: "기한 초과", tone: "danger" },
} as const;
const won = new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW" });
const date = new Intl.DateTimeFormat("ko-KR", { dateStyle: "medium", timeZone: "UTC" });
</script>

<template>
  <div data-ui-tabular-scroll tabindex="0" role="region" aria-label="청구서 표 스크롤 영역">
    <UIDataTable :columns="columns" :rows="invoices" class="invoices" label="청구서" data-ui-tabular-striped>
      <template #cell="{ column, row, value }">
        <UIDataLabel v-if="column.id === 'customer'" :label="String(value)" :detail="row.id" />
        <UIDataStatus
          v-else-if="column.id === 'status' && (value === 'paid' || value === 'awaiting' || value === 'overdue')"
          :tone="status[value].tone"
        >
          {{ status[value].label }}
        </UIDataStatus>
        <span v-else-if="column.id === 'amount' && typeof value === 'number'" data-ui-tabular-numeric>
          {{ won.format(value) }}
        </span>
        <time v-else-if="column.id === 'paidOn' && typeof value === 'string'" :datetime="value">
          {{ date.format(new Date(value)) }}
        </time>
        <span v-else-if="column.id === 'paidOn'">미결제</span>
      </template>
    </UIDataTable>
  </div>
</template>

<style scoped>
.invoices {
  min-inline-size: 32rem;
}
</style>
