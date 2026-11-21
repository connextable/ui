<script setup lang="ts">
import { applyTagsInputEvent, type TagsInputState } from "@sectile/core/tags-input";
import { X } from "@lucide/vue";
import {
  TagsInputClear,
  TagsInputInput,
  TagsInputRoot,
  type TagsInputRootProps,
  type TagsInputRootSlotProps,
} from "@sectile/vue/tags-input";
import { computed, ref } from "vue";
import { definedControlAttrs } from "../control-attrs";
import UITagChips from "./UITagChips.vue";

defineOptions({ inheritAttrs: false });
const props = withDefaults(defineProps<TagsInputRootProps & {
  size?: "sm" | "md" | "lg";
  variant?: "outline" | "soft";
  placeholder?: string;
  clearable?: boolean;
  splitPaste?: boolean;
  reorderable?: boolean;
}>(), { size: "md", variant: "outline", disabled: undefined, readonly: undefined, required: undefined });
const emit = defineEmits<{
  "update:modelValue": [value: readonly string[]];
  "update:inputValue": [value: string];
}>();
defineSlots<{
  default?(state: TagsInputRootSlotProps): unknown;
}>();

const rootProps = computed(() => {
  const { size, variant, placeholder, clearable, splitPaste, reorderable, ...nativeProps } = props;
  return definedControlAttrs({
    ...nativeProps,
    removeLabel: nativeProps.removeLabel ?? ((tag: string) => `${tag} 삭제`),
  });
});
const notice = ref("");

function updateValue(value: readonly string[]) {
  notice.value = "";
  emit("update:modelValue", value);
}

function paste(event: ClipboardEvent, scope: TagsInputRootSlotProps) {
  if (!props.splitPaste || props.modelValue === undefined || scope.disabled || scope.readonly) return;
  const source = event.clipboardData?.getData("text/plain");
  if (!source || !/[,\r\n]/.test(source) || !(event.target instanceof HTMLInputElement)) return;
  const input = event.target;
  const start = input.selectionStart ?? input.value.length;
  const end = input.selectionEnd ?? input.value.length;
  const candidate = input.value.slice(0, start) + source + input.value.slice(end);
  const drafts = candidate.split(/[,\r\n]+/).filter((tag) => tag.trim());
  if (!drafts.length) return;

  let state: TagsInputState = { tags: scope.value, draft: "", current: null };
  let skipped = 0;
  for (const draft of drafts) {
    const result = applyTagsInputEvent(state, { type: "add", value: draft }, props.policies);
    if (result.ok) state = result.value.state;
    else skipped++;
  }

  event.preventDefault();
  // Leave the active draft intact when all candidates were rejected.
  if (state.tags !== scope.value) {
    updateValue(state.tags);
    input.value = "";
    input.dispatchEvent(new Event("input", { bubbles: true }));
  }
  const added = drafts.length - skipped;
  notice.value = skipped ? `${added}개 추가 · ${skipped}개 제외` : `${added}개 추가`;
}

function clearFocus(event: MouseEvent) {
  const button = event.currentTarget;
  if (!(button instanceof HTMLElement)) return;
  button.closest(".ui-tags-input")?.querySelector<HTMLInputElement>('[data-part="input"]')?.focus();
}
</script>

<template>
  <TagsInputRoot
    v-bind="{ ...rootProps, ...$attrs }"
    v-slot="state"
    class="ui-field-control ui-inset-frame ui-tags-input"
    :data-ui-control-size="size"
    :data-variant="variant"
    @update:model-value="updateValue"
    @update:input-value="emit('update:inputValue', $event)"
  >
    <slot v-if="$slots.default" v-bind="state" />
    <template v-else>
      <UITagChips
        :value="state.value"
        :readonly="state.readonly"
        :reorderable="reorderable && modelValue !== undefined && !state.readonly && !state.disabled && state.value.length > 1"
        @reorder="updateValue"
      />
      <TagsInputInput
        :placeholder="placeholder ?? '태그 추가'"
        :aria-labelledby="$attrs['aria-labelledby']"
        :aria-describedby="$attrs['aria-describedby']"
        @paste="paste($event, state)"
      />
      <TagsInputClear
        v-if="clearable && state.value.length && !state.readonly && !state.disabled"
        aria-label="태그 모두 지우기"
        @click="clearFocus"
      ><X aria-hidden="true" /></TagsInputClear>
      <span v-if="splitPaste" class="ui-tags-input__announcement" role="status">{{ notice }}</span>
    </template>
  </TagsInputRoot>
</template>
