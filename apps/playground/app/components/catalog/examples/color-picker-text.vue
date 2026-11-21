<script setup lang="ts">
import { UIColorPickerSwatch, UIColorPicker, UIColorPickerTextInput } from "@connextable/ui";
</script>

<template>
  <UIColorPicker label="강조 색상" default-value="#4168be">
    <div class="ui-color-sample"><UIColorPickerSwatch /><UIColorPickerTextInput aria-label="HEX 색상" /></div>
  </UIColorPicker>
</template>
