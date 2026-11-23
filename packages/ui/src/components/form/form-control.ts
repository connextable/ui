import { useFormControl as useSectileFormControl, type FormControlRegistration } from "@sectile/vue/form";
import type { FormFieldDefaults } from "@sectile/vue/form-boundary";
import { computed } from "vue";
import { useInputState } from "../control-attrs";

export type {
  FormControlRegistration as UIFormControlRegistration,
  FormSubmissionRegistration as UIFormSubmissionRegistration,
} from "@sectile/vue/form";

export {
  useNativeInputFormControl as useNativeFormControl,
} from "@sectile/vue/form";
export type { FormFieldDefaults as UIFormControlFlags } from "@sectile/vue/form-boundary";

export function useFormControl(registration: FormControlRegistration, flags: Readonly<Partial<FormFieldDefaults>> = {}) {
  const { disabled, readonly, required } = useInputState(flags);
  return {
    ...useSectileFormControl(registration),
    flags: computed(() => ({ disabled: disabled.value, readonly: readonly.value, required: required.value })),
  };
}
