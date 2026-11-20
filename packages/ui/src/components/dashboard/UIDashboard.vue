<template>
  <div class="ui-dashboard">
    <div
      class="ui-dashboard__layout"
      :class="{ 'ui-dashboard__layout--with-sidebar': $slots.sidebar }"
    >
      <div v-if="$slots.sidebar" class="ui-dashboard__sidebar">
        <slot name="sidebar" />
      </div>
      <div class="ui-dashboard__content" :class="{ 'ui-dashboard__content--split': $slots.aside }">
        <div class="ui-dashboard__primary">
          <slot />
        </div>
        <div v-if="$slots.aside" class="ui-dashboard__aside">
          <slot name="aside" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ui-dashboard {
  container: ui-dashboard / inline-size;
  isolation: isolate;
  min-inline-size: 0;
  background: var(--ui-dashboard-background, var(--ui-color-surface));
  color: var(--ui-color-text);
}

.ui-dashboard__layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  min-block-size: var(--ui-dashboard-height, 100dvh);
}

.ui-dashboard__layout--with-sidebar {
  grid-template-columns: var(--ui-dashboard-sidebar-width, 15rem) minmax(0, 1fr);
}

.ui-dashboard__sidebar {
  position: sticky;
  z-index: 1;
  inset-block-start: 0;
  block-size: var(--ui-dashboard-sidebar-height, var(--ui-dashboard-height, 100dvh));
  min-inline-size: 0;
}

.ui-dashboard__content {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
}

.ui-dashboard__content--split {
  grid-template-columns: minmax(0, 1fr) var(--ui-dashboard-aside-width, minmax(13rem, 28%));
}

.ui-dashboard__primary,
.ui-dashboard__aside {
  min-inline-size: 0;
}

.ui-dashboard__aside {
  display: grid;
  border-inline-start: 1px solid var(--ui-color-divider);
}

@container ui-dashboard (inline-size <= 49rem) {
  .ui-dashboard__content--split {
    grid-template-columns: minmax(0, 1fr);
  }

  .ui-dashboard__aside {
    border-inline-start: 0;
    border-block-start: 1px solid var(--ui-color-divider);
  }
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
