<script setup lang="ts" generic="ID extends string = string">
import { ArrowLeft, ArrowRight, ChevronsLeft, ChevronsRight } from "@lucide/vue";
import {
  TransferItem,
  TransferList,
  TransferMove,
  TransferRoot,
  type TransferEmits,
  type TransferExpose,
  type TransferRootProps,
  type TransferRootSlotProps,
  type TransferSide,
} from "@sectile/vue/transfer";
import { computed, useTemplateRef } from "vue";
import UIButton from "../button/UIButton.vue";
import { definedControlAttrs } from "../control-attrs";

defineOptions({ inheritAttrs: false, __sectileFormLabelMode: "labelledby" });
const props = withDefaults(defineProps<TransferRootProps<ID> & {
  sourceLabel?: string;
  targetLabel?: string;
}>(), {
  sourceLabel: "사용 가능한 항목",
  targetLabel: "선택한 항목",
  disabled: undefined,
  readonly: undefined,
  required: undefined,
});
const emit = defineEmits<TransferEmits<ID>>();
defineSlots<{
  default?(state: TransferRootSlotProps<ID>): unknown;
  item?(item: { id: ID; side: TransferSide }): unknown;
}>();

const root = useTemplateRef<TransferExpose<ID>>("root");
const rootProps = computed(() => {
  const { sourceLabel, targetLabel, nodes, sourceId, targetId, ...optionalProps } = props;
  return { ...definedControlAttrs(optionalProps), nodes, sourceId, targetId };
});
const disabledItems = computed(() => new Set(props.disabledItems));
const sides = ["source", "target"] as const;
const actions = [
  { from: "source", label: "선택 항목을 오른쪽으로 이동", icon: ArrowRight },
  { from: "target", label: "선택 항목을 왼쪽으로 이동", icon: ArrowLeft },
] as const;
const bulkActions = [
  { from: "source", label: "전체 항목을 오른쪽으로 이동", icon: ChevronsRight },
  { from: "target", label: "전체 항목을 왼쪽으로 이동", icon: ChevronsLeft },
] as const;

function move(from: TransferSide, ids?: readonly ID[]) {
  return root.value?.move(from, ids) ?? false;
}

defineExpose({
  get element() { return root.value?.element ?? null; },
  focus: (side?: TransferSide) => root.value?.focus(side),
  move,
} satisfies TransferExpose<ID>);
</script>

<template>
  <TransferRoot
    ref="root"
    v-bind="{ ...$attrs, ...rootProps }"
    :class="{ 'ui-transfer': !$slots.default }"
    v-slot="state"
    @update:nodes="emit('update:nodes', $event)"
    @move="emit('move', $event)"
    @update:source-value="emit('update:sourceValue', $event)"
    @update:target-value="emit('update:targetValue', $event)"
    @update:source-highlighted-value="emit('update:sourceHighlightedValue', $event)"
    @update:target-highlighted-value="emit('update:targetHighlightedValue', $event)"
    @activate="(side, id) => emit('activate', side, id)"
  >
    <slot v-if="$slots.default" v-bind="state" />
    <div v-else class="ui-transfer__layout">
      <template v-for="side in sides" :key="side">
        <div v-if="side === 'target'" class="ui-transfer__actions" role="group" aria-label="목록 간 이동">
          <TransferMove
            v-for="action in actions"
            :key="action.from"
            :from="action.from"
            :disabled="!(action.from === 'source' ? state.sourceValue : state.targetValue).length"
            as-child
          >
            <UIButton variant="outline" size="sm" icon-only :aria-label="action.label" :title="action.label">
              <template #leading><component :is="action.icon" /></template>
            </UIButton>
          </TransferMove>
          <div class="ui-transfer__bulk">
            <UIButton
              v-for="action in bulkActions"
              :key="action.from"
              variant="outline"
              size="sm"
              icon-only
              :aria-label="action.label"
              :title="action.label"
              :disabled="state.disabled || state.readonly ||
                !(action.from === 'source' ? state.sourceItems : state.targetItems).some(id => !disabledItems.has(id))"
              @click="move(action.from, (action.from === 'source' ? state.sourceItems : state.targetItems)
                .filter(id => !disabledItems.has(id)))"
            >
              <template #leading><component :is="action.icon" /></template>
            </UIButton>
          </div>
        </div>
        <div class="ui-transfer__pane">
          <strong class="ui-transfer__title">{{ side === "source" ? sourceLabel : targetLabel }}</strong>
          <TransferList
            :side="side"
            :label="side === 'source' ? sourceLabel : targetLabel"
            class="ui-transfer__list"
          >
            <TransferItem
              v-for="id in side === 'source' ? state.sourceItems : state.targetItems"
              :key="id"
              :value="id"
              class="ui-transfer__item"
            >
              <slot name="item" :id="id" :side="side">{{ id }}</slot>
            </TransferItem>
            <div v-if="!(side === 'source' ? state.sourceItems : state.targetItems).length" class="ui-transfer__empty">
              항목 없음
            </div>
          </TransferList>
        </div>
      </template>
    </div>
  </TransferRoot>
</template>

<style scoped>
.ui-transfer {
  display: block;
  min-inline-size: 0;
  padding: 0;
  border: 0;
}

.ui-transfer__layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  gap: var(--ui-space-sm);
}

.ui-transfer__pane {
  --ui-transfer-pane-padding: var(--ui-space-xs);
  --ui-transfer-pane-radius: var(--ui-radius-lg);

  display: flex;
  flex-direction: column;
  min-inline-size: 0;
  padding: var(--ui-transfer-pane-padding);
  border: 1px solid var(--ui-color-border);
  border-radius: var(--ui-transfer-pane-radius);
  background: var(--ui-color-surface);
}

.ui-transfer__title {
  padding: var(--ui-space-sm);
  border-block-end: 1px solid var(--ui-color-divider);
  font-size: var(--ui-font-size-body-sm);
  overflow-wrap: anywhere;
}

.ui-transfer__list {
  flex: 1;
  min-block-size: calc(5 * var(--ui-control-height-small));
  max-block-size: calc(7 * var(--ui-control-height-small));
  overflow: auto;
  border-radius: max(0px, calc(var(--ui-transfer-pane-radius) - var(--ui-transfer-pane-padding) - 1px));
}

.ui-transfer__list:focus-visible {
  outline: var(--ui-focus-ring-width) solid var(--ui-color-focus);
  outline-offset: var(--ui-focus-ring-offset);
}

.ui-transfer__item {
  box-sizing: border-box;
  min-block-size: var(--ui-control-height-small);
  padding: var(--ui-space-sm);
  border-radius: inherit;
  font-size: var(--ui-font-size-body-sm);
  overflow-wrap: anywhere;
  cursor: pointer;
}

.ui-transfer__item[data-highlighted] {
  background: var(--ui-color-surface-hover);
}

.ui-transfer__item[aria-selected="true"] {
  background: var(--ui-color-accent-soft);
  color: var(--ui-color-accent);
}

.ui-transfer__item[aria-disabled="true"],
.ui-transfer__list[aria-readonly="true"] .ui-transfer__item {
  cursor: default;
}

.ui-transfer__item[aria-disabled="true"] {
  color: var(--ui-color-disabled);
}

.ui-transfer__empty {
  padding: var(--ui-space-sm);
  color: var(--ui-color-text-muted);
  font-size: var(--ui-font-size-metadata);
}

.ui-transfer__actions,
.ui-transfer__bulk {
  display: grid;
  gap: var(--ui-space-xs);
}

.ui-transfer__actions {
  align-self: center;
}

.ui-transfer__bulk {
  padding-block-start: var(--ui-space-xs);
  border-block-start: 1px solid var(--ui-color-divider);
}
</style>
