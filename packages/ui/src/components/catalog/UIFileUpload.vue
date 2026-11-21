<script setup lang="ts" generic="Receipt = unknown">
import { FileUp, RotateCcw, X } from "@lucide/vue";
import type { FileUploadAdapter, UseFileUploadReturn } from "@sectile/vue/form/file-upload";
import { computed, useTemplateRef, type ShallowUnwrapRef } from "vue";
import UIButton from "../button/UIButton.vue";
import UIProgress from "../progress/UIProgress.vue";
import UIFileRow from "./UIFileRow.vue";
import FileUploadAttempt from "./FileUploadAttempt.vue";

const props = defineProps<{
  file?: File | null;
  adapter: FileUploadAdapter<File, Receipt>;
  autoStart?: boolean;
  size?: "sm" | "md" | "lg";
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
type UploadStatus = { status?: "queued" | "canceled" | "uploading" | "succeeded" | "failed" };

defineSlots<{
  name?(): unknown;
  picker?(state: { file: File | null }): unknown;
  status?(state: UploadStatus): unknown;
  upload?(state: UploadStatus): unknown;
  cancel?(): unknown;
}>();
</script>

<template>
  <UIFileRow class="ui-file-upload" :file="file" :size="size" preview>
    <FileUploadAttempt v-if="file" ref="attempt" :file="file" :adapter="adapter" :auto-start="autoStart" />
    <template v-if="!file" #icon><FileUp :size="18" /></template>
    <template #name><slot name="name">{{ file?.name ?? '파일 선택' }}</slot></template>
    <template v-if="$slots.picker" #picker><slot name="picker" :file="file ?? null" /></template>
    <template #metadata>
      <small class="ui-file-upload__status">
        <slot name="status" :status="state?.status">
          <span v-if="(file && attempt?.error) || state?.status === 'failed'" role="alert">업로드 실패</span>
        </slot>
      </small>
    </template>
    <UIProgress v-if="state?.status === 'uploading'" class="ui-file-upload__progress" :value="progress" label="업로드 진행률" />
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
        <slot v-if="!$slots.picker || $slots.upload" name="upload" :status="state?.status">{{ state?.status === 'failed' ? 'Retry' : 'Upload' }}</slot>
      </UIButton>
    </template>
  </UIFileRow>
</template>

<style scoped>
.ui-file-upload {
  inline-size: 22rem;
  max-inline-size: 100%;
}

.ui-file-upload__progress {
  --ui-progress-height: 2px;
  position: absolute;
  inset-inline: var(--ui-space-sm);
  inset-block-end: 2px;
  pointer-events: none;
}

.ui-file-upload__status:empty {
  display: none;
}

.ui-file-upload__status {
  min-inline-size: 0;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ui-file-upload__status :deep([role="alert"]) {
  color: var(--ui-color-danger);
}
</style>
