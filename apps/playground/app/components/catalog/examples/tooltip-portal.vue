<script setup lang="ts">
import {
  UITooltip,
  UITooltipArrow,
  UITooltipContent,
  UITooltipPortal,
  UITooltipTrigger,
} from "@connextable/ui";

</script>

<template>
  <UITooltip side="top">
    <UITooltipTrigger>Hover or focus</UITooltipTrigger>
    <UITooltipPortal>
      <UITooltipContent>
      <UITooltipArrow />
      Keyboard shortcut: ⌘K
      </UITooltipContent>
    </UITooltipPortal>
  </UITooltip>
</template>
