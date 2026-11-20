<template>
  <div class="ui-data-surface">
    <div v-if="$slots.toolbar" class="ui-data-surface__bar">
      <slot name="toolbar" />
    </div>
    <slot />
    <div v-if="$slots.footer" class="ui-data-surface__bar">
      <slot name="footer" />
    </div>
  </div>
</template>

<style scoped>
.ui-data-surface {
  --ui-data-surface-radius: var(--ui-radius-lg);
  --ui-data-surface-padding: var(--ui-space-sm);

  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: var(--ui-data-surface-padding);
  min-inline-size: 0;
  padding: var(--ui-data-surface-padding);
  border: 1px solid var(--ui-color-divider);
  border-radius: var(--ui-data-surface-radius);
  background: var(--ui-color-surface-readonly);
}

.ui-data-surface__bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--ui-space-sm) var(--ui-space-md);
  min-block-size: var(--ui-control-height-small);
  padding-inline: var(--ui-space-xs);
  font-size: var(--ui-font-size-body-sm);
}

.ui-data-surface__bar :slotted(output) {
  flex: 0 1 auto;
  margin: 0;
  padding: 0;
  border: 0;
  color: var(--ui-color-text-muted);
  font-variant-numeric: tabular-nums;
}
</style>
