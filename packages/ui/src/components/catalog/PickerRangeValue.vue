<script setup lang="ts">
type Endpoint = { datetime: string; label: string };

defineProps<{
  start?: Endpoint;
  end?: Endpoint;
  startPlaceholder: string;
  endPlaceholder: string;
  layout?: "inline" | "stacked";
  placeholder?: string;
}>();
</script>

<template>
  <span class="ui-picker-range-value" :data-layout="layout ?? 'inline'" role="status">
    <span v-if="!start && !end && placeholder !== undefined" class="ui-picker-range-value__placeholder" data-whole>
      {{ placeholder }}
    </span>
    <template v-else>
      <time v-if="start" :datetime="start.datetime" :title="start.label">{{ start.label }}</time>
      <span v-else class="ui-picker-range-value__placeholder">{{ startPlaceholder }}</span>
      <span class="ui-picker-range-value__separator" aria-hidden="true" />
      <time v-if="end" :datetime="end.datetime" :title="end.label">{{ end.label }}</time>
      <span v-else class="ui-picker-range-value__placeholder">{{ endPlaceholder }}</span>
    </template>
  </span>
</template>

<style scoped>
.ui-picker-range-value {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  align-items: center;
  column-gap: var(--ui-space-xs);
  min-inline-size: 0;
  min-block-size: var(--ui-control-height-small);
  padding-inline: var(--ui-space-xs);
  font-size: var(--ui-font-size-body-sm);
  font-variant-numeric: tabular-nums;
  text-align: center;
}

.ui-picker-range-value > :is(time, .ui-picker-range-value__placeholder) {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ui-picker-range-value__separator {
  inline-size: var(--ui-space-xs);
  block-size: 1px;
  background: var(--ui-color-text-muted);
}

.ui-picker-range-value__placeholder {
  color: var(--ui-color-text-muted);
}

.ui-picker-range-value__placeholder[data-whole] {
  grid-column: 1 / -1;
}

.ui-picker-range-value[data-layout="stacked"] {
  grid-template-columns: minmax(0, 1fr);
  row-gap: var(--ui-space-xs);
  padding-block: var(--ui-space-xs);
}

.ui-picker-range-value[data-layout="stacked"] .ui-picker-range-value__separator {
  inline-size: 100%;
  background: var(--ui-color-divider);
}
</style>
