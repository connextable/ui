<script setup lang="ts">
import { UIFeed, UIFeedItem } from "@connextable/ui";
import { CircleCheck, GitPullRequest, Rocket, RotateCcw } from "@lucide/vue";
import { useId } from "vue";

const prefix = useId();
const activities = [
  { id: "deployed", icon: Rocket, title: "결제 서비스 v2.8.4 재배포 완료", detail: "서울 리전에서 결제 승인과 주문 확정이 정상 동작하는지 확인했습니다.", actor: "배포 봇", time: "14:32" },
  { id: "checks", icon: CircleCheck, title: "결제 재시도 검증 통과", detail: "네트워크 타임아웃 뒤 재시도해도 승인 내역이 한 건만 생성됩니다.", actor: "자동 테스트", time: "14:19" },
  { id: "approved", icon: GitPullRequest, title: "재시도 처리 수정 병합", detail: "결제 요청을 다시 보내더라도 같은 주문의 승인 결과를 재사용하도록 수정했습니다.", actor: "김민아", time: "14:08" },
  { id: "rolled-back", icon: RotateCcw, title: "이전 버전으로 되돌림", detail: "새 버전에서 결제 승인 오류가 늘어 v2.8.3으로 복구했습니다.", actor: "이도현", time: "13:46" },
] as const;
const itemIDs = activities.map(({ id }) => id);
const getPosition = (id: string) => activities.findIndex((event) => event.id === id) + 1;
</script>

<template>
  <div class="feed-demo">
    <header class="feed-demo__header">
      <strong>Atlas 결제 서비스</strong>
      <span class="feed-demo__meta"><time datetime="2026-11-18">11월 18일</time> · 최신순</span>
    </header>
    <UIFeed :items="itemIDs" :set-size="activities.length" :get-position="getPosition" label="릴리스 활동" class="feed-demo__list">
      <UIFeedItem
        v-for="event in activities" :key="event.id" :value="event.id"
        :aria-labelledby="`${prefix}-${event.id}`" class="feed-demo__entry feed-demo__entry--with-icon"
      >
        <span class="feed-demo__icon"><component :is="event.icon" :size="17" aria-hidden="true" /></span>
        <div class="feed-demo__body">
          <div class="feed-demo__row">
            <h4 :id="`${prefix}-${event.id}`" class="feed-demo__title">{{ event.title }}</h4>
            <time class="feed-demo__meta" :datetime="`2026-11-18T${event.time}:00+09:00`">{{ event.time }}</time>
          </div>
          <p>{{ event.detail }}</p>
          <span class="feed-demo__meta">{{ event.actor }}</span>
        </div>
      </UIFeedItem>
    </UIFeed>
  </div>
</template>

<style src="./feed-demo.css"></style>
