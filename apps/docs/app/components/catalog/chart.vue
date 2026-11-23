<script setup lang="ts">
import { UIChart } from "@connextable/ui";

const revenue = [128, 135, 132, 149, 146, 163, 168].map((amount, index) => ({
  id: index,
  date: new Date(Date.UTC(2026, 6, 6 + index * 7)),
  amount,
}));
</script>

<template>
  <UIChart
    :dom="{ accessibilityLabel: '주간 매출 추이' }"
    :series="{
      data: revenue,
      label: '주간 매출',
      x: { field: 'date', scale: 'temporal', ticks: 7 },
      y: { field: 'amount', label: '매출 (만 원)', ticks: 5, domain: { kind: 'numeric', minimum: 100, maximum: 180 } },
    }"
  />
</template>
