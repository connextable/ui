<script setup lang="ts">
import { ref, useId, useTemplateRef } from "vue";

defineProps<{ label: string }>();

const navigationId = useId();
const open = ref(false);
const toggle = useTemplateRef<HTMLButtonElement>("toggle");

function closeNavigation() {
  if (!open.value) return;
  open.value = false;

  const button = toggle.value;
  if (button?.getClientRects().length) button.focus({ preventScroll: true });
}

function onNavigationClick(event: MouseEvent) {
  if (event.target instanceof Element && event.target.closest("a[href]")) {
    closeNavigation();
  }
}
</script>

<template>
  <aside class="ui-dashboard-sidebar" @keydown.esc="closeNavigation">
    <div class="ui-dashboard-sidebar__top">
      <div v-if="$slots.header" class="ui-dashboard-sidebar__header">
        <slot name="header" />
      </div>
      <button
        ref="toggle"
        class="ui-dashboard-sidebar__toggle"
        type="button"
        :aria-controls="navigationId"
        :aria-expanded="open"
        @click="open = !open"
      >
        {{ label }}
      </button>
    </div>
    <nav
      :id="navigationId"
      class="ui-dashboard-sidebar__navigation"
      :aria-label="label"
      :data-open="open"
      @click="onNavigationClick"
    >
      <slot />
    </nav>
  </aside>
</template>

<style scoped>
.ui-dashboard-sidebar {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  block-size: 100%;
  border-inline-end: 1px solid var(--ui-dashboard-divider);
  background: var(--ui-color-surface);
}

.ui-dashboard-sidebar__header {
  padding: 1.25rem 1rem 1rem;
  overflow-wrap: anywhere;
}

.ui-dashboard-sidebar__toggle {
  display: none;
  min-block-size: var(--ui-control-height);
  padding: 0.5rem var(--ui-control-padding-inline);
  border: 1px solid var(--ui-dashboard-divider);
  border-radius: var(--ui-control-radius);
  background: var(--ui-color-surface);
  color: var(--ui-color-text);
  font: inherit;
  cursor: pointer;
}

.ui-dashboard-sidebar__toggle:focus-visible {
  outline: 2px solid var(--ui-color-focus);
  outline-offset: 2px;
}

.ui-dashboard-sidebar__navigation {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: 1.5rem;
  min-block-size: 0;
  overflow-y: auto;
  padding: 0.75rem;
}

@container ui-dashboard (inline-size <= 42rem) {
  .ui-dashboard-sidebar {
    block-size: auto;
    border-inline-end: 0;
    border-block-end: 1px solid var(--ui-dashboard-divider);
  }

  .ui-dashboard-sidebar__top {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
  }

  .ui-dashboard-sidebar__header {
    padding: 0;
  }

  .ui-dashboard-sidebar__toggle {
    display: block;
    margin-inline-start: auto;
  }

  .ui-dashboard-sidebar__navigation {
    max-block-size: 55dvh;
  }

  .ui-dashboard-sidebar__navigation[data-open="false"] {
    display: none;
  }
}
</style>
