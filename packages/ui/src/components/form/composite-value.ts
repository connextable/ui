import { compositeControlCapabilities, provideFormControlOwner, useFormControl, type FormSubmissionRegistration } from "@sectile/vue/form";
import { h, mergeProps, onBeforeUnmount, onMounted, onUpdated, shallowRef, type VNodeChild } from "vue";
import { useFieldClear } from "../clear/clearable";
import { useInputState, type FormControlProps } from "../control-attrs";

type Props = FormControlProps & { disabled?: boolean; readonly?: boolean };
const ownedSubmission = ["name", "form", "disabled", "readonly", "required"] as const;

// This adapter is for widgets without a native validation target for the whole value.
export function useCompositeValueForm(props: Props, options: {
  values: () => readonly string[];
  complete?: () => boolean;
  focus: string;
  reset?: () => void;
  requiredMessage?: string;
}) {
  const state = useInputState(props);
  const clear = useFieldClear();
  const constraint = shallowRef<HTMLSelectElement>();
  // Keep the visible control as the first sibling, including with as-child projection.
  const root = () => (constraint.value?.previousElementSibling as HTMLElement | undefined) ?? null;
  const focusTarget = () => {
    const element = root();
    return element?.matches(options.focus) ? element : element?.querySelector<HTMLElement>(options.focus) ?? element;
  };
  const submissions = new Map<number, HTMLInputElement>();
  const field = useFormControl({
    element: root,
    focusTarget,
    validationTarget: () => constraint.value ?? null,
    labelMode: "labelledby",
    capabilities: { ...compositeControlCapabilities, name: true, form: true },
    submissions: () => [...submissions.keys()].map((index): FormSubmissionRegistration => ({
      element: () => submissions.get(index) ?? null,
      explicit: ownedSubmission,
    })),
    reset: options.reset,
  });
  provideFormControlOwner();

  let nativeForm: HTMLFormElement | undefined;
  function resetNative(event: Event) {
    queueMicrotask(() => {
      if (!event.defaultPrevented && event.target === nativeForm) (options.reset ?? clear?.reset)?.();
    });
  }
  function syncNativeForm(next?: HTMLFormElement) {
    if (nativeForm === next) return;
    nativeForm?.removeEventListener("reset", resetNative);
    nativeForm = next;
    nativeForm?.addEventListener("reset", resetNative);
  }
  function syncNativeConstraint() {
    const element = constraint.value;
    if (!field.participating) syncNativeForm(element?.form ?? undefined);
    const complete = options.complete?.() ?? options.values().length > 0;
    element?.setCustomValidity(element.required && !element.disabled && !complete
      ? options.requiredMessage ?? "항목을 하나 이상 선택하세요."
      : "");
  }
  onMounted(syncNativeConstraint);
  onUpdated(syncNativeConstraint);
  onBeforeUnmount(() => syncNativeForm());

  return (visual: (bindings: Record<string, unknown>) => VNodeChild) => {
    const { name, form, "aria-required": _ariaRequired, "aria-disabled": _ariaDisabled,
      "aria-readonly": _ariaReadonly, ...metadata } = field.controlProps.value;
    const control = visual(mergeProps(metadata, { disabled: state.disabled.value, readonly: state.readonly.value }));
    const fieldName = props.name ?? name as string | undefined;
    const formId = props.form ?? form as string | undefined;
    if (!field.participating && fieldName === undefined && formId === undefined && !state.required.value) return control;

    const values = options.values();
    const complete = options.complete?.() ?? values.length > 0;
    return [control, h("select", {
      ref: (element: unknown) => {
        constraint.value = element instanceof HTMLSelectElement ? element : undefined;
        syncNativeConstraint();
      },
      class: "ui-form-constraint",
      form: formId,
      tabindex: -1,
      "aria-hidden": "true",
      required: state.required.value,
      disabled: !state.editable.value,
      value: complete ? "1" : "",
      onInvalid(event: Event) {
        if (event.defaultPrevented) return;
        event.preventDefault();
        focusTarget()?.focus();
      },
    }, [h("option", { value: "", selected: !complete }), h("option", { value: "1", selected: complete })]),
    ...(fieldName === undefined ? [] : values.map((value, index) => h("input", {
      key: index,
      ref: (element: unknown) => {
        if (element instanceof HTMLInputElement) submissions.set(index, element);
        else submissions.delete(index);
      },
      type: "hidden",
      name: fieldName,
      form: formId,
      disabled: state.disabled.value,
      value,
    })))];
  };
}
