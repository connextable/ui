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

const name = ref("김민아");
const draft = ref(name.value);

function resetDraft(open: boolean) {
  if (open) draft.value = name.value;
}
</script>

<template>
  <UIPopover @update:open="resetDraft">
    <UIPopoverTrigger as-child><UIButton variant="outline">표시 이름 · {{ name }}</UIButton></UIPopoverTrigger>
    <UIPopoverContent>
      <UIPopoverArrow />
      <UIPopoverTitle>프로필 편집</UIPopoverTitle>
      <UIPopoverDescription>팀원에게 표시할 이름을 바꿉니다.</UIPopoverDescription>
      <div class="ui-field-layout ui-field">
        <label class="ui-field-layout">표시 이름 <UIInput v-model="draft" /></label>
        <UIFormActions>
          <UIPopoverClose as-child>
            <UIButton size="sm" :disabled="!draft.trim()" @click="name = draft.trim()">저장</UIButton>
          </UIPopoverClose>
        </UIFormActions>
      </div>
    </UIPopoverContent>
  </UIPopover>
</template>
