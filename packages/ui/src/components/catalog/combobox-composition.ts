import { Check } from "@lucide/vue";
import {
  ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxResults, ComboboxRoot,
  type ComboboxItemSlotProps, type ComboboxResultsSlotProps, type ComboboxRootProps,
} from "@sectile/vue/combobox";
import { computed, defineComponent, h, type Component, type PropType } from "vue";
import { controlFlag } from "../clear/clearable";
import { withClearableControl } from "../clear/with-clearable";
import { definedControlAttrs } from "../control-attrs";
import UIItemIcon from "../UIItemIcon.vue";

export const UIComboboxInput: typeof ComboboxInput = withClearableControl(ComboboxInput, "input");

type Instance = InstanceType<typeof ComboboxRoot>;
type ComboboxItemOption = ComboboxRootProps["items"][number] & { readonly icon?: Component };
type DefaultProps = { id?: string; name?: string; form?: string; required?: boolean; placeholder?: string; emptyLabel?: string };
type ComboboxWithDefaults = new () => Omit<Instance, "$props"> & {
  $props: Omit<Instance["$props"], "items"> & DefaultProps & { items: readonly ComboboxItemOption[] };
};

export const ComboboxComposition = defineComponent({
  inheritAttrs: false,
  props: {
    items: { type: Array as PropType<readonly ComboboxItemOption[]>, required: true },
    id: String, name: String, form: String, required: { type: Boolean, default: undefined },
    placeholder: String, emptyLabel: { type: String, default: "검색 결과가 없습니다." },
  },
  setup(props, { attrs, slots }) {
    const itemsByID = computed(() => new Map(props.items.map(item => [item.id, item])));
    return () => {
      const root: Component = ComboboxRoot;
      const input = definedControlAttrs({
        id: props.id, name: props.name, form: props.form, required: props.required, placeholder: props.placeholder,
      });
      if (slots.default || controlFlag(attrs.asChild ?? attrs["as-child"])) {
        return h(root, { ...attrs, ...input, items: props.items }, slots);
      }
      return h(root, { ...attrs, items: props.items }, {
        default: () => [
          h(UIComboboxInput, { ...input, placeholder: props.placeholder ?? "검색 또는 선택" }),
          h(ComboboxContent, null, () => [
            h(ComboboxResults, null, {
              default: ({ items }: ComboboxResultsSlotProps) => items.map(({ id, label }) => {
                const icon = itemsByID.value.get(id)?.icon;
                return h(ComboboxItem, { key: id, value: id }, {
                  default: ({ selected }: ComboboxItemSlotProps) => [
                    icon && h(UIItemIcon, { icon }), label,
                    h("span", { class: "ui-inset-icon ui-option-indicator", "aria-hidden": "true" },
                      selected ? [h(Check)] : []),
                  ],
                });
              }),
            }),
            h(ComboboxEmpty, null, () => props.emptyLabel),
          ]),
        ],
      });
    };
  },
}) as unknown as ComboboxWithDefaults;
