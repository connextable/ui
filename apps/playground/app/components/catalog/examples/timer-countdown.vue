<script setup lang="ts">
import { UITimer, UITimerControl, UITimerActionTrigger, UITimerItem, UITimerArea, UITimerSeparator } from "@connextable/ui";
</script>

<template>
  <UITimer countdown :start-ms="5000" label="검토 타이머" v-slot="{ running, completed }">
    <UITimerArea><UITimerItem type="minutes" /><UITimerSeparator>:</UITimerSeparator><UITimerItem type="seconds" /></UITimerArea>
    <UITimerControl>
      <UITimerActionTrigger action="start" :disabled="running || completed">시작</UITimerActionTrigger>
      <UITimerActionTrigger action="reset" :disabled="!running && !completed">초기화</UITimerActionTrigger>
    </UITimerControl>
    <small role="status">{{ completed ? "카운트다운 완료" : running ? "시간 측정 중" : "5초 카운트다운" }}</small>
  </UITimer>
</template>
