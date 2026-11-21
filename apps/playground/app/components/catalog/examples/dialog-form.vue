<script setup lang="ts">
import { UIButton, UIDialog, UIDialogContent, UIDialogDescription, UIDialogOverlay, UIDialogPortal, UIDialogTitle, UIDialogTrigger, UIInput } from "@connextable/ui";
import { ref, useId, useTemplateRef } from "vue";

const open = ref(false);
const project = ref("");
const draft = ref("");
const error = ref("");
const formID = useId();
const titleInput = useTemplateRef<{ focus(): void }>("titleInput");

function resetForm(visible: boolean) {
  if (!visible) return;
  draft.value = "";
  error.value = "";
}

function createProject() {
  const title = draft.value.trim();
  if (title.length < 2) {
    error.value = "프로젝트 이름을 두 글자 이상 입력하세요.";
    titleInput.value?.focus();
    return;
  }
  project.value = title;
  open.value = false;
}
</script>

<template>
  <div class="project-example">
    <UIDialog v-model:open="open" @update:open="resetForm">
      <UIDialogTrigger as-child><UIButton variant="outline">프로젝트 만들기</UIButton></UIDialogTrigger>
      <UIDialogPortal>
        <UIDialogOverlay />
        <UIDialogContent>
          <UIDialogTitle>새 프로젝트</UIDialogTitle>
          <UIDialogDescription>작업 목록에 표시할 프로젝트 이름을 정합니다.</UIDialogDescription>
          <form :id="formID" class="ui-field-layout" @submit.prevent="createProject">
            <label class="ui-field-layout">
              프로젝트 이름
              <UIInput
                ref="titleInput" v-model="draft" placeholder="예시: 고객 상담 개선"
                :aria-invalid="error ? 'true' : undefined" :aria-describedby="error ? `${formID}-error` : undefined"
                @update:model-value="error = ''"
              />
            </label>
            <p v-if="error" :id="`${formID}-error`" class="project-error" role="alert">{{ error }}</p>
          </form>
          <template #actions><UIButton type="submit" :form="formID">만들기</UIButton></template>
        </UIDialogContent>
      </UIDialogPortal>
    </UIDialog>
    <span v-if="project" role="status">프로젝트를 만들었습니다 · {{ project }}</span>
  </div>
</template>

<style scoped>
.project-example { display: flex; flex-wrap: wrap; align-items: center; gap: var(--ui-space-md); }
.project-error { margin: 0; color: var(--ui-color-danger); font-size: var(--ui-font-size-body-sm); }
</style>
