<script setup lang="ts" generic="Receipt = unknown">
import { FileUp, RotateCcw, X } from "@lucide/vue";
import type { FileUploadAdapter, UseFileUploadReturn } from "@sectile/vue/form/file-upload";
import { computed, useTemplateRef, type ShallowUnwrapRef } from "vue";
import UIButton from "../button/UIButton.vue";
import UIProgress from "../progress/UIProgress.vue";
import UISpinner from "../progress/UISpinner.vue";
import UIFileRow from "./UIFileRow.vue";
import FileUploadAttempt from "./FileUploadAttempt.vue";

const props = defineProps<{
  file?: File | null;
  adapter: FileUploadAdapter<File, Receipt>;
  autoStart?: boolean;
}>();

type Attempt = Pick<UseFileUploadReturn<File, Receipt>, "snapshot" | "error" | "ready" | "start" | "cancel">;
const attempt = useTemplateRef<ShallowUnwrapRef<Attempt>>("attempt");
const state = computed(() => {
  const current = attempt.value?.snapshot?.state;
  return current?.file === props.file ? current : undefined;
});
const progress = computed(() => state.value?.total
  ? 100 * state.value.loaded / state.value.total
  : null);

defineSlots<{
  name?(): unknown;
  picker?(state: { file: File | null }): unknown;
  status?(state: { status?: "queued" | "canceled" | "uploading" | "succeeded" | "failed" }): unknown;
  upload?(): unknown;
  cancel?(): unknown;
}>();
</script>

<template>
  <UIFileRow class="ui-file-upload" :file="file" preview>
    <FileUploadAttempt v-if="file" ref="attempt" :file="file" :adapter="adapter" :auto-start="autoStart" />
    <template v-if="!file" #icon><FileUp :size="18" /></template>
    <template #name><slot name="name">{{ file?.name ?? '파일 선택' }}</slot></template>
    <template v-if="$slots.picker" #picker><slot name="picker" :file="file ?? null" /></template>
    <UIProgress
      v-if="state?.status === 'uploading' && progress !== null"
      :value="progress"
      label="Upload progress"
    />
    <UISpinner v-else-if="state?.status === 'uploading'" label="Upload in progress" />
    <div class="ui-file-upload__status">
      <slot name="status" :status="state?.status">
        <span v-if="state?.status === 'succeeded'" role="status">Upload complete</span>
        <span v-if="attempt?.error || state?.status === 'failed'" role="alert">Upload failed</span>
      </slot>
    </div>
    <template v-if="file && state?.status !== 'succeeded'" #actions>
      <UIButton
        v-if="state?.status === 'uploading'"
        size="sm"
        :variant="$slots.picker ? 'ghost' : 'outline'"
        :icon-only="!!$slots.picker && !$slots.cancel"
        :aria-label="$slots.picker && !$slots.cancel ? '업로드 취소' : undefined"
        @click="attempt?.cancel()"
      >
        <template v-if="$slots.picker && !$slots.cancel" #leading><X /></template>
        <slot v-if="!$slots.picker || $slots.cancel" name="cancel">Cancel</slot>
      </UIButton>
      <UIButton
        v-else-if="state?.status === 'failed' || state?.status === 'canceled' || (!autoStart && !$slots.picker)"
        size="sm"
        :variant="$slots.picker ? 'ghost' : 'solid'"
        :icon-only="!!$slots.picker && !$slots.upload"
        :aria-label="$slots.picker && !$slots.upload ? '다시 시도' : undefined"
        :disabled="!attempt?.ready"
        @click="attempt?.start()"
      >
        <template v-if="$slots.picker && !$slots.upload" #leading><RotateCcw /></template>
        <slot v-if="!$slots.picker || $slots.upload" name="upload">{{ state?.status === 'failed' ? 'Retry' : 'Upload' }}</slot>
      </UIButton>
    </template>
  </UIFileRow>
</template>

<style scoped>
.ui-file-upload {
  inline-size: 22rem;
  max-inline-size: 100%;
}

.ui-file-upload[data-empty] {
  border-style: dashed;
}

.ui-file-upload__status {
  color: var(--ui-color-text-muted);
  font-size: var(--ui-font-size-metadata);
}

.ui-file-upload__status:empty {
  display: none;
}

.ui-file-upload__status [role="alert"] {
  color: var(--ui-color-danger);
}
</style>
