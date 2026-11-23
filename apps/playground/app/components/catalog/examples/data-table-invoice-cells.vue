<script setup lang="ts">
import { createTableData, UIDataLabel, UIDataStatus, UIDataTable } from "@connextable/ui";

const invoices = createTableData({
  columns: [
    { id: "customer", label: "고객" },
    { id: "status", label: "결제 상태" },
    { id: "amount", label: "청구 금액", align: "end" },
    { id: "paidOn", label: "결제일", align: "end" },
  ],
  rows: [
    { id: "INV-1042", cells: { customer: "모노 스튜디오", status: "paid", amount: 1250000, paidOn: "2026-08-12" } },
    { id: "INV-1043", cells: { customer: "오후 서점", status: "awaiting", amount: 96000, paidOn: null } },
    { id: "INV-1044", cells: { customer: "나무 공방", status: "overdue", amount: 415000, paidOn: null } },
  ],
});

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
    <UIDataTable :data="invoices" class="invoices" label="청구서" data-ui-tabular-striped>
      <template #cell="{ columnID, row, value }">
        <UIDataLabel v-if="columnID === 'customer'" :label="value" :detail="row.id" />
        <UIDataStatus v-else-if="columnID === 'status'" :tone="status[value].tone">
          {{ status[value].label }}
        </UIDataStatus>
        <span v-else-if="columnID === 'amount'" data-ui-tabular-numeric>
          {{ won.format(value) }}
        </span>
        <time v-else-if="value !== null" :datetime="value">
          {{ date.format(new Date(value)) }}
        </time>
        <span v-else>미결제</span>
      </template>
    </UIDataTable>
  </div>
</template>

<style scoped>
.invoices {
  min-inline-size: 32rem;
}
</style>
