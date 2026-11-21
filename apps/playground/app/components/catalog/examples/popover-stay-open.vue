<script setup lang="ts">
import {
  UIInput,
  UIPopover,
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
    <UIPopoverTrigger>Edit profile</UIPopoverTrigger>
    <UIPopoverContent>
      <UIPopoverArrow />
      <UIPopoverTitle>Profile details</UIPopoverTitle>
      <UIPopoverDescription>Change the public display name.</UIPopoverDescription>
      <label>Display name <UIInput default-value="Sectile" /></label>
      <UIPopoverClose>Save changes</UIPopoverClose>
    </UIPopoverContent>
  </UIPopover>
</template>
