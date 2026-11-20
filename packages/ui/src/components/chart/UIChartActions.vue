<template>
  <div class="ui-chart-actions"><slot /></div>
</template>

<style scoped>
.ui-chart-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: var(--ui-space-sm);
  padding-block-start: var(--ui-space-sm);
  border-block-start: 1px solid var(--ui-color-divider);
}

:slotted(output) {
  flex: 1 1 auto;
  margin: 0;
  padding: 0;
  border: 0;
  color: var(--ui-chart-label);
  font-size: var(--ui-font-size-body-sm);
}
</style>
