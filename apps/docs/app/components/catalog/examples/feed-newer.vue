<script setup lang="ts">
import { UIButton, UIFeed, UIFeedItem, UIFeedLoadNewer } from "@connextable/ui";
import { ArrowDown, Bell, CircleCheck } from "@lucide/vue";
import { computed, onBeforeUnmount, ref, useId } from "vue";

const prefix = useId();
const notifications = [
  { id: "review", title: "정산 내역 검토 요청", detail: "재무팀이 10월 주문 정산표를 공유했습니다. 수수료 조정 내역을 확인해 주세요.", team: "재무팀", time: "09:20" },
  { id: "access", title: "거래 내역 접근 권한 승인", detail: "고객 지원 팀에서 결제 내역을 조회할 수 있도록 권한이 추가됐습니다.", team: "워크스페이스 관리", time: "09:46" },
  { id: "comments", title: "정산표에 답변이 달렸습니다", detail: "환불 건의 수수료는 다음 달 정산에 반영된다는 답변이 추가됐습니다.", team: "정지우", time: "10:04" },
  { id: "export", title: "검토용 CSV 생성 완료", detail: "10월 주문 128건의 정산 데이터를 내보냈습니다. 검토 기간은 금요일까지입니다.", team: "정산 자동화", time: "10:19" },
];
const visibleCount = ref(2);
const visible = computed(() => notifications.slice(0, visibleCount.value));
const items = computed(() => visible.value.map(({ id }) => id));
const queued = computed(() => notifications.length - visibleCount.value);
const read = ref(new Set(["review"]));
const unread = computed(() => visible.value.filter(({ id }) => !read.value.has(id)).length);
const getPosition = (id: string) => notifications.findIndex((entry) => entry.id === id) + 1;
const revision = ref(0);
const requestGeneration = ref(0);
const status = ref("");
let timer: ReturnType<typeof setTimeout> | undefined;

function loadNotifications(direction: "before" | "after", _anchor: string | null, fromRevision: number, generation: number) {
  const settle = () => {
    requestGeneration.value = generation;
    revision.value = fromRevision + 1;
  };

  if (direction !== "after" || queued.value === 0) {
    settle();
    return;
  }

  const count = queued.value;
  status.value = "새 알림을 불러오는 중입니다.";
  timer = setTimeout(() => {
    visibleCount.value += count;
    status.value = `새 알림 ${count}개를 추가했습니다.`;
    settle();
  }, 500);
}

function toggleRead(id: string) {
  if (read.value.has(id)) read.value.delete(id);
  else read.value.add(id);
}

onBeforeUnmount(() => clearTimeout(timer));
</script>

<template>
  <PlaygroundExample v-bind="$attrs as { id: string; title: string }">
    <div class="feed-demo">
      <header class="feed-demo__header">
        <strong>정산팀 받은편지함</strong>
        <span class="feed-demo__meta">읽지 않은 알림 {{ unread }}개</span>
      </header>
      <UIFeed
        v-slot="{ pending }" :items="items" :revision="revision" :request-generation="requestGeneration"
        :set-size="notifications.length" :get-position="getPosition" label="정산 알림"
        class="feed-demo__list" @request-window="loadNotifications"
      >
        <UIFeedItem
          v-for="notice in visible" :key="notice.id" :value="notice.id"
          :aria-labelledby="`${prefix}-${notice.id}`" class="feed-demo__entry feed-demo__entry--with-icon"
        >
          <span class="feed-demo__icon"><Bell :size="17" aria-hidden="true" /></span>
          <div class="feed-demo__body">
            <div class="feed-demo__row">
              <h4 :id="`${prefix}-${notice.id}`" class="feed-demo__title">{{ notice.title }}</h4>
              <span v-if="!read.has(notice.id)" class="feed-demo__badge">안 읽음</span>
            </div>
            <p>{{ notice.detail }}</p>
            <div class="feed-demo__row">
              <span class="feed-demo__meta"><strong>{{ notice.team }}</strong> <time :datetime="notice.time">{{ notice.time }}</time></span>
              <UIButton
                variant="ghost" size="sm" :aria-label="`${notice.title} ${read.has(notice.id) ? '안 읽음으로 표시' : '읽음 처리'}`"
                @click.stop="toggleRead(notice.id)"
              >
                <template v-if="!read.has(notice.id)" #leading><CircleCheck /></template>
                {{ read.has(notice.id) ? "안 읽음으로 표시" : "읽음 처리" }}
              </UIButton>
            </div>
          </div>
        </UIFeedItem>
        <UIFeedLoadNewer v-if="queued > 0" as-child>
          <UIButton variant="outline" size="sm">
            <template #leading><ArrowDown /></template>
            {{ pending === "after" ? "새 알림 불러오는 중…" : `새 알림 ${queued}개 불러오기` }}
          </UIButton>
        </UIFeedLoadNewer>
      </UIFeed>
    </div>
    <template #footer>
      <output class="feed-demo__status">{{ status }}</output>
    </template>
  </PlaygroundExample>
</template>

<style src="../feed-demo.css"></style>
