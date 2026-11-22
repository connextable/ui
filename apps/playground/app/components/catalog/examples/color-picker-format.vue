<script setup lang="ts">
import { UIColorPickerSwatch, UIColorPicker, UIColorPickerControl, UIColorPickerFormatTrigger, UIColorPickerTextInput } from "@connextable/ui";
import { ref } from "vue";

const selectedColor = ref("#4168be");
</script>

<template>
  <UIColorPicker label="강조 색상" v-model="selectedColor">
    <UIColorPickerControl>
      <UIColorPickerFormatTrigger format="hex">HEX</UIColorPickerFormatTrigger>
      <UIColorPickerFormatTrigger format="hsv">HSV</UIColorPickerFormatTrigger>
    </UIColorPickerControl>
    <div class="ui-color-sample"><UIColorPickerSwatch /><UIColorPickerTextInput aria-label="색상 값" /></div>
  </UIColorPicker>
</template>
