<script setup lang="ts">
import { onScopeDispose, shallowRef, useTemplateRef } from "vue";
import { UIButton, UIDataLabel, UIDataSurface, UISpinner, UIVirtualList } from "@connextable/ui";

const total = 10_000;
const pageSize = 50;
const ids = Array.from({ length: total }, (_, index) => index + 1);
const cache = shallowRef(new Map<number, string>());
const pending = new Map<number, ReturnType<typeof setTimeout>>();
const list = useTemplateRef("list");
const services = ["검색 요청", "문서 게시", "파일 변환", "알림 발송"];

function loadRange(visibleIDs: readonly number[]) {
  const pages = new Set(visibleIDs.map(id => Math.floor((id - 1) / pageSize)));
  for (const page of pages) {
    const start = page * pageSize + 1;
    if (pending.has(page) || cache.value.has(start)) continue;
    pending.set(page, setTimeout(() => {
      const next = new Map(cache.value);
      for (let id = start; id < start + pageSize; id++) next.set(id, services[id % services.length]!);
      cache.value = next;
      pending.delete(page);
    }, 520));
  }
}

onScopeDispose(() => pending.forEach(timer => clearTimeout(timer)));
</script>

<template>
  <UIDataSurface>
    <template #toolbar>
      <output>가상 소스 · 10,000건</output>
      <UIButton size="sm" variant="outline" @click="list?.scrollToID(9001, 'start')">9,001번으로 이동</UIButton>
    </template>
    <UIVirtualList ref="list" :items="ids" :get-i-d="id => id" :size-policy="{ kind: 'fixed', extent: 46 }"
      aria-label="범위별로 받아 오는 서비스 기록"
      @plan-change="plan => loadRange(plan.placements.filter(item => item.visible).map(item => Number(item.id)))">
      <template #item="{ value }">
        <UIDataLabel v-if="cache.has(value)" :label="`#${value} · ${cache.get(value)}`" />
        <template v-else><UISpinner /> <span>#{{ value }} · 불러오는 중</span></template>
      </template>
    </UIVirtualList>
    <template #footer><output>{{ cache.size }}건을 받아 두었습니다.</output></template>
  </UIDataSurface>
</template>
