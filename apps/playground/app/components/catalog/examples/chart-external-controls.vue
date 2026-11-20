<script setup lang="ts">
import {
  UIChart,
  UIChartActions,
  UIChartAxisView,
  UIChartCartesian,
  UIChartExternalViewControls,
  UIChartLine,
  UIChartPanControl,
  UIChartPlot,
  UIChartRenderer,
  UIChartResetView,
  UIChartViewControls,
  UIChartXAxis,
  UIChartYAxis,
  UIChartZoomControl,
} from "@connextable/ui";

const day = 86_400_000;
const formatDate = new Intl.DateTimeFormat("ko-KR", { month: "long", day: "numeric", timeZone: "UTC" });
const observations = [28, 34, 42, 37, 57, 63, 53, 45, 49, 34, 41, 55].map((count, index) => ({
  id: index + 1,
  date: Date.UTC(2026, 0, 5 + index * 7),
  count,
}));
</script>

<template>
  <UIChart v-slot="{ state }" animate-updates :dom="{ accessibilityLabel: '주간 작업량' }">
    <UIChartCartesian>
      <UIChartXAxis id="date" field="date" scale="temporal" label="집계일 (UTC)" :ticks="6">
        <UIChartAxisView :minimum-span="14 * day" />
      </UIChartXAxis>
      <UIChartYAxis id="count" field="count" scale="linear" label="작업 수" />
      <UIChartLine id="weekly" :data="observations" x-axis="date" y-axis="count" label="완료한 작업" />
      <UIChartExternalViewControls />
    </UIChartCartesian>
    <UIChartPlot><UIChartRenderer /></UIChartPlot>
    <UIChartActions>
      <output v-for="{ axisID, visible } in state?.view?.axes" :key="axisID">
        <template v-if="visible.kind === 'continuous'">
          표시 범위 {{ formatDate.formatRange(visible.minimum, visible.maximum) }}
        </template>
      </output>
      <UIChartViewControls axis="date">
        <UIChartZoomControl direction="in" label="확대">확대</UIChartZoomControl>
        <UIChartPanControl direction="forward" label="다음 구간">다음 구간</UIChartPanControl>
        <UIChartResetView label="초기화">초기화</UIChartResetView>
      </UIChartViewControls>
    </UIChartActions>
  </UIChart>
</template>
