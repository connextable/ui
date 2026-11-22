import { useFormFieldDefaults } from "@sectile/vue/form-boundary";
import { computed } from "vue";

// Sectile distinguishes absent attributes from explicit values when inheriting field metadata.
export function definedControlAttrs<Attrs extends object>(attrs: Attrs): Partial<Attrs> {
  return Object.fromEntries(Object.entries(attrs).filter(([, value]) => value !== undefined)) as Partial<Attrs>;
}

export function useInputState(props: { readonly disabled?: boolean; readonly readonly?: boolean }) {
  const defaults = useFormFieldDefaults();
  const disabled = computed(() => props.disabled ?? defaults?.value.disabled ?? false);
  const readonly = computed(() => !disabled.value && (props.readonly ?? defaults?.value.readonly ?? false));
  const editable = computed(() => !disabled.value && !readonly.value);
  const attrs = computed(() => inputStateAttrs(disabled.value, readonly.value));
  return { disabled, readonly, editable, attrs };
}

export function inputStateAttrs(disabled?: boolean, readonly?: boolean) {
  return { "data-ui-input-state": disabled ? "disabled" : readonly ? "readonly" : undefined };
}
