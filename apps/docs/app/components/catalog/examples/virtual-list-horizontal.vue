<script setup lang="ts">
import {
  UIVirtualList,
} from "@connextable/ui";

const rows = Array.from({ length: 1000 }, (_, index) => ({
  id: index + 1,
  title: `월별 기록 #${index + 1}`,
}));
</script>

<template>
  <UIVirtualList axis="horizontal" style="--ui-virtual-height: 5rem"
    :items="rows"
    :get-i-d="(row: typeof rows[number]) => row.id"
    :size-policy="{ kind: 'fixed', extent: 140 }"
    aria-label="가로로 이어지는 변경 기록"
  >
    <template #item="{ value: row }">{{ row.title }}</template>
  </UIVirtualList>
</template>
