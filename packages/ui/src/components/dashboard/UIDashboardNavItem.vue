<template>
  <li class="ui-dashboard-nav-item">
    <slot />
    <ul v-if="$slots.children" class="ui-dashboard-nav-item__children" role="list">
      <slot name="children" />
    </ul>
  </li>
</template>

<style scoped>
.ui-dashboard-nav-item {
  min-inline-size: 0;
}

:slotted(a) {
  display: flex;
  box-sizing: border-box;
  align-items: center;
  gap: 0.625rem;
  min-block-size: var(--ui-dashboard-nav-item-height, var(--ui-control-height));
  padding: var(--ui-dashboard-nav-item-padding-block, 0.5rem) var(--ui-control-padding-inline);
  border-radius: var(--ui-control-radius);
  color: var(--ui-color-text);
  font-size: var(--ui-dashboard-nav-item-font-size, 0.9375rem);
  text-decoration: none;
  overflow-wrap: anywhere;
}

:slotted(a:hover) {
  background: var(--ui-color-surface-hover);
}

:slotted(a[aria-current]:not([aria-current="false"])) {
  background: var(--ui-color-accent-soft);
  color: var(--ui-color-accent);
  font-weight: 650;
}

:slotted(a:focus-visible) {
  outline: 2px solid var(--ui-color-focus);
  outline-offset: -2px;
}

.ui-dashboard-nav-item__children {
  --ui-dashboard-nav-item-height: var(--ui-control-height-small);
  --ui-dashboard-nav-item-padding-block: 0.25rem;
  --ui-dashboard-nav-item-font-size: 0.875rem;

  display: grid;
  gap: 0.125rem;
  margin-block: 0.125rem 0.375rem;
  margin-inline: var(--ui-control-padding-inline) 0;
  padding: 0;
  padding-inline-start: 0.25rem;
  border-inline-start: 1px solid var(--ui-color-divider);
  list-style: none;
}
</style>
