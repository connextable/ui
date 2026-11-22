<script setup lang="ts">
import { FormDescription, FormField, FormLabel, FormMessage, type FormFieldProps, type FormFieldSlotProps } from "@sectile/vue/form";

const { label, description, ...fieldProps } = defineProps<FormFieldProps & {
  label?: string;
  description?: string;
}>();

defineSlots<{
  default?(state: FormFieldSlotProps): unknown;
  label?(state: FormFieldSlotProps): unknown;
  description?(state: FormFieldSlotProps): unknown;
  message?(state: FormFieldSlotProps): unknown;
}>();
</script>

<template>
  <FormField v-bind="fieldProps" v-slot="state" class="ui-field ui-form-field" @invalid.capture.prevent>
    <FormLabel v-if="label || $slots.label" class="ui-field-label ui-form-field__label">
      <slot name="label" v-bind="state">{{ label }}</slot>
      <span v-if="fieldProps.required && !fieldProps.disabled && !fieldProps.readonly" class="ui-form-field__required"> (필수)</span>
    </FormLabel>
    <slot v-bind="state" />
    <FormDescription v-if="description || $slots.description" class="ui-form-field__description">
      <slot name="description" v-bind="state">{{ description }}</slot>
    </FormDescription>
    <FormMessage class="ui-form-field__error">
      <template v-if="$slots.message" #default="messageState"><slot name="message" v-bind="messageState" /></template>
    </FormMessage>
  </FormField>
</template>

<style scoped>
.ui-form-field__description,
.ui-form-field__error {
  margin: 0;
  color: var(--ui-color-text-muted);
  font-size: var(--ui-font-size-metadata);
  overflow-wrap: anywhere;
}

.ui-form-field__error {
  color: var(--ui-color-danger);
}

.ui-form-field__required {
  color: var(--ui-color-text-muted);
  font-size: var(--ui-font-size-metadata);
  font-weight: normal;
}
</style>
