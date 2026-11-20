<script setup lang="ts">
import { UIChart, UIChartBars, UIChartCartesian, UIChartLegend, UIChartPlot, UIChartRenderer, UIChartXAxis, UIChartYAxis } from "@connextable/ui";

const channels = [
  { id: "web", label: "웹" },
  { id: "app", label: "앱" },
  { id: "partner", label: "제휴" },
] as const;
const months = [
  { month: "4월", web: 820, app: 430, partner: 310 },
  { month: "5월", web: 760, app: 580, partner: 290 },
  { month: "6월", web: 960, app: 710, partner: 385 },
  { month: "7월", web: 910, app: 920, partner: 450 },
  { month: "8월", web: 1050, app: 1120, partner: 520 },
];
const slot = (month: string, channel: string) => channel === "app" ? month : `${month}-${channel}`;
const groups = months.flatMap(({ month }, index) => [
  ...channels.map(channel => slot(month, channel.id)),
  ...(index < months.length - 1 ? [`gap-${month}`] : []),
]);
const monthLabels = new Set(months.map(({ month }) => month));
const layers = channels.map(channel => ({
  ...channel,
  data: months.map(row => ({
    id: `${row.month}-${channel.id}`,
    slot: slot(row.month, channel.id),
    month: row.month,
    count: row[channel.id],
  })),
}));
const orders = new Map(layers.flatMap(layer => layer.data.map(row => [
  row.id, { ...row, channel: layer.label },
] as const)));
const monthBySlot = new Map([...orders.values()].map(order => [order.slot, order.month]));
const format = new Intl.NumberFormat("ko-KR");
</script>

<template>
  <UIChart
    tooltip="shared"
    :tooltip-group="value => monthBySlot.get(String(value)) ?? value"
    :dom="{
      accessibilityLabel: '월별 채널별 주문 건수',
      getAccessibleDatumLabel: id => {
        const order = orders.get(String(id));
        return order ? `${order.month} ${order.channel} ${format.format(order.count)}건` : String(id);
      },
    }"
    :format-tick="(value, axis) => axis.id === 'month' ? (monthLabels.has(String(value)) ? String(value) : '') : undefined"
  >
    <UIChartLegend :items="channels" />
    <UIChartCartesian>
      <UIChartXAxis id="month" scale="categorical" field="slot" :ticks="groups.length" :domain="{ kind: 'categorical', values: groups }" />
      <UIChartYAxis id="count" scale="linear" field="count" :domain="{ kind: 'numeric', minimum: 0, maximum: 1200 }" :ticks="5" label="주문 수" unit="건" />
      <UIChartBars v-for="layer in layers" :id="layer.id" :key="layer.id" :data="layer.data" :label="layer.label" x-axis="month" y-axis="count" />
    </UIChartCartesian>
    <UIChartPlot><UIChartRenderer /></UIChartPlot>
  </UIChart>
</template>
