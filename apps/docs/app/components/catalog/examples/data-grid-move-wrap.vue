<script setup lang="ts">
import { UIButton, UIDataActions, createUIDataGridComponents, useDataGrid } from "@connextable/ui";
import { ArrowLeft, ArrowRight } from "@lucide/vue";
import { computed } from "vue";

const columns = ["web", "app", "partner"] as const;
const labels = { web: "웹", app: "앱", partner: "제휴" };
const rows = [
  { kind: "leaf", id: "morning", cells: { web: 24, app: 18, partner: 6 } },
  { kind: "leaf", id: "noon", cells: { web: 39, app: 28, partner: 12 } },
  { kind: "leaf", id: "evening", cells: { web: 30, app: 32, partner: 8 } },
] as const;
const grid = useDataGrid({
  defaultCursor: { current: { rowID: "morning", columnID: "web" } },
  source: request => ({
    ...request, rows, viewRevision: request.requestID,
    matchingLeafCount: { kind: "known", value: rows.length },
    visibleRowCount: { kind: "known", value: rows.length },
    columnSchema: { revision: request.columnSchemaRevision, columns: columns.map(id => ({ id })), headers: [] },
    removedRowIDs: [],
  }),
});
const Grid = createUIDataGridComponents(grid);
const cursor = computed(() => grid.snapshot.value.cursor.current);

function move(direction: "left" | "right") {
  grid.dispatch({ type: "move-cell", direction, boundary: "wrap-axis" });
}
</script>

<template>
  <PlaygroundExample v-bind="$attrs as { id: string; title: string }">
    <Grid.Provider>
      <Grid.Root aria-label="채널별 처리 건수">
        <Grid.Header>
          <Grid.HeaderRow>
            <Grid.ColumnHeader v-for="column in columns" :key="column" :column="column">{{ labels[column] }}</Grid.ColumnHeader>
          </Grid.HeaderRow>
        </Grid.Header>
        <Grid.Body v-slot="{ row }">
          <Grid.Cell v-for="column in columns" :key="column" :column="column" data-ui-tabular-numeric
            :aria-current="cursor?.rowID === row.id && cursor.columnID === column ? 'true' : undefined">
            {{ row.cells[column] }}건
          </Grid.Cell>
        </Grid.Body>
      </Grid.Root>
    </Grid.Provider>
    <UIDataActions>
      <UIButton size="sm" variant="outline" icon-only aria-label="이전 열" @click="move('left')"><ArrowLeft /></UIButton>
      <UIButton size="sm" variant="outline" icon-only aria-label="다음 열" @click="move('right')"><ArrowRight /></UIButton>
    </UIDataActions>
    <template #footer>
      <output aria-live="polite">{{ cursor ? `현재 열 ${labels[cursor.columnID as keyof typeof labels]}` : '셀을 선택해 탐색 시작' }}</output>
    </template>
  </PlaygroundExample>
</template>
