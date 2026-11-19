<template>
  <div class="ui-dashboard">
    <div
      class="ui-dashboard__layout"
      :class="{ 'ui-dashboard__layout--with-sidebar': $slots.sidebar }"
    >
      <div v-if="$slots.sidebar" class="ui-dashboard__sidebar">
        <slot name="sidebar" />
      </div>
      <div class="ui-dashboard__content">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.ui-dashboard {
  --ui-dashboard-divider: color-mix(in srgb, var(--ui-color-border) 22%, transparent);

  container: ui-dashboard / inline-size;
  isolation: isolate;
  min-inline-size: 0;
  background: var(--ui-color-surface);
  color: var(--ui-color-text);
}

.ui-dashboard__layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  align-items: start;
  min-block-size: var(--ui-dashboard-height, 100dvh);
}

.ui-dashboard__layout--with-sidebar {
  grid-template-columns: var(--ui-dashboard-sidebar-width, 15rem) minmax(0, 1fr);
}

.ui-dashboard__sidebar {
  position: sticky;
  z-index: 1;
  inset-block-start: 0;
  block-size: var(--ui-dashboard-height, 100dvh);
  min-inline-size: 0;
}

.ui-dashboard__content {
  min-inline-size: 0;
}

@container ui-dashboard (inline-size <= 42rem) {
  .ui-dashboard__layout--with-sidebar {
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: auto 1fr;
  }

  .ui-dashboard__sidebar {
    block-size: auto;
  }
}
</style>
