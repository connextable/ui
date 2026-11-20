<script setup lang="ts">
import {
  UIVirtualMasonry,
} from "@connextable/ui";

const cards = Array.from({ length: 1000 }, (_, index) => ({
  id: `노트 ${index + 1}`,
  lines: 1 + (index % 5),
}))
</script>

<template>
  <UIVirtualMasonry
    :items="cards"
    :get-i-d="(card: typeof cards[number]) => card.id"
    :initial-viewport="{ x: 0, y: 0, width: 360, height: 272 }"
    :lane-policy="{ kind: 'responsive', minExtent: 104, maxCount: 4, gap: 8 }"
    :size-policy="{ kind: 'estimated', estimate: card => 44 + card.lines * 21 }"
    :item-gap="8"
    aria-label="가상 메이슨리"
  >
    <template #item="{ value: card }">
      <article>
        <strong>{{ card.id }}</strong>
        <div v-for="lineIndex in card.lines" :key="lineIndex">본문 {{ lineIndex }}</div>
      </article>
    </template>
  </UIVirtualMasonry>
</template>
