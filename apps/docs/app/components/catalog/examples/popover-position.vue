<script setup lang="ts">
import { UIButton, UIPopover, UIPopoverArrow, UIPopoverContent, UIPopoverTitle, UIPopoverDescription, UIPopoverTrigger } from "@connextable/ui";
</script>

<template>
  <UIPopover side="bottom" align="end">
    <UIPopoverTrigger as-child><UIButton variant="outline">필터 조건 확인</UIButton></UIPopoverTrigger>
    <UIPopoverContent>
      <UIPopoverArrow />
      <UIPopoverTitle>적용 중인 필터</UIPopoverTitle>
      <UIPopoverDescription>처리가 끝난 항목만 표시합니다.</UIPopoverDescription>
    </UIPopoverContent>
  </UIPopover>
</template>
