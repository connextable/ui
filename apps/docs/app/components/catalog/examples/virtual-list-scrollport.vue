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
  <section ref="scrollport" data-ui-virtual-scrollport aria-label="변경 기록" tabindex="0">
    <p data-ui-virtual-scrollport-title>최근 변경 기록</p>
    <UIVirtualList
      v-if="scrollport"
      :items="rows"
      :get-i-d="row => row.id"
      :scrollport="scrollport"
      :size-policy="{ kind: 'fixed', extent: 40 }"
    >
      <template #item="{ value }">{{ value.label }}</template>
    </UIVirtualList>
  </section>
</template>
