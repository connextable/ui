<script setup lang="ts">
import {
  UIButton, UIPopover, UIPopoverArrow, UIPopoverContent, UIPopoverDescription,
  UIPopoverPortal, UIPopoverTitle, UIPopoverTrigger,
} from "@connextable/ui";

const placements = [
  { side: "top", label: "위" },
  { side: "right", label: "오른쪽" },
  { side: "bottom", label: "아래" },
  { side: "left", label: "왼쪽" },
] as const;
</script>

<template>
  <div class="placement-options">
    <UIPopover v-for="placement in placements" :key="placement.side" :side="placement.side" :side-offset="10">
      <UIPopoverTrigger as-child><UIButton variant="outline">{{ placement.label }}</UIButton></UIPopoverTrigger>
      <UIPopoverPortal>
        <UIPopoverContent>
          <UIPopoverArrow />
          <UIPopoverTitle>{{ placement.label }}에 배치</UIPopoverTitle>
          <UIPopoverDescription>공간이 부족하면 반대쪽에 표시됩니다.</UIPopoverDescription>
        </UIPopoverContent>
      </UIPopoverPortal>
    </UIPopover>
  </div>
</template>

<style scoped>
.placement-options {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--ui-space-sm);
}
</style>
