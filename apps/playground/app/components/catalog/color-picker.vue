<script setup lang="ts">
import {
  UIColorPicker,
  UIColorPickerArea,
  UIColorPickerAreaThumb,
  UIColorPickerHueSlider,
  UIColorPickerSwatch,
  UIColorPickerTextInput,
} from "@connextable/ui";
import { ref } from "vue";

const selectedColor = ref("#5b6df6");

</script>
<template>
  <UIColorPicker v-model="selectedColor" label="강조 색상">
    <UIColorPickerArea><UIColorPickerAreaThumb /></UIColorPickerArea>
    <UIColorPickerHueSlider aria-label="색조" />
    <div class="ui-color-sample"><UIColorPickerSwatch /><UIColorPickerTextInput aria-label="색상 값" /></div>
  </UIColorPicker>
</template>
