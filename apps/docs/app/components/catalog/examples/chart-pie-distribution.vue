<script setup lang="ts">
import { UIButton, UIChart, UIChartActions, UIChartLegend, UIChartPie, UIChartPlot, UIChartRadial, UIChartRenderer } from "@connextable/ui";
import { computed, ref } from "vue";

const channels = [
  { id: "search", label: "검색" },
  { id: "direct", label: "직접 방문" },
  { id: "external", label: "외부 링크" },
  { id: "referral", label: "추천" },
];
const periods = [
  { name: "4월", counts: [800, 510, 290, 0] },
  { name: "5월", counts: [615, 345, 230, 410] },
  { name: "6월", counts: [540, 300, 290, 470] },
];
const month = ref(0);
const period = computed(() => periods[month.value]!);
const rows = computed(() => channels.map((channel, index) => ({ ...channel, count: period.value.counts[index]! })));
const total = computed(() => rows.value.reduce((sum, row) => sum + row.count, 0));
const count = new Intl.NumberFormat("ko-KR");
const share = new Intl.NumberFormat("ko-KR", { style: "percent", maximumFractionDigits: 1 });
</script>

<template>
  <UIChart animate-updates :dom="{
    accessibilityLabel: '월별 방문 경로 비중',
    getAccessibleDatumLabel: id => rows.find(row => row.id === id)?.label ?? String(id),
  }">
    <template #default>
      <UIChartLegend :items="rows.map(row => ({ label: row.label, value: share.format(row.count / total) }))" />
      <UIChartRadial>
        <UIChartPie id="channels" :data="rows" value-field="count" label-field="label" />
      </UIChartRadial>
      <UIChartPlot><UIChartRenderer /></UIChartPlot>
      <UIChartActions>
        <output>{{ period.name }} 방문 {{ count.format(total) }}건</output>
        <UIButton size="sm" variant="outline" :disabled="month === 0" @click="month--">이전 달</UIButton>
        <UIButton size="sm" variant="outline" :disabled="month === periods.length - 1" @click="month++">다음 달</UIButton>
      </UIChartActions>
    </template>
    <template #tooltip="{ id, title, description }">
      <strong>{{ title }}</strong>
      <div class="ui-chart-tooltip__value">
        <span>{{ count.format(rows.find(row => row.id === id)?.count ?? 0) }}건</span>
        <strong>{{ description }}</strong>
      </div>
    </template>
  </UIChart>
</template>
