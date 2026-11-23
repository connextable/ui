<script setup lang="ts">
import { ChevronDown } from "@lucide/vue";
import { UIButton, UIVirtualMasonry } from "@connextable/ui";
import { ref } from "vue";

const expanded = ref<number>();
const notes = Array.from({ length: 60 }, (_, index) => ({
  id: index + 1,
  title: ["탐색 키보드 점검", "시안 비교", "색상 대비 측정", "테스트 기기 기록"][index % 4],
}));
</script>

<template>
  <PlaygroundExample v-bind="$attrs as { id: string; title: string }">
    <UIVirtualMasonry
      :items="notes"
      :get-i-d="note => note.id"
      :initial-viewport="{ x: 0, y: 0, width: 400, height: 288 }"
      :lane-policy="{ kind: 'responsive', minExtent: 128, maxCount: 3, gap: 8 }"
      :size-policy="{ kind: 'measured' }"
      :item-gap="8"
      data-ui-virtual-layout-motion
      aria-label="검토 메모"
    >
      <template #item="{ value: note }">
        <UIButton variant="ghost" size="sm" :aria-expanded="expanded === note.id"
          @click="expanded = expanded === note.id ? undefined : note.id">
          {{ note.title }} #{{ note.id }}
          <template #trailing><ChevronDown /></template>
        </UIButton>
        <p v-if="expanded === note.id">기록을 펼치면 본문 높이를 다시 측정하고, 같은 열의 아래 카드가 밀려납니다.</p>
      </template>
    </UIVirtualMasonry>
    <template #footer>
      <output aria-live="polite">{{ expanded ? `메모 ${expanded}번 열림` : '열린 메모 없음' }}</output>
    </template>
  </PlaygroundExample>
</template>
