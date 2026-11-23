<script setup lang="ts">
import { useTemplateRef, watchPostEffect } from "vue";
import { UIButton, UIDataSurface, createUIDataTableComponents, useDataTable } from "@connextable/ui";

const total = 192;
const batch = 24;
const scrollport = useTemplateRef<HTMLElement>("scrollport");
const tail = useTemplateRef<HTMLElement>("tail");
const access = (size: number, revision: number) => ({
  kind: "window" as const,
  window: { start: 0, size, total, revision, requestGeneration: 0, pending: null },
});

const table = useDataTable({
  defaultAccessState: access(batch, 0),
  source: async (request, { signal }) => {
    const count = request.access.kind === "window" ? request.access.count : batch;
    if (count > batch) await new Promise<void>(resolve => setTimeout(resolve, 350));
    signal.throwIfAborted();

    const rows = Array.from({ length: count }, (_, index) => ({
      kind: "leaf" as const, id: String(index + 1),
      cells: { name: ["설정 저장", "자료 다운로드", "문서 검색", "팀 초대"][index % 4]!, number: index + 1 },
    }));
    return {
      ...request, rows, viewRevision: request.requestID,
      matchingLeafCount: { kind: "known", value: total },
      visibleRowCount: { kind: "known", value: total },
      columnSchema: { revision: request.columnSchemaRevision, columns: [{ id: "number" }, { id: "name" }], headers: [] },
      removedRowIDs: [],
    };
  },
});
const Table = createUIDataTableComponents(table);
const status = table.status;

function loadMore() {
  const current = table.snapshot.value.state.accessState;
  if (status.value === "loading" || current.kind !== "window") return;
  if (status.value === "error") {
    table.reload();
    return;
  }
  const { size, revision } = current.window;
  if (size < total) table.dispatch({ type: "set-access", accessState: access(Math.min(size + batch, total), revision + 1) });
}

watchPostEffect(onCleanup => {
  if (!scrollport.value || !tail.value) return;
  const observer = new IntersectionObserver(([entry]) => {
    if (entry?.isIntersecting && status.value !== "error") loadMore();
  }, { root: scrollport.value, rootMargin: "0px 0px 384px 0px" });
  observer.observe(tail.value);
  onCleanup(() => observer.disconnect());
});
</script>

<template>
  <Table.Provider v-slot="{ rows }">
    <UIDataSurface>
      <div ref="scrollport" class="event-scroll" data-ui-tabular-scroll role="region" tabindex="0" aria-label="처리 기록 스크롤">
        <Table.Root aria-label="처리 기록" :aria-busy="status === 'loading'">
          <Table.Header>
            <Table.HeaderRow>
              <Table.ColumnHeader column="number">기록 번호</Table.ColumnHeader>
              <Table.ColumnHeader column="name">활동</Table.ColumnHeader>
            </Table.HeaderRow>
          </Table.Header>
          <Table.Body v-slot="{ row }">
            <Table.Cell column="number" data-ui-tabular-numeric>#{{ row.cells.number }}</Table.Cell>
            <Table.Cell column="name">{{ row.cells.name }}</Table.Cell>
          </Table.Body>
        </Table.Root>
        <div v-if="rows.length < total" ref="tail" aria-hidden="true" class="event-end" />
      </div>
      <template #footer>
        <output aria-live="polite">
          {{ rows.length }} / {{ total }}건
          {{ status === 'loading' ? '· 불러오는 중' : status === 'error' ? '· 요청 실패' : rows.length === total ? '· 끝' : '' }}
        </output>
        <UIButton v-if="rows.length < total" size="sm" variant="outline" :loading="status === 'loading'" @click="loadMore">
          {{ status === 'error' ? "다시 시도" : "다음 기록 불러오기" }}
        </UIButton>
      </template>
    </UIDataSurface>
  </Table.Provider>
</template>

<style scoped>
.event-scroll { block-size: 19rem; }
.event-end { block-size: 1px; }
</style>
