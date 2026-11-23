<script setup lang="ts">
import { ChevronRight, Paperclip } from "@lucide/vue";
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
import UIClearButton from "../clear/UIClearButton.vue";
import type { ClearableProps } from "../clear/clearable";
import { definedControlAttrs, inputStateAttrs } from "../control-attrs";
import UIFileRow from "./UIFileRow.vue";

defineOptions({ inheritAttrs: false });
const props = withDefaults(defineProps<FileInputRootProps & ClearableProps & {
  label?: string;
  hint?: string;
  pickerLabel?: string;
  variant?: "compact" | "dropzone";
  preview?: boolean;
  size?: "sm" | "md" | "lg";
}>(), { disabled: undefined, readonly: undefined, required: undefined, variant: "compact", size: "md", clearable: true });

defineSlots<{
  default?(state: FileInputSlotProps): unknown;
}>();

const picker = useTemplateRef<InstanceType<typeof FileInputRoot>>("picker");
const rootProps = computed(() => {
  const { label, hint, pickerLabel, variant, preview, size, clearable, clearLabel, ...nativeProps } = props;
  return definedControlAttrs(nativeProps);
});
const id = useId();
const dragging = ref(false);
const inlineFile = computed(() => props.variant === "compact" && !props.policy?.multiple);
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
  if (changed) focusTrigger();
}

const trigger = useTemplateRef<InstanceType<typeof FileInputTrigger>>("trigger");

function focusTrigger() {
  const button = trigger.value?.element;
  if (button instanceof HTMLElement) button.focus();
}

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
    <div v-else class="ui-file-input" :data-inline-file="inlineFile || undefined"
      v-bind="inputStateAttrs(state.disabled, state.readonly)"
      :role="state.readonly && !state.disabled ? 'group' : undefined"
      :aria-label="state.readonly ? label ?? '선택한 파일' : undefined"
      :aria-description="state.readonly ? '읽기 전용' : undefined"
      :tabindex="state.readonly && !state.disabled ? 0 : undefined"
      @paste="paste($event, state)">
      <FileInputInput class="ui-file-input__native" tabindex="-1" :aria-label="label" />
      <template v-if="inlineFile">
        <UIFileRow
          :file="state.files[0]"
          :size="size"
          :preview="preview"
          v-bind="inputStateAttrs(state.disabled, state.readonly)"
          :aria-invalid="state.error ? 'true' : undefined"
        >
          <template v-if="!state.files.length" #icon><Paperclip /></template>
          <template v-if="!state.files.length" #name>{{ state.readonly ? '선택한 파일 없음' : pickerLabel ?? '파일 선택' }}</template>
          <template v-if="!state.readonly || state.disabled" #picker>
            <FileInputTrigger
              ref="trigger"
              as-child
              :aria-label="state.files[0] ? `${state.files[0].name} 교체` : pickerLabel ?? '파일 선택'"
              :title="state.files[0]?.name"
              :aria-describedby="[hint && `${id}-hint`, state.error && `${id}-error`].filter(Boolean).join(' ') || undefined"
            >
              <UIButton size="sm" variant="ghost" icon-only :class="{ 'ui-file-input__replace': state.files[0] }">
                <template v-if="!state.files[0]" #leading><ChevronRight /></template>
              </UIButton>
            </FileInputTrigger>
          </template>
          <template v-if="clearable && state.files[0] && !state.disabled && !state.readonly" #actions>
            <UIClearButton :label="clearLabel ?? `${state.files[0].name} 제거`" @click="remove(0, state)" />
          </template>
        </UIFileRow>
        <small v-if="hint" :id="`${id}-hint`" class="ui-file-input__hint">{{ hint }}</small>
      </template>
      <template v-else>
        <FileInputDropzone v-if="variant === 'dropzone' && (!state.readonly || state.disabled)" as-child>
          <FileInputTrigger
            ref="trigger"
            class="ui-field-control ui-file-input__picker"
            data-layout="dropzone"
            :data-ui-control-size="size"
            :data-dragging="dragging && !state.disabled && !state.readonly || undefined"
            :data-ui-readonly="state.readonly || undefined"
            :aria-label="pickerLabel ?? (state.files.length ? '다시 선택' : '파일 선택')"
            :aria-describedby="[`${id}-instructions`, hint && `${id}-hint`, state.error && `${id}-error`].filter(Boolean).join(' ')"
            :aria-invalid="state.error ? 'true' : undefined"
            @dragenter="enter($event, state)"
            @dragleave="leave"
            @dragend="dragging = false"
            @drop="dragging = false"
          >
            <Paperclip class="ui-file-input__mark" aria-hidden="true" />
            <strong>{{ dragging ? '파일을 놓으세요' : pickerLabel ?? (state.files.length ? '다시 선택' : '파일 선택') }}</strong>
            <span :id="`${id}-instructions`" class="ui-file-input__hint">파일을 끌어 놓거나 붙여넣을 수 있어요.</span>
            <small v-if="hint" :id="`${id}-hint`" class="ui-file-input__hint">{{ hint }}</small>
          </FileInputTrigger>
        </FileInputDropzone>
        <div
          v-if="variant === 'compact' || state.readonly || clearable && state.files.length > 1 && !state.disabled"
          class="ui-file-input__options"
          :data-layout="variant"
        >
          <div class="ui-file-input__controls">
            <template v-if="variant === 'compact' || state.readonly">
              <FileInputTrigger
                v-if="!state.readonly || state.disabled"
                ref="trigger"
                as-child
                :aria-describedby="[hint && `${id}-hint`, state.error && `${id}-error`].filter(Boolean).join(' ') || undefined"
                :aria-invalid="state.error ? 'true' : undefined"
              >
                <UIButton :size="size" variant="outline">
                  <template #leading><Paperclip /></template>
                  {{ pickerLabel ?? (state.files.length ? '다시 선택' : '파일 선택') }}
                </UIButton>
              </FileInputTrigger>
              <span class="ui-file-input__status" role="status">
                {{ state.files.length ? `${state.files.length}개 선택됨` : '선택한 파일 없음' }}
              </span>
            </template>
            <FileInputClear v-if="clearable && state.files.length > 1 && !state.readonly && !state.disabled" as-child>
              <UIClearButton :label="clearLabel ?? '파일 모두 지우기'" @click="focusTrigger" />
            </FileInputClear>
          </div>
          <small v-if="(variant === 'compact' || state.readonly) && hint" :id="`${id}-hint`" class="ui-file-input__hint">{{ hint }}</small>
        </div>
      </template>
      <p v-if="state.error" :id="`${id}-error`" class="ui-file-input__error" role="alert">
        {{ errors[state.error.code] ?? '파일을 선택하지 못했습니다.' }}
      </p>
      <TransitionGroup v-if="!inlineFile" tag="ul" name="ui-file" class="ui-file-input__files" aria-label="선택한 파일">
        <li v-for="({ file, key }, index) in fileRows(state.files)" :key="key">
          <UIFileRow :file="file" :size="size" :preview="preview" v-bind="inputStateAttrs(state.disabled, state.readonly)">
            <template v-if="clearable && !state.disabled && !state.readonly" #actions>
              <UIClearButton :label="`${file.name} 제거`" @click="remove(index, state)" />
            </template>
          </UIFileRow>
        </li>
      </TransitionGroup>
    </div>
  </FileInputRoot>
</template>
