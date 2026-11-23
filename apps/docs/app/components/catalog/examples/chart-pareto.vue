<script setup lang="ts">
import { UIChart, UIChartActions, UIChartBar, UIChartCartesian, UIChartLegend, UIChartLine, UIChartPlot, UIChartRenderer, UIChartXAxis, UIChartYAxis } from "@connextable/ui";

const incidents = [
  { reason: "타임아웃", count: 183 },
  { reason: "외부 서비스", count: 118 },
  { reason: "인증", count: 74 },
  { reason: "용량 제한", count: 46 },
  { reason: "입력 검증", count: 31 },
  { reason: "기타", count: 18 },
];
const total = incidents.reduce((sum, row) => sum + row.count, 0);
const share = incidents.map(row => ({ ...row, id: `share-${row.reason}`, percent: 100 * row.count / total }));
let cumulative = 0;
const trend = incidents.map(row => {
  cumulative += row.count;
  return { ...row, id: `trend-${row.reason}`, percent: 100 * cumulative / total };
});
const labels = new Map([...share, ...trend].map(row => [row.id, row]));
const number = new Intl.NumberFormat("ko-KR", { maximumFractionDigits: 1 });
</script>

<template>
  <UIChart :dom="{
    accessibilityLabel: '원인별 장애 비중과 누적 비중',
    getAccessibleDatumLabel: id => {
      const row = labels.get(String(id));
      if (!row) return String(id);
      const series = String(id).startsWith('trend-') ? '누적 비중' : '개별 비중';
      return `${row.reason} ${series} ${number.format(row.percent)}%`;
    },
  }" :format-tick="(value, axis) => axis.id === 'percent' ? `${value}%` : undefined">
    <template #default>
      <UIChartLegend :items="[{ label: '개별 비중' }, { label: '누적 비중' }]" />
      <UIChartCartesian>
        <UIChartXAxis id="reason" scale="categorical" field="reason" :ticks="incidents.length" />
        <UIChartYAxis id="percent" scale="linear" field="percent" :ticks="6" :domain="{ kind: 'numeric', minimum: 0, maximum: 100 }" />
        <UIChartBar id="share" :data="share" label="개별 비중" x-axis="reason" y-axis="percent" />
        <UIChartLine id="cumulative" :data="trend" label="누적 비중" x-axis="reason" y-axis="percent" />
      </UIChartCartesian>
      <UIChartPlot><UIChartRenderer /></UIChartPlot>
      <UIChartActions>
        <output>전체 {{ total }}건 중 상위 3개 원인이 {{ number.format(trend[2]!.percent) }}%를 차지합니다.</output>
      </UIChartActions>
    </template>
    <template #tooltip="{ id, title, series, value }">
      <strong>{{ title }} {{ labels.get(String(id))?.count }}건</strong>
      <div class="ui-chart-tooltip__value">
        <span>{{ series }}</span>
        <strong>{{ typeof value === "number" ? number.format(value) : value }}%</strong>
      </div>
    </template>
  </UIChart>
</template>
