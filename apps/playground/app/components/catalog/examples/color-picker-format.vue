<script setup lang="ts">
import { UIColorPickerSwatch, UIColorPicker, UIColorPickerControl, UIColorPickerFormatTrigger, UIColorPickerTextInput } from "@connextable/ui";
</script>

<template>
  <UIColorPicker label="강조 색상" default-value="#4168be">
    <UIColorPickerControl>
      <UIColorPickerFormatTrigger format="hex">HEX</UIColorPickerFormatTrigger>
      <UIColorPickerFormatTrigger format="hsv">HSV</UIColorPickerFormatTrigger>
    </UIColorPickerControl>
    <div class="ui-color-sample"><UIColorPickerSwatch /><UIColorPickerTextInput aria-label="색상 값" /></div>
  </UIColorPicker>
</template>
