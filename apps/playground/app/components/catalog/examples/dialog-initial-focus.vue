<script setup lang="ts">
import { UIDialog, UIDialogClose, UIDialogContent, UIDialogOverlay, UIDialogTitle, UIDialogTrigger, UIInput } from "@connextable/ui";
import { useTemplateRef } from "vue";

const name = useTemplateRef<{ $el: HTMLElement }>("name");
</script>

<template>
  <UIDialog :initial-focus="name?.$el">
    <UIDialogTrigger>이름 편집</UIDialogTrigger>
    <UIDialogOverlay />
    <UIDialogContent>
      <UIDialogTitle>이름 편집</UIDialogTitle>
      <UIInput ref="name" aria-label="표시 이름" default-value="팀 공간" />
      <UIDialogClose>닫기</UIDialogClose>
    </UIDialogContent>
  </UIDialog>
</template>
