import { CheckboxTreeGroup } from "@sectile/vue/checkbox-tree";
import { TreeSelectGroup } from "@sectile/vue/tree-select";
import { TreeViewGroup, type TreeViewGroupProps, type TreeViewRootSlotProps } from "@sectile/vue/tree-view";
import { defineComponent, h, type PropType, type SlotsType, type VNodeChild } from "vue";
import { useAppearanceMotion } from "../appearance-motion";

function createTreeGroup(name: string, Group: typeof TreeViewGroup) {
  return defineComponent({
    name,
    inheritAttrs: false,
    props: {
      for: { type: String, required: true },
      as: [String, Object, Function] as PropType<TreeViewGroupProps["as"]>,
      asChild: Boolean,
      forcePresent: { type: Boolean, default: undefined },
    },
    slots: Object as SlotsType<{ default?: (state: TreeViewRootSlotProps) => VNodeChild }>,
    setup(props, { attrs, slots }) {
      const motion = useAppearanceMotion(() => props.forcePresent === false);
      return () => {
        const styled = !props.asChild && props.as !== "ul" && props.as !== "ol";
        const bindings = { ...attrs, ...props, forcePresent: props.forcePresent ?? styled };
        if (!styled) return h(Group, bindings, slots);

        return h(Group, {
          ...bindings,
          class: [attrs.class, "ui-expandable-content"],
          ...motion.value,
        }, {
          default: (state: TreeViewRootSlotProps) => h(
            "div",
            { class: "ui-expandable-clip ui-tree-group__rows" },
            slots.default?.(state) ?? [],
          ),
        });
      };
    },
  });
}

export const UICheckboxTreeGroup = createTreeGroup("UICheckboxTreeGroup", CheckboxTreeGroup);
export const UITreeViewGroup = createTreeGroup("UITreeViewGroup", TreeViewGroup);
export const UITreeSelectGroup = createTreeGroup("UITreeSelectGroup", TreeSelectGroup);
