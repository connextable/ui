<script setup lang="ts">
import {
  UITooltip,
  UITooltipArrow,
  UITooltipContent,
  UITooltipTrigger,
} from "@connextable/ui";

</script>

<template>
  <UITooltip side="right">
    <UITooltipTrigger>단축키</UITooltipTrigger>
    <UITooltipContent>
      <UITooltipArrow />
      검색 열기 (⌘K)
    </UITooltipContent>
  </UITooltip>
</template>
