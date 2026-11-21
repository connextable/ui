<script setup lang="ts">
import {
  UIEditable,
  UIEditableArea,
  UIEditableInput,
  UIEditablePreview,
} from "@connextable/ui";

</script>
<template>
  <UIEditable readonly default-value="release-candidate" v-slot="{ value }">
    <UIEditableArea><UIEditablePreview>{{ value }}</UIEditablePreview><UIEditableInput />
    </UIEditableArea>
  </UIEditable>
</template>
