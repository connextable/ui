import { inject, type InjectionKey, type Ref, type ShallowRef } from "vue";

import type { SelectionOption } from "../selection/selection-options";

export interface UISelectOption extends SelectionOption {}

export interface SelectContext {
  uid: string;
  triggerId: Readonly<Ref<string>>;
  trigger: ShallowRef<HTMLButtonElement | null>;
  options: Readonly<Ref<readonly UISelectOption[]>>;
  label: Readonly<Ref<string>>;
  size: Readonly<Ref<"sm" | "md" | "lg">>;
  placeholder: Readonly<Ref<string>>;
  readonly: Readonly<Ref<boolean>>;
  required: Readonly<Ref<boolean>>;
  error: Readonly<Ref<string>>;
}

export const selectKey: InjectionKey<SelectContext> = Symbol("UISelect");

export function useSelectContext() {
  const context = inject(selectKey);
  if (!context) throw new Error("UISelect parts must be used inside UISelect.");
  return context;
}
