<script lang="ts">
export type UIToastPosition = `${"top" | "bottom"}-${"start" | "center" | "end"}`;
</script>

<script setup lang="ts">
import { ToastViewport, type ToastPartProps } from "@sectile/vue/toast";
import type { ObjectDirective } from "vue";

const { as, asChild, label, position = "bottom-end", expand } = defineProps<{
  as?: ToastPartProps["as"];
  asChild?: boolean;
  label?: string;
  position?: UIToastPosition;
  expand?: boolean;
}>();

const cleanups = new WeakMap<HTMLElement, () => void>();
const cardSelector = '[data-scope="toast"][data-part="root"]';
const vToastStack: ObjectDirective<HTMLElement> = {
  mounted(viewport) {
    const observed = new Set<HTMLElement>();
    const resize = new ResizeObserver(layout);
    const mutations = new MutationObserver(layout);

    function layout() {
      const cards = Array.from(viewport.querySelectorAll<HTMLElement>(cardSelector))
        .filter((card) => card.closest('[data-scope="toast"][data-part="viewport"]') === viewport);

      for (const card of observed) {
        if (cards.includes(card)) continue;
        resize.unobserve(card);
        observed.delete(card);
      }
      for (const card of cards) {
        if (observed.has(card)) continue;
        resize.observe(card, { box: "border-box" });
        observed.add(card);
      }

      const active = cards.filter((card) => card.dataset.state === "open").reverse();
      const frontHeight = active[0]?.offsetHeight ?? 0;
      let height = 0;
      active.forEach((card, index) => {
        const cardHeight = card.offsetHeight;
        card.dataset.uiToastFront = String(index === 0);
        card.style.setProperty("--ui-toast-depth", String(Math.min(index, 2)));
        card.style.setProperty("--ui-toast-stack-index", String(active.length - index));
        card.style.setProperty("--ui-toast-offset", `calc(${height}px + ${index} * var(--ui-toast-gap))`);
        card.style.setProperty("--ui-toast-height-scale", String(cardHeight ? frontHeight / cardHeight : 1));
        height += cardHeight;
      });
      viewport.style.setProperty("--ui-toast-front-height", `${frontHeight}px`);
      viewport.style.setProperty("--ui-toast-depth", String(Math.max(0, Math.min(active.length - 1, 2))));
      viewport.style.setProperty("--ui-toast-expanded-height", `calc(${height}px + ${Math.max(0, active.length - 1)} * var(--ui-toast-gap))`);
    }

    mutations.observe(viewport, { childList: true, subtree: true, attributes: true, attributeFilter: ["data-state"] });
    layout();
    cleanups.set(viewport, () => {
      resize.disconnect();
      mutations.disconnect();
    });
  },
  unmounted(viewport) {
    cleanups.get(viewport)?.();
    cleanups.delete(viewport);
  },
};
</script>

<template>
  <ToastViewport
    v-toast-stack :as="as" :as-child="asChild" :label="label" class="ui-toast-stack"
    :data-position="position" :data-ui-toast-expanded="expand ? '' : undefined"
  >
    <slot />
  </ToastViewport>
</template>
