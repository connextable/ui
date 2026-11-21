<script setup lang="ts">
import {
  UIInput,
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
  <UIPopover side="bottom" align="center" :close-on-interact-outside="false">
    <UIPopoverTrigger>팀 정보 열기</UIPopoverTrigger>
    <UIPopoverAnchor>현재 팀 · 디자인</UIPopoverAnchor>
    <UIPopoverContent>
      <UIPopoverArrow />
      <UIPopoverTitle>Profile details</UIPopoverTitle>
      <UIPopoverDescription>Change the public display name.</UIPopoverDescription>
      <label>Display name <UIInput default-value="Sectile" /></label>
      <UIPopoverClose>Save changes</UIPopoverClose>
    </UIPopoverContent>
  </UIPopover>
</template>
