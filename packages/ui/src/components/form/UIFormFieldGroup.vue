<script setup lang="ts" generic="Value extends object">
import { appendFormFieldPath, encodeFormFieldPath } from "@sectile/form/path";
import { type FormFieldProps, type FormFieldSlotProps } from "@sectile/vue/form";
import { nextTick } from "vue";
import UIFormField from "./UIFormField.vue";
import UIFormFieldGroupControls from "./UIFormFieldGroupControls.vue";

type Key = Extract<keyof Value, string>;
type ModelBindings<Part> = {
  modelValue: Part;
  "onUpdate:modelValue": (value: Part) => void;
};

const { label, description, ...fieldProps } = defineProps<
  Omit<FormFieldProps, "as" | "asChild" | "labelMode"> & {
    label?: string;
    description?: string;
  }
>();
const model = defineModel<Value>({ required: true });
defineSlots<{
  default?(state: FormFieldSlotProps & { field: typeof field; bindModel: typeof bindModel }): unknown;
  label?(state: FormFieldSlotProps): unknown;
  description?(state: FormFieldSlotProps): unknown;
  message?(state: FormFieldSlotProps): unknown;
}>();

// Merge sibling updates until Vue delivers the new group value.
let pending: Value | undefined;

function field<Part extends Key>(key: Part): ModelBindings<Value[Part]> & { name?: string } {
  const name = fieldProps.name === undefined ? undefined : encodeFormFieldPath(appendFormFieldPath(fieldProps.name, [key]));
  return { name, ...bindModel(key) };
}

function bindModel<Part extends Key>(key: Part): ModelBindings<Value[Part]> {
  return {
    modelValue: model.value[key],
    "onUpdate:modelValue": (value) => {
      const current = pending ?? model.value;
      if (Object.is(current[key], value)) return;
      const firstUpdate = pending === undefined;
      pending = { ...current, [key]: value };
      model.value = pending;
      if (firstUpdate) void nextTick(() => { pending = undefined; });
    },
  };
}
</script>

<template>
  <UIFormField
    v-bind="fieldProps"
    as="fieldset"
    label-mode="legend"
    :label="label"
    :description="description"
    class="ui-form-field-group"
  >
    <template v-if="$slots.label" #label="state"><slot name="label" v-bind="state" /></template>
    <template v-if="$slots.description" #description="state"><slot name="description" v-bind="state" /></template>
    <template v-if="$slots.message" #message="state"><slot name="message" v-bind="state" /></template>
    <template #default="state">
      <UIFormFieldGroupControls><slot v-bind="state" :field="field" :bind-model="bindModel" /></UIFormFieldGroupControls>
    </template>
  </UIFormField>
</template>

<style scoped>
.ui-form-field-group {
  min-inline-size: 0;
  margin: 0;
  padding: 0;
  border: 0;
}

.ui-form-field-group :deep(legend) {
  margin-block-end: var(--ui-space-md);
  padding: 0;
}
</style>
