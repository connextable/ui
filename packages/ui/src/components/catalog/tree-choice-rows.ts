import { ChevronRight } from "@lucide/vue";
import { h, type Component, type VNode, type VNodeChild } from "vue";

export type LabeledTreeNode<ID extends string = string> = {
  readonly id: ID;
  readonly parentID: ID | null;
  readonly label?: string;
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
  children(parent: ID | null): readonly ID[];
  isBranch?(id: ID): boolean;
  beforeLabel?(id: ID): VNodeChild;
  afterLabel?(id: ID): VNodeChild;
}, parent: ID | null = null): VNode[] {
  return options.children(parent).flatMap(id => {
    const label = options.label(id);
    const branch = options.isBranch?.(id) ?? options.children(id).length > 0;
    const row = h(options.item, { key: id, value: id, "aria-label": label }, () => [
      branch && h(options.disclosure, { for: id, as: "button", "aria-label": `${label} 하위 항목` },
        () => h(ChevronRight, { size: 16, "aria-hidden": "true" })),
      options.beforeLabel?.(id),
      label,
      options.afterLabel?.(id),
    ]);
    if (!branch) return [row];
    return [row, h(options.group, { key: `group:${id}`, for: id }, () => renderTreeChoiceRows(options, id))];
  });
}
