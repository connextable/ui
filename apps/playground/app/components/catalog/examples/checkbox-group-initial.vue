<script setup lang="ts">
import {
  UICheckboxGroup,
  UICheckboxGroupItem,
  UICheckboxGroupIndicator,
} from "@connextable/ui";
import { Check } from "@lucide/vue";

const channels = ["메일", "문자", "앱"];
</script>

<template>
  <UICheckboxGroup :items="channels" :default-value="['메일', '앱']" label="받을 채널" clearable>
    <UICheckboxGroupItem v-for="item in channels" :key="item" :value="item">
      <UICheckboxGroupIndicator><Check :size="16" aria-hidden="true" /></UICheckboxGroupIndicator>
      {{ item }}
    </UICheckboxGroupItem>
  </UICheckboxGroup>
</template>
