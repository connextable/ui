<script setup lang="ts">
import { UIColorPickerSwatch, UIColorPicker, UIColorPickerControl, UIColorPickerFormatTrigger, UIColorPickerTextInput } from "@connextable/ui";
import { ref } from "vue";

const selectedColor = ref("#4168be");
</script>

<template>
  <UIColorPicker label="강조 색상" v-model="selectedColor" v-slot="{ format }">
    <UIColorPickerControl>
      <UIColorPickerFormatTrigger format="hex">HEX</UIColorPickerFormatTrigger>
      <UIColorPickerFormatTrigger format="hsv">HSV</UIColorPickerFormatTrigger>
    </UIColorPickerControl>
    <div class="ui-color-sample">
      <UIColorPickerSwatch />
      <UIColorPickerTextInput aria-label="색상 값" :placeholder="format === 'hsv' ? '예: hsv(221 66% 75%)' : '예: #4168be'" />
    </div>
  </UIColorPicker>
</template>
