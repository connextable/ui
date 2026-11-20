<script setup lang="ts">
import { onScopeDispose, ref, shallowRef, useTemplateRef } from "vue";
import { UIButton, UIDataActions, UIVirtualList } from "@connextable/ui";

const batchSize = 40;
const total = 480;
const list = useTemplateRef("list");
const entries = shallowRef(Array.from({ length: batchSize }, (_, index) => index + 1));
const loading = ref(false);
let timer: ReturnType<typeof setTimeout> | undefined;

function loadAfter(lastVisible: number) {
  if (loading.value || entries.value.length >= total || lastVisible < entries.value.length - 3) return;
  loading.value = true;
  timer = setTimeout(() => {
    const offset = entries.value.length;
    const count = Math.min(batchSize, total - offset);
    entries.value = [...entries.value, ...Array.from({ length: count }, (_, index) => offset + index + 1)];
    loading.value = false;
  }, 450);
}

onScopeDispose(() => clearTimeout(timer));
</script>

<template>
  <UIVirtualList
    ref="list"
    :items="entries"
    :get-i-d="id => id"
    :size-policy="{ kind: 'fixed', extent: 40 }"
    :aria-busy="loading"
    aria-label="배치로 불러오는 처리 기록"
    @plan-change="plan => {
      const last = plan.placements.findLast(item => item.visible)
      if (last) loadAfter(Number(last.id))
    }"
  >
    <template #item="{ value }">처리 기록 #{{ value }}</template>
  </UIVirtualList>
  <UIDataActions>
    <output aria-live="polite">{{ loading ? '다음 기록을 불러오는 중' : `${entries.length} / ${total}건 불러옴` }}</output>
    <UIButton size="sm" variant="outline" :loading="loading"
      @click="list?.scrollToID(entries.length, 'end')">불러온 끝으로 이동</UIButton>
  </UIDataActions>
</template>
