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

function getInteractiveInput(event: Event) {
  const input = event.target;
  if (
    event.defaultPrevented || !(input instanceof HTMLInputElement) ||
    !input.matches('[data-scope="tree-select"][data-part="input"]') ||
    input.closest('[data-scope="tree-select"][data-part="root"]') !== event.currentTarget ||
    input.disabled || input.readOnly
  ) return;
  return input;
}

function openFromInput(event: MouseEvent) {
  const input = getInteractiveInput(event);
  if (!input) return;

  const open = props.open ?? localOpen.value;
  if (!open) {
    updateOpen(true);
    return;
  }

  if (event.detail > 0 && input.parentElement?.classList.contains("ui-tree-select-field")) {
    const { left, right, height } = input.getBoundingClientRect();
    const distanceFromEnd = input.matches(":dir(rtl)") ? event.clientX - left : right - event.clientX;
    if (distanceFromEnd < height) updateOpen(false);
  }
}

function openFromSearch(event: Event) {
  if (event instanceof InputEvent && event.isComposing) return;
  if (event instanceof CompositionEvent && !event.data) return;

  const input = getInteractiveInput(event);
  if (input?.parentElement?.classList.contains("ui-tree-select-field") &&
    !(props.open ?? localOpen.value)) {
    updateOpen(true);
  }
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
    @input="openFromSearch"
    @compositionend="openFromSearch"
    @search="emit('search', $event)"
  ><slot v-bind="state" /></TreeSelectRoot>
</template>
