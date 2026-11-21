<script setup lang="ts">
import {
  UIMultiThumbSlider,
  UIMultiThumbSliderRange,
  UIMultiThumbSliderThumb,
  UIMultiThumbSliderTrack,
} from "@connextable/ui";

import { ref } from 'vue'
const thumbs = ['minimum', 'maximum']
const values = ref(['120', '340'])
</script>

<template>
  <UIMultiThumbSlider orientation="vertical" label="필터 범위" v-model="values" :thumbs="thumbs" min="50" max="500" step="10"
    :get-thumb-label="thumb => thumb === 'minimum' ? '하한' : '상한'">
    <UIMultiThumbSliderTrack>
      <UIMultiThumbSliderRange />
      <UIMultiThumbSliderThumb v-for="thumb in thumbs" :key="thumb" :value="thumb" />
    </UIMultiThumbSliderTrack>
    <output>{{ values.join(' – ') }}</output>
  </UIMultiThumbSlider>
</template>
