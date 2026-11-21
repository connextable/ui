<script setup lang="ts">
import { UIProgress } from "@connextable/ui";
</script>

<template>
  <UIProgress label="번역 완료" :value="3" :max="8" style="inline-size: min(100%, 20rem)" show-value />
</template>
