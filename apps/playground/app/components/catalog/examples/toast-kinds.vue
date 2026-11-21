<script setup lang="ts">
import {
  UIButton, UIToast, UIToastClose, UIToastDescription, UIToastProvider, UIToastTitle, UIToastViewport,
} from "@connextable/ui";
import { CircleAlert, CircleCheck, Info, TriangleAlert } from "@lucide/vue";

const notices = {
  info: { label: "안내", icon: Info, title: "자동 저장이 켜졌습니다", description: "편집 내용이 30초마다 저장됩니다." },
  success: { label: "성공", icon: CircleCheck, title: "문서 공유를 완료했습니다", description: "검토팀 구성원이 문서를 열 수 있습니다." },
  warning: { label: "주의", icon: TriangleAlert, title: "공유 링크가 곧 만료됩니다", description: "현재 링크는 내일 오전 9시까지 사용할 수 있습니다." },
  error: { label: "오류", icon: CircleAlert, title: "첨부 파일을 저장하지 못했습니다", description: "파일 크기가 25 MB를 초과합니다." },
};
let nextID = 0;
</script>

<template>
  <UIToastProvider :hotkey="false" :max-visible="2" :default-duration-ms="6500" close-label="알림 닫기" v-slot="{ toasts, toast }">
    <div class="toast-kinds" role="group" aria-label="알림 유형">
      <UIButton v-for="(notice, kind) in notices" :key="kind" size="sm" variant="outline"
        @click="toast({ id: `kind-${++nextID}`, kind, title: notice.title, description: notice.description })"
      >
        <template #leading><component :is="notice.icon" /></template>
        {{ notice.label }}
      </UIButton>
    </div>
    <UIToastViewport label="유형별 알림">
      <UIToast v-for="item in toasts" :key="item.id" :value="item.id">
        <component :is="notices[item.kind as keyof typeof notices].icon" class="toast-kind-icon"
          :data-kind="item.kind" :size="17" aria-hidden="true" />
        <div>
          <UIToastTitle />
          <UIToastDescription />
        </div>
        <UIToastClose>닫기</UIToastClose>
      </UIToast>
    </UIToastViewport>
  </UIToastProvider>
</template>

<style scoped>
.toast-kinds { display: flex; flex-wrap: wrap; justify-content: center; gap: var(--ui-space-sm); }
.toast-kind-icon { color: var(--ui-color-accent); }
.toast-kind-icon[data-kind="warning"] { color: #825400; }
.toast-kind-icon[data-kind="error"] { color: var(--ui-color-danger); }
</style>
