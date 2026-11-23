<script setup lang="ts">
import {
  UIMeter,
  UIMeterIndicator,
  UIMeterTrack,
  UIMeterValueText,
} from "@connextable/ui";

</script>

<template>
  <UIMeter value="82" min="0" max="100" low="35" high="75" optimum="20" label="저장소 사용률" :format-value="value => `${value}%`">
    <UIMeterTrack><UIMeterIndicator /></UIMeterTrack>
    <UIMeterValueText />
    <small>정리 권장 기준 75%</small>
  </UIMeter>
</template>
