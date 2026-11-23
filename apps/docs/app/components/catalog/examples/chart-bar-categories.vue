<script setup lang="ts">
import { UIButton, UIChart, UIChartActions, UIChartBar, UIChartCartesian, UIChartPlot, UIChartRenderer, UIChartXAxis, UIChartYAxis } from "@connextable/ui";
import { computed, ref } from "vue";

const may = { id: "may", month: "5월", count: 120 };
const june = { id: "june", month: "6월", count: 178 };
const july = { id: "july", month: "7월", count: 238 };
const august = { id: "august", month: "8월", count: 184 };
const september = { id: "september", month: "9월", count: 264 };
const includeJuly = ref(true);
const includeSeptember = ref(false);
const orders = computed(() => [
  may,
  june,
  ...(includeJuly.value ? [july] : []),
  august,
  ...(includeSeptember.value ? [september] : []),
]);
const domain = { kind: "numeric", minimum: 0, maximum: 300 } as const;
</script>

<template>
  <UIChart animate-updates :dom="{
    accessibilityLabel: '선택한 월의 주문 건수',
    getAccessibleDatumLabel: id => {
      const row = orders.find(order => order.id === id);
      return row ? `${row.month} ${row.count}건` : String(id);
    },
  }">
    <UIChartCartesian>
      <UIChartXAxis id="month" scale="categorical" field="month" :ticks="orders.length" />
      <UIChartYAxis id="orders" scale="linear" field="count" :domain="domain" :ticks="4" label="주문 수" unit="건" />
      <UIChartBar id="monthly-orders" label="주문 수" :data="orders" x-axis="month" y-axis="orders" />
    </UIChartCartesian>
    <UIChartPlot><UIChartRenderer /></UIChartPlot>
    <UIChartActions>
      <output>표시 중인 월 {{ orders.length }}개</output>
      <UIButton size="sm" variant="outline" @click="includeJuly = !includeJuly">
        {{ includeJuly ? "7월 제외" : "7월 복원" }}
      </UIButton>
      <UIButton size="sm" variant="outline" @click="includeSeptember = !includeSeptember">
        {{ includeSeptember ? "9월 제외" : "9월 추가" }}
      </UIButton>
    </UIChartActions>
  </UIChart>
</template>
