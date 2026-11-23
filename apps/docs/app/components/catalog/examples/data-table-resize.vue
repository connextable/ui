<script setup lang="ts">
import { createUIDataTableComponents, createUITabularSource, useDataTable } from "@connextable/ui";

const files = [
  { kind: "leaf", id: "guide", cells: { filename: "신규 입점사 계약 검토 및 등록 절차.pdf", team: "운영", format: "PDF" } },
  { kind: "leaf", id: "quality", cells: { filename: "모바일 결제 접근성 점검 결과.xlsx", team: "제품", format: "XLSX" } },
  { kind: "leaf", id: "assets", cells: { filename: "가을 캠페인 모바일 배너 최종 시안.fig", team: "디자인", format: "FIG" } },
] as const;

const table = useDataTable({
  defaultColumnSizeState: { filename: 175 },
  source: createUITabularSource({
    columns: [{ id: "filename" }, { id: "team" }, { id: "format" }],
    load: () => ({ rows: files }),
  }),
});
const Table = createUIDataTableComponents(table);
</script>

<template>
  <PlaygroundExample v-bind="$attrs as { id: string; title: string }">
    <div data-ui-tabular-scroll tabindex="0" role="region" aria-label="공유 파일 표 스크롤 영역">
      <Table.Provider>
        <Table.Root class="files" aria-label="공유 파일">
          <Table.Header>
            <Table.HeaderRow>
              <Table.ColumnHeader column="filename">
                파일명
                <Table.ColumnResizeHandle column="filename" :min-size="120" :max-size="360" aria-label="파일명 열 너비 조절" />
              </Table.ColumnHeader>
              <Table.ColumnHeader column="team">담당 팀</Table.ColumnHeader>
              <Table.ColumnHeader column="format">형식</Table.ColumnHeader>
            </Table.HeaderRow>
          </Table.Header>
          <Table.Body v-slot="{ row }">
            <Table.Cell column="filename">{{ row.cells.filename }}</Table.Cell>
            <Table.Cell column="team">{{ row.cells.team }}</Table.Cell>
            <Table.Cell column="format">{{ row.cells.format }}</Table.Cell>
          </Table.Body>
        </Table.Root>
      </Table.Provider>
    </div>
    <template #footer>
      <output>파일명 열 너비 {{ table.columnSizes.value.filename }}px</output>
    </template>
  </PlaygroundExample>
</template>

<style scoped>
.files {
  min-inline-size: 31rem;
  table-layout: fixed;
  word-break: keep-all;
}
</style>
