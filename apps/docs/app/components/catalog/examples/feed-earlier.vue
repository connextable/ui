<script setup lang="ts">
import { UIButton, UIFeed, UIFeedItem, UIFeedLoadEarlier } from "@connextable/ui";
import { History } from "@lucide/vue";
import { computed, onBeforeUnmount, ref, useId } from "vue";

const prefix = useId();
const history = [
  { id: "opened", title: "배송지 정정 문의 접수", actor: "고객", time: "09:12", detail: "주문을 완료한 뒤 배송 주소의 동·호수가 이전 주소로 표시된 것을 확인했습니다." },
  { id: "assigned", title: "배송 상담팀 배정", actor: "고객센터", time: "09:15", detail: "택배사로 송장을 전달하기 전에 주소를 변경할 수 있는지 확인을 요청했습니다." },
  { id: "held", title: "출고 잠시 보류", actor: "물류팀", time: "09:19", detail: "상품은 포장 중입니다. 주소가 확인되면 기존 송장을 취소하고 다시 발급합니다." },
  { id: "verified", title: "새 주소 확인", actor: "고객", time: "09:31", detail: "고객이 계정에서 수정된 배송 정보를 확인하고 출고에 동의했습니다." },
  { id: "updated", title: "송장 재발급", actor: "물류팀", time: "09:42", detail: "수정된 배송지로 송장을 발급하고 상품을 집화 대기 상태로 전환했습니다." },
  { id: "contacted", title: "변경 결과를 고객에게 안내", actor: "박유진", time: "09:47", detail: "새 배송 조회 링크와 오늘 오후 집화 예정 시간을 안내했습니다." },
  { id: "closed", title: "배송지 정정 완료", actor: "박유진", time: "09:54", detail: "고객이 변경된 주소를 확인했습니다. 이후 배송은 새 송장 번호로 추적할 수 있습니다." },
];
const start = ref(4);
const visible = computed(() => history.slice(start.value));
const items = computed(() => visible.value.map(({ id }) => id));
// The request window can load in either direction. Publish the known total on the articles.
const getPosition = (id: string) => history.findIndex((event) => event.id === id) + 1;
const revision = ref(0);
const requestGeneration = ref(0);
const failed = ref(false);
const status = ref("");
let simulateError = true;
let timer: ReturnType<typeof setTimeout> | undefined;

function loadHistory(direction: "before" | "after", _anchor: string | null, fromRevision: number, generation: number) {
  const settle = () => {
    requestGeneration.value = generation;
    revision.value = fromRevision + 1;
  };

  if (direction !== "before" || start.value === 0) {
    settle();
    return;
  }

  failed.value = false;
  status.value = "이전 상담 기록을 불러오는 중입니다.";
  timer = setTimeout(() => {
    if (start.value === 2 && simulateError) {
      simulateError = false;
      failed.value = true;
      status.value = "이전 기록을 불러오지 못했습니다. 다시 시도할 수 있습니다.";
    } else {
      start.value = Math.max(0, start.value - 2);
      status.value = start.value ? "이전 상담 기록 2건을 추가했습니다." : "전체 상담 기록을 불러왔습니다.";
    }
    settle();
  }, 600);
}

onBeforeUnmount(() => clearTimeout(timer));
</script>

<template>
  <PlaygroundExample v-bind="$attrs as { id: string; title: string }">
    <div class="feed-demo">
      <header class="feed-demo__header">
        <strong>배송지 정정 문의</strong>
        <span class="feed-demo__meta">CS-1042 · {{ visible.length }} / {{ history.length }}건</span>
      </header>
      <UIFeed
        v-slot="{ pending }" :items="items" :revision="revision" :request-generation="requestGeneration"
        :get-position="getPosition" label="배송지 정정 상담 기록"
        class="feed-demo__list" @request-window="loadHistory"
      >
        <UIFeedLoadEarlier v-if="start > 0" as-child>
          <UIButton variant="outline" size="sm">
            <template #leading><History /></template>
            {{ pending === "before" ? "이전 기록 불러오는 중…" : failed ? "이전 기록 다시 시도" : "이전 상담 기록 불러오기" }}
          </UIButton>
        </UIFeedLoadEarlier>
        <div class="feed-demo__scroll">
          <UIFeedItem
            v-for="event in visible" :key="event.id" :value="event.id"
            :aria-labelledby="`${prefix}-${event.id}`" :aria-setsize="history.length" class="feed-demo__entry"
          >
            <div class="feed-demo__row">
              <h4 :id="`${prefix}-${event.id}`" class="feed-demo__title">{{ event.title }}</h4>
              <time class="feed-demo__meta" :datetime="event.time">{{ event.time }}</time>
            </div>
            <p>{{ event.detail }}</p>
            <span class="feed-demo__meta">{{ event.actor }}</span>
          </UIFeedItem>
        </div>
      </UIFeed>
    </div>
    <template #footer>
      <output class="feed-demo__status" :class="{ 'feed-demo__error': failed }">{{ status }}</output>
    </template>
  </PlaygroundExample>
</template>

<style src="../feed-demo.css"></style>
