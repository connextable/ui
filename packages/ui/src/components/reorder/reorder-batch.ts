import {
  applyTreeReorderEvent,
  getTreeReorderHierarchy,
  type TreeReorderPolicies,
  type TreeReorderState,
} from "@sectile/core/reorder";
import type { TreeReorderTarget } from "@sectile/vue/reorder";

function remainingAnchor<ID extends string>(siblings: readonly ID[], moved: ReadonlySet<ID>, beforeID: ID | null) {
  if (beforeID === null || !moved.has(beforeID)) return beforeID;
  const index = siblings.indexOf(beforeID);
  return index === -1 ? beforeID : siblings.slice(index + 1).find(id => !moved.has(id)) ?? null;
}

export function moveSequenceBatch<ID extends string>(items: readonly ID[], ids: readonly ID[], target: TreeReorderTarget<ID>) {
  const moved = new Set(ids);
  const remaining = items.filter(id => !moved.has(id));
  const beforeID = remainingAnchor(items, moved, target.beforeID ?? null);
  const index = beforeID === null ? remaining.length : remaining.indexOf(beforeID);
  if (index === -1 || ids.length + remaining.length !== items.length) return;
  const order = [...remaining.slice(0, index), ...ids, ...remaining.slice(index)];
  return order.every((id, i) => id === items[i]) ? items : order;
}

export function treeBatchRoots<ID extends string>(nodes: TreeReorderState<ID>["nodes"], ids: ReadonlySet<ID>) {
  const tree = getTreeReorderHierarchy({ nodes });
  return tree.preorder().ids.filter(id => {
    if (!ids.has(id)) return false;
    for (let parent = tree.parentOf(id); parent != null; parent = tree.parentOf(parent)) {
      if (ids.has(parent)) return false;
    }
    return true;
  });
}

export function moveTreeBatch<ID extends string>(
  nodes: TreeReorderState<ID>["nodes"],
  ids: readonly ID[],
  target: TreeReorderTarget<ID>,
  policies?: TreeReorderPolicies<ID>,
) {
  const state = { nodes };
  const tree = getTreeReorderHierarchy(state);
  const siblings = target.parentID === null ? tree.roots : tree.childrenOf(target.parentID);
  if (!siblings) return;
  const result = applyTreeReorderEvent(state, {
    type: "move-nodes",
    ids,
    parentID: target.parentID,
    beforeID: remainingAnchor(siblings.ids, new Set(ids), target.beforeID ?? null),
  }, policies);
  if (!result.ok) return;
  const next = result.value.state.nodes;
  return next.length === nodes.length && next.every((node, i) =>
    node.id === nodes[i]?.id && node.parentID === nodes[i]?.parentID,
  ) ? nodes : next;
}
