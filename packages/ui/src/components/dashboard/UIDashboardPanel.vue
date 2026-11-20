<script setup lang="ts">
withDefaults(
  defineProps<{
    as?: "div" | "main" | "section" | "article" | "aside";
    variant?: "plain" | "outlined" | "subtle";
  }>(),
  { as: "div", variant: "plain" },
);
</script>

<template>
  <component :is="as" class="ui-dashboard-panel" :data-variant="variant">
    <header v-if="$slots.header || $slots.toolbar" class="ui-dashboard-panel__header">
      <slot name="header" />
      <slot name="toolbar" />
    </header>
    <div class="ui-dashboard-panel__body">
      <slot />
    </div>
    <footer v-if="$slots.footer" class="ui-dashboard-panel__footer">
      <slot name="footer" />
    </footer>
  </component>
</template>

<style scoped>
.ui-dashboard-panel {
  min-inline-size: 0;
  background: var(--ui-dashboard-panel-background, var(--ui-color-surface));
}

.ui-dashboard-panel[data-variant="outlined"] {
  border: 1px solid var(--ui-color-divider);
  border-radius: var(--ui-panel-radius);
}

.ui-dashboard-panel[data-variant="subtle"] {
  border-radius: var(--ui-panel-radius);
  background: var(--ui-dashboard-panel-background, var(--ui-color-surface-muted));
}

.ui-dashboard-panel__header,
.ui-dashboard-panel__footer {
  border-color: var(--ui-color-divider);
  border-style: solid;
  border-width: 0;
}

.ui-dashboard-panel__header {
  border-block-end-width: 1px;
}

.ui-dashboard-panel__body,
.ui-dashboard-panel__footer {
  padding: var(--ui-dashboard-panel-padding, 1.25rem);
}

.ui-dashboard-panel__footer {
  border-block-start-width: 1px;
}
</style>
