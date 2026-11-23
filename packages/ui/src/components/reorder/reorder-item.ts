import type { PrimitiveAs } from "@sectile/vue/primitive";
import { SequenceReorderItem, TreeReorderItem, type ReorderItemSlotProps } from "@sectile/vue/reorder";
import { defineComponent, h, inject, mergeProps, shallowRef, watchEffect, type PropType, type SlotsType, type VNodeChild } from "vue";
import { reorderSelectionKey } from "./reorder-selection";

type ItemSlot = ReorderItemSlotProps & {
  selectable: boolean;
  selected: boolean;
  toggleSelected: () => void;
};

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
    slots: Object as SlotsType<{ default?: (state: ItemSlot) => VNodeChild }>,
    setup(props, { attrs, slots }) {
      const item = shallowRef<InstanceType<typeof Item>>();
      const selection = inject(reorderSelectionKey, null);
      if (selection) {
        watchEffect(cleanup => cleanup(selection.register(props.value, () => {
          const element = item.value?.$el;
          return props.disabled || attrs["aria-disabled"] === true || attrs["aria-disabled"] === "true"
            || element?.hasAttribute?.("disabled") === true;
        })));
      }
      function toggleSelected() {
        selection?.toggle(props.value);
      }
      function selectWithPointer(event: PointerEvent) {
        if (event.defaultPrevented || event.button !== 0 || (!event.ctrlKey && !event.metaKey)) return;
        const target = event.target;
        const row = event.currentTarget;
        if (!(target instanceof Element) || !(row instanceof HTMLElement)
          || target.closest('[data-scope$="-reorder"][data-part="item"]') !== row) return;
        const control = target.closest("button, input, label, a[href], select, textarea, [contenteditable], [role=button], [role=checkbox]");
        if (control && control !== row && row.contains(control)) return;
        event.preventDefault();
        row.focus({ preventScroll: true });
        toggleSelected();
      }
      function selectWithKeyboard(event: KeyboardEvent) {
        if (event.defaultPrevented || event.repeat || event.isComposing || event.target !== event.currentTarget
          || event.key !== " " || !event.shiftKey || event.altKey || event.ctrlKey || event.metaKey) return;
        event.preventDefault();
        toggleSelected();
      }
      return () => {
        const selectable = selection?.selectable(props.value) ?? false;
        const selected = selection?.selected(props.value) ?? false;
        return h(Item, {
          ...mergeProps(attrs, selectable ? { onPointerdown: selectWithPointer, onKeydown: selectWithKeyboard } : {}),
          ref: item,
          value: props.value,
          as: props.as,
          asChild: props.asChild,
          // Sectile checks the DOM attribute when admitting pointer and keyboard input.
          ...(props.disabled ? { disabled: true, "aria-disabled": "true" } : {}),
          ...(selected ? { "data-ui-reorder-selected": "" } : {}),
        }, {
          default: (state: ReorderItemSlotProps) => slots.default?.({ ...state, selectable, selected, toggleSelected }) ?? [],
        });
      };
    },
  });
}

export const UISequenceReorderItem = createReorderItem("UISequenceReorderItem", SequenceReorderItem);
export const UITreeReorderItem = createReorderItem("UITreeReorderItem", TreeReorderItem);
