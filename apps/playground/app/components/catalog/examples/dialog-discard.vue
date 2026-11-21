<script setup lang="ts">
import {
  UIButton, UIAlertDialog, UIAlertDialogClose, UIAlertDialogContent, UIAlertDialogDescription, UIAlertDialogOverlay,
  UIAlertDialogPortal, UIAlertDialogTitle, UIDialog, UIDialogContent, UIDialogDescription, UIDialogOverlay,
  UIDialogPortal, UIDialogTitle, UIDialogTrigger, UIInput,
} from "@connextable/ui";
import { nextTick, ref, useTemplateRef } from "vue";

const open = ref(false);
const confirmDiscard = ref(false);
const saved = ref("결제 오류를 재현한 주문 번호를 기록합니다.");
const draft = ref(saved.value);
const memo = useTemplateRef<{ control: { $el: HTMLElement } | null }>("memo");

function changeOpen(value: boolean) {
  if (!value && draft.value !== saved.value) {
    confirmDiscard.value = true;
    return;
  }
  if (value) draft.value = saved.value;
  open.value = value;
}

async function discard() {
  confirmDiscard.value = false;
  await nextTick();
  open.value = false;
}
</script>

<template>
  <UIDialog :open="open" @update:open="changeOpen">
    <UIDialogTrigger as-child><UIButton variant="outline">정산 메모 편집</UIButton></UIDialogTrigger>
    <UIDialogPortal>
      <UIDialogOverlay />
      <UIDialogContent>
        <UIDialogTitle>정산 메모</UIDialogTitle>
        <UIDialogDescription>다음 검토 때 참고할 내용을 남깁니다.</UIDialogDescription>
        <UIInput ref="memo" v-model="draft" multiline :rows="4" aria-label="정산 메모 내용" />
        <template #footer-leading>{{ draft !== saved ? "저장하지 않은 변경사항" : "저장됨" }}</template>
        <template #actions><UIButton @click="saved = draft; open = false">저장</UIButton></template>
        <UIAlertDialog v-model:open="confirmDiscard" :restore-focus-target="memo?.control?.$el">
          <UIAlertDialogPortal>
            <UIAlertDialogOverlay />
            <UIAlertDialogContent>
              <UIAlertDialogTitle>저장하지 않고 닫을까요?</UIAlertDialogTitle>
              <UIAlertDialogDescription>이번에 입력한 메모는 사라집니다.</UIAlertDialogDescription>
              <template #actions>
                <UIAlertDialogClose as-child><UIButton variant="outline">계속 편집</UIButton></UIAlertDialogClose>
                <UIButton @click="discard">변경사항 버리기</UIButton>
              </template>
            </UIAlertDialogContent>
          </UIAlertDialogPortal>
        </UIAlertDialog>
      </UIDialogContent>
    </UIDialogPortal>
  </UIDialog>
</template>
