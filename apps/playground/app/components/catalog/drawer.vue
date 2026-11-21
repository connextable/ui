<script setup lang="ts">
import {
  UIDrawer,
  UIDrawerClose,
  UIDrawerContent,
  UIDrawerDescription,
  UIDrawerHandle,
  UIDrawerOverlay,
  UIDrawerTitle,
  UIDrawerTrigger,
} from "@connextable/ui";

</script>

<template>
  <UIDrawer>
    <UIDrawerTrigger>Open filters</UIDrawerTrigger>
    <UIDrawerOverlay />
    <UIDrawerContent>
      <UIDrawerHandle />
      <UIDrawerTitle>Filters</UIDrawerTitle>
      <UIDrawerDescription>Refine the deployment list.</UIDrawerDescription>
      <UIDrawerClose>Apply filters</UIDrawerClose>
    </UIDrawerContent>
  </UIDrawer>
</template>
