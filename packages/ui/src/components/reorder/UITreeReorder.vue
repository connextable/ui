<script setup lang="ts" generic="ID extends string">
import {
  TreeReorderRoot, type TreeReorderExpose, type TreeReorderNode,
  type TreeReorderRootProps, type TreeReorderRootSlotProps, type TreeReorderTarget,
} from "@sectile/vue/reorder";
import { computed, useTemplateRef } from "vue";
import { moveTreeBatch, treeBatchRoots } from "./reorder-batch";
import { useReorderSelection, type UIReorderInteraction, type UIReorderInteractionChange } from "./reorder-selection";

const props = defineProps<TreeReorderRootProps<ID> & { multiple?: boolean }>();
const selected = defineModel<readonly ID[]>("selected", { default: () => [] });
const emit = defineEmits<{
  "update:nodes": [nodes: readonly TreeReorderNode<NoInfer<ID>>[]];
  "interaction-change": [change: UIReorderInteractionChange<NoInfer<ID>>];
}>();
defineSlots<{
  default?(state: Omit<TreeReorderRootSlotProps<ID>, "interaction"> & { interaction: UIReorderInteraction<ID> }): unknown;
}>();
const root = useTemplateRef<TreeReorderExpose<ID>>("root");

const selection = useReorderSelection({
  multiple: () => props.multiple ?? false,
  locked: () => Boolean(props.disabled || props.readonly),
  controlled: () => props.controlled ?? false,
  order: () => props.nodes,
  selected,
  orderedSources: treeBatchRoots<ID>,
  move: (nodes, ids, target) => moveTreeBatch(nodes, ids, target, {
    ...props.policies,
    maxDepth: props.layout === "columns" ? 1 : undefined,
  }),
  update: nodes => emit("update:nodes", nodes),
  onInteraction: change => emit("interaction-change", change),
});
const order = selection.order;

function preview(state: TreeReorderRootSlotProps<ID>) {
  const nodes = selection.preview();
  return nodes === undefined ? state.getPreviewState() : { ok: true as const, value: { nodes } };
}

defineExpose({
  element: computed(() => root.value?.element ?? null),
  move: (id: NoInfer<ID>, target: TreeReorderTarget<NoInfer<ID>>) =>
    selection.moveSingle(() => root.value?.move(id, target) ?? false),
  canMove: (id: NoInfer<ID>, target: TreeReorderTarget<NoInfer<ID>>) => root.value?.canMove(id, target) ?? false,
  focus: (id?: NoInfer<ID>) => root.value?.focus(id),
});
</script>

<template>
  <TreeReorderRoot
    ref="root"
    :nodes="multiple ? order : nodes"
    :controlled="multiple || controlled"
    :as="as"
    :as-child="asChild"
    :direction="direction"
    :disabled="disabled"
    :handle-only="handleOnly"
    :label="label"
    :layout="layout"
    :orientation="orientation"
    :policies="policies"
    :readonly="readonly"
    :role-description="roleDescription"
    :keyboard-mode="keyboardMode ?? (multiple ? 'preview' : undefined)"
    @update:nodes="selection.update"
    @interaction-change="selection.change"
    v-slot="state"
  >
    <slot
      v-bind="state"
      :interaction="selection.interaction(state.interaction)"
      :get-preview-state="multiple ? () => preview(state) : state.getPreviewState"
    />
  </TreeReorderRoot>
</template>
