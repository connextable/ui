<script setup lang="ts">
import { UIColorPicker, UIColorPickerNativeInput, UIColorPickerValueText } from "@connextable/ui";
</script>

<template>
  <UIColorPicker label="강조 색상" default-value="#4168be">
    <div class="ui-color-sample">
      <UIColorPickerNativeInput aria-label="강조 색상 선택" />
      <UIColorPickerValueText />
    </div>
  </UIColorPicker>
</template>
