<script setup lang="ts">
import { UICheckboxGroup } from "@connextable/ui";
import { ref } from "vue";

const items = [
  { value: "email", label: "이메일" },
  { value: "sms", label: "문자" },
  { value: "app", label: "앱 푸시" },
];

const selected = ref<readonly string[]>(['sms']);
</script>

<template>
  <UICheckboxGroup :options="items" v-model="selected" name="notificationChannels" label="알림 채널" />
</template>
