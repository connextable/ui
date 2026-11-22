<script setup lang="ts">
import {
  UIEditable,
  UIEditableArea,
  UIEditableInput,
  UIEditablePreview,
} from "@connextable/ui";
import { ref } from "vue";

const text = ref("11월 정산 배포");

</script>
<template>
  <UIEditable readonly v-model="text" v-slot="{ value }">
    <UIEditableArea><UIEditablePreview>{{ value }}</UIEditablePreview><UIEditableInput />
    </UIEditableArea>
  </UIEditable>
</template>
