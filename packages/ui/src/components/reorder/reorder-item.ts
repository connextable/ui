import type { PrimitiveAs } from "@sectile/vue/primitive";
import { SequenceReorderItem, TreeReorderItem, type ReorderItemSlotProps } from "@sectile/vue/reorder";
import { defineComponent, h, type PropType, type SlotsType, type VNodeChild } from "vue";

function createReorderItem(name: string, Item: typeof SequenceReorderItem) {
  return defineComponent({
    name,
    inheritAttrs: false,
    props: {
      value: { type: String, required: true },
      as: [String, Object, Function] as PropType<PrimitiveAs>,
      asChild: Boolean,
      disabled: Boolean,
    },
    slots: Object as SlotsType<{ default?: (state: ReorderItemSlotProps) => VNodeChild }>,
    setup(props, { attrs, slots }) {
      return () => h(Item, {
        ...attrs,
        value: props.value,
        as: props.as,
        asChild: props.asChild,
        // Sectile checks the DOM attribute when admitting pointer and keyboard input.
        ...(props.disabled ? { disabled: true, "aria-disabled": "true" } : {}),
      }, slots);
    },
  });
}

export const UISequenceReorderItem = createReorderItem("UISequenceReorderItem", SequenceReorderItem);
export const UITreeReorderItem = createReorderItem("UITreeReorderItem", TreeReorderItem);
