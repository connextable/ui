<script setup lang="ts">
import { UIButton, UIDialog, UIDialogClose, UIDialogContent, UIDialogOverlay, UIDialogTitle, UIDialogTrigger, UIInput } from "@connextable/ui";
import { ref, useTemplateRef } from "vue";

const name = useTemplateRef<{ $el: HTMLElement }>("name");
const savedName = ref("팀 공간");
const draftName = ref(savedName.value);

function resetDraft(open: boolean) {
  if (open) draftName.value = savedName.value;
}
</script>

<template>
  <UIDialog :initial-focus="name?.$el" @update:open="resetDraft">
    <UIDialogTrigger>이름 편집</UIDialogTrigger>
    <UIDialogOverlay />
    <UIDialogContent>
      <UIDialogTitle>이름 편집</UIDialogTitle>
      <UIInput ref="name" v-model="draftName" aria-label="표시 이름" />
      <template #footer-leading>현재 이름 · {{ savedName }}</template>
      <template #actions>
        <UIDialogClose as-child>
          <UIButton size="sm" :disabled="!draftName.trim()" @click="savedName = draftName.trim()">저장</UIButton>
        </UIDialogClose>
      </template>
    </UIDialogContent>
  </UIDialog>
</template>
