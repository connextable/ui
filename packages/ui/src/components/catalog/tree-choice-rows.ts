import { ChevronRight } from "@lucide/vue";
import { h, type Component, type VNode, type VNodeChild } from "vue";
import UIItemIcon from "../UIItemIcon.vue";

export type LabeledTreeNode<ID extends string = string> = {
  readonly id: ID;
  readonly parentID: ID | null;
  readonly label?: string;
  readonly icon?: Component;
};

export function treeChildren<ID extends string>(nodes: readonly LabeledTreeNode<ID>[]) {
  const children = new Map<ID | null, ID[]>();
  for (const { id, parentID } of nodes) {
    const siblings = children.get(parentID);
    if (siblings) siblings.push(id);
    else children.set(parentID, [id]);
  }
  return children;
}

export function renderTreeChoiceRows<ID extends string>(options: {
  item: Component;
  group: Component;
  disclosure: Component;
  label(id: ID): string;
  icon?(id: ID): Component | undefined;
  children(parent: ID | null): readonly ID[];
  isBranch?(id: ID): boolean;
  beforeLabel?(id: ID): VNodeChild;
  afterLabel?(id: ID): VNodeChild;
}, parent: ID | null = null): VNode[] {
  return options.children(parent).flatMap(id => {
    const label = options.label(id);
    const icon = options.icon?.(id);
    const branch = options.isBranch?.(id) ?? options.children(id).length > 0;
    const row = h(options.item, { key: `item:${id}`, value: id, "aria-label": label }, () => [
      branch && h(options.disclosure, { for: id, as: "button", "aria-label": `${label} 하위 항목` },
        () => h(ChevronRight, { size: 16, "aria-hidden": "true" })),
      options.beforeLabel?.(id),
      icon && h(UIItemIcon, { icon }),
      label,
      options.afterLabel?.(id),
    ]);
    if (!branch) return [row];
    return [row, h(options.group, { key: `group:${id}`, for: id }, () => renderTreeChoiceRows(options, id))];
  });
}
