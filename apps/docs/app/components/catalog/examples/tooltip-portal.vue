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
    <UITooltipTrigger>마우스를 올리거나 포커스 이동</UITooltipTrigger>
    <UITooltipPortal>
      <UITooltipContent>
      <UITooltipArrow />
      키보드 단축키 · ⌘K
      </UITooltipContent>
    </UITooltipPortal>
  </UITooltip>
</template>
