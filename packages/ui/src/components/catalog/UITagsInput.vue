<script setup lang="ts">
import { applyTagsInputEvent, type TagsInputState } from "@sectile/core/tags-input";
import {
  TagsInputInput,
  TagsInputRoot,
  type TagsInputRootProps,
  type TagsInputRootSlotProps,
} from "@sectile/vue/tags-input";
import { computed, nextTick, ref, type SetupContext } from "vue";
import { resolveClearFocus } from "../clear/clear-focus";
import { TagsInputClearScope, UITagsInputClear } from "../clear/selection-clear-parts";
import { useClearableValue, type ClearableProps } from "../clear/clearable";
import { definedControlAttrs } from "../control-attrs";
import { useCompositeValueForm } from "../form/composite-value";
import UITagChips from "./UITagChips.vue";

defineOptions({ inheritAttrs: false, __sectileFormLabelMode: "labelledby" });
const props = withDefaults(defineProps<TagsInputRootProps & ClearableProps & {
  size?: "sm" | "md" | "lg";
  variant?: "outline" | "soft";
  placeholder?: string;
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
  const { size, variant, placeholder, clearable, clearLabel, splitPaste, reorderable, name, form, required, ...nativeProps } = props;
  return definedControlAttrs({
    ...nativeProps,
    removeLabel: nativeProps.removeLabel ?? ((tag: string) => `${tag} 삭제`),
  });
});
const notice = ref("");
const tags = useClearableValue(() => props.modelValue, props.defaultValue ?? [], value => emit("update:modelValue", value));
const draft = useClearableValue(() => props.inputValue, props.defaultInputValue ?? "", value => emit("update:inputValue", value));
const renderForm = useCompositeValueForm(props, {
  values: () => tags.value.value,
  focus: '[data-scope="tags-input"][data-part="input"]',
  requiredMessage: "태그를 하나 이상 추가하세요.",
  reset() {
    tags.reset();
    draft.reset();
    notice.value = "";
  },
});
function FormValue(_: unknown, { slots }: SetupContext) {
  return renderForm(bindings => slots.default?.(bindings)[0]);
}

function updateValue(value: readonly string[]) {
  notice.value = "";
  tags.set(value);
}

async function clearControlled(event: MouseEvent) {
  const restoreFocus = resolveClearFocus(event);
  updateValue([]);
  await nextTick();
  restoreFocus();
}

function paste(event: ClipboardEvent, scope: TagsInputRootSlotProps) {
  if (!props.splitPaste || scope.disabled || scope.readonly) return;
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
  notice.value = skipped ? `${added}개를 추가하고 ${skipped}개를 제외했습니다.` : `${added}개 추가`;
}

</script>

<template>
  <FormValue v-slot="bindings">
    <TagsInputRoot
      v-bind="{ ...rootProps, ...bindings, ...$attrs, disabled: bindings.disabled, readonly: bindings.readonly }"
      v-slot="state"
      class="ui-field-control ui-inset-frame ui-tags-input"
      :data-ui-control-size="size"
      :data-variant="variant"
      :model-value="tags.value.value"
      :input-value="draft.value.value"
      @update:model-value="updateValue"
      @update:input-value="draft.set"
    >
      <TagsInputClearScope :state="state" :clear="clearControlled">
        <slot v-if="$slots.default" v-bind="state" />
        <template v-else>
          <UITagChips
            :value="state.value"
            :readonly="state.readonly"
            :reorderable="reorderable && !state.readonly && !state.disabled && state.value.length > 1"
            @reorder="updateValue"
          />
          <TagsInputInput
            :placeholder="placeholder ?? '태그 추가'"
            :aria-labelledby="$attrs['aria-labelledby'] ?? bindings['aria-labelledby']"
            :aria-describedby="$attrs['aria-describedby'] ?? bindings['aria-describedby']"
            :aria-invalid="$attrs['aria-invalid'] ?? bindings['aria-invalid']"
            @paste="paste($event, state)"
          />
          <UITagsInputClear
            v-if="clearable && state.value.length && !state.readonly && !state.disabled"
            :aria-label="clearLabel"
          />
          <span v-if="splitPaste" class="ui-tags-input__announcement" role="status">{{ notice }}</span>
        </template>
      </TagsInputClearScope>
    </TagsInputRoot>
  </FormValue>
</template>
