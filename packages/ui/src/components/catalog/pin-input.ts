import { PinInputInput, PinInputRoot, type PinInputRootProps, type PinInputRootSlotProps } from "@sectile/vue/pin-input";
import { defineComponent, h, nextTick } from "vue";
import UIFieldClear from "../clear/UIFieldClear.vue";
import { controlFlag, useFieldClear } from "../clear/clearable";
import { withClearableModel, type ClearableComponent } from "../clear/with-clearable";

const inputSelector = '[data-scope="pin-input"][data-part="input"]';
const rootSelector = '[data-scope="pin-input"][data-part="root"]';

const PinInputComposition = defineComponent({
  inheritAttrs: false,
  __sectileFormLabelMode: "labelledby",
  emits: ["update:modelValue", "complete"],
  setup(_, { attrs, slots, emit }) {
    const clear = useFieldClear();

    function paste(event: ClipboardEvent, index: number, count: number, state: PinInputRootSlotProps) {
      if (state.disabled || state.readonly || !event.clipboardData) return;
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

    return () => {
      const bindings = {
        ...attrs,
        "onUpdate:modelValue": (value: string) => emit("update:modelValue", value),
        onComplete: (value: string) => emit("complete", value),
      };
      if (controlFlag(attrs.asChild ?? attrs["as-child"])) return h(PinInputRoot, bindings, slots);
      const count = typeof attrs.length === "number" ? attrs.length : 6;
      const name = typeof attrs.label === "string" ? attrs.label : "인증 코드";
      return h(PinInputRoot, bindings, {
        default: (state: PinInputRootSlotProps) => {
          const cells = slots.default?.(state) ?? Array.from({ length: count }, (_, index) => h(PinInputInput, {
            key: index, index,
            "aria-label": `${name} ${count}자리 중 ${index + 1}번째`,
            onPaste: (event: ClipboardEvent) => paste(event, index, count, state),
          }));
          return clear?.enabled.value ? [...cells, h(UIFieldClear)] : cells;
        },
      });
    };
  },
}) as unknown as typeof PinInputRoot;

export const UIPinInput: ClearableComponent<typeof PinInputRoot> = withClearableModel(PinInputComposition, "", {
  label: "인증 코드 지우기",
});
