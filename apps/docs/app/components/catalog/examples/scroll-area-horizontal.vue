<script setup lang="ts">
import { UIButton, UIDataStatus, UIScrollArea } from "@connextable/ui";

const reservations = [
  { day: "월", date: "23", time: "10:00", title: "시안 리뷰", room: "회의실 A" },
  { day: "화", date: "24", time: "14:00", title: "촬영 준비", room: "스튜디오" },
  { day: "수", date: "25", time: "11:30", title: "사용성 테스트", room: "회의실 B" },
  { day: "목", date: "26", time: "13:00", title: "제작물 검토", room: "스튜디오" },
  { day: "금", date: "27", time: "10:30", title: "다음 주 일정", room: "회의실 A" },
  { day: "토", date: "28", time: "11:00", title: "신제품 사진 촬영", room: "스튜디오" },
  { day: "일", date: "29", time: "10:00", title: "장비 정리 및 검수", room: "스튜디오" },
  { day: "월", date: "30", time: "15:00", title: "월간 성과 공유", room: "회의실 B" },
];
</script>

<template>
  <UIScrollArea label="회의실 예약 일정" axis="horizontal" scrollbar="hidden" :fade="['left', 'right']" class="reservation-scroll">
    <ul class="reservation-scroll__list">
      <li v-for="item in reservations" :key="item.date">
        <div><time :datetime="`2026-11-${item.date}`">{{ item.date }}일 {{ item.day }}요일</time><span>{{ item.time }}</span></div>
        <strong>{{ item.title }}</strong>
        <UIDataStatus tone="accent">{{ item.room }}</UIDataStatus>
      </li>
    </ul>
    <template #controls="{ state, viewportId, scrollBy }">
      <div class="reservation-scroll__actions">
        <UIButton size="sm" variant="outline" :aria-controls="viewportId" :disabled="state.atEdge.left"
          @click="scrollBy({ left: -state.width, behavior: 'smooth' })">앞 일정</UIButton>
        <UIButton size="sm" variant="outline" :aria-controls="viewportId" :disabled="state.atEdge.right"
          @click="scrollBy({ left: state.width, behavior: 'smooth' })">뒤 일정</UIButton>
      </div>
    </template>
  </UIScrollArea>
</template>

<style scoped>
.reservation-scroll { --ui-scroll-fade-size: 1.5rem; inline-size: 100%; }
.reservation-scroll__list { display: flex; gap: var(--ui-space-md); margin: 0; padding: var(--ui-space-md); list-style: none; }
.reservation-scroll__list li {
  display: grid;
  justify-items: start;
  gap: var(--ui-space-sm);
  box-sizing: border-box;
  flex: none;
  align-content: space-between;
  inline-size: 14rem;
  min-block-size: 9rem;
  padding: 1rem;
  border: 1px solid var(--ui-color-border);
  border-radius: var(--ui-radius-md);
}
.reservation-scroll__list li div { display: flex; gap: var(--ui-space-sm); color: var(--ui-color-text-muted); font-size: var(--ui-font-size-metadata); }
.reservation-scroll__actions { display: flex; justify-content: end; gap: var(--ui-space-sm); margin-block-start: var(--ui-space-sm); }
</style>
