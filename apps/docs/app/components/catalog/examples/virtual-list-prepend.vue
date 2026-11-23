<script setup lang="ts">
import { UIButton, UIDataActions, UIVirtualList } from "@connextable/ui";
import { computed, ref } from "vue";

const olderCount = ref(0);
const rows = computed(() => Array.from({ length: 120 + olderCount.value }, (_, index) => 101 - olderCount.value + index));
const firstVisible = ref<string | number>();
</script>

<template>
  <PlaygroundExample v-bind="$attrs as { id: string; title: string }">
    <div>
      <UIVirtualList
        :items="rows"
        :get-i-d="id => id"
        :size-policy="{ kind: 'fixed', extent: 40 }"
        aria-label="시간순 변경 기록"
        @plan-change="plan => firstVisible = plan.placements.find(item => item.visible)?.id"
      >
        <template #item="{ value }">변경 기록 {{ value }}</template>
      </UIVirtualList>
      <UIDataActions>
        <UIButton size="sm" variant="outline" :disabled="olderCount === 100" @click="olderCount += 10">
          이전 기록 10개 추가
        </UIButton>
      </UIDataActions>
    </div>
    <template #footer>
      <output aria-live="off">화면 첫 항목 {{ firstVisible ?? "준비 중" }}, 앞에서 추가한 기록 {{ olderCount }}개</output>
    </template>
  </PlaygroundExample>
</template>
