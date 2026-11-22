<script setup lang="ts">
import { UIColorPickerSwatch, UIColorPicker, UIColorPickerLabel, UIColorPickerControl, UIColorPickerCoordinateInput, UIColorPickerValueText } from "@connextable/ui";
import { ref } from "vue";

const selectedColor = ref("#4168be");
</script>

<template>
  <UIColorPicker v-model="selectedColor" aria-label="강조 색상">
    <UIColorPickerLabel>색상 채널</UIColorPickerLabel>
    <UIColorPickerControl class="ui-color-channels">
      <label class="ui-color-channel"><span>R</span><UIColorPickerCoordinateInput format="rgb" coordinate="red" aria-label="빨강" /></label>
      <label class="ui-color-channel"><span>G</span><UIColorPickerCoordinateInput format="rgb" coordinate="green" aria-label="초록" /></label>
      <label class="ui-color-channel"><span>B</span><UIColorPickerCoordinateInput format="rgb" coordinate="blue" aria-label="파랑" /></label>
    </UIColorPickerControl>
    <div class="ui-color-sample"><UIColorPickerSwatch /><UIColorPickerValueText /></div>
  </UIColorPicker>
</template>
