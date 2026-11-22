<script setup lang="ts">
import {
  UIEditable,
  UIEditableArea,
  UIEditableCancelTrigger,
  UIEditableEditTrigger,
  UIEditableInput,
  UIEditablePreview,
  UIEditableSubmitTrigger,
  UIFormActions,
} from "@connextable/ui";
import { ref } from "vue";

const policies = { validate: (draft: string) => draft.trim().length >= 3 };

const text = ref("제품 설계");
</script>

<template>
  <UIEditable v-model="text" label="작업 이름" :policies="policies" v-slot="{ value, draft, editing }">
    <UIEditableArea>
      <UIEditablePreview as="button" type="button">{{ value }}</UIEditablePreview>
      <UIEditableInput aria-label="새 작업 이름" placeholder="세 글자 이상" />
    </UIEditableArea>
    <UIFormActions>
      <UIEditableEditTrigger>수정</UIEditableEditTrigger>
      <UIEditableSubmitTrigger>저장</UIEditableSubmitTrigger>
      <UIEditableCancelTrigger>취소</UIEditableCancelTrigger>
    </UIFormActions>
    <p v-if="editing && !policies.validate(draft)" aria-live="polite">이름은 세 글자 이상이어야 합니다.</p>
  </UIEditable>
</template>
