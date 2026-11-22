import { PinInputInput, PinInputRoot, type PinInputRootProps, type PinInputRootSlotProps } from "@sectile/vue/pin-input";
import { defineComponent, h, nextTick, type VNode } from "vue";
import UIFieldClear from "../clear/UIFieldClear.vue";
import { controlFlag, useFieldClear } from "../clear/clearable";
import { withClearableModel, type ClearableComponent } from "../clear/with-clearable";
import { useInputState } from "../control-attrs";

type PinInputInstance = InstanceType<typeof PinInputRoot>;
type PinInputWithPlaceholder = new () => Omit<PinInputInstance, "$props"> & {
  $props: PinInputInstance["$props"] & { placeholder?: string };
};

const inputSelector = '[data-scope="pin-input"][data-part="input"]';
const rootSelector = '[data-scope="pin-input"][data-part="root"]';

const PinInputComposition = defineComponent({
  inheritAttrs: false,
  __sectileFormLabelMode: "labelledby",
  props: {
    placeholder: { type: String, default: "–" },
    readonly: { type: Boolean, default: undefined },
    disabled: { type: Boolean, default: undefined },
  },
  emits: ["update:modelValue", "complete"],
  setup(props, { attrs, slots, emit }) {
    const clear = useFieldClear();
    const { readonly, disabled, editable, attrs: stateAttrs } = useInputState(props);
    let currentState: PinInputRootSlotProps | undefined;
    let defaultParts: { count: number; name: string; placeholder: string; cells: VNode[] } | undefined;

    function paste(event: ClipboardEvent, index: number, count: number, state: PinInputRootSlotProps) {
      if (!editable.value || state.disabled || state.readonly || !event.clipboardData) return;
      event.preventDefault();
      const pasted = Array.from(event.clipboardData.getData("text").trim());
      if (pasted.length === 0) return;
      const current = Array.from(state.value);
      const start = pasted.length >= count ? 0 : Math.min(index, current.length);
      const replacement = pasted.slice(0, count - start);
      const policies = attrs.policies as PinInputRootProps["policies"];
      if (replacement.some((value, offset) => policies?.accept?.(value, start + offset) === false)) return;
      current.splice(start, replacement.length, ...replacement);
      const value = current.join("");
      if (value !== state.value) emit("update:modelValue", value);
      if (current.length === count) emit("complete", value);
      if (event.currentTarget instanceof HTMLInputElement) {
        const root = event.currentTarget.closest(rootSelector);
        void nextTick(() => root?.querySelectorAll<HTMLInputElement>(inputSelector)[Math.min(count - 1, start + replacement.length)]?.focus());
      }
    }

    function defaultCells() {
      const count = typeof attrs.length === "number" ? attrs.length : 6;
      const name = typeof attrs.label === "string" ? attrs.label : "인증 코드";
      const { placeholder } = props;
      // Keep the cells and their paste handlers stable when the slot state changes.
      if (defaultParts?.count === count && defaultParts.name === name && defaultParts.placeholder === placeholder) return defaultParts.cells;
      const cells = Array.from({ length: count }, (_, index) => h(PinInputInput, {
        key: index,
        index,
        placeholder,
        "aria-label": `${name} ${count}자리 중 ${index + 1}번째`,
        onPaste: (event: ClipboardEvent) => {
          if (currentState) paste(event, index, count, currentState);
        },
      }));
      defaultParts = { count, name, placeholder, cells };
      return cells;
    }

    return () => {
      const bindings = {
        ...attrs,
        ...stateAttrs.value,
        "aria-disabled": disabled.value || undefined,
        readonly: readonly.value,
        disabled: disabled.value,
        "onUpdate:modelValue": (value: string) => { if (editable.value) emit("update:modelValue", value); },
        onComplete: (value: string) => { if (editable.value) emit("complete", value); },
      };
      if (controlFlag(attrs.asChild ?? attrs["as-child"])) return h(PinInputRoot, bindings, slots);
      return h(PinInputRoot, bindings, {
        default: (state: PinInputRootSlotProps) => {
          currentState = state;
          const cells = slots.default?.(state) ?? defaultCells();
          return clear?.enabled.value ? [...cells, h(UIFieldClear)] : cells;
        },
      });
    };
  },
}) as unknown as PinInputWithPlaceholder;

export const UIPinInput: ClearableComponent<typeof PinInputComposition> = withClearableModel(PinInputComposition, "", {
  label: "인증 코드 지우기",
});
