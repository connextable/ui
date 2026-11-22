import { AccordionHeader, AccordionItem, AccordionRoot } from "@sectile/vue/accordion";
import { defineComponent, h, type Component, type PropType, type VNodeChild } from "vue";
import { controlFlag } from "../clear/clearable";
import UIAccordionContent from "./UIAccordionContent.vue";
import UIAccordionTrigger from "./UIAccordionTrigger.vue";

type Section = { value: string; label: string; description?: string; disabled?: boolean };
type AccordionInstance = InstanceType<typeof AccordionRoot>;
type ComposedAccordion = new () => Omit<AccordionInstance, "$props" | "$slots"> & {
  $props: Omit<AccordionInstance["$props"], "items"> & { items: readonly (string | Section)[] };
  $slots: AccordionInstance["$slots"] & { panel?: (state: { item: Section }) => VNodeChild };
};

export const UIAccordion = defineComponent({
  name: "UIAccordion",
  inheritAttrs: false,
  props: { items: { type: Array as PropType<readonly (string | Section)[]>, required: true } },
  setup(props, { attrs, slots }) {
    return () => {
      const items = props.items.map(item => typeof item === "string" ? { value: item, label: item } : item);
      const content = slots.default || controlFlag(attrs.asChild ?? attrs["as-child"]) ? slots : {
        default: () => items.map(item => h(AccordionItem, { key: item.value, value: item.value, disabled: item.disabled }, () => [
          h(AccordionHeader, null, () => h(UIAccordionTrigger, null, () => item.label)),
          h(UIAccordionContent, null, () => slots.panel ? slots.panel({ item }) : item.description),
        ])),
      };
      return h(AccordionRoot as Component, { ...attrs, items: items.map(item => item.value) }, content);
    };
  },
}) as unknown as ComposedAccordion;
