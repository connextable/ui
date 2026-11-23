<script setup lang="ts">
import { UIButton, UIDialog, UIDialogContent, UIDialogDescription, UIDialogOverlay, UIDialogPortal, UIDialogTitle, UIDialogTrigger, UIRadioGroup } from "@connextable/ui";
import { nextTick, ref, useTemplateRef } from "vue";

const roles = [
  { value: "viewer", label: "열람", description: "정산 보고서를 읽을 수 있습니다." },
  { value: "reviewer", label: "검토", description: "보고서를 읽고 의견을 남길 수 있습니다." },
];
const open = ref(false);
const reviewing = ref(false);
const role = ref("viewer");
const assigned = ref("");
const title = useTemplateRef<{ $el: HTMLElement }>("title");

function resetStep(value: boolean) {
  if (value) reviewing.value = false;
}

async function changeStep(review: boolean) {
  reviewing.value = review;
  await nextTick();
  title.value?.$el.focus();
}
</script>

<template>
  <PlaygroundExample v-bind="$attrs as { id: string; title: string }">
    <div class="invite-example">
      <UIDialog v-model:open="open" @update:open="resetStep">
        <UIDialogTrigger as-child><UIButton variant="outline">검토 권한 설정</UIButton></UIDialogTrigger>
        <UIDialogPortal>
          <UIDialogOverlay />
          <UIDialogContent>
            <UIDialogTitle ref="title" tabindex="-1">{{ reviewing ? "부여할 권한 확인" : "정산 보고서 권한" }}</UIDialogTitle>
            <UIDialogDescription>정지우 님이 11월 정산 보고서에서 할 수 있는 작업을 지정합니다.</UIDialogDescription>
            <p v-if="reviewing">부여할 권한 · {{ roles.find(option => option.value === role)?.label }}</p>
            <UIRadioGroup v-else v-model="role" :options="roles" label="보고서 권한" />
            <template #footer-leading>{{ reviewing ? "2 / 2단계" : "1 / 2단계" }}</template>
            <template #actions>
              <UIButton v-if="reviewing" variant="outline" @click="changeStep(false)">이전</UIButton>
              <UIButton v-if="reviewing" @click="assigned = roles.find(option => option.value === role)?.label ?? ''; open = false">권한 부여</UIButton>
              <UIButton v-else @click="changeStep(true)">검토하기</UIButton>
            </template>
          </UIDialogContent>
        </UIDialogPortal>
      </UIDialog>
    </div>
    <template #footer v-if="assigned">
      <output>정지우 님에게 {{ assigned }} 권한을 부여했습니다.</output>
    </template>
  </PlaygroundExample>
</template>

<style scoped>
.invite-example { display: flex; flex-wrap: wrap; align-items: center; gap: var(--ui-space-md); }
</style>
