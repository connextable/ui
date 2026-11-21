<script setup lang="ts">
import { UIButton, UIDialog, UIDialogContent, UIDialogDescription, UIDialogOverlay, UIDialogTitle, UIDialogTrigger, UIInput } from "@connextable/ui";
import { onBeforeUnmount, ref } from "vue";

const open = ref(false);
const saved = ref("매주 월요일 정산 확인");
const draft = ref(saved.value);
const pending = ref(false);
const didSave = ref(false);
let timer: ReturnType<typeof setTimeout> | undefined;

function notifyOpen(value: boolean) {
  if (pending.value) return;
  if (value) draft.value = saved.value;
  open.value = value;
}

function save() {
  const note = draft.value.trim();
  if (!note || pending.value) return;
  pending.value = true;
  timer = setTimeout(() => {
    saved.value = note;
    pending.value = false;
    didSave.value = true;
    open.value = false;
  }, 900);
}

onBeforeUnmount(() => clearTimeout(timer));
</script>

<template>
  <div class="ui-form-actions">
    <UIDialog :open="open" :close-on-escape="!pending" :close-on-interact-outside="!pending" @update:open="notifyOpen">
      <UIDialogTrigger as-child><UIButton variant="outline">알림 문구 편집</UIButton></UIDialogTrigger>
      <UIDialogOverlay />
      <UIDialogContent :show-close="!pending">
        <UIDialogTitle>정산 알림 문구</UIDialogTitle>
        <UIDialogDescription>정산팀에 표시할 안내 문구를 저장합니다.</UIDialogDescription>
        <UIInput v-model="draft" aria-label="정산 알림 문구" :readonly="pending" />
        <template #footer-leading><span role="status">{{ pending ? "변경사항 저장 중" : "" }}</span></template>
        <template #actions><UIButton :disabled="!draft.trim()" :loading="pending" @click="save">저장</UIButton></template>
      </UIDialogContent>
    </UIDialog>
    <span v-if="didSave" role="status">저장된 알림 · {{ saved }}</span>
  </div>
</template>
