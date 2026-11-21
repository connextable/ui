<script setup lang="ts">
import { UIColorPicker, UIColorPickerAlphaSlider, UIColorPickerSwatch, UIColorPickerValueText } from "@connextable/ui";
</script>

<template>
  <UIColorPicker label="강조 색상" default-value="#4168be" allow-alpha>
    <div class="ui-color-sample"><UIColorPickerSwatch /><UIColorPickerValueText /></div>
    <UIColorPickerAlphaSlider aria-label="불투명도" />
  </UIColorPicker>
</template>
