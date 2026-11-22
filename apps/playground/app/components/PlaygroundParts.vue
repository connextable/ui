<script setup lang="ts">
import { describeCatalogPart } from "~/data/catalog-parts";

defineProps<{ parts: readonly string[] }>();
</script>

<template>
  <PlaygroundExampleSection id="parts" title="구성 컴포넌트">
    <dl class="playground-parts">
      <div v-for="part in parts" :id="part" :key="part" tabindex="-1">
        <dt><code>{{ part }}</code></dt>
        <dd>{{ describeCatalogPart(part) }}</dd>
      </div>
    </dl>
  </PlaygroundExampleSection>
</template>

<style scoped>
.playground-parts {
  margin: 0;
  border-block-start: 1px solid var(--ui-color-divider);
}

.playground-parts > div {
  display: grid;
  gap: var(--ui-space-2xs);
  padding-block: var(--ui-space-sm);
  border-block-end: 1px solid var(--ui-color-divider);
  scroll-margin-block-start: 2rem;
}

.playground-parts dd {
  margin: 0;
  color: var(--ui-color-text-muted);
}
</style>
