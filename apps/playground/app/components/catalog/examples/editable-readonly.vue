<script setup lang="ts">
import {
  UIEditable,
  UIEditableArea,
  UIEditableInput,
  UIEditablePreview,
} from "@connextable/ui";

</script>
<template>
  <UIEditable readonly default-value="11월 정산 배포" v-slot="{ value }">
    <UIEditableArea><UIEditablePreview>{{ value }}</UIEditablePreview><UIEditableInput />
    </UIEditableArea>
  </UIEditable>
</template>
