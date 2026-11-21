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
  <UISpinButton label="제한된 수량" v-model="value" min="4" max="6" step="1">
    <UISpinButtonDecrement label="줄이기"><Minus :size="16" aria-hidden="true" /></UISpinButtonDecrement>
    <UISpinButtonInput />
    <UISpinButtonIncrement label="늘리기"><Plus :size="16" aria-hidden="true" /></UISpinButtonIncrement>
  </UISpinButton>
</template>
