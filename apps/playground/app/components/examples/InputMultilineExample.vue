<script setup lang="ts">
import { UIInput } from "@connextable/ui";
</script>

<template>
  <UIInput class="input-multiline" aria-label="메모" multiline :rows="3" default-value="회의 내용을 적어보세요." />
</template>

<style scoped>
.input-multiline {
  inline-size: 26rem;
  max-inline-size: 100%;
}
</style>
