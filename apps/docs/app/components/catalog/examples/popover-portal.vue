<script setup lang="ts">
import {
  UIButton,
  UIFormActions,
  UIPopover,
  UIPopoverArrow,
  UIPopoverClose,
  UIPopoverContent,
  UIPopoverPortal,
  UIPopoverDescription,
  UIPopoverTitle,
  UIPopoverTrigger,
} from "@connextable/ui";

</script>

<template>
  <UIPopover side="bottom" align="center">
    <UIPopoverTrigger as-child><UIButton variant="outline">편집 권한 확인</UIButton></UIPopoverTrigger>
    <UIPopoverPortal>
      <UIPopoverContent>
        <UIPopoverArrow />
        <UIPopoverTitle>편집 권한</UIPopoverTitle>
        <UIPopoverDescription>프로젝트 구성원만 배포 일정을 수정할 수 있습니다.</UIPopoverDescription>
        <UIFormActions>
          <UIPopoverClose as-child><UIButton size="sm" variant="outline">닫기</UIButton></UIPopoverClose>
        </UIFormActions>
      </UIPopoverContent>
    </UIPopoverPortal>
  </UIPopover>
</template>
