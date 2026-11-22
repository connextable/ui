<script setup lang="ts">
import {
  UIEditable,
  UIEditableArea,
  UIEditableInput,
  UIEditablePreview,
} from "@connextable/ui";
import { ref } from "vue";

const text = ref("정리할 메모");

</script>
<template>
  <UIEditable submit-on-blur v-model="text" v-slot="{ value }">
    <UIEditableArea><UIEditablePreview as="button" type="button">{{ value }}</UIEditablePreview><UIEditableInput />
    </UIEditableArea>
  </UIEditable>
</template>
