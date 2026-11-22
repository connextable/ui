<script setup lang="ts" generic="ID extends string, Receipt">
import type { FileUploadItem, FileUploadItemSnapshot } from "@sectile/vue/form/file-upload";
import { computed, type Ref } from "vue";
import UIButton from "../button/UIButton.vue";
import { inputStateAttrs } from "../control-attrs";
import UIProgress from "../progress/UIProgress.vue";
import UIFileRow from "./UIFileRow.vue";

const props = defineProps<{
  item: FileUploadItem<ID, File>;
  observe: (id: () => ID) => Readonly<Ref<FileUploadItemSnapshot<File, Receipt> | undefined>>;
  disabled: boolean;
  readonly: boolean;
}>();
defineEmits<{ start: []; cancel: [] }>();

const snapshot = props.observe(() => props.item.id);
const editable = computed(() => !props.disabled && !props.readonly);
const state = computed(() => snapshot.value?.state);
const status = computed(() => state.value?.status ?? "queued");
const progress = computed(() => state.value?.total ? 100 * state.value.loaded / state.value.total : null);
const labels = { queued: "대기", uploading: "전송 중", succeeded: "완료", failed: "실패", canceled: "취소됨" };
</script>

<template>
  <li>
    <UIFileRow :file="state?.file ?? item.file" v-bind="inputStateAttrs(disabled, readonly)">
      <template #metadata><small :data-status="status">{{ labels[status] }}</small></template>
      <template v-if="editable && status === 'uploading'" #actions>
        <UIButton size="sm" variant="ghost" :aria-label="`${props.item.file.name} 전송 취소`" @click="$emit('cancel')">취소</UIButton>
      </template>
      <template v-else-if="editable && (status === 'failed' || status === 'canceled')" #actions>
        <UIButton size="sm" variant="ghost" :aria-label="`${props.item.file.name} 다시 시도`" @click="$emit('start')">다시 시도</UIButton>
      </template>
      <UIProgress v-if="status === 'uploading'" class="ui-file-upload-queue__progress" :value="progress" :label="`${props.item.file.name} 전송 진행률`" />
    </UIFileRow>
  </li>
</template>

<style scoped>
.ui-file-upload-queue__progress {
  --ui-progress-height: 2px;
  position: absolute;
  inset-inline: var(--ui-space-sm);
  inset-block-end: 2px;
  pointer-events: none;
}
</style>
