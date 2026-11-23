<script setup lang="ts">
import { UIDataStatus, UIInView } from "@connextable/ui";
import { Check } from "@lucide/vue";
import { computed, ref } from "vue";

const notifications = [
  { id: 1, title: "초안 공유", detail: "민지가 새 도움말 초안을 올렸습니다." },
  { id: 2, title: "검토 완료", detail: "도움말에 수정 의견 2개가 달렸습니다." },
  { id: 3, title: "수정본 도착", detail: "검토 의견을 반영한 초안이 올라왔습니다.", fresh: true },
  { id: 4, title: "공개 일정 확정", detail: "새 도움말은 금요일 오전 10시에 공개됩니다.", fresh: true },
];

const confirmed = ref(new Set<number>());
const remaining = computed(() =>
  notifications.filter(item => item.fresh && !confirmed.value.has(item.id)).length,
);
</script>

<template>
  <PlaygroundExample v-bind="$attrs as { id: string; title: string }">
    <div class="notification-demo">
      <header><strong>프로젝트 알림</strong></header>
      <ul class="notification-demo__list ui-scrollbar" aria-label="프로젝트 알림 목록" tabindex="0">
        <UIInView
          v-for="item in notifications"
          :key="item.id"
          :disabled="!item.fresh"
          :threshold="1"
          once
          as-child
          @enter="confirmed.add(item.id)"
        >
          <li class="notification-demo__item" :data-confirmed="confirmed.has(item.id) || undefined">
            <div>
              <strong>{{ item.title }}</strong>
              <p>{{ item.detail }}</p>
            </div>
            <UIDataStatus
              v-if="item.fresh"
              :tone="confirmed.has(item.id) ? 'success' : 'accent'"
              :icon="confirmed.has(item.id) ? Check : undefined"
            >
              {{ confirmed.has(item.id) ? "확인함" : "새 알림" }}
            </UIDataStatus>
          </li>
        </UIInView>
      </ul>
    </div>
    <template #footer>
      <output>{{ remaining ? `새 알림 ${remaining}개` : "새 알림 없음" }}</output>
    </template>
  </PlaygroundExample>
</template>

<style scoped>
.notification-demo {
  inline-size: min(100%, 28rem);
  overflow: hidden;
  border: 1px solid var(--ui-color-border);
  border-radius: var(--ui-radius-md);
}

.notification-demo header {
  padding: var(--ui-space-md);
  background: var(--ui-color-surface);
  border-block-end: 1px solid var(--ui-color-border);
}

.notification-demo__list {
  block-size: 14rem;
  overflow: auto;
  margin: 0;
  padding: 0;
  list-style: none;
}

.notification-demo__list:focus-visible {
  outline: var(--ui-focus-ring-width) solid var(--ui-color-focus);
  outline-offset: calc(-1 * var(--ui-focus-ring-width));
}

.notification-demo__item {
  box-sizing: border-box;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: start;
  align-content: center;
  gap: var(--ui-space-sm);
  min-block-size: 6rem;
  padding: var(--ui-space-md);
  border-block-end: 1px solid var(--ui-color-border);
}

.notification-demo__item p {
  margin: var(--ui-space-xs) 0 0;
  color: var(--ui-color-text-muted);
  font-size: var(--ui-font-size-body-sm);
}

.notification-demo__item .ui-data-status {
  justify-content: center;
  min-inline-size: 4.5rem;
  white-space: nowrap;
}

@media (prefers-reduced-motion: no-preference) {
  .notification-demo__item[data-confirmed] {
    animation: notification-confirmed calc(var(--ui-motion-standard) * 3) var(--ui-ease-out);
  }

  @keyframes notification-confirmed {
    0%, 30% {
      background-color: var(--ui-color-accent-soft);
      box-shadow: inset 0 0 0 2px var(--ui-color-accent);
    }

    100% {
      background-color: transparent;
      box-shadow: inset 0 0 0 0 transparent;
    }
  }
}
</style>
