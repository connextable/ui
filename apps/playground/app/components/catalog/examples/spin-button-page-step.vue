<script setup lang="ts">
import { Minus, Plus } from "@lucide/vue";
import {
  UISpinButton,
  UISpinButtonDecrement,
  UISpinButtonIncrement,
  UISpinButtonInput,
} from "@connextable/ui";

import { ref } from 'vue'
const value = ref('4')
</script>

<template>
  <UISpinButton :page-step="5" label="수량" v-model="value" min="0" max="20" step="1">
    <UISpinButtonDecrement label="줄이기"><Minus :size="16" aria-hidden="true" /></UISpinButtonDecrement>
    <UISpinButtonInput />
    <UISpinButtonIncrement label="늘리기"><Plus :size="16" aria-hidden="true" /></UISpinButtonIncrement>
  </UISpinButton>
</template>
