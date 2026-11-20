<script setup lang="ts">
import { chartSeriesColor } from "./chart-colors";

defineProps<{
  items?: readonly { label: string; value?: string | number; colorIndex?: number; color?: string }[];
  align?: "start" | "center";
  label?: string;
}>();
</script>

<template>
  <ul v-if="items?.length" class="ui-chart-legend" :data-align="align" :aria-label="label">
    <li v-for="(item, index) in items" :key="item.label">
      <span
        class="ui-chart-legend__swatch"
        :style="{ backgroundColor: item.color ?? `var(${chartSeriesColor(item.colorIndex ?? index)})` }"
        aria-hidden="true"
      />
      <span>{{ item.label }}</span>
      <strong v-if="item.value !== undefined">{{ item.value }}</strong>
    </li>
  </ul>
</template>
