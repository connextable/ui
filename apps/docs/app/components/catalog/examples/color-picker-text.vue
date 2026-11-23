<script setup lang="ts">
import { UIColorPickerSwatch, UIColorPicker, UIColorPickerTextInput } from "@connextable/ui";
import { ref } from "vue";

const selectedColor = ref("#4168be");
</script>

<template>
  <UIColorPicker label="강조 색상" v-model="selectedColor">
    <div class="ui-color-sample"><UIColorPickerSwatch /><UIColorPickerTextInput aria-label="HEX 색상" placeholder="예: #4168be" /></div>
  </UIColorPicker>
</template>
