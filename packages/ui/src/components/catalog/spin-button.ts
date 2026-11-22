import { ChevronDown, ChevronUp, Minus, Plus } from "@lucide/vue";
import { SpinButtonDecrement, SpinButtonIncrement, SpinButtonInput, SpinButtonRoot } from "@sectile/vue/spin-button";
import { defineComponent, h, type Component, type PropType } from "vue";
import { controlFlag } from "../clear/clearable";
import { definedControlAttrs } from "../control-attrs";

type Instance = InstanceType<typeof SpinButtonRoot>;
type DefaultProps = {
  id?: string;
  name?: string;
  form?: string;
  required?: boolean;
  placeholder?: string;
  unit?: string;
  size?: "sm" | "md" | "lg";
  layout?: "stepper" | "field";
};

export const UISpinButton = defineComponent({
  inheritAttrs: false,
  props: {
    id: String,
    name: String,
    form: String,
    required: { type: Boolean, default: undefined },
    placeholder: String,
    unit: String,
    size: String as PropType<DefaultProps["size"]>,
    layout: String as PropType<DefaultProps["layout"]>,
  },
  setup(props, { attrs, slots }) {
    return () => {
      const root: Component = SpinButtonRoot;
      const { id, name, form, required, placeholder, unit, size, layout } = props;
      const bindings = { ...attrs, "data-ui-control-size": size ?? attrs["data-ui-control-size"], "data-layout": layout ?? attrs["data-layout"] };
      if (slots.default || controlFlag(attrs.asChild ?? attrs["as-child"])) {
        return h(root, { ...bindings, id, name, form, required }, slots);
      }
      const field = bindings["data-layout"] === "field";
      const label = typeof attrs.label === "string" ? attrs.label + " " : "";
      return h(root, bindings, {
        default: () => {
          const input = h("span", { class: "ui-numeric-value" }, [
            h(SpinButtonInput, definedControlAttrs({ id, name, form, required, placeholder })),
            unit ? h("span", { class: "ui-numeric-unit", "aria-hidden": "true" }, unit) : null,
          ]);
          const increase = h(SpinButtonIncrement, { label: label + "늘리기" },
            () => h(field ? ChevronUp : Plus, { size: 16, "aria-hidden": "true" }));
          const decrease = h(SpinButtonDecrement, { label: label + "줄이기" },
            () => h(field ? ChevronDown : Minus, { size: 16, "aria-hidden": "true" }));
          return field ? [input, increase, decrease] : [decrease, input, increase];
        },
      });
    };
  },
}) as unknown as new () => Omit<Instance, "$props"> & { $props: Instance["$props"] & DefaultProps };
