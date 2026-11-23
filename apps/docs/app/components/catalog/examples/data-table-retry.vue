<script setup lang="ts">
import { computed, ref } from "vue";
import { UIButton, UIDataActions, createUIDataTableComponents, createUITabularSource, useDataTable } from "@connextable/ui";

const failNext = ref(false);
const rows = [
  { kind: "leaf", id: "docs", cells: { service: "문서", status: "정상" } },
  { kind: "leaf", id: "search", cells: { service: "검색", status: "점검 완료" } },
] as const;

const table = useDataTable({
  source: createUITabularSource({
    columns: [{ id: "service" }, { id: "status" }],
    async load(_request, { signal }) {
      const fail = failNext.value;
      failNext.value = false;
      await new Promise<void>((resolve) => setTimeout(resolve, 400));
      signal.throwIfAborted();
      if (fail) throw new Error("일시적으로 응답하지 않습니다.");
      return { rows };
    },
  }),
});
const Table = createUIDataTableComponents(table);
const failed = computed(() => table.status.value === "error");

function requestAgain() {
  failNext.value = !failed.value;
  table.reload();
}
</script>

<template>
  <PlaygroundExample v-bind="$attrs as { id: string; title: string }">
    <Table.Provider>
      <Table.Root aria-label="서비스 상태" :aria-busy="table.status.value === 'loading'">
        <Table.Header>
          <Table.HeaderRow>
            <Table.ColumnHeader column="service">서비스</Table.ColumnHeader>
            <Table.ColumnHeader column="status">상태</Table.ColumnHeader>
          </Table.HeaderRow>
        </Table.Header>
        <Table.Body v-slot="{ row }">
          <Table.Cell column="service">{{ row.cells.service }}</Table.Cell>
          <Table.Cell column="status">{{ row.cells.status }}</Table.Cell>
        </Table.Body>
      </Table.Root>
    </Table.Provider>
    <UIDataActions>
      <UIButton size="sm" :variant="failed ? 'solid' : 'outline'"
        :loading="table.status.value === 'loading'" @click="requestAgain">
        {{ failed ? '다시 시도' : '오류 재현' }}
      </UIButton>
    </UIDataActions>
    <template #footer>
      <output aria-live="polite">
        {{ failed ? '불러오지 못했습니다. 마지막 응답을 표시합니다.'
          : table.status.value === 'loading' ? '가상 응답을 기다리는 중' : '서비스 2개 · 최신 응답' }}
      </output>
    </template>
  </PlaygroundExample>
</template>
