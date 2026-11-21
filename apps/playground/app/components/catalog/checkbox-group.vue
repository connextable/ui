<script setup lang="ts">
import {
  UICheckboxGroup,
  UICheckboxGroupIndicator,
  UICheckboxGroupItem,
} from "@connextable/ui";

const items = [
  { value: "email", label: "이메일" },
  { value: "sms", label: "문자" },
  { value: "app", label: "앱 푸시" },
];
</script>

<template>
  <UICheckboxGroup as="fieldset" :items="items.map(item => item.value)" :default-value="['sms']" name="notificationChannels">
    <legend>알림 채널</legend>
    <UICheckboxGroupItem v-for="item in items" :key="item.value" :value="item.value">
      <UICheckboxGroupIndicator />
      {{ item.label }}
    </UICheckboxGroupItem>
  </UICheckboxGroup>
</template>
