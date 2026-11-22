<script setup lang="ts" generic="Receipt = unknown">
import { ChevronRight, FileUp, RotateCcw, X } from "@lucide/vue";
import { FileInputInput } from "@sectile/vue/form/file-input";
import type { FileUploadAdapter, UseFileUploadReturn } from "@sectile/vue/form/file-upload";
import { computed, shallowRef, useTemplateRef, type ShallowUnwrapRef } from "vue";
import UIButton from "../button/UIButton.vue";
import { useInputState } from "../control-attrs";
import UIProgress from "../progress/UIProgress.vue";
import UIFileInput from "./UIFileInput.vue";
import UIFileRow from "./UIFileRow.vue";
import FileUploadAttempt from "./FileUploadAttempt.vue";

const props = withDefaults(defineProps<{
  file?: File | null;
  adapter: FileUploadAdapter<File, Receipt>;
  autoStart?: boolean;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  readonly?: boolean;
}>(), { disabled: undefined, readonly: undefined });

const { disabled, readonly, editable, attrs: stateAttrs } = useInputState(props);

const files = shallowRef<readonly File[]>([]);
const fileInput = useTemplateRef<InstanceType<typeof UIFileInput>>("fileInput");
const file = computed(() => props.file === undefined ? files.value[0] ?? null : props.file);

type Attempt = Pick<UseFileUploadReturn<File, Receipt>, "snapshot" | "error" | "ready" | "start" | "cancel">;
const attempt = useTemplateRef<ShallowUnwrapRef<Attempt>>("attempt");
const state = computed(() => {
  const current = attempt.value?.snapshot?.state;
  return current?.file === file.value ? current : undefined;
});
const progress = computed(() => state.value?.total
  ? 100 * state.value.loaded / state.value.total
  : null);
type UploadStatus = { status?: "queued" | "canceled" | "uploading" | "succeeded" | "failed" };

defineSlots<{
  name?(): unknown;
  picker?(state: { file: File | null; disabled: boolean; readonly: boolean }): unknown;
  status?(state: UploadStatus): unknown;
  upload?(state: UploadStatus): unknown;
  cancel?(): unknown;
}>();
</script>

<template>
  <UIFileRow class="ui-file-upload" v-bind="stateAttrs" :file="file" :size="size" preview
    role="group" aria-label="파일 업로드" :aria-disabled="disabled || undefined"
    :aria-description="readonly ? '읽기 전용' : undefined" :tabindex="readonly ? 0 : undefined">
    <UIFileInput v-if="props.file === undefined && !$slots.picker" ref="fileInput" v-model="files" :disabled="disabled" :readonly="readonly">
      <FileInputInput hidden tabindex="-1" />
    </UIFileInput>
    <FileUploadAttempt v-if="file" ref="attempt" :file="file" :adapter="adapter" :auto-start="autoStart && editable" />
    <template v-if="!file" #icon><FileUp :size="18" /></template>
    <template #name><slot name="name">{{ file?.name ?? '파일 선택' }}</slot></template>
    <template v-if="!readonly && ($slots.picker || props.file === undefined)" #picker>
      <span v-if="$slots.picker" :inert="disabled">
        <slot name="picker" :file="file" :disabled="disabled" :readonly="readonly" />
      </span>
      <UIButton v-else
          icon-only
          size="sm"
          variant="ghost"
          :aria-label="file ? `${file.name} 교체` : '파일 선택'"
          :title="file?.name"
          :disabled="disabled"
          @click="editable && fileInput?.open()"
        >
          <template #leading><ChevronRight /></template>
      </UIButton>
    </template>
    <template #metadata>
      <small class="ui-file-upload__status">
        <slot name="status" :status="state?.status">
          <span v-if="(file && attempt?.error) || state?.status === 'failed'" role="alert">업로드 실패</span>
        </slot>
      </small>
    </template>
    <UIProgress v-if="state?.status === 'uploading'" class="ui-file-upload__progress" :value="progress" label="업로드 진행률" />
    <template v-if="!readonly && file && state?.status !== 'succeeded'" #actions>
      <UIButton
        v-if="state?.status === 'uploading'"
        size="sm"
        :variant="$slots.picker ? 'ghost' : 'outline'"
        :icon-only="!!$slots.picker && !$slots.cancel"
        :aria-label="$slots.picker && !$slots.cancel ? '업로드 취소' : undefined"
        :disabled="disabled"
        @click="editable && attempt?.cancel()"
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
        :disabled="disabled || !attempt?.ready"
        @click="editable && attempt?.start()"
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
