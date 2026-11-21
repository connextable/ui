<script setup lang="ts">
import {
  UIMultiThumbSlider,
  UIMultiThumbSliderRange,
  UIMultiThumbSliderThumb,
  UIMultiThumbSliderTrack,
} from "@connextable/ui";

import { ref } from "vue";

const thumbs = ["minimum", "maximum"];
const values = ref(["120000", "340000"]);
const amount = new Intl.NumberFormat("ko-KR");
</script>

<template>
  <UIMultiThumbSlider v-model="values" :thumbs="thumbs" :min="50000" :max="500000" :step="10000"
    label="상품 가격 범위" :get-thumb-label="thumb => thumb === 'minimum' ? '최소 금액' : '최대 금액'"
    :format-value="value => `${amount.format(Number(value))}원`">
    <UIMultiThumbSliderTrack>
      <UIMultiThumbSliderRange />
      <UIMultiThumbSliderThumb v-for="thumb in thumbs" :key="thumb" :value="thumb" />
    </UIMultiThumbSliderTrack>
    <output>{{ amount.format(Number(values[0])) }}원 – {{ amount.format(Number(values[1])) }}원</output>
  </UIMultiThumbSlider>
</template>
