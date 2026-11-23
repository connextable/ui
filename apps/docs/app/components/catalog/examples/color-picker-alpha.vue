<script setup lang="ts">
import { UIColorPicker, UIColorPickerAlphaSlider, UIColorPickerSwatch, UIColorPickerValueText } from "@connextable/ui";
import { ref } from "vue";

const selectedColor = ref("#4168be");
</script>

<template>
  <UIColorPicker label="강조 색상" v-model="selectedColor" allow-alpha>
    <div class="ui-color-sample"><UIColorPickerSwatch /><UIColorPickerValueText /></div>
    <UIColorPickerAlphaSlider aria-label="불투명도" />
  </UIColorPicker>
</template>
