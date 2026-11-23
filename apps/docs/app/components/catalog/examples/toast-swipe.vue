<script setup lang="ts">
import {
  UIButton, UICheckbox, UISelect, UIToast, UIToastClose, UIToastDescription, UIToastProvider, UIToastTitle, UIToastViewport,
} from "@connextable/ui";
import { computed, ref } from "vue";

const directions = [
  { value: "left", label: "왼쪽" },
  { value: "right", label: "오른쪽" },
  { value: "up", label: "위" },
  { value: "down", label: "아래" },
] as const;
const selected = ref<string | null>("right");
const direction = computed(() => directions.find(({ value }) => value === selected.value) ?? directions[1]);
const longerSwipe = ref(false);
let nextID = 0;
</script>

<template>
  <UIToastProvider :hotkey="false" :default-duration-ms="null" :max-visible="1"
    :swipe-direction="direction.value" :swipe-threshold="longerSwipe ? 80 : 40" close-label="알림 닫기"
    v-slot="{ toasts, toast }"
  >
    <div class="toast-gesture-controls">
      <UISelect v-model="selected" :options="directions" aria-label="스와이프 방향" />
      <UICheckbox v-model="longerSwipe" label="닫기 거리 80px" />
      <UIButton @click="toast({ id: `swipe-${++nextID}`, title: '스와이프로 닫기', description: '알림 본문을 선택한 방향으로 밀어 보세요.' })">스와이프 알림 표시</UIButton>
    </div>
    <UIToastViewport position="bottom-center" style="--ui-toast-block-offset: 5rem" label="스와이프 알림">
      <UIToast v-for="item in toasts" :key="item.id" :value="item.id">
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
.toast-gesture-controls { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: var(--ui-space-md); }
</style>
