<script setup lang="ts" generic="ID extends string = string">
import { Check } from "@lucide/vue";
import { useFormFieldDefaults } from "@sectile/vue/form-boundary";
import {
  TreeSelectContent,
  TreeSelectItem,
  TreeSelectRoot,
  type TreeSelectEmits,
  type TreeSelectExpose,
  type TreeSelectRootProps,
  type TreeSelectRootSlotProps,
  type TreeSelectSearchRequest,
  type TreeSelectSlots,
} from "@sectile/vue/tree-select";
import { computed, getCurrentInstance, h, ref, useSlots, useTemplateRef } from "vue";
import { provideClearable, useClearableValue, type ClearableProps } from "../clear/clearable";
import { definedControlAttrs, useInputState } from "../control-attrs";
import { renderTreeChoiceRows, type LabeledTreeNode } from "./tree-choice-rows";
import { UITreeSelectGroup } from "./tree-groups";
import UITreeSelectDisclosure from "./UITreeSelectDisclosure.vue";
import UITreeSelectField from "./UITreeSelectField.vue";

defineOptions({ inheritAttrs: false });
const props = withDefaults(defineProps<Omit<TreeSelectRootProps<ID>, "nodes"> & ClearableProps & {
  nodes: readonly (TreeSelectRootProps<ID>["nodes"][number] & LabeledTreeNode<ID>)[];
  placeholder?: string;
}>(), {
  position: true,
  open: undefined,
  disabled: undefined,
  readonly: undefined,
  required: undefined,
});
const emit = defineEmits<TreeSelectEmits<ID>>();
defineSlots<TreeSelectSlots<ID>>();
const slots = useSlots();
const instance = getCurrentInstance();
const byID = computed(() => new Map(props.nodes.map(node => [node.id, node])));
const labelFor = (id: ID) => byID.value.get(id)?.label ?? id;
const fieldDefaults = useFormFieldDefaults();
const { required, editable } = useInputState(props);

const rootProps = computed(() => {
  const { clearable: _clearable, clearLabel: _clearLabel, placeholder: _placeholder, ...nativeProps } = props;
  return definedControlAttrs({
    ...nativeProps,
    required: props.required !== undefined || fieldDefaults ? required.value && editable.value : undefined,
  }) as TreeSelectRootProps<ID>;
});

function inputAttrs(attrs: Record<string, unknown>) {
  return definedControlAttrs({
    id: attrs.id,
    "aria-label": attrs["aria-label"] ?? props.label ?? (fieldDefaults ? undefined : "항목 검색"),
    "aria-labelledby": attrs["aria-labelledby"],
    "aria-describedby": attrs["aria-describedby"],
    "aria-errormessage": attrs["aria-errormessage"],
    "aria-invalid": attrs["aria-invalid"],
    "aria-required": required.value || undefined,
  });
}

function rootAttrs(attrs: Record<string, unknown>) {
  if (slots.default || props.asChild) return attrs;
  const { id, "aria-label": _label, "aria-labelledby": _labelledBy, "aria-describedby": _describedBy,
    "aria-errormessage": _errorMessage, "aria-invalid": _invalid, ...root } = attrs;
  return root;
}
const localOpen = ref(props.defaultOpen ?? false);
const selection = useClearableValue(
  () => props.modelValue,
  props.defaultValue ?? [],
  value => emit("update:modelValue", value),
);
const search = useClearableValue(
  () => props.query,
  props.defaultQuery ?? "",
  value => emit("update:query", value),
);

provideClearable({
  enabled: () => props.clearable,
  label: () => props.clearLabel,
  disabled: () => props.disabled,
  readonly: () => props.readonly,
  hasValue: () => selection.value.value.length > 0 || search.value.value !== "",
  clear() {
    if (selection.value.value.length) selection.set([]);
    if (search.value.value !== "") search.set("");
    if (props.open ?? localOpen.value) updateOpen(false);
  },
  reset() {
    selection.reset();
    search.reset();
  },
});

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

function onSearch(request: TreeSelectSearchRequest) {
  emit("search", request);
  if (slots.default || props.asChild || props.matches !== undefined || props.results !== undefined || instance?.vnode.props?.onSearch) return;

  const query = request.query.trim().toLocaleLowerCase();
  const matches = props.nodes.filter(({ id }) => labelFor(id).toLocaleLowerCase().includes(query)).map(({ id }) => id);
  tree.value?.resolveSearch(request, matches);
}

function Rows({ state }: { state: TreeSelectRootSlotProps<ID> }) {
  return renderTreeChoiceRows({
    item: TreeSelectItem,
    group: UITreeSelectGroup,
    disclosure: UITreeSelectDisclosure,
    label: labelFor,
    icon: id => byID.value.get(id)?.icon,
    children: state.getChildren,
    isBranch: state.isBranch,
    afterLabel: id => h("span", { class: "ui-inset-icon ui-option-indicator", "aria-hidden": "true" },
      state.value.includes(id) ? [h(Check)] : []),
  });
}

defineExpose({
  get element() { return tree.value?.element ?? null; },
  focus: (options) => tree.value?.focus(options),
  resolveSearch: (request, matches) => tree.value?.resolveSearch(request, matches) ?? false,
} satisfies TreeSelectExpose<ID>);
</script>

<template>
  <TreeSelectRoot
    ref="tree"
    v-bind="{ ...rootAttrs($attrs), ...rootProps }"
    v-slot="state"
    :model-value="selection.value.value"
    :query="search.value.value"
    :open="props.open ?? localOpen"
    :position="false"
    :data-ui-tree-select-positioned="props.position || undefined"
    @update:model-value="selection.set"
    @update:expanded-values="emit('update:expandedValues', $event)"
    @update:highlighted-value="emit('update:highlightedValue', $event)"
    @update:query="search.set"
    @update:open="updateOpen"
    @click="openFromInput"
    @input="openFromSearch"
    @compositionend="openFromSearch"
    @search="onSearch"
  >
    <slot v-if="$slots.default || props.asChild" v-bind="state" />
    <template v-else>
      <UITreeSelectField
        v-bind="inputAttrs($attrs)"
        :placeholder="props.placeholder ?? '검색 또는 선택'"
        :query="state.query"
        :selected="state.value.length > 0"
        :display-value="state.value.map(labelFor).join(', ')"
      />
      <TreeSelectContent>
        <Rows v-if="state.getChildren(null).length" :state="state" />
        <p v-else-if="state.query && !state.pending" role="status">검색 결과가 없습니다.</p>
      </TreeSelectContent>
    </template>
  </TreeSelectRoot>
</template>
