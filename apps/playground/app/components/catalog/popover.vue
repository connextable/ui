<script setup lang="ts">
import {
  UIFormActions,
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
  <UIPopover>
    <UIPopoverTrigger>Edit profile</UIPopoverTrigger>
    <UIPopoverContent>
      <UIPopoverArrow />
      <UIPopoverTitle>Profile details</UIPopoverTitle>
      <UIPopoverDescription>Change the public display name.</UIPopoverDescription>
      <div class="ui-field-layout ui-field">
        <label>Display name <UIInput default-value="Sectile" /></label>
        <UIFormActions><UIPopoverClose>Save changes</UIPopoverClose></UIFormActions>
      </div>
    </UIPopoverContent>
  </UIPopover>
</template>
