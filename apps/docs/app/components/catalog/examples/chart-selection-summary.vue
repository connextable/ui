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
  useChartSelector,
} from "@connextable/ui";
import { computed, defineComponent, h, ref } from "vue";

const teams = [
  { id: "web", name: "웹", count: 64 },
  { id: "design", name: "디자인", count: 38 },
  { id: "platform", name: "플랫폼", count: 51 },
  { id: "support", name: "운영", count: 27 },
];
const teamIds = teams.map(({ id }) => id);
type Selection = NonNullable<InstanceType<typeof UIChart>["$props"]["modelValue"]>;
const selection = ref<Selection>({ type: "points", ids: [] });
const selectedTeams = computed({
  get: () => selection.value.type === "points"
    ? selection.value.ids.filter(id => typeof id === "string")
    : [],
  set: (ids: readonly string[]) => { selection.value = { type: "points", ids }; },
});

const SelectionSummary = defineComponent({
  setup() {
    const ids = useChartSelector(state =>
      state?.selection.type === "points" ? state.selection.ids : [],
    );
    return () => {
      const selected = teams.filter(team => ids.value.includes(team.id));
      const total = selected.reduce((sum, team) => sum + team.count, 0);
      return h("output", selected.length
        ? [h("strong", `${selected.length}개 팀의 ${total}건`), ` (${selected.map(team => team.name).join(", ")})`]
        : "선택한 팀 없음");
    };
  },
});
</script>

<template>
  <UIChart
    v-model="selection"
    :dom="{ accessibilityLabel: '팀별 처리 건수', getAccessibleDatumLabel: id => teams.find(team => team.id === id)?.name ?? String(id) }"
  >
    <UIToggleGroup
      multiple
      :items="teamIds"
      v-model="selectedTeams"
      label="팀 선택"
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
