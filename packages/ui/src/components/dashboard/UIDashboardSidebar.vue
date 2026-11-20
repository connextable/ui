<script setup lang="ts">
import { ref, useId, useTemplateRef } from "vue";
import UIButton from "../button/UIButton.vue";

defineProps<{ label: string }>();

const navigationId = useId();
const open = ref(false);
const toggle = useTemplateRef<InstanceType<typeof UIButton>>("toggle");

function closeNavigation() {
  if (!open.value) return;
  open.value = false;

  const button = toggle.value?.$el;
  if (button instanceof HTMLButtonElement && button.getClientRects().length) {
    button.focus({ preventScroll: true });
  }
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
      <UIButton
        ref="toggle"
        class="ui-dashboard-sidebar__toggle"
        variant="outline"
        :aria-controls="navigationId"
        :aria-expanded="open"
        @click="open = !open"
      >
        {{ label }}
      </UIButton>
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
    <div v-if="$slots.footer" class="ui-dashboard-sidebar__footer">
      <slot name="footer" />
    </div>
  </aside>
</template>

<style scoped>
.ui-dashboard-sidebar {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  block-size: 100%;
  border-inline-end: 1px solid var(--ui-color-divider);
  background: var(--ui-dashboard-sidebar-background, var(--ui-color-surface));
}

.ui-dashboard-sidebar__header {
  padding: 1.25rem 1rem 1rem;
  overflow-wrap: anywhere;
}

.ui-dashboard-sidebar .ui-dashboard-sidebar__toggle {
  display: none;
  --ui-button-border: var(--ui-color-divider);
  --ui-button-ink: var(--ui-color-text);
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

.ui-dashboard-sidebar__footer {
  padding: 0.875rem 1rem;
  border-block-start: 1px solid var(--ui-color-divider);
  overflow-wrap: anywhere;
}

@container ui-dashboard (inline-size <= 42rem) {
  .ui-dashboard-sidebar {
    block-size: auto;
    border-inline-end: 0;
    border-block-end: 1px solid var(--ui-color-divider);
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

  .ui-dashboard-sidebar .ui-dashboard-sidebar__toggle {
    display: inline-flex;
    margin-inline-start: auto;
  }

  .ui-dashboard-sidebar__navigation {
    max-block-size: 55dvh;
  }

  .ui-dashboard-sidebar__navigation[data-open="false"],
  .ui-dashboard-sidebar__navigation[data-open="false"] + .ui-dashboard-sidebar__footer {
    display: none;
  }
}
</style>
