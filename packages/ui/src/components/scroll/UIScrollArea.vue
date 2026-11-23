<script setup lang="ts">
import { computed, useId, useTemplateRef } from "vue";
import UIScrollFade from "./UIScrollFade.vue";
import { scrollEdges, useUIScrollArea, type UIScrollAreaController, type UIScrollEdge, type UIScrollState } from "./useUIScrollArea";

type ScrollAreaSlot = Pick<UIScrollAreaController, "scrollTo" | "scrollBy" | "scrollToEdge" | "scrollToElement" | "refresh"> & {
  viewportId: string;
  state: UIScrollState;
  isScrolling: boolean;
};

const props = withDefaults(defineProps<{
  label?: string;
  viewportId?: string;
  axis?: "vertical" | "horizontal" | "both";
  scrollbar?: "thin" | "native" | "hidden";
  fade?: boolean | readonly UIScrollEdge[];
  sticky?: readonly (HTMLElement | null)[];
  tabindex?: number;
}>(), { axis: "vertical", scrollbar: "thin", fade: false, tabindex: 0 });

defineSlots<{
  default?(state: ScrollAreaSlot): unknown;
  header?(state: ScrollAreaSlot): unknown;
  footer?(state: ScrollAreaSlot): unknown;
  controls?(state: ScrollAreaSlot): unknown;
  fade?(state: ScrollAreaSlot & { edge: UIScrollEdge; visible: boolean }): unknown;
}>();

const id = useId();
const viewport = useTemplateRef("viewport");
const content = useTemplateRef("content");
const controller = useUIScrollArea(() => viewport.value?.element, { content });
const { state, isScrolling, scrollTo, scrollBy, scrollToEdge, scrollToElement, refresh } = controller;
const slotState = computed(() => ({
  viewportId: props.viewportId ?? id, state: state.value, isScrolling: isScrolling.value,
  scrollTo, scrollBy, scrollToEdge, scrollToElement, refresh,
}));
const fadeEdges = computed(() => {
  const { axis, fade } = props;
  if (!fade) return [];
  return scrollEdges.filter((edge) => {
    const edgeAxis = edge === "top" || edge === "bottom" ? "vertical" : "horizontal";
    return (axis === "both" || axis === edgeAxis) && (fade === true || fade.includes(edge));
  });
});
const fadePosition = computed(() => {
  const insets = props.sticky ? viewport.value?.insets : undefined;
  return Object.fromEntries(scrollEdges.map(edge => [`--ui-scroll-inset-${edge}`, `${insets?.[edge] ?? 0}px`]));
});

defineExpose({ ...controller, controller });
</script>

<template>
  <div class="ui-scroll-area" :data-axis="axis" :data-scrolling="isScrolling || undefined">
    <div class="ui-scroll-area__frame">
      <div v-if="$slots.header" class="ui-scroll-area__header">
        <slot name="header" v-bind="slotState" />
      </div>
      <div class="ui-scroll-area__scrollport" :style="$slots.fade ? fadePosition : undefined">
        <UIScrollFade
          :id="slotState.viewportId" ref="viewport" class="ui-scroll-area__viewport"
          :class="{ 'ui-scrollbar': scrollbar === 'thin' }" :data-scrollbar="scrollbar"
          :role="label ? 'region' : undefined" :aria-label="label" :tabindex="tabindex"
          :state="state" :edges="$slots.fade ? [] : fadeEdges" :sticky="fadeEdges.length ? sticky : undefined"
        >
          <div ref="content" class="ui-scroll-area__content">
            <slot v-bind="slotState" />
          </div>
        </UIScrollFade>
        <template v-if="$slots.fade">
          <div v-for="edge in fadeEdges" :key="edge" class="ui-scroll-area__edge" :data-edge="edge"
            :data-visible="!state.atEdge[edge] || undefined" aria-hidden="true">
            <slot name="fade" v-bind="slotState" :edge="edge" :visible="!state.atEdge[edge]" />
          </div>
        </template>
      </div>
      <div v-if="$slots.footer" class="ui-scroll-area__footer">
        <slot name="footer" v-bind="slotState" />
      </div>
    </div>
    <slot name="controls" v-bind="slotState" />
  </div>
</template>

<style scoped>
:is(.ui-scroll-area, .ui-scroll-area__frame, .ui-scroll-area__scrollport) {
  display: flex;
  flex-direction: column;
  min-inline-size: 0;
  min-block-size: 0;
}

.ui-scroll-area__frame {
  flex: 1 1 auto;
  box-sizing: border-box;
  max-block-size: var(--ui-scroll-area-max-height, 20rem);
  border: var(--ui-scroll-area-border, 1px solid var(--ui-color-border));
  border-radius: var(--ui-scroll-area-radius, var(--ui-radius-lg));
  overflow: clip;
  background: var(--ui-scroll-area-background, var(--ui-color-surface));
}

.ui-scroll-area__header,
.ui-scroll-area__footer {
  flex: none;
}

.ui-scroll-area__scrollport {
  position: relative;
  flex: 1 1 auto;
}

.ui-scroll-area__viewport {
  flex: 1 1 auto;
  min-block-size: 0;
  overflow: auto;
  overscroll-behavior: var(--ui-scroll-area-overscroll, auto);
}

.ui-scroll-area__viewport:focus-visible { outline: none; }

.ui-scroll-area__scrollport:has(> .ui-scroll-area__viewport:focus-visible)::after {
  position: absolute;
  z-index: 2;
  inset: var(--ui-space-2xs);
  border: var(--ui-focus-ring-width) solid var(--ui-color-focus);
  border-radius: max(0px, calc(var(--ui-scroll-area-radius, var(--ui-radius-lg)) - 1px - var(--ui-space-2xs)));
  pointer-events: none;
  content: "";

  @media (forced-colors: active) { border-color: Highlight; }
}

.ui-scroll-area[data-axis="vertical"] .ui-scroll-area__viewport {
  overflow-x: hidden;
}

.ui-scroll-area[data-axis="horizontal"] .ui-scroll-area__viewport {
  overflow-y: hidden;
}

.ui-scroll-area__viewport[data-scrollbar="hidden"] {
  scrollbar-width: none;
}

.ui-scroll-area__content {
  display: flow-root;
  min-inline-size: 100%;
}

.ui-scroll-area:not([data-axis="vertical"]) .ui-scroll-area__content {
  inline-size: max-content;
}

.ui-scroll-area__edge {
  position: absolute;
  z-index: 1;
  pointer-events: none;
  opacity: 0;
  visibility: hidden;
  transition: opacity var(--ui-motion-fast) var(--ui-ease-out), visibility var(--ui-motion-fast);
}

.ui-scroll-area__edge[data-visible] { opacity: 1; visibility: visible; }
.ui-scroll-area__edge:is([data-edge="top"], [data-edge="bottom"]) {
  left: var(--ui-scroll-inset-left, 0px);
  right: var(--ui-scroll-inset-right, 0px);
  block-size: var(--ui-scroll-edge-fade-size, var(--ui-scroll-fade-size, 1rem));
}
.ui-scroll-area__edge:is([data-edge="left"], [data-edge="right"]) {
  top: var(--ui-scroll-inset-top, 0px);
  bottom: var(--ui-scroll-inset-bottom, 0px);
  inline-size: var(--ui-scroll-edge-fade-size, var(--ui-scroll-fade-size, 1rem));
}
.ui-scroll-area__edge[data-edge="top"] {
  --ui-scroll-edge-fade-size: var(--ui-scroll-fade-top);
  top: var(--ui-scroll-inset-top, 0px);
}
.ui-scroll-area__edge[data-edge="bottom"] {
  --ui-scroll-edge-fade-size: var(--ui-scroll-fade-bottom);
  bottom: var(--ui-scroll-inset-bottom, 0px);
}
.ui-scroll-area__edge[data-edge="left"] {
  --ui-scroll-edge-fade-size: var(--ui-scroll-fade-left);
  left: var(--ui-scroll-inset-left, 0px);
}
.ui-scroll-area__edge[data-edge="right"] {
  --ui-scroll-edge-fade-size: var(--ui-scroll-fade-right);
  right: var(--ui-scroll-inset-right, 0px);
}
</style>
