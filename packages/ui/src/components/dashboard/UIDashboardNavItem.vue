<template>
  <li class="ui-dashboard-nav-item">
    <slot />
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
  min-block-size: var(--ui-control-height);
  padding: 0.5rem var(--ui-control-padding-inline);
  border-radius: var(--ui-control-radius);
  color: var(--ui-color-text);
  font-size: 0.9375rem;
  text-decoration: none;
  overflow-wrap: anywhere;
}

:slotted(a:hover) {
  background: color-mix(in srgb, var(--ui-color-accent) 6%, var(--ui-color-surface));
}

:slotted(a[aria-current]:not([aria-current="false"])) {
  background: color-mix(in srgb, var(--ui-color-accent) 11%, var(--ui-color-surface));
  color: var(--ui-color-accent);
  font-weight: 650;
}

:slotted(a:focus-visible) {
  outline: 2px solid var(--ui-color-focus);
  outline-offset: -2px;
}
</style>
