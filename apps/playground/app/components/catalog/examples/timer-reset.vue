<script setup lang="ts">
import { UITimer, UITimerActionTrigger, UITimerArea, UITimerControl, UITimerItem } from "@connextable/ui";
</script>

<template>
  <UITimer label="경과 시간" v-slot="{ running, valueMs }">
    <UITimerArea><UITimerItem type="seconds" />초</UITimerArea>
    <UITimerControl>
      <UITimerActionTrigger :action="running ? 'pause' : valueMs > 0 ? 'resume' : 'start'">{{ running ? "일시 정지" : valueMs > 0 ? "계속" : "시작" }}</UITimerActionTrigger>
      <UITimerActionTrigger action="reset" :disabled="valueMs === 0">0초로 초기화</UITimerActionTrigger>
    </UITimerControl>
  </UITimer>
</template>
