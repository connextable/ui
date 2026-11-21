<template>
  <div class="ui-tabular-column-heading">
    <span class="ui-tabular-column-heading__label"><slot /></span>
    <div v-if="$slots.actions" class="ui-tabular-column-heading__actions">
      <slot name="actions" />
    </div>
  </div>
</template>

<style scoped>
.ui-tabular-column-heading,
.ui-tabular-column-heading__actions {
  display: flex;
  align-items: center;
  gap: var(--ui-space-xs);
}

.ui-tabular-column-heading {
  min-inline-size: 0;
}

.ui-tabular-column-heading__label {
  min-inline-size: 0;
}

.ui-tabular-column-heading__actions {
  flex: none;
  block-size: 1lh;
}
</style>
