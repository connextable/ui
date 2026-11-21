<script setup lang="ts">
import { UIAnchor } from "@connextable/ui";
</script>

<template>
  <nav aria-label="디자인 시스템">
    <UIAnchor href="/#design-colors" current="location">색상 토큰</UIAnchor>
    <UIAnchor href="/#design-typography">타이포그래피</UIAnchor>
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  gap: var(--ui-space-md);
}
</style>
