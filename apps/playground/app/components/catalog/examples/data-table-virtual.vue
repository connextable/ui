<script setup lang="ts">
import { computed, shallowRef, useTemplateRef } from "vue";
import {
  UIButton, UIDataSurface, createDenseTrackGridLayout, createUniformExtentIndex,
  createUIDataTableComponents, trackGridLayoutStrategy, useUIDataTable, useUIVirtualizer,
} from "@connextable/ui";

const total = 20_000;
const rowHeight = 48;
const headerHeight = 36;
const number = new Intl.NumberFormat("ko-KR");
const scrollport = useTemplateRef<HTMLElement>("scrollport");
const surface = useTemplateRef<HTMLElement>("surface");
const ids = Array.from({ length: total }, (_, index) => index);
const layout = shallowRef(createDenseTrackGridLayout(
  createUniformExtentIndex(total, { kind: "exact", value: rowHeight }),
  createUniformExtentIndex(1, { kind: "exact", value: 1 }),
  ids,
));
const access = (start: number, size: number, revision: number) => ({
  kind: "window" as const,
  window: { start, size, total, revision, requestGeneration: 0, pending: null },
});
const table = useUIDataTable({
  defaultAccessState: access(0, 12, 0),
  source: request => {
    const { start, count } = request.access.kind === "window" ? request.access : { start: 0, count: 12 };
    const rows = Array.from({ length: count }, (_, index) => {
      const id = start + index;
      return {
        kind: "leaf" as const, id: String(id),
        cells: { name: `배송 기록 ${number.format(id + 1)}`, destination: ["서울", "부산", "대전"][id % 3]! },
      };
    });
    return {
      ...request, rows, viewRevision: request.requestID,
      matchingLeafCount: { kind: "known", value: total },
      visibleRowCount: { kind: "known", value: total },
      columnSchema: { revision: request.columnSchemaRevision, columns: [{ id: "name" }, { id: "destination" }], headers: [] },
      removedRowIDs: [],
    };
  },
});
const Table = createUIDataTableComponents(table);

const { scrollTo } = useUIVirtualizer({
  state: layout, strategy: trackGridLayoutStrategy, scrollport, surface,
  viewportInsets: { top: headerHeight },
  overscan: rowHeight * 4,
  onPlanChange({ placements }) {
    const first = placements[0];
    const last = placements.at(-1);
    const current = table.snapshot.value.state.accessState;
    if (!first || !last || current.kind !== "window") return;
    const start = Number(first.id);
    const size = Number(last.id) - start + 1;
    if (start === current.window.start && size === current.window.size) return;
    table.dispatch({ type: "set-access", accessState: access(start, size, current.window.revision + 1) });
  },
});

const rows = computed(() => {
  const accepted = table.acceptedViewState.value;
  return accepted.kind === "none" ? [] : accepted.view.rows;
});
const start = computed(() => Number(rows.value[0]?.id ?? 0));
const end = computed(() => start.value + rows.value.length);
</script>

<template>
  <UIDataSurface>
    <template #toolbar>
      <strong>배송 기록</strong>
      <UIButton size="sm" variant="outline" @click="scrollTo(14_999, 'center')">15,000번째 기록으로 이동</UIButton>
    </template>
    <div ref="scrollport" class="records-scroll" data-ui-tabular-scroll role="region" tabindex="0" aria-label="배송 기록 스크롤">
      <div ref="surface" data-ui-tabular-scroll-content>
        <Table.Provider>
          <Table.Root aria-label="가상화된 배송 기록" :aria-rowcount="total + 1"
            :style="{ '--ui-tabular-cell-height': rowHeight + 'px', '--ui-tabular-header-height': headerHeight + 'px' }">
            <Table.Header>
              <Table.HeaderRow>
                <Table.ColumnHeader column="name">기록</Table.ColumnHeader>
                <Table.ColumnHeader column="destination">도착지</Table.ColumnHeader>
              </Table.HeaderRow>
            </Table.Header>
            <Table.Body manual v-slot="{ rows: rendered }">
              <tr v-if="start > 0" aria-hidden="true"><td colspan="2" :style="{ height: start * rowHeight + 'px' }" /></tr>
              <Table.Row v-for="row in rendered" :key="row.id" :row-i-d="row.id" :aria-rowindex="Number(row.id) + 2">
                <Table.Cell :row-i-d="row.id" column="name">{{ row.cells.name }}</Table.Cell>
                <Table.Cell :row-i-d="row.id" column="destination">{{ row.cells.destination }}</Table.Cell>
              </Table.Row>
              <tr v-if="end < total" aria-hidden="true"><td colspan="2" :style="{ height: (total - end) * rowHeight + 'px' }" /></tr>
            </Table.Body>
          </Table.Root>
        </Table.Provider>
      </div>
    </div>
    <template #footer>
      <output>총 {{ number.format(total) }}건 · 렌더링 {{ rows.length }}행</output>
    </template>
  </UIDataSurface>
</template>

<style scoped>
.records-scroll { block-size: 20rem; overflow-anchor: none; }
.records-scroll table { table-layout: fixed; }
.records-scroll td[style] { padding: 0; }
</style>
