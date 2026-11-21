<script setup lang="ts">
import { UICheckboxGroup, UICheckboxGroupIndicator, UICheckboxGroupItem } from "@connextable/ui";
import { Check } from "@lucide/vue";
</script>

<template>
  <UICheckboxGroup :items="['email', 'sms']" label="알림 수단">
    <UICheckboxGroupItem value="email">
      <UICheckboxGroupIndicator><Check :size="16" aria-hidden="true" /></UICheckboxGroupIndicator>
      이메일
    </UICheckboxGroupItem>
    <UICheckboxGroupItem value="sms" disabled>문자</UICheckboxGroupItem>
  </UICheckboxGroup>
</template>
