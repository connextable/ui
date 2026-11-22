<script setup lang="ts">
import { useNativeInputFormControl } from "@sectile/vue/form";
import { nextTick, onMounted, useTemplateRef } from "vue";
import { definedControlAttrs, useInputState, type FormControlProps } from "../control-attrs";

defineOptions({ inheritAttrs: false, __sectileFormLabelMode: "for" });
const props = withDefaults(defineProps<FormControlProps & { readonly?: boolean; disabled?: boolean; placeholder?: string }>(), {
  readonly: undefined,
  disabled: undefined,
  required: undefined,
});
const value = defineModel<string>({ required: true });
const input = useTemplateRef<HTMLInputElement>("input");
const { readonly, disabled, attrs } = useInputState(props);
const field = useNativeInputFormControl(input, {
  reset() { void nextTick(() => { if (input.value) input.value.value = value.value; }); },
});

onMounted(async () => {
  // The grid restores its roving cell focus after processing the edit key.
  await nextTick();
  if (disabled.value) return;
  input.value?.focus({ preventScroll: true });
  input.value?.select();
});
</script>

<template>
  <input
    ref="input" v-model="value" class="ui-grid-editor" type="text" tabindex="-1"
    v-bind="{ ...field.controlProps.value, ...$attrs, ...definedControlAttrs({ name, form, required }), ...attrs }"
    :readonly="readonly" :disabled="disabled" :placeholder="placeholder" data-scope="grid" data-part="editor" @click.stop
  >
</template>

<style scoped>
.ui-grid-editor {
  border: 0;
  border-radius: var(--ui-radius-sm);
  background: var(--ui-input-state-surface, var(--ui-color-surface));
  color: var(--ui-input-state-ink, var(--ui-color-text));
  font: inherit;
}

.ui-grid-editor:focus {
  outline: none;
}
</style>
