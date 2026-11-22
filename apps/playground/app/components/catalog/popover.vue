<script setup lang="ts">
import {
  UIButton,
  UIFormActions,
  UIInput,
  UIPopover,
} from "@connextable/ui";
import { ref } from "vue";

const name = ref("김민아");
const draft = ref(name.value);

function resetDraft(open: boolean) {
  if (open) draft.value = name.value;
}

function save(close: () => void) {
  name.value = draft.value.trim();
  close();
}
</script>

<template>
  <UIPopover
    :trigger-label="`표시 이름 · ${name}`"
    title="프로필 편집"
    description="팀원에게 표시할 이름을 바꿉니다."
    @update:open="resetDraft"
  >
    <template #body="{ close }">
      <div class="ui-field-layout ui-field">
        <label class="ui-field-layout">표시 이름 <UIInput v-model="draft" /></label>
        <UIFormActions>
          <UIButton size="sm" :disabled="!draft.trim()" @click="save(close)">저장</UIButton>
        </UIFormActions>
      </div>
    </template>
  </UIPopover>
</template>
