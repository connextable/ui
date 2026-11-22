<script setup lang="ts">
import { computed, inject, provide } from "vue";
import { playgroundHeadingLevelKey } from "~/utils/playground-heading";

const { headingLevel } = defineProps<{ id: string; title: string; headingLevel?: 2 | 3 }>();
const parentLevel = inject(playgroundHeadingLevelKey, undefined);
const level = computed(() => Math.max(headingLevel ?? 2, (parentLevel?.value ?? 1) + 1));
provide(playgroundHeadingLevelKey, level);
</script>

<template>
  <section class="playground-example-section" :aria-labelledby="id">
    <component :is="`h${level}`" :id="id" class="playground-example-section__heading" data-playground-heading tabindex="-1">{{ title }}</component>
    <slot />
  </section>
</template>

<style scoped>
.playground-example-section {
  margin-block-end: clamp(3rem, 6vw, 5rem);
}

.playground-example-section__heading {
  margin: 0 0 calc(var(--ui-space-md) * 2);
  font-size: clamp(1.25rem, 2.5vw, 1.625rem);
  font-weight: 680;
  letter-spacing: -0.025em;
}

h3.playground-example-section__heading {
  margin-block-end: var(--ui-space-lg);
  font-size: clamp(1.125rem, 2vw, 1.375rem);
}
</style>
