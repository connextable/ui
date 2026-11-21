<script setup lang="ts" generic="ID extends string = string">
import {
  TreeSelectRoot,
  type TreeSelectEmits,
  type TreeSelectExpose,
  type TreeSelectRootProps,
  type TreeSelectSlots,
} from "@sectile/vue/tree-select";
import { ref, useTemplateRef } from "vue";

defineOptions({ inheritAttrs: false });
const props = withDefaults(defineProps<TreeSelectRootProps<ID>>(), {
  position: true,
  open: undefined,
  disabled: undefined,
  readonly: undefined,
  required: undefined,
});
const emit = defineEmits<TreeSelectEmits<ID>>();
defineSlots<TreeSelectSlots<ID>>();

const localOpen = ref(props.defaultOpen ?? false);

function updateOpen(open: boolean) {
  if (props.open === undefined) localOpen.value = open;
  emit("update:open", open);
}

function openFromInput(event: MouseEvent) {
  const input = event.target;
  if (
    event.defaultPrevented || !(input instanceof HTMLInputElement) ||
    !input.matches('[data-scope="tree-select"][data-part="input"]') ||
    input.closest('[data-scope="tree-select"][data-part="root"]') !== event.currentTarget ||
    input.disabled || input.readOnly || (props.open ?? localOpen.value)
  ) return;
  updateOpen(true);
}

const tree = useTemplateRef<TreeSelectExpose<ID>>("tree");
defineExpose({
  get element() { return tree.value?.element ?? null; },
  focus: (options) => tree.value?.focus(options),
  resolveSearch: (request, matches) => tree.value?.resolveSearch(request, matches) ?? false,
} satisfies TreeSelectExpose<ID>);
</script>

<template>
  <TreeSelectRoot
    ref="tree"
    v-bind="{ ...$attrs, ...props }"
    v-slot="state"
    :open="props.open ?? localOpen"
    :position="false"
    :data-ui-tree-select-positioned="props.position || undefined"
    @update:model-value="emit('update:modelValue', $event)"
    @update:expanded-values="emit('update:expandedValues', $event)"
    @update:highlighted-value="emit('update:highlightedValue', $event)"
    @update:query="emit('update:query', $event)"
    @update:open="updateOpen"
    @click="openFromInput"
    @search="emit('search', $event)"
  ><slot v-bind="state" /></TreeSelectRoot>
</template>
