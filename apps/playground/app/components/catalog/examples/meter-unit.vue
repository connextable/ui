<script setup lang="ts">
import { UIMeter, UIMeterTrack, UIMeterIndicator, UIMeterValueText } from "@connextable/ui";
</script>

<template>
  <UIMeter value="82" min="0" max="150" label="응답 시간" :format-value="(value) => `${value} ms`">
    <UIMeterValueText />
    <UIMeterTrack><UIMeterIndicator /></UIMeterTrack>
  </UIMeter>
</template>
