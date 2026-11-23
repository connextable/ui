<script setup lang="ts">
import { UIButton, UITooltip } from "@connextable/ui";

</script>

<template>
  <UITooltip text="키보드 단축키 · ⌘K" side="top">
    <template #trigger><UIButton variant="outline">검색</UIButton></template>
  </UITooltip>
</template>
