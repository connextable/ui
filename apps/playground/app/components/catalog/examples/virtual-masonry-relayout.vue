<script setup lang="ts">
import { UIButton, UIDataActions, UIVirtualMasonry } from "@connextable/ui";
import { ref } from "vue";

const compact = ref(false);
const cards = Array.from({ length: 200 }, (_, index) => ({
  id: index + 1,
  lines: 1 + (index % 3),
}));
</script>

<template>
  <PlaygroundExample v-bind="$attrs as { id: string; title: string }">
    <div>
      <UIVirtualMasonry
        data-ui-virtual-layout-motion
        :style="{ inlineSize: compact ? 'min(100%, 15rem)' : 'min(100%, 31rem)' }"
        :items="cards"
        :get-i-d="card => card.id"
        :initial-viewport="{ x: 0, y: 0, width: 360, height: 272 }"
        :lane-policy="{ kind: 'responsive', minExtent: 104, maxCount: 4, gap: 8 }"
        :size-policy="{ kind: 'estimated', estimate: card => 36 + card.lines * 20 }"
        :item-gap="8"
        aria-label="반응형 메모 카드"
      >
        <template #item="{ value }">
          <article>
            <strong>메모 {{ value.id }}</strong>
            <div v-for="line in value.lines" :key="line">본문 {{ line }}</div>
          </article>
        </template>
      </UIVirtualMasonry>
      <UIDataActions>
        <UIButton size="sm" variant="outline" :aria-pressed="compact" @click="compact = !compact">좁은 너비</UIButton>
      </UIDataActions>
    </div>
    <template #footer>
      <output>{{ compact ? "좁은 뷰포트" : "넓은 뷰포트" }}</output>
    </template>
  </PlaygroundExample>
</template>
