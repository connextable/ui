<script setup lang="ts">
import { computed, ref } from "vue";
import { CalendarClock } from "@lucide/vue";
import { UIButton, UIDataLabel, UIDataSurface, UIVirtualSpatial } from "@connextable/ui";

const delayed = ref(false);
const tracks = ["정기 백업", "품질 검사", "스테이징 배포", "데이터 검증"];
const jobs = Array.from({ length: 128 }, (_, index) => ({
  id: index + 1, label: tracks[index % 4]!, lane: index % 4,
  start: 10 + Math.floor(index / 4) * 160 + (index % 4) * 16,
  duration: 94 + index % 4 * 12,
}));
const rect = computed(() => {
  const shift = delayed.value ? 88 : 0;
  return (job: typeof jobs[number]) => ({
    x: job.start + (job.lane === 1 ? shift : 0), y: 10 + job.lane * 63,
    width: job.duration, height: 51,
  });
});
</script>

<template>
  <UIDataSurface>
    <template #toolbar>
      <strong>작업 일정</strong>
      <UIButton size="sm" variant="outline" :aria-pressed="delayed" @click="delayed = !delayed">품질 검사 지연 반영</UIButton>
    </template>
    <UIVirtualSpatial :items="jobs" :get-i-d="job => job.id" :get-rect="rect" size-ownership="declared"
      :item-attributes="job => ({ 'data-ui-virtual-current': job.lane === 1 || undefined })"
      data-ui-virtual-layout-motion aria-label="작업 시작 시각과 지속 시간">
      <template #item="{ value }">
        <UIDataLabel :label="value.label">
          <template #icon><CalendarClock aria-hidden="true" /></template>
        </UIDataLabel>
      </template>
    </UIVirtualSpatial>
    <template #footer>
      <output aria-live="polite">{{ delayed ? "품질 검사에 지연을 반영했습니다." : "최초 작업 일정" }}</output>
    </template>
  </UIDataSurface>
</template>
