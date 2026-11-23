<script setup lang="ts">
import {
  UIDialog,
  UIDialogContent,
  UIDialogOverlay,
  UIDialogPortal,
  UIDialogTitle,
  UIDialogTrigger,
} from "@connextable/ui";
</script>

<template>
  <div class="example-scrollport">
    <UIDialog>
      <UIDialogTrigger>첨부 파일 보기</UIDialogTrigger>
      <UIDialogPortal>
        <UIDialogOverlay />
        <UIDialogContent>
          <UIDialogTitle>첨부 파일</UIDialogTitle>
          <p>preview.pdf</p>
        </UIDialogContent>
      </UIDialogPortal>
    </UIDialog>
  </div>
</template>

<style scoped>
.example-scrollport {
  overflow: clip;
  padding: var(--ui-space-sm);
  border: 1px solid var(--ui-color-divider);
  border-radius: var(--ui-control-radius);
}
</style>
