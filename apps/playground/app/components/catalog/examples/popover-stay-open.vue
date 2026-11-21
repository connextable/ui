<script setup lang="ts">
import {
  UIButton,
  UIFormActions,
  UIInput,
  UIPopover,
  UIPopoverArrow,
  UIPopoverClose,
  UIPopoverContent,
  UIPopoverDescription,
  UIPopoverTitle,
  UIPopoverTrigger,
} from "@connextable/ui";
import { ref } from "vue";

const memo = ref("결제 승인 오류가 재현되는지 확인");
</script>

<template>
  <UIPopover side="bottom" align="center" :close-on-interact-outside="false">
    <UIPopoverTrigger as-child><UIButton variant="outline">작업 메모 열기</UIButton></UIPopoverTrigger>
    <UIPopoverContent>
      <UIPopoverArrow />
      <UIPopoverTitle>작업 메모</UIPopoverTitle>
      <UIPopoverDescription>화면의 다른 곳을 확인하는 동안 메모를 열어 둡니다.</UIPopoverDescription>
      <div class="ui-field-layout">
        <UIInput v-model="memo" multiline :rows="3" aria-label="메모 내용" />
        <UIFormActions>
          <UIPopoverClose as-child><UIButton size="sm">완료</UIButton></UIPopoverClose>
        </UIFormActions>
      </div>
    </UIPopoverContent>
  </UIPopover>
</template>
