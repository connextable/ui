<script setup lang="ts">
import {
  UIEditable,
  UIEditableArea,
  UIEditableInput,
  UIEditablePreview,
} from "@connextable/ui";

</script>
<template>
  <UIEditable submit-on-blur default-value="정리할 메모" v-slot="{ value }">
    <UIEditableArea><UIEditablePreview as="button" type="button">{{ value }}</UIEditablePreview><UIEditableInput />
    </UIEditableArea>
  </UIEditable>
</template>
