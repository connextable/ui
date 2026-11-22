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

function focusFromFrame(event: MouseEvent) {
  if (disabled || event.defaultPrevented) return;

  for (const target of event.composedPath()) {
    if (target === event.currentTarget) break;
    if (target instanceof Element && target.matches(
      "input, textarea, select, button, a[href], label, summary, audio[controls], video[controls], [tabindex], [contenteditable]:not([contenteditable='false']), [role='button'], [role='link']",
    )) return;
  }

  focus();
}
</script>

<template>
  <div
    v-if="$slots.leading || $slots.trailing"
    class="ui-field-control ui-inset-frame ui-input ui-input--with-slots"
    :class="$attrs.class"
    :style="$attrs.style"
    :data-size="size"
    :data-ui-control-size="size"
    :data-variant="variant"
    @click="focusFromFrame"
  >
    <div v-if="$slots.leading" class="ui-input__slot ui-input__slot--leading"><slot name="leading" /></div>
    <TextField ref="control" v-bind="inputBindings($attrs)" class="ui-input__control" />
    <div v-if="$slots.trailing" class="ui-input__slot ui-input__slot--trailing"><slot name="trailing" /></div>
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
  padding-block: var(--ui-frame-padding);
}

.ui-input--with-slots[data-size="sm"] {
  padding-inline: var(--ui-space-sm);
}

.ui-input--with-slots:has(> .ui-input__slot--leading > :is(button, .ui-button)) {
  padding-inline-start: var(--ui-frame-padding);
}

.ui-input--with-slots:has(> .ui-input__slot--trailing > :is(button, .ui-button)) {
  padding-inline-end: var(--ui-frame-padding);
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

.ui-input__slot > :slotted(:is(button, .ui-button)) {
  --ui-control-size-height: var(--ui-inset-size);
  --ui-control-size-padding-block: 0px;
  --ui-control-size-radius: var(--ui-inset-radius);

  box-sizing: border-box;
  flex: none;
  min-block-size: var(--ui-inset-size);
  border-radius: var(--ui-inset-radius);
}
</style>
