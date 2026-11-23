<script setup lang="ts">
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Minus, Plus, RotateCcw } from "@lucide/vue";
import { DEFAULT_CHART_PLOT_INSETS } from "@sectile/chart/layout";
import { ChartPanControl, ChartResetView, ChartViewControls, ChartZoomControl } from "@sectile/vue/chart";
import { computed } from "vue";

type ViewAction = "backward" | "forward" | "zoomIn" | "zoomOut" | "reset";

const {
  axes,
  label = "Chart controls",
  labels = {},
} = defineProps<{
  axes: readonly { id: string | number; label: string; orientation?: "x" | "y" }[];
  label?: string;
  labels?: Partial<Record<ViewAction, string>>;
}>();

const defaults: Record<ViewAction, string> = {
  backward: "Pan backward",
  forward: "Pan forward",
  zoomIn: "Zoom in",
  zoomOut: "Zoom out",
  reset: "Reset view",
};

const groups = computed(() => [
  { orientation: "x", axes: axes.filter(axis => axis.orientation !== "y") },
  { orientation: "y", axes: axes.filter(axis => axis.orientation === "y") },
].filter(group => group.axes.length));

const { top, right, bottom, left } = DEFAULT_CHART_PLOT_INSETS;
const insets = { "--ui-chart-view-insets": `${top}px ${right}px ${bottom}px ${left}px` };

function actionLabel(axis: string, action: ViewAction) {
  return `${axis} ${labels[action] ?? defaults[action]}`;
}
</script>

<template>
  <div v-if="groups.length" class="ui-chart-view-toolbar" role="group" :aria-label="label" :style="insets">
    <div v-for="group in groups" :key="group.orientation" class="ui-chart-view-toolbar__axes" :data-orientation="group.orientation">
      <ChartViewControls v-for="axis in group.axes" :key="axis.id" :axis="axis.id" :aria-label="axis.label">
        <ChartPanControl direction="backward" :label="actionLabel(axis.label, 'backward')" :title="actionLabel(axis.label, 'backward')">
          <component :is="group.orientation === 'y' ? ChevronDown : ChevronLeft" aria-hidden="true" />
        </ChartPanControl>
        <ChartPanControl direction="forward" :label="actionLabel(axis.label, 'forward')" :title="actionLabel(axis.label, 'forward')">
          <component :is="group.orientation === 'y' ? ChevronUp : ChevronRight" aria-hidden="true" />
        </ChartPanControl>
        <ChartZoomControl direction="out" :label="actionLabel(axis.label, 'zoomOut')" :title="actionLabel(axis.label, 'zoomOut')">
          <Minus aria-hidden="true" />
        </ChartZoomControl>
        <ChartZoomControl direction="in" :label="actionLabel(axis.label, 'zoomIn')" :title="actionLabel(axis.label, 'zoomIn')">
          <Plus aria-hidden="true" />
        </ChartZoomControl>
        <ChartResetView :label="actionLabel(axis.label, 'reset')" :title="actionLabel(axis.label, 'reset')">
          <RotateCcw aria-hidden="true" />
        </ChartResetView>
      </ChartViewControls>
    </div>
  </div>
</template>
