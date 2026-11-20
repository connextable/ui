<script setup lang="ts">
import { ChartPlot, useChartContext } from "@sectile/vue/chart";
import { computed } from "vue";

const { controller, snapshot } = useChartContext();
const definition = computed(() => snapshot.value ? controller.value?.getDefinition() : undefined);
const titles = computed(() => {
  const axes = definition.value?.axes ?? [];
  const title = (orientation: "x" | "y") => axes
    .filter(axis => axis.orientation === orientation)
    .map(axis => [axis.label, axis.unit].filter(Boolean).join(" · "))
    .filter(Boolean)
    .join(" / ");
  return { x: title("x"), y: title("y") };
});
</script>

<template>
  <ChartPlot class="ui-chart-plot">
    <div v-if="titles.y" class="ui-chart-plot__title">{{ titles.y }}</div>
    <div class="ui-chart-plot__stage">
      <slot />
      <div v-if="$slots.controls" class="ui-chart-plot__controls">
        <slot name="controls" />
      </div>
    </div>
    <div v-if="titles.x" class="ui-chart-plot__title ui-chart-plot__title--x">{{ titles.x }}</div>
  </ChartPlot>
</template>
