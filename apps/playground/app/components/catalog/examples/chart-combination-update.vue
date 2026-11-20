<script setup lang="ts">
import { UIButton, UIChart, UIChartActions, UIChartBar, UIChartCartesian, UIChartLegend, UIChartLine, UIChartPlot, UIChartRenderer, UIChartXAxis, UIChartYAxis } from "@connextable/ui";
import { computed, ref } from "vue";

const updated = ref(false);
const months = ["4월", "5월", "6월", "7월", "8월", "9월"];
const counts = [142, 155, 182, 210, 195, 220];
const revised = [142, 155, 196, 228, 267, 295];
const orders = computed(() => months.map((month, index) => ({
  id: `orders-${index}`,
  month,
  value: (updated.value ? revised : counts)[index]!,
})));
const targets = months.map((month, index) => ({ id: `target-${index}`, month, value: 160 + index * 22 }));
</script>

<template>
  <UIChart animate-updates tooltip="shared" :dom="{ accessibilityLabel: '주문 실적 집계와 목표' }">
    <UIChartLegend :items="[{ label: '주문 실적' }, { label: '목표' }]" />
    <UIChartCartesian>
      <UIChartXAxis id="month" scale="categorical" field="month" :ticks="months.length" />
      <UIChartYAxis id="count" scale="linear" field="value" :domain="{ kind: 'numeric', minimum: 0, maximum: 320 }" :ticks="5" label="주문 수" unit="건" />
      <UIChartBar id="orders" :data="orders" label="주문 실적" x-axis="month" y-axis="count" />
      <UIChartLine id="targets" :data="targets" label="목표" x-axis="month" y-axis="count" />
    </UIChartCartesian>
    <UIChartPlot><UIChartRenderer /></UIChartPlot>
    <UIChartActions>
      <output>{{ updated ? "확정 실적" : "잠정 실적" }} · 9월 {{ orders.at(-1)?.value }}건 / 목표 {{ targets.at(-1)?.value }}건</output>
      <UIButton size="sm" variant="outline" @click="updated = !updated">{{ updated ? "잠정 실적 보기" : "확정 실적 보기" }}</UIButton>
    </UIChartActions>
  </UIChart>
</template>
