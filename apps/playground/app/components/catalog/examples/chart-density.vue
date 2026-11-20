<script setup lang="ts">
import { UIChart, UIChartActions, UIChartCartesian, UIChartPlot, UIChartRenderer, UIChartScatter, UIChartXAxis, UIChartYAxis } from "@connextable/ui";

const centers = [[25, 65, 384, 8], [58, 45, 256, 16], [78, 72, 128, 13]] as const;
const calls = centers.flatMap(([centerX, centerY, count, spread], cluster) => Array.from({ length: count }, (_, index) => {
  const angle = index * 2.39996;
  const radius = spread * Math.sqrt(index / count);
  return {
    id: `${cluster}-${index}`,
    time: Math.round(centerX + Math.cos(angle) * radius),
    score: Math.round(centerY + Math.sin(angle) * radius),
  };
}));
const panels = [
  { id: "raw", label: "개별 관측", maximum: calls.length },
  { id: "density", label: "밀도 집계", maximum: 110 },
] as const;
const domain = { kind: "numeric", minimum: 0, maximum: 100 } as const;
const rows = new Map(calls.map(call => [call.id, call]));
</script>

<template>
  <div class="density-comparison">
    <UIChart
      v-for="panel in panels"
      :key="panel.id"
      :dom="{
        accessibilityLabel: `상담 시간과 점수 · ${panel.label}`,
        accessibilityLimit: 48,
        renderPolicy: { type: 'fixed', maximumRepresentatives: panel.maximum },
        getAccessibleDatumLabel: id => {
          const row = rows.get(String(id));
          return row ? `${row.time}분 · ${row.score}점` : String(id);
        },
      }"
    >
      <template #default="{ projection }">
        <h4>{{ panel.label }}</h4>
        <UIChartCartesian>
          <UIChartXAxis id="time" scale="linear" field="time" :domain="domain" :ticks="6" label="상담 시간 (분)" />
          <UIChartYAxis id="score" scale="linear" field="score" :domain="domain" :ticks="6" label="점수" />
          <UIChartScatter id="calls" :data="calls" x-axis="time" y-axis="score" :projection="panel.id" label="상담 점수" />
        </UIChartCartesian>
        <UIChartPlot><UIChartRenderer /></UIChartPlot>
        <UIChartActions>
          <output v-if="projection">
            {{ calls.length }}개 표본 · {{ panel.id === "raw" ? "관측점" : "집계 원" }} {{ projection.diagnostics.emittedPrimitives }}개
          </output>
        </UIChartActions>
      </template>
      <template #tooltip="{ title, description, aggregate }">
        <template v-if="aggregate">
          <strong>이 구역의 관측값</strong>
          <span>{{ aggregate.count }}개</span>
        </template>
        <template v-else>
          <strong>상담 {{ title }}분</strong>
          <span>{{ description }}점</span>
        </template>
      </template>
    </UIChart>
  </div>
</template>

<style scoped>
.density-comparison {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 20rem), 1fr));
  gap: calc(2 * var(--ui-space-md));
}

.density-comparison h4 {
  margin: 0;
  font-size: var(--ui-font-size-body-sm);
}
</style>
