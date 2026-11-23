<script setup lang="ts">
import { UIButton, UIDataActions, UIVirtualGrid } from "@connextable/ui";

import { ref } from "vue";

const compact = ref(false);
const items = Array.from({ length: 1000 }, (_, index) => ({
  id: `tile-${index}`,
  title: `항목 ${index + 1}`,
}));
</script>

<template>
  <PlaygroundExample v-bind="$attrs as { id: string; title: string }">
    <UIVirtualGrid :style="{ maxInlineSize: compact ? '14rem' : '29rem' }"
      data-ui-virtual-layout-motion
      :items="items"
      :get-i-d="(item: typeof items[number]) => item.id"
      :lane-policy="{ kind: 'responsive', minExtent: 104, maxCount: 4, gap: 8 }"
      :size-policy="{ kind: 'fixed', extent: 44 }"
      :row-gap="8"
      aria-label="가상 그리드"
    >
      <template #item="{ value }">{{ value.title }}</template>
    </UIVirtualGrid>
    <UIDataActions>
      <UIButton size="sm" variant="outline" :aria-pressed="compact" @click="compact = !compact">좁은 너비</UIButton>
    </UIDataActions>
    <template #footer>
      <output>{{ compact ? '좁은 뷰포트' : '넓은 뷰포트' }}</output>
    </template>
  </PlaygroundExample>
</template>
