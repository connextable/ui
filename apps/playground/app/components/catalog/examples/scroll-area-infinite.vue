<script setup lang="ts">
import { computed, ref, useTemplateRef } from "vue";
import { UIButton, UIScrollFade, UISwitch, useInfiniteScroll, useScrollArea } from "@connextable/ui";

const actions = [
  { title: "검토 요청", detail: "초안을 공유하고 의견을 요청했습니다." },
  { title: "일정 변경", detail: "다음 점검 시간을 팀 일정에 반영했습니다." },
  { title: "자료 첨부", detail: "검토할 자료를 작업 기록에 연결했습니다." },
  { title: "검토 완료", detail: "수정 사항을 확인하고 검토를 완료했습니다." },
  { title: "작업 배정", detail: "후속 작업을 담당자에게 배정했습니다." },
  { title: "회의 기록", detail: "논의한 안건과 결정 사항을 추가했습니다." },
];
const projects = ["11월 정산", "신제품 촬영", "예약 화면 개선", "디자인 시스템", "물류 운영", "고객 지원"];
const people = ["정지우", "이서준", "김민지", "박다현", "최유진"];
const formatter = new Intl.DateTimeFormat("ko-KR", { dateStyle: "short", timeStyle: "short", timeZone: "Asia/Seoul" });
const pageSize = 24;
const history = Array.from({ length: 240 }, (_, index) => {
  const action = actions[index % actions.length]!;
  const project = projects[Math.floor(index / actions.length) % projects.length]!;
  const person = people[index % people.length]!;
  const time = new Date(Date.UTC(2026, 10, 22, 7) - index * 37 * 60_000);
  return { ...action, project, person, time: time.toISOString(), date: formatter.format(time) };
});
const displayed = ref(pageSize);
const auto = ref(true);
const failNext = ref(false);
const hasMore = computed(() => displayed.value < history.length);
const viewport = useTemplateRef("viewport");
const content = useTemplateRef("content");
const scroll = useScrollArea(() => viewport.value?.element, { content });
const { state } = scroll;
const { loading, failure, canLoadMore, loadMore } = useInfiniteScroll(scroll, {
  auto, hasMore, distance: 24,
  async loadMore({ signal }) {
    await new Promise<void>((resolve) => {
      const timer = setTimeout(() => { signal.removeEventListener("abort", abort); resolve(); }, 350);
      function abort() { clearTimeout(timer); resolve(); }
      signal.addEventListener("abort", abort, { once: true });
    });
    if (signal.aborted) return;
    if (failNext.value) {
      failNext.value = false;
      throw new Error("활동 내역을 불러오지 못했습니다.");
    }
    displayed.value = Math.min(displayed.value + pageSize, history.length);
  },
});
</script>

<template>
  <div class="activity-scroll">
    <div class="activity-scroll__tools">
      <UISwitch variant="outline" v-model="auto" size="sm" label="자동으로 더 불러오기" />
      <UIButton size="sm" variant="ghost" :disabled="!hasMore || loading || failNext" @click="failNext = true">
        다음 요청 실패시키기
      </UIButton>
    </div>
    <div class="activity-scroll__frame">
      <UIScrollFade ref="viewport" class="activity-scroll__viewport ui-scrollbar" role="region"
        aria-label="최근 활동" tabindex="0" :aria-busy="loading" :state="state" :edges="['bottom']">
        <ul ref="content">
          <li v-for="entry in history.slice(0, displayed)" :key="entry.time">
            <div><strong>{{ entry.project }} · {{ entry.title }}</strong><time :datetime="entry.time">{{ entry.date }}</time></div>
            <p>{{ entry.person }} 님이 {{ entry.detail }}</p>
          </li>
        </ul>
      </UIScrollFade>
    </div>
    <div class="activity-scroll__actions">
      <span role="status">{{ loading ? '불러오는 중' : failure ? '불러오지 못했습니다.' : hasMore ? `${history.length}건 중 ${displayed}건 표시 중` : `전체 ${displayed}건 표시됨` }}</span>
      <UIButton size="sm" variant="outline" :loading="loading" :aria-disabled="!canLoadMore" @click="loadMore()">
        {{ failure ? '다시 시도' : '이전 활동 불러오기' }}
      </UIButton>
    </div>
  </div>
</template>

<style scoped>
.activity-scroll { inline-size: 100%; }
.activity-scroll__frame { position: relative; overflow: clip; border: 1px solid var(--ui-color-border); border-radius: var(--ui-radius-lg); }
.activity-scroll__viewport { max-block-size: clamp(23rem, 53dvh, 34rem); overflow: auto; border-radius: calc(var(--ui-radius-lg) - 1px); }
.activity-scroll__viewport:focus-visible { outline: none; }
.activity-scroll__frame:has(> .activity-scroll__viewport:focus-visible) {
  outline: var(--ui-focus-ring-width) solid var(--ui-color-focus);
  outline-offset: var(--ui-focus-ring-offset);
}
.activity-scroll__viewport ul { margin: 0; padding: 0 var(--ui-space-md); list-style: none; }
.activity-scroll__viewport li { padding: 1rem var(--ui-space-sm); font-size: var(--ui-font-size-body); }
.activity-scroll__viewport li + li { border-block-start: 1px solid var(--ui-color-divider); }
.activity-scroll__viewport li div { display: flex; flex-wrap: wrap; justify-content: space-between; gap: var(--ui-space-xs) var(--ui-space-md); }
.activity-scroll__viewport time, .activity-scroll__viewport li p { color: var(--ui-color-text-muted); font-size: var(--ui-font-size-body-sm); }
.activity-scroll__viewport li p { margin: var(--ui-space-xs) 0 0; }
.activity-scroll__tools, .activity-scroll__actions { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: var(--ui-space-sm); }
.activity-scroll__tools { margin-block-end: var(--ui-space-sm); }
.activity-scroll__actions { margin-block-start: var(--ui-space-sm); color: var(--ui-color-text-muted); font-size: var(--ui-font-size-metadata); }
.activity-scroll__actions button[aria-disabled="true"]:not([data-loading]) { color: var(--ui-color-disabled); cursor: default; }
</style>
