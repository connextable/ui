import { Check } from "@lucide/vue";
import { CheckboxGroupItem, CheckboxGroupRoot } from "@sectile/vue/checkbox-group";
import { ListboxItem, ListboxItemIndicator, ListboxItemText, ListboxRoot } from "@sectile/vue/listbox";
import { ToggleGroupItem, ToggleGroupRoot } from "@sectile/vue/toggle-group";
import { defineComponent, h, type Component, type PropType, type VNode } from "vue";
import { controlFlag, useFieldClear } from "../clear/clearable";
import UIFieldClear from "../clear/UIFieldClear.vue";
import { useInputState } from "../control-attrs";
import { useCompositeValueForm } from "../form/composite-value";
import { type SelectionOption } from "../selection/selection-options";
import UICheckboxGroupIndicator from "../selection/UICheckboxGroupIndicator.vue";
import UIItemIcon from "../UIItemIcon.vue";

type Option = Pick<SelectionOption, "value" | "label" | "icon" | "disabled">;
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
      const group = root === CheckboxGroupRoot || root === ToggleGroupRoot;
      const clear = useFieldClear();
      const formProps = {
        get name() { return attrs.name as string | undefined; },
        get form() { return attrs.form as string | undefined; },
        get required() { return controlFlag(attrs.required); },
        get disabled() { return controlFlag(attrs.disabled); },
        get readonly() { return controlFlag(attrs.readonly); },
      };
      const state = useInputState(formProps);
      const renderForm = group ? useCompositeValueForm(formProps, {
        values: () => (attrs.modelValue as readonly string[] | undefined) ?? [],
        focus: 'button:not(:disabled), [tabindex="0"]',
      }) : undefined;
      return () => {
        const suppliedItems = attrs.items as readonly string[] | undefined;
        const options = props.options ?? suppliedItems?.map(value => ({ value, label: value })) ?? [];
        const items = props.options?.map(option => option.value) ?? suppliedItems ?? [];
        const bindings: Record<string, unknown> = { ...attrs, items };
        const labels = new Map(options.map(option => [option.value, option]));
        const rendered = (attrs.renderedItems ?? attrs["rendered-items"]) as readonly string[] | undefined;
        const content = controlFlag(attrs.asChild ?? attrs["as-child"]) ? slots : {
          ...slots,
          default: (...args: unknown[]) => [slots.default?.(...args) ?? (rendered ?? items).flatMap(value => {
            const option = labels.get(value);
            return option ? [renderItem(option)] : [];
          }), group && clear?.enabled.value ? h(UIFieldClear) : null],
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

        if (!renderForm) return h(root as Component, { ...bindings, required: state.required.value && state.editable.value }, content);
        const { name: _name, form: _form, required: _required, ...visual } = bindings;
        return renderForm(metadata => h(root as Component, { ...metadata, ...visual, disabled: metadata.disabled, readonly: metadata.readonly }, content));
      };
    },
  }) as unknown as WithOptions<Root>;
}

export const CheckboxGroupComposition = withOptions(CheckboxGroupRoot, ({ value, label, disabled, icon }) =>
  h(CheckboxGroupItem, { key: value, value, disabled }, () => [h(UICheckboxGroupIndicator), icon && h(UIItemIcon, { icon }), label]));

export const ToggleGroupComposition = withOptions(ToggleGroupRoot, ({ value, label, disabled, icon }) =>
  h(ToggleGroupItem, { key: value, value, disabled }, () => [icon && h(UIItemIcon, { icon }), label]));

export const ListboxComposition = withOptions(ListboxRoot, ({ value, label, disabled, icon }) =>
  h(ListboxItem, { key: value, value, disabled }, () => [
    icon && h(UIItemIcon, { icon }),
    h(ListboxItemText, null, () => label),
    h(ListboxItemIndicator, { forcePresent: true }, () => h(Check)),
  ]));
