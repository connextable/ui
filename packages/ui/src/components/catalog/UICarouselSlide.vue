<script setup lang="ts">
import { CarouselSlide, type CarouselSlideProps } from "@sectile/vue/carousel";

const { forcePresent = true, ...props } = defineProps<CarouselSlideProps>();
</script>

<template>
  <CarouselSlide v-bind="props" :force-present="forcePresent" v-slot="state">
    <slot v-bind="state" />
  </CarouselSlide>
</template>

<style>
[data-scope="carousel"][data-part="root"] {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto auto auto minmax(0, 1fr);
  align-items: center;
  gap: var(--ui-space-xs);
  inline-size: min(100%, 26rem);
  min-inline-size: 0;
}

[data-scope="carousel"][data-part="root"] > :is([data-part="viewport"], [data-part="track"]) {
  grid-area: 1 / 1 / 2 / -1;
  min-inline-size: 0;
}

[data-scope="carousel"][data-part="viewport"] {
  overflow: clip;
}

[data-scope="carousel"][data-part="track"] {
  display: grid;
}

[data-scope="carousel"][data-part="slide"] {
  grid-area: 1 / 1;
  min-block-size: 8rem;
  display: grid;
  align-content: center;
  gap: var(--ui-space-xs);
  padding: var(--ui-space-md);
  border: 1px solid var(--ui-color-divider);
  border-radius: var(--ui-radius-md);
  background: var(--ui-color-surface-readonly);
  overflow-wrap: anywhere;
  transition: opacity var(--ui-motion-standard) var(--ui-ease-out);
}

[data-scope="carousel"][data-part="slide"][data-state="inactive"] {
  opacity: 0;
  visibility: visible;
  pointer-events: none;
}

[data-scope="carousel"][data-part="slide"][hidden] {
  display: none;
}

[data-scope="carousel"][data-part="root"] > [data-part="previous"] { grid-area: 2 / 2; }
[data-scope="carousel"][data-part="root"] > [data-part="next"] { grid-area: 2 / 4; }
[data-scope="carousel"][data-part="root"] > [data-part="pause"] {
  grid-area: 2 / 5;
  justify-self: end;
}

[data-scope="carousel"][data-part="indicator-group"] {
  grid-area: 2 / 3;
  display: flex;
  justify-content: center;
}

[data-scope="carousel"][data-part="indicator"]:empty {
  display: grid;
  place-items: center;
  inline-size: var(--ui-control-height-small);
  block-size: var(--ui-control-height-small);
  min-inline-size: 0;
  padding: 0;
  border: 0;
  border-radius: var(--ui-control-radius);
  background: transparent;
}

[data-scope="carousel"][data-part="indicator"]:empty::before {
  content: "";
  inline-size: var(--ui-space-sm);
  block-size: var(--ui-space-sm);
  border-radius: 50%;
  background: var(--ui-color-border-hover);
}

[data-scope="carousel"][data-part="indicator"]:empty:hover:not(:disabled) {
  background: var(--ui-color-surface-hover);
}

[data-scope="carousel"][data-part="indicator"][data-state="active"]:empty::before {
  background: var(--ui-color-accent);
}
</style>
