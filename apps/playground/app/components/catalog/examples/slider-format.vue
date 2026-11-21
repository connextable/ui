<script setup lang="ts">
import {
  UISlider,
  UISliderRange,
  UISliderThumb,
  UISliderTrack,
} from "@connextable/ui";

import { ref } from 'vue'
const value = ref('40')
</script>
<template><UISlider :format-value="(value) => `${value} 퍼센트`" label="음량" v-model="value" min="0" max="100" step="1"><UISliderTrack><UISliderRange /><UISliderThumb /></UISliderTrack></UISlider><output>{{ value }}%</output></template>
