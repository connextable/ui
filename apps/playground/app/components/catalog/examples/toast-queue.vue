<script setup lang="ts">
import {
  UIButton,
  UICheckbox,
  UIToast,
  UIToastClose,
  UIToastProvider,
  UIToastTitle,
  UIToastViewport,
} from "@connextable/ui";
import { ref } from "vue";

const expand = ref(false);
let sequence = 0;
const titles = ["편집 내용을 저장했습니다", "변경 내역을 동기화했습니다", "검토팀에 새 버전을 공유했습니다"];

</script>

<template>
  <UIToastProvider :hotkey="false" :default-duration-ms="8000" :max-visible="2" close-label="알림 닫기" v-slot="{ toasts, toast, dismissAll }">
    <div class="toast-stack-settings">
      <UIButton @click="titles.forEach(title => toast({ id: `batch-${++sequence}`, title }))">알림 3개 띄우기</UIButton>
      <UIButton variant="outline" :disabled="!toasts.length" @click="dismissAll()">모두 닫기</UIButton>
      <UICheckbox v-model="expand" label="항상 펼치기" />
    </div>
    <UIToastViewport :expand="expand" label="표시 개수 비교 알림">
      <UIToast v-for="item in toasts" :key="item.id" :value="item.id">
        <UIToastTitle /><UIToastClose>닫기</UIToastClose>
      </UIToast>
    </UIToastViewport>
  </UIToastProvider>
</template>

<style scoped>
.toast-stack-settings { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: var(--ui-space-sm); }
</style>
