<script setup lang="ts" generic="Value extends string | number = string">
import { TextField, type TextFieldProps } from "@sectile/vue/text";
import { useTemplateRef } from "vue";
import { definedControlAttrs } from "../control-attrs";

defineOptions({ inheritAttrs: false });
defineSlots<{
  leading?(): unknown;
  trailing?(): unknown;
}>();

const { size = "md", variant = "outline", disabled = undefined, readonly = undefined, ...fieldProps } = defineProps<
  Omit<TextFieldProps, "modelValue" | "name" | "form" | "required"> & {
    id?: string;
    modelValue?: Value;
    size?: "sm" | "md" | "lg";
    variant?: "outline" | "soft";
  }
>();

const emit = defineEmits<{ "update:modelValue": [value: Value] }>();
const control = useTemplateRef<InstanceType<typeof TextField>>("control");
defineExpose({ control, focus });

function inputBindings(attrs: Record<string, unknown>) {
  const { class: _class, style: _style, ...inputAttrs } = attrs;
  return {
    ...inputAttrs,
    ...definedControlAttrs({ ...fieldProps, disabled, readonly }),
    "onUpdate:modelValue": (next: string | number) => emit("update:modelValue", next as Value),
  };
}

function focus(options?: FocusOptions) {
  const element = control.value?.$el;
  if (element instanceof HTMLElement) element.focus(options);
}
</script>

<template>
  <div
    v-if="$slots.leading || $slots.trailing"
    class="ui-field-control ui-input ui-input--with-slots"
    :class="$attrs.class"
    :style="$attrs.style"
    :data-size="size"
    :data-ui-control-size="size"
    :data-variant="variant"
    @click.self="focus()"
  >
    <div v-if="$slots.leading" class="ui-input__slot"><slot name="leading" /></div>
    <TextField ref="control" v-bind="inputBindings($attrs)" class="ui-input__control" />
    <div v-if="$slots.trailing" class="ui-input__slot"><slot name="trailing" /></div>
  </div>
  <TextField
    v-else
    ref="control"
    v-bind="inputBindings($attrs)"
    class="ui-field-control ui-input"
    :class="$attrs.class"
    :style="$attrs.style"
    :data-size="size"
    :data-ui-control-size="size"
    :data-variant="variant"
  />
</template>

<style scoped>
.ui-input {
  inline-size: 100%;
}

.ui-input--with-slots {
  display: flex;
  align-items: center;
  gap: var(--ui-space-sm);
  padding-block: var(--ui-space-xs);
}

.ui-input--with-slots[data-size="sm"] {
  padding-inline: var(--ui-space-sm);
}

.ui-input__control {
  flex: 1 1 0;
  min-inline-size: 0;
  padding: 0;
  border: 0;
  outline: none;
  background: transparent;
  color: inherit;
  font: inherit;
}

.ui-input__control:where(input) {
  min-block-size: 0;
}

.ui-input:where(textarea),
.ui-input__control:where(textarea) {
  resize: vertical;
}

.ui-input__slot {
  display: inline-flex;
  align-items: center;
  min-inline-size: 0;
  color: var(--ui-color-text-muted);
  overflow-wrap: anywhere;
}

.ui-input__slot > :slotted(svg) {
  flex: none;
  inline-size: var(--ui-control-size-icon);
  block-size: var(--ui-control-size-icon);
}

.ui-input__slot > :slotted([data-ui-control-shape="square"]) {
  --ui-control-size-height: calc(var(--ui-control-size-icon) + 2 * var(--ui-space-xs));
  --ui-control-size-padding-block: var(--ui-space-2xs);
  --ui-control-size-radius: var(--ui-radius-sm);

  flex: none;
  margin-inline: calc(-1 * var(--ui-space-xs));
}
</style>
