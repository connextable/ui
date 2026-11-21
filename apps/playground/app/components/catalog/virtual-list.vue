<script setup lang="ts">
import { UIDataLabel, UIDataSurface, UIVirtualList } from "@connextable/ui";
import { Bell, CalendarPlus, FileCheck, UserRound } from "@lucide/vue";
import { ref } from "vue";

const rows = Array.from({ length: 50_000 }, (_, index) => index + 1);
const visible = ref({ first: 1, last: 1, rendered: 0 });
const number = new Intl.NumberFormat("ko-KR");
const changes = [
  { title: "문서 게시", icon: Bell },
  { title: "담당자 변경", icon: UserRound },
  { title: "검토 완료", icon: FileCheck },
  { title: "일정 등록", icon: CalendarPlus },
];
</script>

<template>
  <UIDataSurface>
    <template #toolbar><strong>변경 기록</strong><output>{{ number.format(rows.length) }}건</output></template>
    <UIVirtualList
      :items="rows"
      :get-i-d="id => id"
      :size-policy="{ kind: 'fixed', extent: 48 }"
      :overscan="84"
      role="region"
      tabindex="0"
      aria-label="변경 기록 5만 건"
      @plan-change="plan => {
        const onScreen = plan.placements.filter(item => item.visible)
        if (onScreen.length) visible = { first: Number(onScreen[0]?.id), last: Number(onScreen.at(-1)?.id), rendered: plan.placements.length }
      }"
    >
      <template #item="{ value }">
        <span class="activity-row">
          <UIDataLabel :label="changes[(value - 1) % changes.length]!.title">
            <template #icon><component :is="changes[(value - 1) % changes.length]!.icon" :size="15" aria-hidden="true" /></template>
          </UIDataLabel>
          <span class="activity-row__number">#{{ number.format(value) }}</span>
        </span>
      </template>
    </UIVirtualList>
    <template #footer>
      <output>{{ number.format(visible.first) }}–{{ number.format(visible.last) }}번 표시 · DOM {{ visible.rendered }}행</output>
    </template>
  </UIDataSurface>
</template>

<style scoped>
.activity-row {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  gap: var(--ui-space-sm);
}

.activity-row__number {
  color: var(--ui-color-text-muted);
  font-variant-numeric: tabular-nums;
}
</style>
