<script setup lang="ts">
import { Check } from "@lucide/vue";
import {
  UICheckboxGroup,
  UICheckboxGroupIndicator,
  UICheckboxGroupItem,
} from "@connextable/ui";

const items = [
  { value: 'core', label: 'Core' },
  { value: 'dom', label: 'DOM' },
  { value: 'vue', label: 'Vue' },
]

</script>

<template>
  <UICheckboxGroup readonly :items="items.map(item => item.value)" :default-value="['dom']" label="사용 중인 모듈">
    <UICheckboxGroupItem v-for="item in items" :key="item.value" :value="item.value">
      <UICheckboxGroupIndicator><Check :size="16" aria-hidden="true" /></UICheckboxGroupIndicator>
      {{ item.label }}
    </UICheckboxGroupItem>
  </UICheckboxGroup>
</template>
