import { provideFormControlReset } from "@sectile/vue/form-boundary";
import { computed, inject, provide, shallowRef, type InjectionKey, type Ref } from "vue";
import { useInputState } from "../control-attrs";

export interface ClearableProps {
  clearable?: boolean;
  clearLabel?: string;
}

interface ClearContext {
  enabled: Readonly<Ref<boolean>>;
  visible: Readonly<Ref<boolean>>;
  label: Readonly<Ref<string>>;
  clear(): void;
  reset?: () => void;
}

const clearKey: InjectionKey<ClearContext> = Symbol("UIFieldClear");

export function useClearableValue<Value>(
  controlled: () => Value | undefined,
  initialValue: Value,
  emit: (value: Value) => void,
) {
  const local = shallowRef<Value>(initialValue);
  const value = computed(() => {
    const supplied = controlled();
    return supplied === undefined ? local.value : supplied;
  });

  function set(next: Value) {
    if (controlled() === undefined) local.value = next;
    emit(next);
  }

  function reset() {
    if (controlled() === undefined) local.value = initialValue;
  }

  return { value, set, reset };
}

export function provideClearable(options: {
  enabled: () => boolean | undefined;
  label: () => string | undefined;
  disabled: () => boolean | undefined;
  readonly: () => boolean | undefined;
  hasValue: () => boolean;
  clear: () => void;
  reset?: () => void;
}) {
  const { editable } = useInputState({
    get disabled() { return options.disabled(); },
    get readonly() { return options.readonly(); },
  });
  const visible = computed(() => Boolean(options.enabled() && options.hasValue() && editable.value));
  provide(clearKey, {
    enabled: computed(() => Boolean(options.enabled())),
    visible,
    label: computed(() => options.label() ?? "선택 지우기"),
    clear() {
      if (visible.value) options.clear();
    },
    reset: options.reset,
  });
  if (options.reset) provideFormControlReset(options.reset);
}

export function useFieldClear() {
  return inject(clearKey, null);
}

export function hasClearableValue(value: unknown) {
  return Array.isArray(value) ? value.length > 0 : value != null && value !== "";
}

export function controlFlag(value: unknown): boolean | undefined {
  return value === "" || value === true ? true : value === false ? false : undefined;
}
