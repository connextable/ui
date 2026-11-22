<script setup lang="ts">
import {
  DialogClose, DialogContent, DialogOverlay, DialogPortal, DialogRoot, DialogTitle,
} from "@sectile/vue/dialog";
import { ChevronLeft, ChevronRight, X } from "@lucide/vue";
import { computed, ref, shallowRef, useTemplateRef, watch } from "vue";
import UIButton from "../button/UIButton.vue";
import LightboxThumbnail from "./LightboxThumbnail.vue";
import type { UILightboxItem } from "./lightbox-types";
import { useLightboxTransition } from "./useLightboxTransition";

const {
  items, label = "미디어 보기", labels, loop = false, thumbnails = true, motion = true,
  closeOnInteractOutside = true,
} = defineProps<{
  items: readonly UILightboxItem[];
  label?: string;
  labels?: Partial<{
    previous: string;
    next: string;
    close: string;
    thumbnails: string;
    error: string;
  }>;
  loop?: boolean;
  thumbnails?: boolean;
  motion?: boolean;
  closeOnInteractOutside?: boolean;
}>();
const open = defineModel<boolean>("open", { default: false });
const index = defineModel<number>("index", { default: 0 });
defineSlots<{
  default?(scope: { items: readonly UILightboxItem[]; openAt: typeof openAt }): unknown;
  caption?(scope: { item: UILightboxItem; index: number; total: number }): unknown;
  actions?(scope: { item: UILightboxItem; index: number; total: number }): unknown;
}>();

const gallery = useTemplateRef<HTMLElement>("gallery");
const overlay = useTemplateRef<HTMLElement>("overlay");
const panel = useTemplateRef<HTMLElement>("panel");
const visual = useTemplateRef<HTMLElement>("visual");
const photo = useTemplateRef<HTMLImageElement>("photo");
const video = useTemplateRef<HTMLVideoElement>("video");
const strip = useTemplateRef<HTMLElement>("strip");
const opener = shallowRef<HTMLElement>();
const mediaFailed = ref(false);
const transition = useLightboxTransition();
const selectedIndex = computed(() =>
  Math.max(0, Math.min(items.length - 1, Number.isFinite(index.value) ? Math.trunc(index.value) : 0)),
);
const current = computed(() => items[selectedIndex.value]);
const displayedOpen = computed(() => open.value && Boolean(current.value));
const mediaKey = computed(() => {
  const item = current.value;
  if (!item) return undefined;
  return JSON.stringify([item.id, item.kind, item.kind === "image" ? item.src : item.sources]);
});
const canGoBack = computed(() => items.length > 1 && (loop || selectedIndex.value > 0));
const canGoForward = computed(() => items.length > 1 && (loop || selectedIndex.value < items.length - 1));

watch([mediaKey, displayedOpen], ([key, isOpen], [previousKey]) => {
  video.value?.pause();
  if (!isOpen && !transition.isClosing()) transition.stop(false);
  if (key !== previousKey || isOpen) mediaFailed.value = false;
}, { flush: "sync" });

watch([selectedIndex, displayedOpen], () => {
  if (!displayedOpen.value) return;
  strip.value?.querySelector('[aria-current="true"]')?.scrollIntoView({ block: "nearest", inline: "nearest" });
}, { flush: "post" });

function photoThumbnail(element: Element | null | undefined, item: UILightboxItem) {
  if (item.kind !== "image") return;
  const image = element?.querySelector("img");
  if (image?.getAttribute("src") === item.src && image.complete && image.naturalWidth) return image;
}

function openAt(position: number, event?: Event) {
  if (!Number.isInteger(position) || !items[position]) return;
  transition.stop();
  if (displayedOpen.value) {
    goTo(position);
    return;
  }

  opener.value = event?.currentTarget instanceof HTMLElement ? event.currentTarget : undefined;
  const origin = photoThumbnail(opener.value, items[position]);
  const show = () => {
    index.value = position;
    open.value = true;
  };
  if (motion) {
    transition.start("open", show, { media: origin }, () => ({
      media: origin ? photo.value : null,
      panel: panel.value,
      overlay: overlay.value,
    }));
  } else {
    show();
  }
}

function goTo(position: number, direction?: "next" | "previous") {
  transition.stop();
  const from = selectedIndex.value;
  if (!items[position] || position === from) return;
  const select = () => { index.value = position; };
  if (motion && visual.value) {
    transition.start(direction ?? (position > from ? "next" : "previous"), select,
      { media: visual.value }, () => ({ media: visual.value }));
  } else {
    select();
  }
}

function move(offset: -1 | 1) {
  transition.stop();
  if (offset === -1 ? !canGoBack.value : !canGoForward.value) return;
  const position = (selectedIndex.value + offset + items.length) % items.length;
  goTo(position, offset === 1 ? "next" : "previous");
}

function onDialogOpenChange(value: boolean) {
  if (value) {
    open.value = true;
    return;
  }
  if (transition.isClosing()) return;
  transition.stop(false);
  const hide = () => { open.value = false; };
  if (!motion || !current.value) {
    hide();
    return;
  }

  const item = current.value;
  const thumbnail = photoThumbnail(gallery.value?.children[selectedIndex.value], item)
    ?? photoThumbnail(opener.value, item);
  const bounds = thumbnail?.getBoundingClientRect();
  const destination = bounds && bounds.bottom > 0 && bounds.top < (thumbnail?.ownerDocument.documentElement.clientHeight ?? 0)
    ? thumbnail
    : undefined;
  transition.start("close", hide, {
    media: destination ? photo.value : null,
    panel: panel.value,
    overlay: overlay.value,
  }, () => ({ media: destination }));
}

function onKeydown(event: KeyboardEvent) {
  if (items.length < 2 || event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey
    || event.composedPath().some(node => node instanceof Element
      && node.matches('video, input, textarea, select, [contenteditable], [role="slider"]'))) return;

  if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
    event.preventDefault();
    const rtl = event.currentTarget instanceof Element && getComputedStyle(event.currentTarget).direction === "rtl";
    move((event.key === "ArrowRight") !== rtl ? 1 : -1);
  } else if (event.key === "Home" || event.key === "End") {
    event.preventDefault();
    goTo(event.key === "Home" ? 0 : items.length - 1);
  }
}

let touchStart: { id: number; x: number; y: number } | undefined;

function onPointerDown(event: PointerEvent) {
  if (current.value?.kind === "image" && items.length > 1 && event.isPrimary && event.pointerType === "touch") {
    touchStart = { id: event.pointerId, x: event.clientX, y: event.clientY };
  }
}

function onPointerUp(event: PointerEvent) {
  if (touchStart?.id !== event.pointerId) return;
  const dx = event.clientX - touchStart.x;
  const dy = event.clientY - touchStart.y;
  touchStart = undefined;
  if (Math.abs(dx) < 45 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
  const rtl = event.currentTarget instanceof Element && getComputedStyle(event.currentTarget).direction === "rtl";
  move((dx < 0) !== rtl ? 1 : -1);
}
</script>

<template>
  <DialogRoot :open="displayedOpen" :label="label" :restore-focus-target="opener"
    :close-on-interact-outside="closeOnInteractOutside" unmount-on-exit @update:open="onDialogOpenChange">
    <slot :items="items" :open-at="openAt">
      <div ref="gallery" class="ui-lightbox__gallery">
        <button v-for="(item, position) in items" :key="item.id" type="button" class="ui-lightbox__trigger"
          aria-haspopup="dialog" @click="openAt(position, $event)">
          <LightboxThumbnail :item="item" class="ui-lightbox__cover" />
          <span class="ui-lightbox__trigger-label">{{ item.label }}</span>
        </button>
      </div>
    </slot>
    <DialogPortal>
      <DialogOverlay as-child>
        <div ref="overlay" class="ui-lightbox__overlay" :data-motion="motion ? undefined : 'off'" />
      </DialogOverlay>
      <DialogContent as-child>
        <div v-if="current" ref="panel" class="ui-lightbox__panel" :data-motion="motion ? undefined : 'off'" @keydown="onKeydown">
          <header class="ui-lightbox__header">
            <div class="ui-lightbox__heading">
              <DialogTitle>{{ label }}</DialogTitle>
              <span v-if="items.length > 1" class="ui-lightbox__counter" aria-hidden="true">
                {{ selectedIndex + 1 }} / {{ items.length }}
              </span>
            </div>
            <div class="ui-lightbox__controls">
              <template v-if="items.length > 1">
                <UIButton variant="ghost" size="sm" icon-only :aria-label="labels?.previous ?? '이전 미디어'"
                  :aria-disabled="!canGoBack" :tabindex="canGoBack ? 0 : -1" @click="move(-1)">
                  <template #leading><ChevronLeft class="ui-lightbox__direction" /></template>
                </UIButton>
                <UIButton variant="ghost" size="sm" icon-only :aria-label="labels?.next ?? '다음 미디어'"
                  :aria-disabled="!canGoForward" :tabindex="canGoForward ? 0 : -1" @click="move(1)">
                  <template #leading><ChevronRight class="ui-lightbox__direction" /></template>
                </UIButton>
              </template>
              <slot name="actions" :item="current" :index="selectedIndex" :total="items.length" />
              <DialogClose as-child>
                <UIButton variant="ghost" size="sm" icon-only :aria-label="labels?.close ?? '닫기'">
                  <template #leading><X /></template>
                </UIButton>
              </DialogClose>
            </div>
          </header>
          <figure class="ui-lightbox__figure">
            <div class="ui-lightbox__stage" :data-kind="current.kind" @pointerdown="onPointerDown"
              @pointerup="onPointerUp" @pointercancel="touchStart = undefined">
              <div ref="visual" class="ui-lightbox__visual">
                <p v-if="mediaFailed || (current.kind === 'video' && !current.sources.length)"
                  class="ui-lightbox__error" role="status">
                  {{ labels?.error ?? "미디어를 불러오지 못했습니다." }}
                </p>
                <img v-else-if="current.kind === 'image'" :key="mediaKey" ref="photo" :src="current.src"
                  :alt="current.alt" draggable="false" @error="mediaFailed = true" />
                <video v-else :key="mediaKey" ref="video" :aria-label="current.label" :poster="current.poster"
                  :muted="current.muted" :loop="current.loop" :crossorigin="current.crossorigin"
                  controls playsinline preload="metadata" @error="mediaFailed = true">
                  <source v-for="(source, position) in current.sources" :key="source.src" :src="source.src" :type="source.type"
                    @error="position === current.sources.length - 1 && (mediaFailed = true)" />
                  <track v-for="track in current.tracks" :key="track.src" :src="track.src" :srclang="track.srclang"
                    :label="track.label" :kind="track.kind ?? 'captions'" :default="track.default" />
                </video>
              </div>
            </div>
            <figcaption class="ui-lightbox__caption" aria-live="polite" aria-atomic="true">
              <slot name="caption" :item="current" :index="selectedIndex" :total="items.length">
                <strong>{{ current.label }}</strong>
                <p v-if="current.description">{{ current.description }}</p>
              </slot>
              <span v-if="items.length > 1" class="ui-lightbox__sr-only">{{ selectedIndex + 1 }} / {{ items.length }}</span>
            </figcaption>
          </figure>
          <div v-if="thumbnails && items.length > 1" ref="strip" class="ui-lightbox__strip ui-scrollbar"
            role="group" :aria-label="labels?.thumbnails ?? '미디어 썸네일'">
            <button v-for="(item, position) in items" :key="item.id" class="ui-lightbox__choice" type="button"
              :aria-label="item.label" :aria-current="position === selectedIndex ? 'true' : undefined" @click="goTo(position)">
              <LightboxThumbnail :item="item" />
            </button>
          </div>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<style scoped>
.ui-lightbox__gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 9rem), 1fr));
  gap: var(--ui-space-md);
}

.ui-lightbox__trigger,
.ui-lightbox__choice {
  display: grid;
  min-inline-size: 0;
  padding: 0;
  border: 1px solid var(--ui-color-border);
  border-radius: var(--ui-control-radius);
  background: var(--ui-color-surface);
  color: var(--ui-color-text);
  font: inherit;
  text-align: start;
  cursor: pointer;
}

.ui-lightbox__cover {
  block-size: auto;
  aspect-ratio: 4 / 3;
  border-end-start-radius: 0;
  border-end-end-radius: 0;
}

.ui-lightbox__trigger-label {
  padding: var(--ui-space-sm) var(--ui-space-md);
  overflow-wrap: anywhere;
}

:is(.ui-lightbox__trigger, .ui-lightbox__choice):hover {
  border-color: var(--ui-color-border-hover);
  background: var(--ui-color-surface-hover);
}

:is(.ui-lightbox__trigger, .ui-lightbox__choice):focus-visible {
  outline: var(--ui-focus-ring-width) solid var(--ui-color-focus);
  outline-offset: 2px;
}

.ui-lightbox__overlay {
  background: rgb(9 17 22 / 72%);
}

.ui-lightbox__panel {
  --ui-lightbox-inset: clamp(0.5rem, 3vw, 2rem);

  box-sizing: border-box;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr) auto;
  gap: var(--ui-space-md);
  inline-size: min(72rem, calc(100% - 2 * var(--ui-lightbox-inset)));
  block-size: min(52rem, calc(100dvh - 2 * var(--ui-lightbox-inset)));
  max-block-size: calc(100dvh - 2 * var(--ui-lightbox-inset));
  padding: clamp(0.625rem, 2vw, 1.25rem);
  border: 1px solid var(--ui-color-divider);
  border-radius: var(--ui-panel-radius);
  background: var(--ui-color-surface);
  color: var(--ui-color-text);
  box-shadow: var(--ui-shadow-elevated);
  transition: opacity var(--ui-motion-fast) var(--ui-ease-out);
}

.ui-lightbox__header,
.ui-lightbox__heading,
.ui-lightbox__controls {
  display: flex;
  align-items: center;
  gap: var(--ui-space-sm);
  min-inline-size: 0;
}

.ui-lightbox__header {
  flex-wrap: wrap;
  justify-content: space-between;
}

.ui-lightbox__heading {
  flex-wrap: wrap;
  overflow-wrap: anywhere;
}

.ui-lightbox__counter,
.ui-lightbox__caption p {
  color: var(--ui-color-text-muted);
  font-size: var(--ui-font-size-body-sm);
}

.ui-lightbox__counter {
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
}

.ui-lightbox__controls {
  margin-inline-start: auto;
}

.ui-lightbox__controls :deep([aria-disabled="true"]) {
  opacity: 0.5;
  cursor: default;
}

.ui-lightbox__direction:dir(rtl) {
  scale: -1 1;
}

.ui-lightbox__figure {
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto;
  gap: var(--ui-space-sm);
  min-block-size: 0;
  margin: 0;
}

.ui-lightbox__stage,
.ui-lightbox__visual {
  overflow: hidden;
  border-radius: var(--ui-radius-lg);
}

.ui-lightbox__stage {
  position: relative;
  min-inline-size: 0;
  background: var(--ui-lightbox-stage-background, #151b1f);
  color: #fff;
}

.ui-lightbox__stage[data-kind="image"] {
  touch-action: pan-y pinch-zoom;
}

.ui-lightbox__visual {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
}

.ui-lightbox__visual img {
  position: absolute;
  inset: 0;
  max-inline-size: 100%;
  max-block-size: 100%;
  margin: auto;
  object-fit: contain;
}

.ui-lightbox__visual video {
  display: block;
  inline-size: 100%;
  block-size: 100%;
  object-fit: contain;
}

.ui-lightbox__error {
  margin: var(--ui-space-md);
  text-align: center;
}

.ui-lightbox__caption {
  max-block-size: 5rem;
  overflow: auto;
  overflow-wrap: anywhere;
}

.ui-lightbox__caption p {
  margin: 0;
}

.ui-lightbox__strip {
  display: flex;
  gap: var(--ui-space-sm);
  overflow: auto hidden;
  overscroll-behavior-inline: contain;
  padding: var(--ui-space-xs);
}

.ui-lightbox__choice {
  flex: 0 0 4.5rem;
  block-size: 3.375rem;
  padding: var(--ui-space-2xs);
}

.ui-lightbox__choice[aria-current="true"] {
  border-color: var(--ui-color-accent);
  box-shadow: 0 0 0 1px var(--ui-color-accent);
}

.ui-lightbox__sr-only {
  position: absolute;
  inline-size: 1px;
  block-size: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

@media (max-height: 27rem) {
  .ui-lightbox__panel {
    grid-template-rows: auto minmax(13rem, 1fr) auto;
    overflow: auto;
    overscroll-behavior: contain;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ui-lightbox__overlay,
  .ui-lightbox__panel {
    transition: none;
  }
}

.ui-lightbox__overlay[data-motion="off"],
.ui-lightbox__panel[data-motion="off"] {
  transition: none;
}
</style>
