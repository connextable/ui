<script setup lang="ts">
import { UITimer, UITimerControl, UITimerActionTrigger, UITimerItem, UITimerArea, UITimerSeparator } from "@connextable/ui";
</script>

<template>
  <UITimer auto-start label="검토 타이머" v-slot="{ running, valueMs }">
    <UITimerArea><UITimerItem type="minutes" /><UITimerSeparator>:</UITimerSeparator><UITimerItem type="seconds" /></UITimerArea>
    <UITimerControl>
      <UITimerActionTrigger :action="running ? 'pause' : valueMs > 0 ? 'resume' : 'start'">{{ running ? "일시 정지" : "계속" }}</UITimerActionTrigger>
    </UITimerControl>
  </UITimer>
</template>
