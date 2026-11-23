<script setup lang="ts">
import {
  UIEditable,
  UIEditableArea,
  UIEditableCancelTrigger,
  UIEditableInput,
  UIEditablePreview,
  UIEditableSubmitTrigger,
} from "@connextable/ui";
import { ref, useId } from "vue";

const policies = { validate: (draft: string) => draft.trim().length >= 3 };

const text = ref("제품 설계");
const hintId = useId();
</script>

<template>
  <UIEditable v-model="text" label="작업 이름" :policies="policies" v-slot="{ value, draft, editing }">
    <UIEditableArea as="span">
      <UIEditablePreview as="button" type="button">{{ value }}</UIEditablePreview>
      <UIEditableInput
        placeholder="세 글자 이상"
        :aria-invalid="editing && !policies.validate(draft) || undefined"
        :aria-describedby="hintId"
      />
      <UIEditableSubmitTrigger />
      <UIEditableCancelTrigger />
      <small :id="hintId" class="validation-message" aria-live="polite">
        {{ editing && !policies.validate(draft) ? "세 글자 이상 입력하세요." : "" }}
      </small>
    </UIEditableArea>
  </UIEditable>
</template>

<style scoped>
.validation-message {
  position: absolute;
  inset-block-start: 100%;
  inset-inline-start: 0;
  inline-size: max-content;
  color: var(--ui-color-danger);
}
</style>
