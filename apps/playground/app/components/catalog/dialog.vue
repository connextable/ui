<script setup lang="ts">
import {
  UIDialog,
  UIDialogClose,
  UIDialogContent,
  UIDialogDescription,
  UIDialogOverlay,
  UIDialogTitle,
  UIDialogTrigger,
} from "@connextable/ui";

</script>

<template>
  <UIDialog>
    <UIDialogTrigger>Open deployment</UIDialogTrigger>
    <UIDialogOverlay />
    <UIDialogContent>
      <UIDialogTitle>Deployment</UIDialogTitle>
      <UIDialogDescription>Review the release before continuing.</UIDialogDescription>
      <UIDialogClose>Close</UIDialogClose>
    </UIDialogContent>
  </UIDialog>
</template>
