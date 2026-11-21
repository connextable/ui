<script setup lang="ts" generic="Receipt = unknown">
import { RotateCcw, X } from "@lucide/vue";
import { useFileUpload, type FileUploadAdapter } from "@sectile/vue/form/file-upload";
import { computed, toRef, watch } from "vue";
import UIButton from "../button/UIButton.vue";
import UIProgress from "../progress/UIProgress.vue";
import UISpinner from "../progress/UISpinner.vue";
import UIFileRow from "./UIFileRow.vue";

const props = defineProps<{
  file: File;
  adapter: FileUploadAdapter<File, Receipt>;
  autoStart?: boolean;
}>();

const { snapshot, error, ready, start, cancel } = useFileUpload({
  file: toRef(props, "file"),
  adapter: toRef(props, "adapter"),
});
const state = computed(() => snapshot.value?.state);
const progress = computed(() => state.value?.total
  ? 100 * state.value.loaded / state.value.total
  : null);
const autoReady = computed(() => props.autoStart && ready.value
  && state.value?.status === "queued" && state.value.file === props.file);
watch(autoReady, (available) => { if (available) start(); }, { immediate: true, flush: "post" });

defineSlots<{
  name?(): unknown;
  picker?(state: { file: File }): unknown;
  status?(state: { status?: "queued" | "canceled" | "uploading" | "succeeded" | "failed" }): unknown;
  upload?(): unknown;
  cancel?(): unknown;
}>();
</script>

<template>
  <UIFileRow :file="file" preview>
    <template #name><slot name="name">{{ file.name }}</slot></template>
    <template v-if="$slots.picker" #picker><slot name="picker" :file="file" /></template>
    <UIProgress
      v-if="state?.status === 'uploading' && progress !== null"
      :value="progress"
      label="Upload progress"
    />
    <UISpinner v-else-if="state?.status === 'uploading'" label="Upload in progress" />
    <div class="ui-file-upload__status">
      <slot name="status" :status="state?.status">
        <span v-if="state?.status === 'succeeded'" role="status">Upload complete</span>
        <span v-if="error || state?.status === 'failed'" role="alert">Upload failed</span>
      </slot>
    </div>
    <template v-if="state?.status !== 'succeeded'" #actions>
      <UIButton
        v-if="state?.status === 'uploading'"
        size="sm"
        :variant="$slots.picker ? 'ghost' : 'outline'"
        :icon-only="!!$slots.picker && !$slots.cancel"
        :aria-label="$slots.picker && !$slots.cancel ? '업로드 취소' : undefined"
        @click="cancel()"
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
        :disabled="!ready"
        @click="start()"
      >
        <template v-if="$slots.picker && !$slots.upload" #leading><RotateCcw /></template>
        <slot v-if="!$slots.picker || $slots.upload" name="upload">{{ state?.status === 'failed' ? 'Retry' : 'Upload' }}</slot>
      </UIButton>
    </template>
  </UIFileRow>
</template>

<style scoped>
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
