<script setup lang="ts">
import {
  UITooltip,
  UITooltipArrow,
  UITooltipContent,
  UITooltipTrigger,
} from "@connextable/ui";

</script>

<template>
  <UITooltip side="top">
    <UITooltipTrigger>Hover or focus</UITooltipTrigger>
    <UITooltipContent>
      <UITooltipArrow />
      Keyboard shortcut: ⌘K
    </UITooltipContent>
  </UITooltip>
</template>
