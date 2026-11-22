<script setup lang="ts">
import { ChevronRight } from "@lucide/vue";
import { TreeSelectDisclosure, type TreeSelectDisclosureProps } from "@sectile/vue/tree-select";
import type { TreeViewItemSlotProps } from "@sectile/vue/tree-view";

const props = defineProps<TreeSelectDisclosureProps>();
defineSlots<{ default?(state: TreeViewItemSlotProps): unknown }>();
</script>

<template>
  <TreeSelectDisclosure v-bind="props" v-slot="state">
    <slot v-bind="state"><ChevronRight v-if="!asChild" :size="16" aria-hidden="true" /></slot>
  </TreeSelectDisclosure>
</template>
