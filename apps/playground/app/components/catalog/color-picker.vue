<script setup lang="ts">
import {
  UIColorPicker,
  UIColorPickerArea,
  UIColorPickerAreaThumb,
  UIColorPickerHueSlider,
  UIColorPickerSwatch,
  UIColorPickerTextInput,
} from "@connextable/ui";

</script>
<template>
  <UIColorPicker default-value="#5b6df6" label="강조 색상">
    <UIColorPickerArea><UIColorPickerAreaThumb /></UIColorPickerArea>
    <UIColorPickerHueSlider aria-label="색조" />
    <div class="ui-color-sample"><UIColorPickerSwatch /><UIColorPickerTextInput aria-label="색상 값" /></div>
  </UIColorPicker>
</template>
