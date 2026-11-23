<script setup lang="ts">
import { Primitive } from "@sectile/vue/primitive";
import { computed, shallowRef } from "vue";
import { definedControlAttrs } from "../control-attrs";
import { useFormControl, type UIFormControlFlags } from "./form-control";

const props = withDefaults(defineProps<{
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  getValue?: () => unknown;
  reset?: () => void;
  prepareSubmission?: () => void;
}>(), { disabled: undefined, readonly: undefined, required: undefined });
defineSlots<{ default(flags: UIFormControlFlags): unknown }>();

const element = shallowRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
function setElement(value: unknown) {
  element.value = value instanceof HTMLInputElement || value instanceof HTMLTextAreaElement ? value : null;
}

const { flags, controlProps } = useFormControl({
  element,
  semanticControl: element,
  focusTarget: element,
  validationTarget: element,
  labelMode: "for",
  capabilities: { id: true, name: true, form: true, describedBy: true, invalid: true, disabled: true, readonly: true, required: true },
  getValue: () => props.getValue ? props.getValue() : element.value?.value,
  reset: () => props.reset?.(),
  prepareSubmission: () => props.prepareSubmission?.(),
}, props);

const bindings = computed(() => definedControlAttrs({
  ...controlProps.value,
  disabled: props.disabled ?? controlProps.value.disabled,
  readonly: props.readonly ?? controlProps.value.readonly,
  required: props.required ?? controlProps.value.required,
}));
</script>

<template>
  <Primitive as-child :element-ref="setElement" v-bind="bindings">
    <slot v-bind="flags" />
  </Primitive>
</template>
