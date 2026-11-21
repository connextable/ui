<script setup lang="ts">
import { UIButton, UIFormActions, UIRadioGroup, UISheet, UISheetClose, UISheetContent, UISheetDescription, UISheetHandle, UISheetOverlay, UISheetTitle, UISheetTrigger } from "@connextable/ui";
import { computed, ref } from "vue";

const scopes = [
  { value: "members", label: "초대된 멤버", description: "문서에 직접 초대한 사람만 열 수 있습니다." },
  { value: "team", label: "프로젝트 구성원", description: "프로젝트에 속한 모든 사람이 열 수 있습니다." },
];
const scope = ref("members");
const draft = ref(scope.value);
const scopeLabel = computed(() => scopes.find(option => option.value === scope.value)?.label);
</script>

<template>
  <UISheet @update:open="open => { if (open) draft = scope }">
    <UISheetTrigger as-child><UIButton variant="outline">공유 범위 · {{ scopeLabel }}</UIButton></UISheetTrigger>
    <UISheetOverlay />
    <UISheetContent width="26rem">
      <UISheetHandle />
      <UISheetTitle>정산 보고서 공유</UISheetTitle>
      <UISheetDescription>보고서를 열 수 있는 사람을 선택합니다.</UISheetDescription>
      <div class="ui-field-layout">
        <UIRadioGroup v-model="draft" :options="scopes" label="공유 범위" />
        <UIFormActions>
          <UISheetClose as-child><UIButton variant="outline">취소</UIButton></UISheetClose>
          <UISheetClose as-child><UIButton @click="scope = draft">적용</UIButton></UISheetClose>
        </UIFormActions>
      </div>
    </UISheetContent>
  </UISheet>
</template>
