<script setup lang="ts">
import {
  UIButton, UIToast, UIToastClose, UIToastPortal, UIToastProvider, UIToastTitle, UIToastViewport,
  type UIToastPosition, type UIToastProviderSlotProps,
} from "@connextable/ui";
import { ref } from "vue";

const positions = [
  { value: "top-start", label: "왼쪽 위" },
  { value: "top-center", label: "가운데 위" },
  { value: "top-end", label: "오른쪽 위" },
  { value: "bottom-start", label: "왼쪽 아래" },
  { value: "bottom-center", label: "가운데 아래" },
  { value: "bottom-end", label: "오른쪽 아래" },
] as const;
const position = ref<UIToastPosition>("bottom-end");
let nextID = 0;

function showAt(
  option: typeof positions[number], toast: UIToastProviderSlotProps["toast"], dismissAll: () => void,
) {
  if (position.value !== option.value) dismissAll();
  position.value = option.value;
  toast({ id: `position-${++nextID}`, title: `${option.label} 알림` });
}
</script>

<template>
  <UIToastProvider :hotkey="false" :max-visible="3" close-label="알림 닫기" v-slot="{ toasts, toast, dismissAll }">
    <div class="toast-positions" role="group" aria-label="알림 위치">
      <UIButton
        v-for="option in positions" :key="option.value" size="sm" variant="outline"
        @click="showAt(option, toast, dismissAll)"
      >
        {{ option.label }}
      </UIButton>
      <div class="toast-positions__space" aria-hidden="true" />
    </div>
    <UIToastPortal>
      <UIToastViewport :position="position" label="위치 비교 알림">
        <UIToast v-for="item in toasts" :key="item.id" :value="item.id">
          <UIToastTitle />
          <UIToastClose>닫기</UIToastClose>
        </UIToast>
      </UIToastViewport>
    </UIToastPortal>
  </UIToastProvider>
</template>

<style scoped>
.toast-positions {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-template-rows: auto minmax(1rem, 1fr) auto;
  align-items: stretch;
  inline-size: min(100%, 25rem);
  min-block-size: 9rem;
  gap: var(--ui-space-xs);
  padding: var(--ui-space-xs);
  border: 1px solid var(--ui-color-border);
  border-radius: var(--ui-radius-lg);
  background: var(--ui-color-surface);
}

.toast-positions__space { grid-area: 2 / 1 / 3 / -1; }
.toast-positions :deep(.ui-button) {
  --ui-control-size-radius: calc(var(--ui-radius-lg) - var(--ui-space-xs) - 1px);
  min-inline-size: 0;
}
</style>
