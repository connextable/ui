<script setup lang="ts">
import { UICheckboxGroup } from "@connextable/ui";

const items = [
  { value: "email", label: "이메일" },
  { value: "sms", label: "문자" },
  { value: "app", label: "앱 푸시" },
];
</script>

<template>
  <UICheckboxGroup :options="items" :default-value="['sms']" name="notificationChannels" label="알림 채널" />
</template>
