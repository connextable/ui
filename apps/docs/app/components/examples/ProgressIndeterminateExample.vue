<script setup lang="ts">
import { UIProgress } from "@connextable/ui";
</script>

<template>
  <UIProgress class="progress-indeterminate" label="진행률 확인 중" :value="null" />
</template>

<style scoped>
.progress-indeterminate {
  inline-size: 26rem;
  max-inline-size: 100%;
}
</style>
