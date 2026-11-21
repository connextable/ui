<script setup lang="ts" generic="Receipt = unknown">
import { useFileUpload, type FileUploadAdapter } from "@sectile/vue/form/file-upload";
import { computed, toRef } from "vue";
import UIButton from "../button/UIButton.vue";
import UIProgress from "../progress/UIProgress.vue";
import UISpinner from "../progress/UISpinner.vue";
import UIFileRow from "./UIFileRow.vue";

const props = defineProps<{
  file: File;
  adapter: FileUploadAdapter<File, Receipt>;
}>();

const { snapshot, error, ready, start, cancel } = useFileUpload({
  file: toRef(props, "file"),
  adapter: toRef(props, "adapter"),
});
const state = computed(() => snapshot.value?.state);
const progress = computed(() => state.value?.total
  ? 100 * state.value.loaded / state.value.total
  : null);

defineSlots<{
  name?(): unknown;
  status?(state: { status?: "queued" | "canceled" | "uploading" | "succeeded" | "failed" }): unknown;
  upload?(): unknown;
  cancel?(): unknown;
}>();
</script>

<template>
  <UIFileRow :file="file" preview>
    <template #name><slot name="name">{{ file.name }}</slot></template>
    <UIProgress
      v-if="state?.status === 'uploading' && progress !== null"
      :value="progress"
      label="Upload progress"
    />
    <UISpinner v-else-if="state?.status === 'uploading'" label="Upload in progress" />
    <slot name="status" :status="state?.status">
      <span v-if="state?.status === 'succeeded'" role="status">Upload complete</span>
      <span v-if="error || state?.status === 'failed'" role="alert">Upload failed</span>
    </slot>
    <template v-if="state?.status !== 'succeeded'" #actions>
      <UIButton v-if="state?.status === 'uploading'" size="sm" variant="outline" @click="cancel()">
        <slot name="cancel">Cancel</slot>
      </UIButton>
      <UIButton v-else size="sm" :disabled="!ready" @click="start()">
        <slot name="upload">{{ state?.status === 'failed' ? 'Retry' : 'Upload' }}</slot>
      </UIButton>
    </template>
  </UIFileRow>
</template>
