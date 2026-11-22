<script setup lang="ts">
import { UIDialog } from "@connextable/ui";
import { ClipboardList } from "@lucide/vue";
</script>

<template>
  <UIDialog
    trigger-label="배포 요약 열기"
    :trigger-icon="ClipboardList"
    title="결제 서비스 배포 요약"
    description="결제 재시도 과정에서 중복 승인을 방지하는 수정 사항이 포함됩니다."
  >
    <template #body>
      <dl class="release-details">
        <dt>버전</dt><dd>v2.8.4</dd>
        <dt>대상 리전</dt><dd>서울</dd>
        <dt>배포 예정</dt><dd>11월 24일 오후 2시</dd>
      </dl>
    </template>
  </UIDialog>
</template>

<style scoped>
.release-details {
  display: grid;
  grid-template-columns: minmax(0, auto) minmax(0, 1fr);
  gap: var(--ui-space-sm) var(--ui-space-md);
  font-size: var(--ui-font-size-body-sm);
}
.release-details dt { color: var(--ui-color-text-muted); }
.release-details dd { margin: 0; }
</style>
