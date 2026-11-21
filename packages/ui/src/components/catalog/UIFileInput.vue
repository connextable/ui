<script setup lang="ts">
import { Paperclip, X } from "@lucide/vue";
import {
  FileInputClear,
  FileInputDropzone,
  FileInputInput,
  FileInputRoot,
  FileInputTrigger,
  type FileInputErrorCode,
  type FileInputRootExpose,
  type FileInputRootProps,
  type FileInputSlotProps,
} from "@sectile/vue/form/file-input";
import { computed, ref, useId, useTemplateRef } from "vue";
import UIButton from "../button/UIButton.vue";
import { definedControlAttrs } from "../control-attrs";
import UIFileRow from "./UIFileRow.vue";

defineOptions({ inheritAttrs: false });
const props = withDefaults(defineProps<FileInputRootProps & {
  label?: string;
  hint?: string;
  pickerLabel?: string;
  variant?: "compact" | "dropzone";
  preview?: boolean;
}>(), { disabled: undefined, readonly: undefined, required: undefined, variant: "compact" });

defineSlots<{
  default?(state: FileInputSlotProps): unknown;
}>();

const picker = useTemplateRef<InstanceType<typeof FileInputRoot>>("picker");
const rootProps = computed(() => {
  const { label, hint, pickerLabel, variant, preview, ...nativeProps } = props;
  return definedControlAttrs(nativeProps);
});
const id = useId();
const dragging = ref(false);
const fileKeys = new WeakMap<File, number>();
let nextFileKey = 0;

const errors: Partial<Record<FileInputErrorCode, string>> = {
  "form-file-count-exceeded": "선택할 수 있는 파일 개수를 초과했습니다.",
  "form-file-size-exceeded": "파일 하나가 허용 용량을 초과했습니다.",
  "form-file-total-size-exceeded": "전체 파일 용량이 제한을 초과했습니다.",
  "form-file-type-rejected": "허용되지 않는 파일 형식입니다.",
  "dom.file-input-directory-rejected": "폴더 대신 파일을 선택하세요.",
};

function fileRows(files: readonly File[]) {
  const occurrences = new Map<File, number>();
  return files.map((file) => {
    if (!fileKeys.has(file)) fileKeys.set(file, nextFileKey++);
    const occurrence = occurrences.get(file) ?? 0;
    occurrences.set(file, occurrence + 1);
    return { file, key: `${fileKeys.get(file)}-${occurrence}` };
  });
}

function remove(index: number, state: FileInputSlotProps) {
  if (state.disabled || state.readonly) return;
  const next = state.files.filter((_, position) => position !== index);
  const changed = next.length ? picker.value?.selectFiles(next) : picker.value?.clear();
  const button = trigger.value?.element;
  if (changed && button instanceof HTMLElement) button.focus();
}

const trigger = useTemplateRef<InstanceType<typeof FileInputTrigger>>("trigger");

function enter(event: DragEvent, state: FileInputSlotProps) {
  if (!state.disabled && !state.readonly && event.dataTransfer?.types.includes("Files")) dragging.value = true;
}

function leave(event: DragEvent) {
  if (event.currentTarget instanceof HTMLElement &&
      event.relatedTarget instanceof Node &&
      event.currentTarget.contains(event.relatedTarget)) return;
  dragging.value = false;
}

function paste(event: ClipboardEvent, state: FileInputSlotProps) {
  const files = event.clipboardData?.files;
  if (state.disabled || state.readonly || !files?.length) return;
  event.preventDefault();
  picker.value?.selectFiles(files);
}

defineExpose({
  get element() { return picker.value?.element ?? null; },
  get input() { return picker.value?.input ?? null; },
  get files() { return picker.value?.files ?? []; },
  open: () => picker.value?.open() ?? false,
  focus: () => picker.value?.focus() ?? false,
  clear: () => picker.value?.clear() ?? false,
  selectFiles: (files) => picker.value?.selectFiles(files) ?? false,
  refresh: () => picker.value?.refresh() ?? false,
} satisfies FileInputRootExpose);
</script>

<template>
  <FileInputRoot ref="picker" v-bind="{ ...rootProps, ...$attrs }" v-slot="state">
    <slot v-if="$slots.default" v-bind="state" />
    <div v-else class="ui-file-input">
      <component
        :is="variant === 'dropzone' ? FileInputDropzone : 'div'"
        class="ui-field-control ui-file-input__picker"
        data-ui-control-size="md"
        :data-layout="variant"
        :data-dragging="dragging && !state.disabled && !state.readonly || undefined"
        :data-ui-readonly="state.readonly || undefined"
        :aria-invalid="state.error ? 'true' : undefined"
        @dragenter="variant === 'dropzone' && enter($event, state)"
        @dragleave="leave"
        @dragend="dragging = false"
        @drop="dragging = false"
        @paste="paste($event, state)"
      >
        <FileInputInput class="ui-file-input__native" tabindex="-1" :aria-label="label" />
        <div v-if="variant === 'dropzone'" class="ui-file-input__description">
          <span class="ui-file-input__mark" aria-hidden="true"><Paperclip :size="20" /></span>
          <strong>{{ dragging ? '파일을 놓으세요' : '파일을 끌어 놓거나 붙여넣으세요' }}</strong>
        </div>
        <div class="ui-file-input__controls">
          <FileInputTrigger
            ref="trigger"
            as-child
            :aria-describedby="[hint && `${id}-hint`, state.error && `${id}-error`].filter(Boolean).join(' ') || undefined"
          >
            <UIButton size="sm" variant="outline">
              <template v-if="variant === 'compact'" #leading><Paperclip /></template>
              {{ pickerLabel ?? (state.files.length ? '다시 선택' : '파일 선택') }}
            </UIButton>
          </FileInputTrigger>
          <span v-if="variant === 'compact'" class="ui-file-input__status" role="status">
            {{ state.files.length ? `${state.files.length}개 선택됨` : '선택한 파일 없음' }}
          </span>
          <FileInputClear v-if="state.files.length > 1 && !state.readonly && !state.disabled" as-child>
            <UIButton size="sm" variant="ghost">모두 지우기</UIButton>
          </FileInputClear>
        </div>
        <small v-if="hint" :id="`${id}-hint`" class="ui-file-input__hint">{{ hint }}</small>
      </component>
      <p v-if="state.error" :id="`${id}-error`" class="ui-file-input__error" role="alert">
        {{ errors[state.error.code] ?? '파일을 선택하지 못했습니다.' }}
      </p>
      <TransitionGroup tag="ul" name="ui-file" class="ui-file-input__files" aria-label="선택한 파일">
        <li v-for="({ file, key }, index) in fileRows(state.files)" :key="key">
          <UIFileRow :file="file" :preview="preview">
            <template v-if="!state.disabled && !state.readonly" #actions>
              <UIButton size="sm" variant="ghost" icon-only :aria-label="`${file.name} 제거`" @click="remove(index, state)">
                <template #leading><X /></template>
              </UIButton>
            </template>
          </UIFileRow>
        </li>
      </TransitionGroup>
    </div>
  </FileInputRoot>
</template>
