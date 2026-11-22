import { StepperContent, StepperList, StepperNext, StepperPrevious, StepperRoot, StepperStep } from "@sectile/vue/stepper";
import { TabsContent, TabsIndicator, TabsList, TabsRoot, TabsTrigger } from "@sectile/vue/tabs";
import { defineComponent, h, type Component, type PropType, type VNodeChild } from "vue";
import UIButton from "../button/UIButton.vue";
import { controlFlag } from "../clear/clearable";

type TabbedItem = { value: string; label: string; description?: string; disabled?: boolean };
type TabbedRoot = typeof TabsRoot | typeof StepperRoot;
type ComposedTabs<Root extends TabbedRoot> = new () => Omit<InstanceType<Root>, "$props" | "$slots"> & {
  $props: Omit<InstanceType<Root>["$props"], "items"> & {
    items: readonly (string | TabbedItem)[];
    label?: string;
  };
  $slots: InstanceType<Root>["$slots"] & {
    panel?: (state: { item: TabbedItem }) => VNodeChild;
  };
};

function withTabbedComposition<Root extends TabbedRoot>(root: Root, parts: {
  list: Component;
  trigger: Component;
  content: Component;
  indicator?: Component;
  actions?: boolean;
}): ComposedTabs<Root> {
  return defineComponent({
    inheritAttrs: false,
    props: { items: { type: Array as PropType<readonly (string | TabbedItem)[]>, required: true } },
    setup(props, { attrs, slots }) {
      return () => {
        const { label, ...bindings } = attrs;
        const items = props.items.map(item => typeof item === "string" ? { value: item, label: item } : item);
        const values = items.map(item => item.value);
        if (slots.default || controlFlag(attrs.asChild ?? attrs["as-child"])) return h(root as Component, { ...bindings, items: values }, slots);

        const disabled = (bindings.disabledItems ?? bindings["disabled-items"]) as readonly string[] | undefined;
        delete bindings["disabled-items"];
        return h(root as Component, {
          ...bindings,
          items: values,
          disabledItems: [...new Set([...(disabled ?? []), ...items.filter(item => item.disabled).map(item => item.value)])],
        }, {
          default: () => [
            h(parts.list, { label }, () => [
              ...items.map(item => h(parts.trigger, { key: item.value, value: item.value }, () => item.label)),
              parts.indicator && h(parts.indicator),
            ]),
            ...items.map(item => h(parts.content, { key: item.value, value: item.value }, () => [
              slots.panel ? slots.panel({ item }) : item.description && h("p", item.description),
              parts.actions && h(StepperPrevious, { asChild: true }, () => h(UIButton, { size: "sm", variant: "ghost" }, () => "이전")),
              parts.actions && h(StepperNext, { asChild: true }, () => h(UIButton, { size: "sm" }, () => "다음")),
            ])),
          ],
        });
      };
    },
  }) as unknown as ComposedTabs<Root>;
}

export const UITabs = withTabbedComposition(TabsRoot, {
  list: TabsList,
  trigger: TabsTrigger,
  content: TabsContent,
  indicator: TabsIndicator,
});

export const UIStepper = withTabbedComposition(StepperRoot, {
  list: StepperList,
  trigger: StepperStep,
  content: StepperContent,
  actions: true,
});
