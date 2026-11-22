import { computed, type Component } from "vue";

export interface SelectionOption {
  /** Unique, non-empty value within the control. */
  value: string;
  label: string;
  icon?: Component;
  description?: string;
  disabled?: boolean;
}

export function useSelectionOptions(getOptions: () => readonly SelectionOption[]) {
  const values = computed(() => getOptions().map(({ value }) => value));
  const disabledValues = computed(() => getOptions().filter(({ disabled }) => disabled).map(({ value }) => value));
  return { values, disabledValues };
}
