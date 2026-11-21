<script setup lang="ts">
import {
  UITimer,
  UITimerActionTrigger,
  UITimerArea,
  UITimerControl,
  UITimerItem,
  UITimerSeparator,
} from "@connextable/ui";
import { Pause, Play, RotateCcw } from "@lucide/vue";
</script>

<template>
  <UITimer label="경과 시간" class="timer-example" v-slot="{ running, valueMs }">
    <div class="timer-example__readout">
      <span>경과 시간</span>
      <UITimerArea>
        <UITimerItem type="minutes" />
        <UITimerSeparator>:</UITimerSeparator>
        <UITimerItem type="seconds" />
      </UITimerArea>
    </div>
    <UITimerControl>
      <UITimerActionTrigger
        class="timer-example__primary"
        :action="running ? 'pause' : valueMs > 0 ? 'resume' : 'start'"
      >
        <component :is="running ? Pause : Play" :size="16" aria-hidden="true" />
        {{ running ? "일시 정지" : valueMs > 0 ? "계속" : "시작" }}
      </UITimerActionTrigger>
      <UITimerActionTrigger action="reset" :disabled="!running && valueMs === 0">
        <RotateCcw :size="16" aria-hidden="true" /> 초기화
      </UITimerActionTrigger>
    </UITimerControl>
  </UITimer>
</template>

<style scoped>
.timer-example {
  box-sizing: border-box;
  inline-size: 19rem;
  max-inline-size: 100%;
  padding: 1.125rem var(--ui-space-md);
  border: 1px solid var(--ui-color-border);
  border-radius: var(--ui-radius-md);
}

.timer-example__readout {
  display: grid;
  justify-items: center;
  gap: var(--ui-space-xs);
  color: var(--ui-color-text-muted);
  font-size: var(--ui-font-size-body-sm);
}

.timer-example__primary {
  min-inline-size: 6.5rem;
}
</style>
