<script setup lang="ts">
import { UISlider, UISliderRange, UISliderThumb, UISliderTrack } from "@connextable/ui";
import { ref } from "vue";

const volume = ref("50");
</script>

<template>
  <UISlider v-model="volume" min="0" max="100" step="25" label="볼륨">
    <UISliderTrack>
      <UISliderRange />
      <UISliderThumb />
    </UISliderTrack>
  </UISlider>
  <output>{{ volume }}%</output>
</template>
