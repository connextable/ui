<script setup lang="ts">
import { UIButton, UIFeed, UIFeedItem } from "@connextable/ui";
import { MessageSquare } from "@lucide/vue";
import { computed, onBeforeUnmount, ref, useId } from "vue";

const prefix = useId();
const comments = ref([
  { id: "mobile", title: "모바일 동작 확인", author: "김민아", time: "15:40", message: "실패한 결제를 같은 주문에서 재시도하면 결제 버튼이 다시 활성화되고 새 주문은 생성되지 않습니다." },
  { id: "alerts", title: "결제 승인 오류 모니터링", author: "이도현", time: "15:22", message: "배포 후 30분 동안 승인 실패율과 중복 결제 경보를 확인하겠습니다. 이상이 있으면 이 스레드에 남길게요." },
  { id: "rollout", title: "단계적 적용 시작", author: "박유진", time: "15:06", message: "내부 테스트 계정으로 먼저 확인하고, 검증이 끝나면 전체 주문에 변경을 적용하겠습니다." },
]);
const incoming = { id: "confirmed", title: "전체 적용 전 확인 완료", author: "정지우", time: "15:48", message: "테스트 주문에서 승인부터 주문 확정까지 확인했습니다. 결제 승인 오류 경보도 정상 범위입니다." };
const items = computed(() => comments.value.map(({ id }) => id));
const getPosition = (id: string) => items.value.indexOf(id) + 1;
const revision = ref(0);
const requestGeneration = ref<number>();
const receiving = ref(false);
const received = ref(false);
const status = ref("");
let timer: ReturnType<typeof setTimeout> | undefined;

function simulateIncomingComment() {
  receiving.value = true;
  status.value = "새 댓글이 곧 도착합니다. 지금 읽을 댓글을 선택해 보세요.";
  timer = setTimeout(() => {
    comments.value = [incoming, ...comments.value];
    requestGeneration.value = undefined;
    revision.value++;
    receiving.value = false;
    received.value = true;
    status.value = "새 댓글 1개가 맨 위에 추가됐습니다.";
  }, 3000);
}

function settleBoundary(_direction: "before" | "after", _anchor: string | null, fromRevision: number, generation: number) {
  requestGeneration.value = generation;
  revision.value = fromRevision + 1;
}

onBeforeUnmount(() => clearTimeout(timer));
</script>

<template>
  <PlaygroundExample v-bind="$attrs as { id: string; title: string }">
    <div class="feed-demo">
      <header class="feed-demo__header">
        <div class="feed-demo__body">
          <strong>결제 개선 배포 스레드</strong>
          <span class="feed-demo__meta">댓글 {{ comments.length }}개 · 최신순</span>
        </div>
        <UIButton size="sm" variant="outline" :disabled="receiving || received" @click="simulateIncomingComment">
          <template #leading><MessageSquare /></template>
          {{ received ? "댓글 도착 완료" : receiving ? "댓글 도착 대기 중…" : "3초 뒤 댓글 받기" }}
        </UIButton>
      </header>
      <UIFeed
        v-slot="{ highlightedValue }" :items="items" :revision="revision" :request-generation="requestGeneration"
        :get-position="getPosition" label="결제 개선 배포 댓글" class="feed-demo__list" @request-window="settleBoundary"
      >
        <div class="feed-demo__scroll">
          <UIFeedItem
            v-for="comment in comments" :key="comment.id" :value="comment.id"
            :aria-labelledby="`${prefix}-${comment.id}`" :aria-setsize="comments.length" class="feed-demo__entry"
          >
            <div class="feed-demo__row">
              <h4 :id="`${prefix}-${comment.id}`" class="feed-demo__title">{{ comment.title }}</h4>
              <span class="feed-demo__meta">{{ comment.author }} · <time :datetime="comment.time">{{ comment.time }}</time></span>
            </div>
            <p>{{ comment.message }}</p>
          </UIFeedItem>
        </div>
        <span class="feed-demo__meta">
          현재 항목 · {{ comments.find(({ id }) => id === highlightedValue)?.title }}
        </span>
      </UIFeed>
    </div>
    <template #footer>
      <output class="feed-demo__status">{{ status }}</output>
    </template>
  </PlaygroundExample>
</template>

<style src="../feed-demo.css"></style>
