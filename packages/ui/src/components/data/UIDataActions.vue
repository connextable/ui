<template>
  <div class="ui-data-actions"><slot /></div>
</template>

<style scoped>
.ui-data-actions {
  min-block-size: var(--ui-control-height-small);
  padding-block-start: var(--ui-space-sm);
  border-block-start: 1px solid var(--ui-color-divider);
}

:where([data-part="root"], [data-ui-tabular-scroll]) + .ui-data-actions {
  margin-block-start: var(--ui-space-sm);
}

:slotted(output) {
  flex: 1 1 12rem;
  min-inline-size: 0;
  margin: 0;
  padding: 0;
  border: 0;
  color: var(--ui-data-actions-output-color, var(--ui-color-text-muted));
  font-size: var(--ui-font-size-body-sm);
  font-variant-numeric: tabular-nums;
}
</style>
