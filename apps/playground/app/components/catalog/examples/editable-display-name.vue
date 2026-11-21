<script setup lang="ts">
import {
  UIEditable,
  UIEditableArea,
  UIEditableInput,
  UIEditablePreview,
} from "@connextable/ui";

</script>
<template>
  <UIEditable default-value="알림에 표시할 이름" v-slot="{ value }">
    <UIEditableArea><UIEditablePreview as="button" type="button">{{ value }}</UIEditablePreview><UIEditableInput />
    </UIEditableArea>
  </UIEditable>
</template>
