<script setup lang="ts">
import { UIColorPicker, UIColorPickerNativeInput, UIColorPickerValueText } from "@connextable/ui";
import { ref } from "vue";

const selectedColor = ref("#4168be");
</script>

<template>
  <UIColorPicker label="강조 색상" v-model="selectedColor">
    <div class="ui-color-sample">
      <UIColorPickerNativeInput aria-label="강조 색상 선택" />
      <UIColorPickerValueText />
    </div>
  </UIColorPicker>
</template>
