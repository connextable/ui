<script setup lang="ts" generic="ID extends string">
import { SequenceReorderRoot, type ReorderRootSlotProps, type SequenceReorderRootProps } from "@sectile/vue/reorder";
import { moveSequenceBatch } from "./reorder-batch";
import { useReorderSelection, type UIReorderInteraction, type UIReorderInteractionChange } from "./reorder-selection";

const props = defineProps<SequenceReorderRootProps<ID> & { multiple?: boolean }>();
const selected = defineModel<readonly ID[]>("selected", { default: () => [] });
const emit = defineEmits<{
  "update:items": [items: readonly NoInfer<ID>[]];
  "interaction-change": [change: UIReorderInteractionChange<NoInfer<ID>>];
}>();
defineSlots<{
  default?(state: Omit<ReorderRootSlotProps<ID>, "interaction"> & { interaction: UIReorderInteraction<ID> }): unknown;
}>();

const selection = useReorderSelection({
  multiple: () => props.multiple ?? false,
  locked: () => props.disabled ?? false,
  controlled: () => props.controlled ?? false,
  order: () => props.items,
  selected,
  orderedSources: (items, ids) => items.filter(id => ids.has(id)),
  move: moveSequenceBatch,
  update: items => emit("update:items", items),
  onInteraction: change => emit("interaction-change", change),
});
const order = selection.order;

function preview(state: ReorderRootSlotProps<ID>) {
  const items = selection.preview();
  return items === undefined ? state.getPreviewState() : { ok: true as const, value: { ids: items } };
}
</script>

<template>
  <SequenceReorderRoot
    :items="multiple ? order : items"
    :controlled="multiple || controlled"
    :as="as"
    :as-child="asChild"
    :disabled="disabled"
    :handle-only="handleOnly"
    :label="label"
    :orientation="orientation"
    :role-description="roleDescription"
    :keyboard-mode="keyboardMode ?? (multiple ? 'preview' : undefined)"
    @update:items="selection.update"
    @interaction-change="selection.change"
    v-slot="state"
  >
    <slot
      v-bind="state"
      :interaction="selection.interaction(state.interaction)"
      :get-preview-state="multiple ? () => preview(state) : state.getPreviewState"
    />
  </SequenceReorderRoot>
</template>
