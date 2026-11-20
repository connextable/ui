<script setup lang="ts">
import {
  UIButton,
  UIChart,
  UIChartActions,
  UIChartCartesian,
  UIChartLegend,
  UIChartLine,
  UIChartPlot,
  UIChartRenderer,
  UIChartXAxis,
  UIChartYAxis,
  useUIChartLayerSelector,
} from "@connextable/ui";
import { computed, defineComponent, h, ref } from "vue";

const weekdays = ["월", "화", "수", "목", "금"];
function dailyRequests(series: string, counts: number[]) {
  return counts.map((count, index) => ({ id: `${series}-${index}`, day: weekdays[index], count }));
}

const current = dailyRequests("current", [46, 38, 58, 65, 53]);
const referenceWeeks = {
  previous: { label: "지난주", data: dailyRequests("reference", [34, 46, 38, 44, 35]) },
  earlier: { label: "지지난주", data: dailyRequests("reference", [52, 57, 49, 35, 63]) },
} as const;
const compareEarlier = ref(false);
const reference = computed(() => compareEarlier.value ? referenceWeeks.earlier : referenceWeeks.previous);

const ComparisonLegend = defineComponent({
  setup() {
    const label = useUIChartLayerSelector("reference", layer => layer?.label);
    return () => h("div", { "aria-live": "polite" }, [
      h(UIChartLegend, { items: [{ label: "이번 주" }, ...(label.value ? [{ label: label.value }] : [])] }),
    ]);
  },
});
</script>

<template>
  <UIChart animate-updates :dom="{ accessibilityLabel: '요일별 문의 건수 비교' }">
    <ComparisonLegend />
    <UIChartCartesian>
      <UIChartXAxis id="day" field="day" scale="categorical" />
      <UIChartYAxis id="count" field="count" scale="linear" :domain="{ kind: 'numeric', minimum: 20, maximum: 80 }" :ticks="4" label="문의 (건)" />
      <UIChartLine id="current" :data="current" x-axis="day" y-axis="count" label="이번 주" />
      <UIChartLine id="reference" :data="reference.data" x-axis="day" y-axis="count" :label="reference.label" />
    </UIChartCartesian>
    <UIChartPlot><UIChartRenderer /></UIChartPlot>
    <UIChartActions>
      <output>월요일 · 이번 주 {{ current[0]?.count }}건 · {{ reference.label }} {{ reference.data[0]?.count }}건</output>
      <UIButton size="sm" variant="outline" @click="compareEarlier = !compareEarlier">
        {{ compareEarlier ? "지난주와 비교" : "지지난주와 비교" }}
      </UIButton>
    </UIChartActions>
  </UIChart>
</template>
