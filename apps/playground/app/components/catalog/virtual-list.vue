<script setup lang="ts">
import { UIDataActions, UIVirtualList } from "@connextable/ui";
import { ref } from "vue";

const rows = Array.from({ length: 50_000 }, (_, index) => index + 1);
const visible = ref({ first: 1, last: 1, rendered: 0 });
const number = new Intl.NumberFormat("ko-KR");
const changes = ["문서 게시", "담당자 변경", "검토 완료", "일정 등록"];
</script>

<template>
  <UIVirtualList
    :items="rows"
    :get-i-d="id => id"
    :size-policy="{ kind: 'fixed', extent: 42 }"
    :overscan="84"
    aria-label="변경 기록 5만 건"
    @plan-change="plan => {
      const onScreen = plan.placements.filter(item => item.visible)
      if (onScreen.length) visible = { first: Number(onScreen[0]?.id), last: Number(onScreen.at(-1)?.id), rendered: plan.placements.length }
    }"
  >
    <template #item="{ value }">
      <span class="activity-row">
        <span>{{ changes[(value - 1) % changes.length] }}</span>
        <span class="activity-row__number">#{{ number.format(value) }}</span>
      </span>
    </template>
  </UIVirtualList>
  <UIDataActions>
    <output aria-live="off">{{ number.format(visible.first) }}–{{ number.format(visible.last) }}번 ·
      전체 {{ number.format(rows.length) }}건 중 DOM에 {{ visible.rendered }}행</output>
  </UIDataActions>
</template>

<style scoped>
.activity-row {
  display: flex;
  justify-content: space-between;
  gap: var(--ui-space-sm);
}

.activity-row__number {
  color: var(--ui-color-text-muted);
  font-variant-numeric: tabular-nums;
}
</style>
