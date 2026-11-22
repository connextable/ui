import {
  ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxResults, ComboboxRoot,
  type ComboboxResultsSlotProps,
} from "@sectile/vue/combobox";
import { defineComponent, h, type Component } from "vue";
import { controlFlag } from "../clear/clearable";
import { withClearableControl } from "../clear/with-clearable";
import { definedControlAttrs } from "../control-attrs";

export const UIComboboxInput: typeof ComboboxInput = withClearableControl(ComboboxInput, "input");

type Instance = InstanceType<typeof ComboboxRoot>;
type DefaultProps = { id?: string; name?: string; form?: string; required?: boolean; placeholder?: string; emptyLabel?: string };
type ComboboxWithDefaults = new () => Omit<Instance, "$props"> & { $props: Instance["$props"] & DefaultProps };

export const ComboboxComposition = defineComponent({
  inheritAttrs: false,
  props: {
    id: String, name: String, form: String, required: { type: Boolean, default: undefined },
    placeholder: String, emptyLabel: { type: String, default: "검색 결과가 없습니다." },
  },
  setup(props, { attrs, slots }) {
    return () => {
      const root: Component = ComboboxRoot;
      const input = definedControlAttrs({
        id: props.id, name: props.name, form: props.form, required: props.required, placeholder: props.placeholder,
      });
      if (slots.default || controlFlag(attrs.asChild ?? attrs["as-child"])) {
        return h(root, { ...attrs, ...input }, slots);
      }
      return h(root, attrs, {
        default: () => [
          h(UIComboboxInput, { ...input, placeholder: props.placeholder ?? "검색 또는 선택" }),
          h(ComboboxContent, null, () => [
            h(ComboboxResults, null, {
              default: ({ items }: ComboboxResultsSlotProps) => items.map(({ id, label }) =>
                h(ComboboxItem, { key: id, value: id }, () => label)),
            }),
            h(ComboboxEmpty, null, () => props.emptyLabel),
          ]),
        ],
      });
    };
  },
}) as unknown as ComboboxWithDefaults;
