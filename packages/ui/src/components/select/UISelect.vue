<script setup lang="ts">
import { provideFormControlReset } from "@sectile/vue/form-boundary";
import { SelectRoot, type SelectRootProps, type SelectRootSlotProps } from "@sectile/vue/select";
import { computed, provide, ref, useId, watch, type AriaAttributes } from "vue";
import { provideClearable, useClearableValue, type ClearableProps } from "../clear/clearable";
import { definedControlAttrs, useInputState } from "../control-attrs";
import { useSelectionOptions } from "../selection/selection-options";
import UISelectContent from "./UISelectContent.vue";
import UISelectTrigger from "./UISelectTrigger.vue";
import { selectKey, type UISelectOption } from "./select-context";

defineOptions({ inheritAttrs: false });

type SelectPosition = Pick<SelectRootProps,
  "side" | "align" | "sideOffset" | "collisionPadding" | "collisionBoundary" | "avoidCollisions" |
  "flip" | "shift" | "hideWhenDetached" | "strategy" | "tracking"
> & { offset?: number };

const props = withDefaults(defineProps<Pick<SelectRootProps,
  "modelValue" | "defaultValue" | "open" | "defaultOpen" | "disabled" | "readonly" |
  "formOptions" | "renderedItems" | "textValue" | "typeaheadTimeoutMs" | "unmountOnExit" | "policies" | "name" | "form" | "required"
> & ClearableProps & {
  id?: string;
  label?: string;
  ariaLabel?: string;
  ariaLabelledby?: string;
  ariaDescribedby?: string;
  ariaInvalid?: AriaAttributes["aria-invalid"];
  ariaErrormessage?: string;
  options: readonly UISelectOption[];
  size?: "sm" | "md" | "lg";
  placeholder?: string;
  position?: SelectPosition | boolean;
}>(), { size: "md", placeholder: "선택", open: undefined, disabled: undefined, readonly: undefined, required: undefined, position: true });

const emit = defineEmits<{
  "update:modelValue": [value: string | null];
  "update:open": [open: boolean];
  highlight: [value: string | null];
}>();
defineSlots<{ default?(state: SelectRootSlotProps): unknown }>();

const uid = useId();
const { readonly: isReadonly, editable, required: isRequired } = useInputState({
  get disabled() { return props.options.length ? props.disabled : true; },
  get readonly() { return props.readonly; },
  get required() { return props.required; },
});
const initialOpen = Boolean(props.defaultOpen);
const localOpen = ref(editable.value && initialOpen);
const menuOpen = computed(() => editable.value && (props.open ?? localOpen.value));
const selection = useClearableValue(
  () => props.modelValue,
  props.defaultValue ?? null,
  value => emit("update:modelValue", value),
);

provideFormControlReset(() => {
  selection.reset();
  if (props.open === undefined) localOpen.value = editable.value && initialOpen;
});
watch(editable, (available) => {
  if (!available) localOpen.value = false;
});

function updateOpen(open: boolean) {
  if (!editable.value && open) return;
  if (props.open === undefined) localOpen.value = open;
  emit("update:open", open);
}

provideClearable({
  enabled: () => props.clearable,
  label: () => props.clearLabel,
  disabled: () => props.options.length ? props.disabled : true,
  readonly: () => isReadonly.value,
  hasValue: () => selection.value.value !== null,
  clear() {
    selection.set(null);
    if (menuOpen.value) updateOpen(false);
  },
});

const { values, disabledValues } = useSelectionOptions(() => props.options);
const textValue = computed(() => {
  if (props.textValue) return props.textValue;
  const labels = new Map(props.options.map(({ value, label }) => [value, label]));
  return (value: string) => labels.get(value) ?? value;
});
const positioning = computed(() => {
  const { offset, ...options } = typeof props.position === "object" ? props.position : {};
  return { strategy: "fixed" as const, ...options, sideOffset: options.sideOffset ?? offset ?? 6, position: props.position !== false };
});

provide(selectKey, {
  uid,
  triggerId: computed(() => props.id),
  aria: computed(() => ({
    label: props.ariaLabel ?? props.label,
    labelledby: props.ariaLabelledby,
    describedby: props.ariaDescribedby,
    invalid: props.ariaInvalid,
    errorMessage: props.ariaErrormessage,
  })),
  options: computed(() => props.options),
  size: computed(() => props.size),
  placeholder: computed(() => props.placeholder),
  readonly: isReadonly,
});
</script>

<template>
  <div class="ui-select">
    <SelectRoot
      v-bind="{ ...positioning, ...definedControlAttrs({ disabled: options.length === 0 ? true : disabled, readonly, name, form, required: isRequired && editable }) }"
      v-slot="state"
      :label="ariaLabel ?? label"
      :items="values"
      :disabled-items="disabledValues"
      :text-value="textValue"
      :model-value="selection.value.value"
      :default-value="defaultValue"
      :open="menuOpen"
      :form-options="formOptions"
      :rendered-items="renderedItems"
      :typeahead-timeout-ms="typeaheadTimeoutMs"
      :unmount-on-exit="unmountOnExit"
      :policies="policies"
      @update:model-value="selection.set"
      @update:open="updateOpen"
      @highlight="emit('highlight', $event)"
    >
      <slot v-bind="state">
        <UISelectTrigger v-bind="$attrs" />
        <UISelectContent />
      </slot>
    </SelectRoot>
  </div>
</template>

<style scoped>
.ui-select {
  display: inline-grid;
  gap: var(--ui-space-sm);
  min-inline-size: 0;
  max-inline-size: 100%;
}
</style>
