<script setup lang="ts">
import {
  UICheckboxGroup,
  UICheckboxGroupItem,
  UICheckboxGroupIndicator,
} from "@connextable/ui";
import { Check } from "@lucide/vue";
import { ref } from "vue";

const channels = ["메일", "문자", "앱"];

const selected = ref<readonly string[]>(['메일', '앱']);
</script>

<template>
  <UICheckboxGroup :items="channels" v-model="selected" label="받을 채널" clearable>
    <UICheckboxGroupItem v-for="item in channels" :key="item" :value="item">
      <UICheckboxGroupIndicator><Check :size="16" aria-hidden="true" /></UICheckboxGroupIndicator>
      {{ item }}
    </UICheckboxGroupItem>
  </UICheckboxGroup>
</template>
