import { inject, type AriaAttributes, type InjectionKey, type Ref } from "vue";
import type { SelectionOption } from "../selection/selection-options";

export interface UISelectOption extends SelectionOption {}

export interface SelectContext {
  uid: string;
  triggerId: Readonly<Ref<string | undefined>>;
  options: Readonly<Ref<readonly UISelectOption[]>>;
  textValue: Readonly<Ref<(value: string) => string>>;
  aria: Readonly<Ref<{
    label?: string;
    labelledby?: string;
    describedby?: string;
    invalid?: AriaAttributes["aria-invalid"];
    errorMessage?: string;
  }>>;
  size: Readonly<Ref<"sm" | "md" | "lg">>;
  placeholder: Readonly<Ref<string>>;
  readonly: Readonly<Ref<boolean>>;
}

export const selectKey: InjectionKey<SelectContext> = Symbol("UISelect");

export function useSelectContext() {
  const context = inject(selectKey);
  if (!context) throw new Error("UISelect parts must be used inside UISelect.");
  return context;
}
