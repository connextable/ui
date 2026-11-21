<script setup lang="ts">
import { UIButton, UICheckbox, UIDataStatus, UIScrollArea } from "@connextable/ui";
import { computed, ref } from "vue";

const requests = [
  "11월 정산 보고서", "연말 배송 일정", "반품 처리 안내", "신제품 촬영 일정", "홈페이지 배너 시안",
  "거래처 계약 갱신", "결제 오류 안내", "예약 화면 개선안", "고객지원 답변 양식", "개인정보 처리 안내",
  "내부 접근 권한 점검", "문서 보관 정책", "장비 구매 요청", "품질 검사 기록", "파트너용 제품 가이드",
].map((title, index) => ({ title, ready: index % 3 !== 1 }));
const filterOpen = ref(false);
const summaryOpen = ref(false);
const readyOnly = ref(false);
const selected = ref<string[]>([]);
const visible = computed(() => readyOnly.value ? requests.filter(request => request.ready) : requests);

function toggle(title: string, checked: boolean) {
  selected.value = checked ? [...selected.value, title] : selected.value.filter(item => item !== title);
}
</script>

<template>
  <UIScrollArea label="검토 요청 목록" fade class="review-queue">
    <template #header="{ viewportId }">
      <div class="review-queue__header">
        <div class="review-queue__bar">
          <strong>받은 검토 요청 · {{ visible.length }}건</strong>
          <UIButton variant="outline" size="sm" :aria-expanded="filterOpen" :aria-controls="`${viewportId}-filters`"
            @click="filterOpen = !filterOpen">{{ filterOpen ? '필터 접기' : '필터 펼치기' }}</UIButton>
        </div>
        <div v-show="filterOpen" :id="`${viewportId}-filters`" class="review-queue__details">
          <UICheckbox label="승인 대기만 보기" :model-value="readyOnly" @update:model-value="readyOnly = $event === true" />
        </div>
      </div>
    </template>

    <ul class="review-queue__list">
      <li v-for="request in visible" :key="request.title">
        <UICheckbox :label="request.title" :model-value="selected.includes(request.title)"
          @update:model-value="toggle(request.title, $event === true)" />
        <UIDataStatus :tone="request.ready ? 'accent' : 'neutral'">{{ request.ready ? '승인 대기' : '검토 중' }}</UIDataStatus>
      </li>
    </ul>

    <template #footer="{ viewportId }">
      <div class="review-queue__footer">
        <div class="review-queue__bar">
          <span role="status">{{ selected.length }}건 선택</span>
          <UIButton variant="outline" size="sm" :aria-expanded="summaryOpen" :aria-controls="`${viewportId}-summary`"
            @click="summaryOpen = !summaryOpen">{{ summaryOpen ? '요약 접기' : '요약 펼치기' }}</UIButton>
        </div>
        <div v-show="summaryOpen" :id="`${viewportId}-summary`" class="review-queue__details">
          <p>{{ selected.length ? selected.slice(0, 3).join(' · ') : '목록에서 검토 요청을 선택하세요.' }}</p>
          <p v-if="selected.length > 3">외 {{ selected.length - 3 }}건</p>
        </div>
      </div>
    </template>
  </UIScrollArea>
</template>

<style scoped>
.review-queue { --ui-scroll-area-max-height: clamp(25rem, 56dvh, 35rem); inline-size: 100%; }
.review-queue__header, .review-queue__footer { padding: var(--ui-space-sm) var(--ui-space-md); }
.review-queue__header { border-block-end: 1px solid var(--ui-color-divider); }
.review-queue__footer { border-block-start: 1px solid var(--ui-color-divider); }
.review-queue__bar, .review-queue__list li { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: var(--ui-space-xs) var(--ui-space-md); }
.review-queue__details { color: var(--ui-color-text-muted); font-size: var(--ui-font-size-body-sm); }
.review-queue__details p { margin: var(--ui-space-sm) 0; }
.review-queue__list { margin: 0; padding: 0 var(--ui-space-md); list-style: none; }
.review-queue__list li { min-block-size: 3.5rem; padding: var(--ui-space-xs) var(--ui-space-sm); }
.review-queue__list li + li { border-block-start: 1px solid var(--ui-color-divider); }
</style>
