<script setup lang="ts">
import { UIButton, UIScrollArea } from "@connextable/ui";

const changes = [
  { time: "09:00", title: "정산 보고서 생성", detail: "10월 거래 내역 128건을 포함했습니다." },
  { time: "09:15", title: "초안 공유", detail: "재무팀에 검토 권한을 부여했습니다." },
  { time: "10:20", title: "수수료 확인", detail: "정지우 님이 결제 수수료 3건을 검토했습니다." },
  { time: "11:05", title: "환불 내역 반영", detail: "당일 처리된 환불 2건을 추가했습니다." },
  { time: "11:20", title: "거래 내역 대사", detail: "결제사 정산 내역과 거래별 금액을 비교했습니다." },
  { time: "11:45", title: "운송비 자료 첨부", detail: "물류팀에서 받은 월간 운송비 명세를 연결했습니다." },
  { time: "12:10", title: "환불 사유 확인", detail: "고객지원팀이 차액이 발생한 주문의 처리 내역을 남겼습니다." },
  { time: "13:00", title: "수정본 공유", detail: "환불과 운송비를 반영한 보고서를 다시 공유했습니다." },
  { time: "13:30", title: "보고서 승인", detail: "최종 금액과 세부 내역이 확정됐습니다." },
  { time: "14:00", title: "파일 보관", detail: "보고서와 원본 자료를 보관함으로 옮겼습니다." },
  { time: "14:20", title: "정산 결과 전달", detail: "확정된 보고서의 링크를 회계팀에 전달했습니다." },
  { time: "14:45", title: "다음 마감일 등록", detail: "11월 정산 마감일을 팀 일정에 추가했습니다." },
];
</script>

<template>
  <UIScrollArea label="정산 보고서 변경 기록" class="review-log">
    <template #header>
      <div class="review-log__header"><strong>10월 정산 보고서</strong><span>변경 {{ changes.length }}건</span></div>
    </template>
    <ol class="review-log__list">
      <li v-for="change in changes" :key="change.time">
        <time :datetime="change.time">{{ change.time }}</time>
        <div><strong>{{ change.title }}</strong><p>{{ change.detail }}</p></div>
      </li>
    </ol>
    <template #controls="{ state, viewportId, scrollToEdge }">
      <div class="review-log__controls">
        <span>{{ Math.round(state.y) }} / {{ state.scrollHeight - state.height }} px</span>
        <UIButton size="sm" variant="outline" :aria-controls="viewportId" :disabled="state.atEdge.top"
          @click="scrollToEdge('top', 'smooth')">맨 위로</UIButton>
        <UIButton size="sm" variant="outline" :aria-controls="viewportId" :disabled="state.atEdge.bottom"
          @click="scrollToEdge('bottom', 'smooth')">맨 아래로</UIButton>
      </div>
    </template>
  </UIScrollArea>
</template>

<style scoped>
.review-log { --ui-scroll-area-max-height: clamp(23rem, 53dvh, 34rem); inline-size: 100%; }
.review-log__header { display: flex; flex-wrap: wrap; justify-content: space-between; gap: var(--ui-space-sm); padding: 1rem 1.25rem; border-block-end: 1px solid var(--ui-color-divider); }
.review-log__header span { color: var(--ui-color-text-muted); font-size: var(--ui-font-size-body-sm); }
.review-log__list { margin: 0; padding: 0 var(--ui-space-md); list-style: none; }
.review-log__list li {
  display: grid;
  grid-template-columns: 3.5rem minmax(0, 1fr);
  gap: var(--ui-space-sm);
  padding: 1rem var(--ui-space-sm);
  font-size: var(--ui-font-size-body);
}
.review-log__list li + li { border-block-start: 1px solid var(--ui-color-divider); }
.review-log__list time { color: var(--ui-color-accent); font-variant-numeric: tabular-nums; }
.review-log__list p { margin: var(--ui-space-xs) 0 0; color: var(--ui-color-text-muted); }
.review-log__controls { display: flex; flex-wrap: wrap; align-items: center; gap: var(--ui-space-sm); margin-block-start: var(--ui-space-sm); }
.review-log__controls span { margin-inline-end: auto; color: var(--ui-color-text-muted); font-size: var(--ui-font-size-metadata); }
</style>
