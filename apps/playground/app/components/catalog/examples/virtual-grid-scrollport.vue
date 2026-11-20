<script setup lang="ts">
import { UIVirtualGrid } from "@connextable/ui";
import { useTemplateRef } from "vue";

const scrollport = useTemplateRef<HTMLElement>("scrollport");
const tiles = Array.from({ length: 500 }, (_, index) => ({
  id: index + 1,
  label: `샘플 ${index + 1}`,
}));
</script>

<template>
  <section ref="scrollport" class="scrollport" aria-label="샘플 갤러리" tabindex="0">
    <p class="scrollport-heading">전체 샘플</p>
    <UIVirtualGrid
      v-if="scrollport"
      class="collection"
      :items="tiles"
      :get-i-d="tile => tile.id"
      :scrollport="scrollport"
      :lane-policy="{ kind: 'fixed', count: 3, gap: 8 }"
      :size-policy="{ kind: 'fixed', extent: 40 }"
      :row-gap="8"
    >
      <template #item="{ value }">{{ value.label }}</template>
    </UIVirtualGrid>
  </section>
</template>

<style scoped>
.scrollport {
  inline-size: min(100%, 32rem);
  block-size: 15rem;
  overflow: auto;
  border: 1px solid var(--ui-color-divider);
  border-radius: var(--ui-control-radius);
}

.scrollport-heading {
  margin: 0;
  padding: var(--ui-space-sm);
  font-weight: 600;
}

.collection {
  block-size: auto;
  overflow: visible;
  border: 0;
}
</style>
