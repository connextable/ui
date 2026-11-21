<script setup lang="ts">
import {
  UIAlertDialog,
  UIAlertDialogClose,
  UIAlertDialogContent,
  UIAlertDialogDescription,
  UIAlertDialogOverlay,
  UIAlertDialogPortal,
  UIAlertDialogTitle,
  UIAlertDialogTrigger,
} from "@connextable/ui";

</script>

<template>
  <UIAlertDialog>
    <UIAlertDialogTrigger>Delete project</UIAlertDialogTrigger>
    <UIAlertDialogPortal>
      <UIAlertDialogOverlay />
    <UIAlertDialogContent>
      <UIAlertDialogTitle>Delete project?</UIAlertDialogTitle>
      <UIAlertDialogDescription>
        This permanently removes the project and its deployment history.
      </UIAlertDialogDescription>
      <UIAlertDialogClose>Cancel</UIAlertDialogClose>
      <UIAlertDialogClose>Delete project</UIAlertDialogClose>
    </UIAlertDialogContent>
    </UIAlertDialogPortal>
  </UIAlertDialog>
</template>
