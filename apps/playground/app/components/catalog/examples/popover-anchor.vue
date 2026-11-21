<script setup lang="ts">
import {
  UIButton,
  UIFormActions,
  UIPopover,
  UIPopoverAnchor,
  UIPopoverArrow,
  UIPopoverClose,
  UIPopoverContent,
  UIPopoverDescription,
  UIPopoverTitle,
  UIPopoverTrigger,
} from "@connextable/ui";

</script>

<template>
  <UIPopover side="bottom" align="center">
    <UIPopoverTrigger as-child><UIButton variant="outline">팀 정보 열기</UIButton></UIPopoverTrigger>
    <UIPopoverAnchor>현재 팀 · 디자인</UIPopoverAnchor>
    <UIPopoverContent>
      <UIPopoverArrow />
      <UIPopoverTitle>제품 디자인팀</UIPopoverTitle>
      <UIPopoverDescription>서비스 화면과 디자인 시스템을 담당합니다. 구성원 8명</UIPopoverDescription>
      <UIFormActions>
        <UIPopoverClose as-child><UIButton size="sm" variant="outline">닫기</UIButton></UIPopoverClose>
      </UIFormActions>
    </UIPopoverContent>
  </UIPopover>
</template>
