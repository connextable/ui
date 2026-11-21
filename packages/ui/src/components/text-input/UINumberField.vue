<script setup lang="ts">
import { NumberField, type NumberFieldExpose, type NumberFieldProps } from "@sectile/vue/number-field";
import { ref, useId, useTemplateRef } from "vue";
import { definedControlAttrs } from "../control-attrs";

defineOptions({ inheritAttrs: false, __sectileFormLabelMode: "for" });

const { unit, disabled = undefined, readonly = undefined, required = undefined, ...fieldProps } =
  defineProps<NumberFieldProps & { unit?: string }>();
const emit = defineEmits<{ "update:modelValue": [value: string | null] }>();

const control = useTemplateRef<InstanceType<typeof NumberField>>("control");
const pointerFocus = ref(false);
const unitId = useId();
const unavailable = { status: "rejected", reason: "unavailable" } as const;

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
</script>

<template>
  <span
    class="ui-number-control"
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
      @update:model-value="emit('update:modelValue', $event)"
    />
    <span v-if="unit" :id="unitId" class="ui-numeric-unit">{{ unit }}</span>
  </span>
</template>
