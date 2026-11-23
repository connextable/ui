<script setup lang="ts">
import { UIDataSurface, UIDataTable, UISelect, type UIDataColumn } from "@connextable/ui";
import { computed, ref } from "vue";

const column = {
  order: { id: "order", label: "주문 번호" },
  location: { id: "location", label: "창고 위치" },
  units: { id: "units", label: "포장 수량", align: "end" },
  carrier: { id: "carrier", label: "택배사" },
  tracking: { id: "tracking", label: "운송장 번호" },
  destination: { id: "destination", label: "도착지" },
} satisfies Record<string, UIDataColumn>;

const packingColumns = [column.order, column.location, column.destination, column.units];
const trackingColumns = [column.order, column.tracking, column.carrier, column.destination];
const rows = [
  { id: "O-2104", cells: { order: "O-2104", location: "A-03", units: 2, carrier: "우체국", tracking: "6890-1210-0401", destination: "서울" } },
  { id: "O-2105", cells: { order: "O-2105", location: "B-12", units: 8, carrier: "롯데택배", tracking: "2480-3700-1012", destination: "부산" } },
  { id: "O-2106", cells: { order: "O-2106", location: "A-07", units: 5, carrier: "우체국", tracking: "6890-1210-0403", destination: "제주" } },
];
const views = [
  { value: "packing", label: "출고 준비" },
  { value: "tracking", label: "배송 추적" },
];
const view = ref("packing");
const columns = computed(() => view.value === "tracking" ? trackingColumns : packingColumns);
</script>

<template>
  <UIDataSurface>
    <template #toolbar>
      <strong>오늘 출고할 주문</strong>
      <UISelect v-model="view" :options="views" aria-label="주문 목록 보기" size="sm" />
    </template>
    <div data-ui-tabular-scroll tabindex="0" role="region" aria-label="출고 목록 스크롤 영역">
      <UIDataTable :columns="columns" :rows="rows" class="outbound-orders" label="출고 목록" />
    </div>
  </UIDataSurface>
</template>

<style scoped>
.outbound-orders {
  min-inline-size: 28rem;
}
</style>
