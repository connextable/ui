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
  useUIChartAxisSelector,
} from "@connextable/ui";
import { computed, defineComponent, h, ref } from "vue";

const logarithmic = ref(false);
const hours = ["08시", "09시", "10시", "11시", "12시", "13시", "14시", "15시"];
const series = [
  { id: "search", label: "상품 검색", counts: [6200, 12800, 24900, 54300, 85300, 61100, 37400, 28600] },
  { id: "checkout", label: "결제 요청", counts: [45, 72, 130, 440, 870, 640, 370, 190] },
  { id: "refund", label: "환불 요청", counts: [12, 16, 25, 72, 116, 95, 40, 34] },
].map(({ id, label, counts }) => ({
  id, label,
  data: counts.map((count, index) => ({ id: `${id}-${index}`, hour: hours[index]!, count })),
}));
const scale = computed(() => logarithmic.value ? "logarithmic" : "linear");
const domain = computed(() => ({ kind: "numeric" as const, minimum: logarithmic.value ? 10 : 0, maximum: 100_000 }));
const number = new Intl.NumberFormat("ko-KR");
const labels = new Map(series.flatMap(layer => layer.data.map(row => [
  row.id, `${row.hour} ${layer.label} ${number.format(row.count)}건`,
] as const)));

const AxisSummary = defineComponent({
  setup() {
    const axis = useUIChartAxisSelector("requests", value => value);
    return () => {
      const current = axis.value;
      if (current?.domain.kind !== "numeric") return null;
      const range = `${number.format(current.domain.minimum)}–${number.format(current.domain.maximum)}건`;
      return h("output", `Y축 · ${current.scale === "logarithmic" ? "로그" : "선형"} · ${range}`);
    };
  },
});
</script>

<template>
  <UIChart animate-updates tooltip="shared" :dom="{
    accessibilityLabel: '서비스별 요청 수의 선형 및 로그 축 비교',
    getAccessibleDatumLabel: id => labels.get(String(id)) ?? String(id),
  }">
    <UIChartLegend :items="series" />
    <UIChartCartesian>
      <UIChartXAxis id="hour" scale="categorical" field="hour" :ticks="hours.length" />
      <UIChartYAxis id="requests" :scale="scale" field="count" :domain="domain" :ticks="5" label="요청 수" unit="건" />
      <UIChartLine v-for="layer in series" :id="layer.id" :key="layer.id" :data="layer.data" :label="layer.label" x-axis="hour" y-axis="requests" />
    </UIChartCartesian>
    <UIChartPlot><UIChartRenderer /></UIChartPlot>
    <UIChartActions>
      <AxisSummary />
      <UIButton size="sm" variant="outline" @click="logarithmic = !logarithmic">
        {{ logarithmic ? "선형 축으로 보기" : "로그 축으로 보기" }}
      </UIButton>
    </UIChartActions>
  </UIChart>
</template>
