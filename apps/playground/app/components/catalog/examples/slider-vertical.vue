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
<template><UISlider orientation="vertical" label="밝기" v-model="value" min="0" max="100" step="1"><UISliderTrack><UISliderRange /><UISliderThumb /></UISliderTrack></UISlider></template>
