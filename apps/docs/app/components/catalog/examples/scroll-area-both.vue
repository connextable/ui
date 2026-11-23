<script setup lang="ts">
import { UIButton, UIScrollArea } from "@connextable/ui";
import { computed, useTemplateRef } from "vue";

const corner = useTemplateRef("corner");
const sticky = computed(() => [corner.value]);

const rooms = ["회의실 A", "회의실 B", "회의실 C", "스튜디오", "편집실", "프로젝트룸", "세미나실", "라운지"];
const times = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"];
const bookings = ["주간 회의", "시안 리뷰", "인터뷰", "자료 촬영", "편집 점검", "협력사 미팅", "제품 교육", "운영 회고"];

function getBooking(timeIndex: number, roomIndex: number) {
  return (timeIndex + roomIndex * 2) % 5 < 2 ? bookings[(timeIndex * 2 + roomIndex) % bookings.length] : undefined;
}
</script>

<template>
  <UIScrollArea axis="both" scrollbar="native" fade :sticky="sticky" label="공간별 예약표" class="room-board">
    <table>
      <thead>
        <tr><th ref="corner" scope="col">시간</th><th v-for="room in rooms" :key="room" scope="col">{{ room }}</th></tr>
      </thead>
      <tbody>
        <tr v-for="(time, timeIndex) in times" :key="time">
          <th scope="row">{{ time }}</th>
          <td v-for="(room, roomIndex) in rooms" :key="room" :data-booked="Boolean(getBooking(timeIndex, roomIndex)) || undefined">
            {{ getBooking(timeIndex, roomIndex) ?? '예약 가능' }}
          </td>
        </tr>
      </tbody>
    </table>
    <template #controls="{ state, viewportId, scrollBy }">
      <div class="room-board__actions">
        <UIButton variant="outline" size="sm" :aria-controls="viewportId" :disabled="state.atEdge.left" @click="scrollBy({ left: -state.width, behavior: 'smooth' })">왼쪽 공간</UIButton>
        <UIButton variant="outline" size="sm" :aria-controls="viewportId" :disabled="state.atEdge.right" @click="scrollBy({ left: state.width, behavior: 'smooth' })">오른쪽 공간</UIButton>
        <UIButton variant="outline" size="sm" :aria-controls="viewportId" :disabled="state.atEdge.top" @click="scrollBy({ top: -state.height, behavior: 'smooth' })">이른 시간</UIButton>
        <UIButton variant="outline" size="sm" :aria-controls="viewportId" :disabled="state.atEdge.bottom" @click="scrollBy({ top: state.height, behavior: 'smooth' })">늦은 시간</UIButton>
      </div>
    </template>
  </UIScrollArea>
</template>

<style scoped>
.room-board { --ui-scroll-area-max-height: clamp(23rem, 53dvh, 32rem); inline-size: 100%; }
.room-board table {
  isolation: isolate;
  min-inline-size: 100%;
  border-collapse: separate;
  border-spacing: 0;
  white-space: nowrap;
}
.room-board :is(th, td) { padding: clamp(0.65rem, 1.6vw, 0.95rem) clamp(0.625rem, 2vw, 1rem); text-align: start; }
.room-board tr > :not(:last-child) { border-inline-end: 1px solid var(--ui-color-divider); }
.room-board :is(thead tr, tbody tr:not(:last-child)) > * { border-block-end: 1px solid var(--ui-color-divider); }
.room-board td { min-inline-size: 8rem; color: var(--ui-color-text-muted); }
.room-board th { background: var(--ui-color-surface-readonly); }
.room-board th:first-child {
  position: sticky;
  inset-inline-start: 0;
  z-index: 1;
}
.room-board thead th {
  position: sticky;
  inset-block-start: 0;
  z-index: 2;
}
.room-board thead th:first-child { z-index: 3; }
.room-board [data-booked] { background: var(--ui-color-accent-soft); color: var(--ui-color-accent); }
.room-board__actions { display: flex; flex-wrap: wrap; justify-content: end; gap: var(--ui-space-sm); margin-block-start: var(--ui-space-sm); }
</style>
