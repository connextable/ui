<script setup lang="ts">
import { NumberField, type NumberFieldExpose, type NumberFieldProps } from "@sectile/vue/number-field";
import { provideFormControlReset } from "@sectile/vue/form-boundary";
import { computed, nextTick, ref, useId, useTemplateRef, watch } from "vue";
import UIClearButton from "../clear/UIClearButton.vue";
import type { ClearableProps } from "../clear/clearable";
import { definedControlAttrs, useInputState } from "../control-attrs";

defineOptions({ inheritAttrs: false, __sectileFormLabelMode: "for" });

const { unit, clearable, clearLabel, disabled = undefined, readonly = undefined, required = undefined, ...fieldProps } =
  defineProps<NumberFieldProps & ClearableProps & { unit?: string; placeholder?: string }>();
const emit = defineEmits<{ "update:modelValue": [value: string | null] }>();

const control = useTemplateRef<InstanceType<typeof NumberField>>("control");
const pointerFocus = ref(false);
const unitId = useId();
const unavailable = { status: "rejected", reason: "unavailable" } as const;
const state = useInputState({ get disabled() { return disabled; }, get readonly() { return readonly; } });
const initialText = fieldProps.defaultValue ?? "";
const text = ref(fieldProps.modelValue === undefined ? initialText : fieldProps.modelValue ?? "");
const canClear = computed(() => clearable && text.value !== "" && state.editable.value);
watch(() => fieldProps.modelValue, value => {
  if (value !== undefined) text.value = value ?? "";
});
provideFormControlReset(() => { text.value = fieldProps.modelValue === undefined ? initialText : fieldProps.modelValue ?? ""; });

defineExpose<NumberFieldExpose>({
  getText: () => control.value?.getText() ?? null,
  commitValue: async (value) => control.value?.commitValue(value) ?? unavailable,
  clear: async () => control.value?.clear() ?? unavailable,
  stepBy: async (delta) => control.value?.stepBy(delta) ?? unavailable,
});

function inputBindings(attrs: Record<string, unknown>) {
  const { class: _class, style: _style, "aria-describedby": describedBy, ...inputAttrs } = attrs;
  return {
    ...inputAttrs,
    ...definedControlAttrs({
      ...fieldProps,
      disabled,
      readonly,
      required,
      "aria-describedby": [describedBy, unit && unitId].filter(Boolean).join(" ") || undefined,
    }),
  };
}

function focusInput() {
  const input = control.value?.$el;
  if (input instanceof HTMLInputElement) input.focus();
}

function syncText(event: Event) {
  if (event.target instanceof HTMLInputElement) text.value = event.target.value;
}

function updateValue(value: string | null) {
  text.value = value ?? "";
  emit("update:modelValue", value);
}

async function clear() {
  if (!canClear.value) return;
  const result = await control.value?.clear();
  if (result?.status !== "accepted") return;
  await nextTick();
  text.value = control.value?.getText() ?? "";
  focusInput();
}
</script>

<template>
  <span
    class="ui-number-control"
    v-bind="state.attrs.value"
    :class="$attrs.class"
    :style="$attrs.style"
    :data-pointer-focus="pointerFocus || undefined"
    @pointerdown="pointerFocus = true"
    @pointercancel="pointerFocus = false"
    @focusout="pointerFocus = false"
    @click.self="focusInput"
  >
    <NumberField
      ref="control"
      v-bind="inputBindings($attrs)"
      @update:model-value="updateValue"
      @input="syncText"
      @change="syncText"
    />
    <span v-if="unit" :id="unitId" class="ui-numeric-unit">{{ unit }}</span>
    <UIClearButton v-if="canClear" :label="clearLabel ?? '수량 지우기'" @click="clear" />
  </span>
</template>
