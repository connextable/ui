<script setup lang="ts">
import {
  UIChart,
  UIChartBar,
  UIChartCartesian,
  UIChartPlot,
  UIChartRenderer,
  UIChartXAxis,
  UIChartYAxis,
  UIToggleGroup,
  UIToggleGroupItem,
  useUIChartSelector,
} from "@connextable/ui";
import { defineComponent, h, ref } from "vue";

const teams = [
  { id: "web", name: "웹", count: 64 },
  { id: "design", name: "디자인", count: 38 },
  { id: "platform", name: "플랫폼", count: 51 },
  { id: "support", name: "운영", count: 27 },
];
const teamIds = teams.map(({ id }) => id);
const selection = ref<{ type: "points"; ids: readonly string[] }>({ type: "points", ids: [] });

const SelectionSummary = defineComponent({
  setup() {
    const ids = useUIChartSelector(state =>
      state?.selection.type === "points" ? state.selection.ids : [],
    );
    return () => {
      const selected = teams.filter(team => ids.value.includes(team.id));
      const total = selected.reduce((sum, team) => sum + team.count, 0);
      return h("output", selected.length
        ? [h("strong", `${selected.length}개 팀 · ${total}건`), ` · ${selected.map(team => team.name).join(", ")}`]
        : "선택한 팀 없음");
    };
  },
});
</script>

<template>
  <UIChart
    :model-value="selection"
    :dom="{ accessibilityLabel: '팀별 처리 건수', getAccessibleDatumLabel: id => teams.find(team => team.id === id)?.name ?? String(id) }"
    @update:model-value="value => { if (value.type === 'points') selection = value }"
  >
    <UIToggleGroup
      multiple
      :items="teamIds"
      :model-value="selection.ids"
      label="팀 선택"
      @update:model-value="ids => selection = { type: 'points', ids }"
    >
      <UIToggleGroupItem v-for="team in teams" :key="team.id" :value="team.id">{{ team.name }}</UIToggleGroupItem>
    </UIToggleGroup>
    <UIChartCartesian>
      <UIChartXAxis id="count" field="count" scale="linear" :domain="{ kind: 'numeric', minimum: 0, maximum: 80 }" :ticks="5" label="처리 (건)" />
      <UIChartYAxis id="team" field="name" scale="categorical" :ticks="teams.length" :domain="{ kind: 'categorical', values: teams.map(team => team.name).reverse() }" />
      <UIChartBar id="handled" :data="teams" x-axis="count" y-axis="team" orientation="horizontal" label="처리 건수" />
    </UIChartCartesian>
    <UIChartPlot><UIChartRenderer /></UIChartPlot>
    <SelectionSummary />
  </UIChart>
</template>
