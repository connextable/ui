<script setup lang="ts">
import {
  UIChartCenter,
  UIToggleGroup,
  UIToggleGroupItem,
  createUIChartComponents,
  useUIChart,
  useUIChartContext,
} from "@connextable/ui";
import { computed, defineComponent, h } from "vue";

const channels = [
  { id: "search", label: "검색", value: 52 },
  { id: "direct", label: "직접 방문", value: 30 },
  { id: "referral", label: "외부 링크", value: 18 },
];
const channelIds = channels.map(({ id }) => id);
const legend = channels.map(({ label, value }) => ({ label, value: `${value}%` }));
const entry = { id: "entry", kind: "donut", data: channels, valueField: "value", labelField: "label", innerRadius: 0.64, outerRadius: 0.88 } as const;
const { controller, dispatch, snapshot } = useUIChart<string>({
  defaultSelection: { type: "points", ids: ["search"] },
  definition: {
    coordinate: { kind: "radial" },
    layers: [entry],
  },
});
const Chart = createUIChartComponents(controller);
const selectedChannels = computed({
  get() {
    const selection = snapshot.value.state.selection;
    return selection.type === "points" ? selection.ids : [];
  },
  set(ids: readonly string[]) {
    dispatch({ type: "set-selection", selection: { type: "points", ids } });
  },
});

const ChannelShare = defineComponent({
  setup() {
    const { snapshot } = useUIChartContext<string>();
    return () => {
      const selection = snapshot.value?.state.selection;
      const channel = selection?.type === "points" ? channels.find(item => item.id === selection.ids[0]) : undefined;
      return h("div", { "aria-live": "polite" }, channel
        ? [h(UIChartCenter, { label: channel.label, value: `${channel.value}%` })]
        : []);
    };
  },
});

</script>

<template>
  <div class="ui-field">
    <Chart.Provider>
      <UIToggleGroup
        v-model="selectedChannels"
        :items="channelIds"
        label="방문 경로"
      >
        <UIToggleGroupItem v-for="channel in channels" :key="channel.id" :value="channel.id">{{ channel.label }}</UIToggleGroupItem>
      </UIToggleGroup>
      <Chart.Root :dom="{
        accessibilityLabel: '방문 경로별 비중',
        getAccessibleDatumLabel: id => channels.find(channel => channel.id === id)?.label ?? String(id),
      }">
        <Chart.Radial>
          <Chart.Donut
            :id="entry.id"
            :data="entry.data"
            :value-field="entry.valueField"
            :label-field="entry.labelField"
            :inner-radius="entry.innerRadius"
            :outer-radius="entry.outerRadius"
          />
        </Chart.Radial>
        <Chart.Legend :items="legend" />
        <Chart.Plot>
          <Chart.Renderer />
          <ChannelShare />
        </Chart.Plot>
      </Chart.Root>
    </Chart.Provider>
  </div>
</template>
