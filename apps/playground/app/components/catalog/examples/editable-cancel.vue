<script setup lang="ts">
import {
  UIEditable,
  UIEditableArea,
  UIEditableInput,
  UIEditablePreview,
} from "@connextable/ui";
import { ref } from "vue";

const text = ref("회의 제목");

</script>
<template>
  <UIEditable v-model="text" v-slot="{ value }">
    <UIEditableArea><UIEditablePreview as="button" type="button">{{ value }}</UIEditablePreview><UIEditableInput />
    </UIEditableArea>
  </UIEditable>
</template>
