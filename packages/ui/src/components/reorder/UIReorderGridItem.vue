<script setup lang="ts" generic="ID extends string">
import { TreeReorderDropTarget } from "@sectile/vue/reorder";
import { computed } from "vue";
import { UITreeReorderItem } from "./reorder-item";

const props = defineProps<{
  value: ID;
  items: readonly ID[];
  parentId: ID | null;
  pointerSourceId?: ID | null;
}>();

const beforeId = computed(() => {
  const index = props.items.indexOf(props.value);
  const sourceIndex = props.pointerSourceId == null ? -1 : props.items.indexOf(props.pointerSourceId);
  // If the source is already before this cell, removing it shifts the insertion reference by one.
  const relativeIndex = sourceIndex >= 0 && sourceIndex <= index ? index + 1 : index;
  return props.items[relativeIndex] ?? null;
});
</script>

<template>
  <UITreeReorderItem :value="value" class="ui-reorder-grid-item" v-slot="state">
    <slot v-bind="state" />
    <TreeReorderDropTarget
      as="span"
      :parentID="parentId"
      :beforeID="beforeId"
      class="ui-reorder-grid-target"
      :data-active="pointerSourceId != null || undefined"
      aria-hidden="true"
    />
  </UITreeReorderItem>
</template>
