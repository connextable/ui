<script setup lang="ts">
import { UIProgress } from "@connextable/ui";
</script>

<template>
  <UIProgress label="동기화 진행률" :value="62" style="inline-size: min(100%, 20rem)">
    <template #value="{ percentage }">사진 동기화 {{ percentage }}%</template>
  </UIProgress>
</template>
