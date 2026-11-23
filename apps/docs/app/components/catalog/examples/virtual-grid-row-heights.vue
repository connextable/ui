<script setup lang="ts">
import { UIVirtualGrid } from "@connextable/ui";

const tiles = Array.from({ length: 200 }, (_, index) => ({
  id: index + 1,
  extra: index % 6 === 2,
}));
</script>

<template>
  <UIVirtualGrid
    :items="tiles"
    :get-i-d="tile => tile.id"
    :lane-policy="{ kind: 'fixed', count: 3, gap: 8 }"
    :size-policy="{ kind: 'measured' }"
    :initial-viewport="{ x: 0, y: 0, width: 360, height: 272 }"
    :row-gap="8"
    aria-label="높이가 다른 사진 메모"
  >
    <template #item="{ value }">
      <div>
        사진 {{ value.id }}
        <div v-if="value.extra">설명과 촬영 메모가 있는 사진</div>
      </div>
    </template>
  </UIVirtualGrid>
</template>
