import { CheckboxGroupItem, CheckboxGroupRoot } from "@sectile/vue/checkbox-group";
import { ListboxItem, ListboxItemIndicator, ListboxItemText, ListboxRoot } from "@sectile/vue/listbox";
import { ToggleGroupItem, ToggleGroupRoot } from "@sectile/vue/toggle-group";
import { defineComponent, h, type Component, type PropType, type VNode } from "vue";
import { controlFlag } from "../clear/clearable";
import { type SelectionOption } from "../selection/selection-options";
import UICheckboxGroupIndicator from "../selection/UICheckboxGroupIndicator.vue";

type Option = Pick<SelectionOption, "value" | "label" | "disabled">;
type SelectionRoot = typeof CheckboxGroupRoot | typeof ListboxRoot | typeof ToggleGroupRoot;
type WithOptions<Root extends SelectionRoot> = new () => Omit<InstanceType<Root>, "$props"> & {
  $props: Omit<InstanceType<Root>["$props"], "items"> & { items?: readonly string[]; options?: readonly Option[] };
};

function withOptions<Root extends SelectionRoot>(
  root: Root,
  renderItem: (option: Option) => VNode,
): WithOptions<Root> {
  const metadata = root as Root & { __sectileFormLabelMode?: "for" | "labelledby" };
  return defineComponent({
    inheritAttrs: false,
    __sectileFormLabelMode: metadata.__sectileFormLabelMode,
    props: { options: Array as PropType<readonly Option[]> },
    setup(props, { attrs, slots }) {
      return () => {
        const suppliedItems = attrs.items as readonly string[] | undefined;
        const options = props.options ?? suppliedItems?.map(value => ({ value, label: value })) ?? [];
        const items = props.options?.map(option => option.value) ?? suppliedItems ?? [];
        const bindings: Record<string, unknown> = { ...attrs, items };
        const labels = new Map(options.map(option => [option.value, option]));
        const rendered = (attrs.renderedItems ?? attrs["rendered-items"]) as readonly string[] | undefined;
        const content = slots.default || controlFlag(attrs.asChild ?? attrs["as-child"]) ? slots : {
          default: () => (rendered ?? items).flatMap(value => {
            const option = labels.get(value);
            return option ? [renderItem(option)] : [];
          }),
        };

        if (props.options && root !== CheckboxGroupRoot) {
          const disabled = (attrs.disabledItems ?? attrs["disabled-items"]) as readonly string[] | undefined;
          const disabledOptions = props.options.filter(option => option.disabled).map(option => option.value);
          delete bindings["disabled-items"];
          Object.assign(bindings, {
            disabledItems: [...new Set([...(disabled ?? []), ...disabledOptions])],
          });
        }
        if (props.options && root === ListboxRoot && !attrs.textValue && !attrs["text-value"]) {
          Object.assign(bindings, { textValue: (value: string) => labels.get(value)?.label ?? value });
        }

        return h(root as Component, bindings, content);
      };
    },
  }) as unknown as WithOptions<Root>;
}

export const CheckboxGroupComposition = withOptions(CheckboxGroupRoot, ({ value, label, disabled }) =>
  h(CheckboxGroupItem, { key: value, value, disabled }, () => [h(UICheckboxGroupIndicator), label]));

export const ToggleGroupComposition = withOptions(ToggleGroupRoot, ({ value, label, disabled }) =>
  h(ToggleGroupItem, { key: value, value, disabled }, () => label));

export const ListboxComposition = withOptions(ListboxRoot, ({ value, label, disabled }) =>
  h(ListboxItem, { key: value, value, disabled }, () => [
    h(ListboxItemText, null, () => label),
    h(ListboxItemIndicator, { "aria-hidden": "true" }, () => "선택됨"),
  ]));
