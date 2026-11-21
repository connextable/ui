<script setup lang="ts">
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
    <UISpinButtonDecrement aria-label="Decrease">−</UISpinButtonDecrement>
    <UISpinButtonInput />
    <UISpinButtonIncrement aria-label="Increase">+</UISpinButtonIncrement>
  </UISpinButton>
</template>
