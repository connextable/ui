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
  <UIMultiThumbSlider :policies="{ minGap: 3 }" label="가격 범위" v-model="values" :thumbs="thumbs" min="50" max="500" step="10"
    :get-thumb-label="thumb => thumb === 'minimum' ? '최소 가격' : '최대 가격'">
    <UIMultiThumbSliderTrack>
      <UIMultiThumbSliderRange />
      <UIMultiThumbSliderThumb v-for="thumb in thumbs" :key="thumb" :value="thumb" />
    </UIMultiThumbSliderTrack>
    <output>{{ values.join(' – ') }}</output>
  </UIMultiThumbSlider>
</template>
