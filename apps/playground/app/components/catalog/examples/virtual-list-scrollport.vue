<script setup lang="ts">
import { UIVirtualList } from "@connextable/ui";
import { useTemplateRef } from "vue";

const scrollport = useTemplateRef<HTMLElement>("scrollport");
const rows = Array.from({ length: 500 }, (_, index) => ({
  id: index + 1,
  label: `변경 기록 ${index + 1}`,
}));
</script>

<template>
  <section ref="scrollport" class="scrollport" aria-label="변경 기록" tabindex="0">
    <p class="scrollport-heading">최근 변경 기록</p>
    <UIVirtualList
      v-if="scrollport"
      class="collection"
      :items="rows"
      :get-i-d="row => row.id"
      :scrollport="scrollport"
      :size-policy="{ kind: 'fixed', extent: 40 }"
    >
      <template #item="{ value }">{{ value.label }}</template>
    </UIVirtualList>
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
