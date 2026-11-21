<script setup lang="ts">
import { DisclosureRoot, DisclosureTrigger } from "@sectile/vue/disclosure";
import { ref, useId, useTemplateRef } from "vue";
import UIButton from "../button/UIButton.vue";
import UIScrollArea from "../scroll/UIScrollArea.vue";

defineProps<{ label: string }>();

const navigationId = useId();
const open = ref(false);
const toggle = useTemplateRef<InstanceType<typeof UIButton>>("toggle");
const navigationScroll = useTemplateRef<InstanceType<typeof UIScrollArea>>("navigationScroll");

defineExpose({
  scrollNavigationToTop() {
    navigationScroll.value?.scrollToEdge("top", "instant");
  },
});

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
  <DisclosureRoot v-model="open" as="aside" class="ui-dashboard-sidebar" :content-id="navigationId" @keydown.esc="closeNavigation">
    <div class="ui-dashboard-sidebar__top">
      <div v-if="$slots.header" class="ui-dashboard-sidebar__header">
        <slot name="header" />
      </div>
      <DisclosureTrigger as-child>
        <UIButton ref="toggle" class="ui-dashboard-sidebar__toggle" variant="outline">{{ label }}</UIButton>
      </DisclosureTrigger>
    </div>
    <nav
      :id="navigationId"
      class="ui-dashboard-sidebar__navigation"
      :aria-label="label"
      :data-open="open"
      :data-has-header="Boolean($slots['navigation-header']) || undefined"
      @click="onNavigationClick"
    >
      <UIScrollArea ref="navigationScroll" class="ui-dashboard-sidebar__navigation-scroll" :tabindex="-1">
        <template v-if="$slots['navigation-header']" #header>
          <div class="ui-dashboard-sidebar__navigation-header"><slot name="navigation-header" /></div>
        </template>
        <div class="ui-dashboard-sidebar__navigation-items"><slot /></div>
      </UIScrollArea>
    </nav>
    <div v-if="$slots.footer" class="ui-dashboard-sidebar__footer">
      <slot name="footer" />
    </div>
  </DisclosureRoot>
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

.ui-dashboard-sidebar__top:has(+ .ui-dashboard-sidebar__navigation[data-has-header]) .ui-dashboard-sidebar__header {
  padding-block-end: 0;
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
  min-block-size: 0;
}

.ui-dashboard-sidebar__navigation-header {
  flex: none;
  padding: var(--ui-space-md);
}

.ui-dashboard-sidebar__navigation-scroll {
  --ui-scroll-area-max-height: none;
  --ui-scroll-area-border: 0;
  --ui-scroll-area-radius: 0;
  --ui-scroll-area-background: transparent;
  --ui-scroll-area-overscroll: contain;
  flex: 1 1 auto;
  min-block-size: 0;
}

.ui-dashboard-sidebar__navigation-items {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: var(--ui-space-md);
}

.ui-dashboard-sidebar__navigation[data-has-header] .ui-dashboard-sidebar__navigation-items {
  padding-block-start: 0;
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

  .ui-dashboard-sidebar__top:has(+ .ui-dashboard-sidebar__navigation[data-open="true"][data-has-header]) {
    padding-block-end: 0;
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
