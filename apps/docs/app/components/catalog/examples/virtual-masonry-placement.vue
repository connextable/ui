<script setup lang="ts">
import { UIButton, UIDataActions, UIVirtualMasonry } from "@connextable/ui";
import { ref } from "vue";

const sequential = ref(false);
const notes = Array.from({ length: 120 }, (_, index) => ({
  id: index + 1,
  lines: [4, 1, 2, 4, 1][index % 5]!,
}));
</script>

<template>
  <PlaygroundExample v-bind="$attrs as { id: string; title: string }">
    <div>
      <UIVirtualMasonry
        data-ui-virtual-layout-motion
        :items="notes"
        :get-i-d="note => note.id"
        :initial-viewport="{ x: 0, y: 0, width: 360, height: 272 }"
        :lane-policy="{ kind: 'fixed', count: 2, gap: 8 }"
        :size-policy="{ kind: 'estimated', estimate: note => 36 + note.lines * 20 }"
        :placement-policy="sequential ? 'round-robin' : 'shortest'"
        :item-gap="8"
        aria-label="메모 카드"
      >
        <template #item="{ value }">
          <article>
            <strong>메모 {{ value.id }}</strong>
            <div v-for="line in value.lines" :key="line">본문 {{ line }}</div>
          </article>
        </template>
      </UIVirtualMasonry>
      <UIDataActions>
        <UIButton size="sm" variant="outline" :aria-pressed="sequential" @click="sequential = !sequential">
          열을 번갈아 사용
        </UIButton>
      </UIDataActions>
    </div>
    <template #footer>
      <output>{{ sequential ? '열을 번갈아 사용' : '가장 짧은 열부터 사용' }}</output>
    </template>
  </PlaygroundExample>
</template>
