<script setup lang="ts">
import { UITooltip, UITooltipContent, UITooltipTrigger } from "@connextable/ui";
import { Info } from "@lucide/vue";
</script>

<template>
  <UITooltip :open-delay="650" side="top">
    <UITooltipTrigger aria-label="CSV 형식 설명"><Info :size="16" aria-hidden="true" /></UITooltipTrigger>
    <UITooltipContent>CSV는 항목의 값을 쉼표로 구분한 텍스트 형식입니다.</UITooltipContent>
  </UITooltip>
</template>
