<script setup lang="ts">
import { SelectRoot } from "@sectile/vue/select";
import { computed, nextTick, provide, ref, shallowRef, useId, watch } from "vue";
import UISelectContent from "./UISelectContent.vue";
import UISelectLabel from "./UISelectLabel.vue";
import UISelectTrigger from "./UISelectTrigger.vue";
import { selectKey, type UISelectOption } from "./select-context";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<{
  id?: string;
  label: string;
  options: readonly UISelectOption[];
  size?: "sm" | "md" | "lg";
  placeholder?: string;
  modelValue?: string | null;
  defaultValue?: string | null;
  open?: boolean;
  defaultOpen?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  name?: string;
  form?: string;
  position?: { side?: "top" | "bottom"; align?: "start" | "center" | "end"; offset?: number };
}>(), { size: "md", placeholder: "선택", open: undefined });

const emit = defineEmits<{
  "update:modelValue": [value: string | null];
  "update:open": [open: boolean];
}>();

const uid = useId();
const trigger = shallowRef<HTMLButtonElement | null>(null);
const error = ref("");
const localOpen = ref(props.defaultOpen ?? false);
const isOpen = computed(() => props.open ?? localOpen.value);
const values = computed(() => props.options.map(({ value }) => value));
const disabledValues = computed(() =>
  props.options.filter(({ disabled }) => disabled).map(({ value }) => value),
);
const textValue = computed(() => {
  const labels = new Map(props.options.map(({ value, label }) => [value, label]));
  return (value: string) => labels.get(value) ?? value;
});

provide(selectKey, {
  uid,
  trigger,
  error,
  triggerId: computed(() => props.id ?? `${uid}-trigger`),
  label: computed(() => props.label),
  options: computed(() => props.options),
  size: computed(() => props.size),
  placeholder: computed(() => props.placeholder),
  readonly: computed(() => props.readonly),
  required: computed(() => props.required),
});

watch(() => props.modelValue, () => { error.value = ""; });

function onValueChange(value: string | null) {
  error.value = "";
  emit("update:modelValue", value);
}

function requestOpen(open: boolean) {
  if (props.open === undefined) localOpen.value = open;
  emit("update:open", open);
}

async function onOpenChange(open: boolean) {
  const contentId = trigger.value?.getAttribute("aria-controls");
  const popup = !open && contentId ? document.getElementById(contentId) : null;
  const focusWasInPopup = popup?.contains(document.activeElement);
  requestOpen(open);
  if (!focusWasInPopup) return;
  await nextTick();
  if (isOpen.value) return;
  if (document.activeElement === document.body || popup?.contains(document.activeElement)) {
    trigger.value?.focus({ preventScroll: true });
  }
}

function onFocusOut(event: FocusEvent) {
  if (!isOpen.value) return;
  if (event.relatedTarget instanceof Node && (event.currentTarget as HTMLElement).contains(event.relatedTarget)) {
    return;
  }
  requestOpen(false);
}

function onInvalid(event: Event) {
  const control = event.target;
  if (!(control instanceof HTMLSelectElement)) return;
  event.preventDefault();
  error.value = control.validationMessage;
  const firstInvalid = Array.from(control.form?.elements ?? []).find((element) =>
    element.matches("input:invalid, select:invalid, textarea:invalid"),
  );
  if (!firstInvalid || firstInvalid === control) trigger.value?.focus();
}
</script>

<template>
  <div class="ui-select" @focusout="onFocusOut" @invalid.capture="onInvalid">
    <slot name="label"><UISelectLabel /></slot>
    <SelectRoot
      :label="label"
      :items="values"
      :disabled-items="disabledValues"
      :text-value="textValue"
      :model-value="modelValue"
      :default-value="defaultValue"
      :open="isOpen"
      :disabled="disabled || options.length === 0"
      :readonly="readonly"
      :required="required"
      :name="name"
      :form="form"
      strategy="fixed"
      :side="position?.side"
      :align="position?.align"
      :side-offset="position?.offset ?? 6"
      @update:model-value="onValueChange"
      @update:open="onOpenChange"
    >
      <slot>
        <UISelectTrigger v-bind="$attrs" />
        <UISelectContent />
      </slot>
    </SelectRoot>
    <p v-if="error" :id="`${uid}-error`" class="ui-select__error" role="alert">{{ error }}</p>
  </div>
</template>

<style scoped>
.ui-select {
  display: inline-grid;
  gap: var(--ui-space-sm);
  min-inline-size: 0;
  max-inline-size: 100%;
}

.ui-select__error {
  margin: 0;
  color: var(--ui-color-danger);
  font-size: var(--ui-font-size-metadata);
}
</style>
