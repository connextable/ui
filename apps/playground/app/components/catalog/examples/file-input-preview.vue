<script setup lang="ts">
import { UIButton, UIFileInput, UIFormActions } from "@connextable/ui";
import { useTemplateRef } from "vue";

const attachment = useTemplateRef("attachment");
const policy = { accept: "image/*", multiple: true };
const sample = new File([
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96">',
  '<rect width="96" height="96" fill="#e9f1f4"/>',
  '<path d="M18 70l19-20 15 7 24-32" fill="none" stroke="#245b73" stroke-width="6"/>',
  '</svg>',
], "주간 요청 추이.svg", { type: "image/svg+xml" });
</script>

<template>
  <div class="ui-field">
    <UIFileInput
      ref="attachment"
      label="스크린샷 첨부"
      variant="dropzone"
      :policy="policy"
      hint="이미지를 선택하거나 선택 버튼에 포커스한 뒤 스크린샷을 붙여넣으세요."
      preview
    />
    <UIFormActions><UIButton size="sm" variant="outline" @click="attachment?.selectFiles([sample])">예제 이미지 선택</UIButton></UIFormActions>
  </div>
</template>
