<script setup lang="ts">
import {
  UIEditable,
  UIEditableArea,
  UIEditableInput,
  UIEditablePreview,
} from "@connextable/ui";

</script>
<template>
  <UIEditable default-value="회의 제목" v-slot="{ value }">
    <UIEditableArea><UIEditablePreview as="button" type="button">{{ value }}</UIEditablePreview><UIEditableInput />
    </UIEditableArea>
  </UIEditable>
</template>
