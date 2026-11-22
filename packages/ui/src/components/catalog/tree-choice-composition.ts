import { CheckboxTreeDisclosure, CheckboxTreeItem, CheckboxTreeRoot } from "@sectile/vue/checkbox-tree";
import { TreeViewDisclosure, TreeViewItem, TreeViewRoot } from "@sectile/vue/tree-view";
import { computed, defineComponent, h, shallowRef, type Component } from "vue";
import { controlFlag } from "../clear/clearable";
import type { FormControlProps } from "../control-attrs";
import { useCompositeValueForm } from "../form/composite-value";
import UICheckboxBox from "../selection/UICheckboxBox.vue";
import { renderTreeChoiceRows, treeChildren, type LabeledTreeNode } from "./tree-choice-rows";
import { UICheckboxTreeGroup, UITreeViewGroup } from "./tree-groups";

type LabeledTreeRoot<Root> = Root extends abstract new (...args: never[]) => infer Instance
  ? Instance extends { $props: infer Props }
    ? new () => Instance & { $props: Props & { nodes: readonly LabeledTreeNode[] } & (Root extends typeof CheckboxTreeRoot ? FormControlProps : object) }
    : Root
  : Root;

function createTreeChoice<Root extends typeof CheckboxTreeRoot | typeof TreeViewRoot>(
  name: string,
  root: Root,
  parts: Pick<Parameters<typeof renderTreeChoiceRows>[0], "item" | "group" | "disclosure" | "beforeLabel">,
) {
  return defineComponent({
    name,
    inheritAttrs: false,
    __sectileFormLabelMode: root === CheckboxTreeRoot ? "labelledby" : undefined,
    setup(_, { attrs, slots, expose }) {
      const handle = shallowRef<{ element?: HTMLElement | null; focus?(options?: FocusOptions): void }>();
      const nodes = () => attrs.nodes as readonly LabeledTreeNode[];
      const children = computed(() => treeChildren(nodes()));
      const labels = computed(() => new Map(nodes().map(({ id, label }) => [id, label])));
      const renderForm = root === CheckboxTreeRoot ? useCompositeValueForm({
        get name() { return attrs.name as string | undefined; },
        get form() { return attrs.form as string | undefined; },
        get required() { return controlFlag(attrs.required); },
        get disabled() { return controlFlag(attrs.disabled); },
        get readonly() { return controlFlag(attrs.readonly); },
      }, {
        values: () => (attrs.modelValue as readonly string[] | undefined) ?? [],
        focus: '[role="treeitem"][tabindex="0"]',
      }) : undefined;
      expose({
        get element() { return handle.value?.element ?? null; },
        focus: (options?: FocusOptions) => handle.value?.focus?.(options),
      });
      return () => {
        const content = slots.default || controlFlag(attrs.asChild ?? attrs["as-child"]) ? slots : { default: () => renderTreeChoiceRows({
          ...parts,
          label: id => labels.value.get(id) ?? id,
          children: parent => children.value.get(parent) ?? [],
        }) };
        if (!renderForm) return h(root as Component, { ...attrs, ref: handle }, content);
        const { name: _name, form: _form, required: _required, ...visual } = attrs;
        return renderForm(metadata => h(root as Component, { ...metadata, ...visual, disabled: metadata.disabled, readonly: metadata.readonly, ref: handle }, content));
      };
    },
  }) as unknown as LabeledTreeRoot<Root>;
}

export const CheckboxTreeComposition = createTreeChoice("UICheckboxTree", CheckboxTreeRoot, {
  item: CheckboxTreeItem,
  group: UICheckboxTreeGroup,
  disclosure: CheckboxTreeDisclosure,
  beforeLabel: () => h(UICheckboxBox),
});

export const UITreeView = createTreeChoice("UITreeView", TreeViewRoot, {
  item: TreeViewItem,
  group: UITreeViewGroup,
  disclosure: TreeViewDisclosure,
});
