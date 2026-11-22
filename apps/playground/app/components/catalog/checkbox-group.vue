<script setup lang="ts">
import { Bell, Mail, MessageSquare } from "@lucide/vue";
import { UICheckboxGroup } from "@connextable/ui";
import { ref } from "vue";

const items = [
  { value: "email", label: "이메일", icon: Mail },
  { value: "sms", label: "문자", icon: MessageSquare },
  { value: "app", label: "앱 푸시", icon: Bell },
];

const selected = ref<readonly string[]>(["sms"]);
</script>

<template>
  <PlaygroundExample v-bind="$attrs as { id: string; title: string }">
    <UICheckboxGroup v-model="selected" :options="items" name="notificationChannels" label="알림 채널" />
    <template #footer>
      <output>{{ items.filter(item => selected.includes(item.value)).map(item => item.label).join(", ") || "선택 없음" }}</output>
    </template>
  </PlaygroundExample>
</template>
