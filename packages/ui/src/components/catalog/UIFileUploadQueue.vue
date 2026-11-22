<script setup lang="ts" generic="ID extends string = string, Receipt = unknown">
import { useFileUploadGroup, type FileUploadAdapter, type FileUploadItem } from "@sectile/vue/form/file-upload";
import { computed, toRef } from "vue";
import UIButton from "../button/UIButton.vue";
import { useInputState } from "../control-attrs";
import FileUploadQueueRow from "./FileUploadQueueRow.vue";

const props = withDefaults(defineProps<{
  items: readonly FileUploadItem<ID, File>[];
  adapter: FileUploadAdapter<File, Receipt>;
  concurrency?: number;
  label?: string;
  disabled?: boolean;
  readonly?: boolean;
}>(), { label: "파일 전송 대기열", disabled: undefined, readonly: undefined });

const { disabled, readonly, editable, attrs: stateAttrs } = useInputState(props);
const queue = useFileUploadGroup({ items: toRef(props, "items"), adapter: toRef(props, "adapter"), concurrency: () => props.concurrency ?? 3 });
const { snapshot, ready, error, useItem } = queue;
const busy = computed(() => Boolean(snapshot.value?.state.active || snapshot.value?.state.pending));
const completed = computed(() => snapshot.value?.state.counts.succeeded ?? 0);
const allComplete = computed(() => props.items.length > 0 && completed.value === props.items.length);

function start(ids?: readonly ID[]) {
  return editable.value && ready.value ? queue.start(ids) : undefined;
}

function cancel(ids?: readonly ID[]) {
  return editable.value && ready.value ? queue.cancel(ids) : undefined;
}

function reset() {
  return editable.value && ready.value && !busy.value ? queue.reset() : undefined;
}

defineExpose({ start, cancel, reset, snapshot, getItem: queue.getItem });
</script>

<template>
  <div class="ui-file-upload-queue" v-bind="stateAttrs" role="group" :aria-label="label"
    :aria-disabled="disabled || undefined" :aria-description="readonly ? '읽기 전용' : undefined" :tabindex="readonly ? 0 : undefined">
    <ul class="ui-file-upload-queue__items">
      <FileUploadQueueRow v-for="item in items" :key="item.id" :item="item" :observe="useItem"
        :disabled="disabled" :readonly="readonly"
        @start="start([item.id])" @cancel="cancel([item.id])" />
    </ul>
    <div class="ui-file-upload-queue__footer">
      <output aria-live="polite">{{ completed }} / {{ items.length }} 완료</output>
      <span v-if="error" role="alert">전송 대기열을 준비하지 못했습니다.</span>
      <template v-if="!readonly || disabled">
        <UIButton v-if="busy" size="sm" variant="outline" :disabled="disabled || !ready" @click="cancel()">전송 취소</UIButton>
        <UIButton v-else-if="allComplete" size="sm" variant="outline" :disabled="disabled || !ready" @click="reset()">초기화</UIButton>
        <UIButton v-else size="sm" :disabled="disabled || !ready || !items.length" @click="start()">전송 시작</UIButton>
      </template>
    </div>
  </div>
</template>

<style scoped>
.ui-file-upload-queue,
.ui-file-upload-queue__items {
  display: grid;
  gap: var(--ui-space-sm);
  min-inline-size: 0;
}

.ui-file-upload-queue {
  inline-size: min(100%, 24rem);
}

.ui-file-upload-queue__items {
  gap: var(--ui-space-xs);
  margin: 0;
  padding: 0;
  list-style: none;
}

.ui-file-upload-queue__footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--ui-space-sm);
  color: var(--ui-color-text-muted);
  font-size: var(--ui-font-size-metadata);
}
</style>
