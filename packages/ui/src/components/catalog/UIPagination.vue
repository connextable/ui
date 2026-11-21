<script setup lang="ts">
import { PaginationItem, PaginationRoot, type PaginationControlLabelResolver, type PaginationRootProps, type PaginationRootSlotProps } from "@sectile/vue/pagination";
import UIButton from "../button/UIButton.vue";
import { UIPaginationFirst, UIPaginationLast, UIPaginationNext, UIPaginationPrevious } from "./pagination-controls";

const props = withDefaults(defineProps<PaginationRootProps>(), {
  siblingCount: 1,
  showControls: true,
  showEdges: true,
  label: "페이지 탐색",
  getPageLabel: (page: number) => `${page}페이지`,
  getControlLabel: (control: Parameters<PaginationControlLabelResolver>[0]) => ({
    "first-page": "첫 페이지",
    "previous-page": "이전 페이지",
    "next-page": "다음 페이지",
    "last-page": "마지막 페이지",
  })[control],
});

defineEmits<{ "update:modelValue": [page: number]; "update:itemsPerPage": [size: number] }>();
defineSlots<{ default?(state: PaginationRootSlotProps): unknown }>();
</script>

<template>
  <PaginationRoot v-bind="props" class="ui-pagination" :class="{ 'ui-pagination--default': !$slots.default }"
    @update:model-value="$emit('update:modelValue', $event)"
    @update:items-per-page="$emit('update:itemsPerPage', $event)"
    v-slot="state">
    <slot v-bind="state">
      <div v-if="state.pageCount" class="ui-pagination__strip">
        <UIPaginationFirst v-if="showControls" class="ui-pagination__edge" />
        <UIPaginationPrevious v-if="showControls" />
        <template v-for="(item, index) in state.items" :key="item.type === 'page' ? item.page : `${item.type}-${index}`">
          <PaginationItem v-if="item.type === 'page'" as-child :item="item" v-slot="{ selected }">
            <UIButton size="sm" :variant="selected ? 'soft' : 'ghost'" :aria-label="getPageLabel(item.page)"
              class="ui-pagination__page">{{ item.page }}</UIButton>
          </PaginationItem>
          <span v-else-if="item.type === 'ellipsis'" class="ui-pagination__ellipsis" aria-hidden="true">…</span>
        </template>
        <UIPaginationNext v-if="showControls" />
        <UIPaginationLast v-if="showControls" class="ui-pagination__edge" />
      </div>
    </slot>
  </PaginationRoot>
</template>

<style>
.ui-pagination--default {
  container: ui-pagination / inline-size;
  inline-size: 30rem;
}

.ui-pagination,
.ui-pagination__strip {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: var(--ui-space-2xs);
  max-inline-size: 100%;
  overflow-x: auto;
}

.ui-pagination__strip {
  inline-size: 100%;
  justify-content: safe center;
}

.ui-pagination > :is(button, [data-part="item"]),
.ui-pagination__strip > * {
  flex: none;
}

.ui-pagination__page {
  min-inline-size: var(--ui-control-height-small);
  font-variant-numeric: tabular-nums;
}

.ui-pagination__ellipsis {
  color: var(--ui-color-text-muted);
  padding-inline: var(--ui-space-2xs);
}

@container ui-pagination (inline-size < 22rem) {
  .ui-pagination__strip > .ui-pagination__edge.ui-button {
    display: none;
  }
}

@container ui-pagination (inline-size < 17rem) {
  .ui-pagination__strip > .ui-pagination__page:not([aria-current="page"]),
  .ui-pagination__ellipsis {
    display: none;
  }
}
</style>
