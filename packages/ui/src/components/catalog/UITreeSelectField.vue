<script setup lang="ts">
import { ChevronDown } from "@lucide/vue";
import { TreeSelectInput } from "@sectile/vue/tree-select";

defineOptions({ inheritAttrs: false });
defineProps<{ selected?: boolean; asChild?: boolean }>();
</script>

<template>
  <div class="ui-tree-select-field" :data-has-selection="selected || undefined">
    <TreeSelectInput v-bind="$attrs" :as-child="asChild"><slot /></TreeSelectInput>
    <ChevronDown :size="16" aria-hidden="true" />
  </div>
</template>
