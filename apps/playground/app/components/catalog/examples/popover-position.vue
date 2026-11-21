<script setup lang="ts">
import { UIPopover, UIPopoverArrow, UIPopoverContent, UIPopoverTrigger } from "@connextable/ui";
</script>

<template>
  <UIPopover side="bottom" align="end">
    <UIPopoverTrigger>필터 조건 확인</UIPopoverTrigger>
    <UIPopoverContent>
      <UIPopoverArrow />
      <p>처리 상태가 완료인 항목만 표시합니다.</p>
    </UIPopoverContent>
  </UIPopover>
</template>
