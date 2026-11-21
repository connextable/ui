<script setup lang="ts">
import { useTemplateRef, watch } from "vue";

const { animateSize = false } = defineProps<{ animateSize?: boolean }>();
defineSlots<{
  default?(): unknown;
  close?(): unknown;
  "footer-leading"?(): unknown;
  actions?(): unknown;
}>();

const body = useTemplateRef<HTMLDivElement>("body");
const footer = useTemplateRef<HTMLDivElement>("footer");

watch(body, (content, _, onCleanup) => {
  const panel = content?.parentElement?.parentElement;
  if (!animateSize || !content || !panel || typeof ResizeObserver === "undefined" || !panel.animate) return;

  const view = panel.ownerDocument.defaultView;
  if (!view) return;
  const preference = view.matchMedia("(prefers-reduced-motion: reduce)");
  let height: number | undefined;
  let motion: Animation | undefined;

  const cancelMotion = () => {
    motion?.cancel();
    motion = undefined;
  };

  const updateSize = () => {
    if (panel.hidden || panel.dataset.state !== "open") return;

    const from = motion ? Number.parseFloat(view.getComputedStyle(panel).blockSize) : height;
    cancelMotion();
    const natural = view.getComputedStyle(panel);
    height = Number.parseFloat(natural.blockSize);
    if (preference.matches || !from || !height || Math.abs(from - height) < 0.5) return;

    const token = natural.getPropertyValue("--ui-motion-standard").trim();
    const duration = Number.parseFloat(token) * (token.endsWith("ms") ? 1 : 1000);
    if (!Number.isFinite(duration) || duration <= 0) return;

    const moving = panel.animate([{ blockSize: `${from}px` }, { blockSize: `${height}px` }], {
      duration,
      easing: natural.getPropertyValue("--ui-ease-out").trim() || "ease-out",
      fill: "both",
    });
    motion = moving;
    moving.onfinish = () => {
      if (motion === moving) cancelMotion();
    };
  };

  const resetSize = () => {
    cancelMotion();
    height = undefined;
    updateSize();
  };

  const syncPresence = () => {
    if (!panel.hidden && panel.dataset.state === "closed") {
      // Keep the current size while the exit fades the panel out.
      motion?.pause();
    } else {
      resetSize();
    }
  };

  // The body and footer keep their natural sizes even while the panel constrains its scroll area.
  const resize = new ResizeObserver(updateSize);
  resize.observe(content, { box: "border-box" });
  const stopFooter = watch(footer, (element, previous) => {
    if (previous) resize.unobserve(previous);
    if (element) resize.observe(element, { box: "border-box" });
    updateSize();
  }, { immediate: true, flush: "post" });
  const presence = new MutationObserver(syncPresence);
  presence.observe(panel, { attributeFilter: ["data-state", "hidden"] });
  preference.addEventListener("change", resetSize);
  view.addEventListener("resize", resetSize);
  onCleanup(() => {
    stopFooter();
    resize.disconnect();
    presence.disconnect();
    preference.removeEventListener("change", resetSize);
    view.removeEventListener("resize", resetSize);
    cancelMotion();
  });
}, { flush: "post" });
</script>

<template>
  <div class="ui-dialog__scroll ui-scrollbar">
    <div ref="body" class="ui-dialog__body"><slot /></div>
  </div>
  <div v-if="$slots['footer-leading'] || $slots.actions" ref="footer" class="ui-dialog__footer">
    <div v-if="$slots['footer-leading']" class="ui-dialog__footer-leading"><slot name="footer-leading" /></div>
    <div v-if="$slots.actions" class="ui-dialog__actions"><slot name="actions" /></div>
  </div>
  <slot name="close" />
</template>

<style>
.ui-dialog-panel:not([hidden]) {
  --ui-dialog-padding: var(--ui-panel-radius);

  display: flex;
  flex-direction: column;
  padding: 0;
  overflow: hidden;
}

.ui-dialog__scroll {
  min-block-size: 0;
  overflow: auto;
  overscroll-behavior: contain;
}

.ui-dialog-panel:is([data-scope="dialog"], [data-scope="alert-dialog"]) > .ui-dialog__scroll {
  flex: 1 1 auto;
}

.ui-dialog__body {
  display: flow-root;
  padding: var(--ui-dialog-padding);
}

.ui-dialog__body > :first-child {
  margin-block-start: 0;
}

.ui-dialog__body > :last-child {
  margin-block-end: 0;
}

.ui-dialog-panel--with-close {
  --ui-frame-padding: var(--ui-space-sm);
  --ui-frame-radius: var(--ui-panel-radius);
  --ui-dialog-close-edge: calc(var(--ui-frame-padding) + var(--ui-control-height-small));
}

.ui-dialog-panel--with-close:not([data-presentation="inline"]) .ui-dialog__body > [data-part="title"]:first-child {
  box-sizing: border-box;
  min-block-size: max(0px, calc(var(--ui-dialog-close-edge) - var(--ui-dialog-padding)));
  padding-inline-end: max(0px, calc(var(--ui-dialog-close-edge) + var(--ui-space-sm) - var(--ui-dialog-padding)));
  overflow-wrap: anywhere;
}

.ui-dialog-panel--with-close:not([data-presentation="inline"]) .ui-dialog__body:not(:has(> [data-part="title"]:first-child)) {
  padding-block-start: calc(var(--ui-dialog-close-edge) + var(--ui-space-sm));
}

.ui-dialog-panel .ui-dialog__close {
  --ui-button-fill: var(--ui-color-surface);
  --ui-control-size-radius: var(--ui-inset-radius);

  position: absolute;
  z-index: 1;
  inset-block-start: var(--ui-frame-padding);
  inset-inline-end: var(--ui-frame-padding);
}

.ui-dialog-panel[data-presentation="inline"] .ui-dialog__close {
  display: none;
}

.ui-dialog__footer {
  display: flex;
  flex: none;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--ui-space-sm) var(--ui-space-md);
  padding: var(--ui-space-md) var(--ui-dialog-padding) var(--ui-dialog-padding);
}

.ui-dialog__scroll:has(+ .ui-dialog__footer) > .ui-dialog__body {
  padding-block-end: 0;
}

.ui-dialog__footer-leading {
  min-inline-size: 0;
  max-inline-size: 100%;
  color: var(--ui-color-text-muted);
  font-size: var(--ui-font-size-body-sm);
  overflow-wrap: anywhere;
}

.ui-dialog__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: center;
  gap: var(--ui-space-sm);
  min-inline-size: 0;
  max-inline-size: 100%;
  margin-inline-start: auto;
}
</style>
