<script setup lang="ts">
import { ChevronRight } from "@lucide/vue";
import { UITabularRows, createUIDataTreeGridComponents, createUITabularSource, useDataTreeGrid } from "@connextable/ui";

const departments = [
  { id: "product", name: "제품", projects: ["접근성 검토", "검색 개선", "온보딩"] },
  { id: "operations", name: "운영", projects: ["백업 점검", "문의 응답"] },
] as const;

const source = createUITabularSource({
  columns: [{ id: "name" }, { id: "summary" }],
  async load(request, { signal }) {
    if (request.expansion.length) await new Promise<void>((resolve) => setTimeout(resolve, 450));
    signal.throwIfAborted();
    const rows = departments.flatMap((department) => {
      const expanded = request.expansion.includes(department.id);
      const group = {
        kind: "group" as const, id: department.id, parentGroupID: null, depth: 0, expanded,
        cells: { name: department.name, summary: `프로젝트 ${department.projects.length}개` },
      };
      const children = department.projects.map((name, index) => ({
        kind: "leaf" as const, id: `${department.id}-${index}`,
        parentGroupID: department.id, depth: 1,
        cells: { name, summary: index % 2 ? "검토 중" : "진행 중" },
      }));
      return expanded ? [group, ...children] : [group];
    });
    return { rows, matchingLeafCount: 5 };
  },
});
const tree = useDataTreeGrid({ source });
const Tree = createUIDataTreeGridComponents(tree);
</script>

<template>
  <Tree.Provider v-slot="{ rows }">
    <PlaygroundExample v-bind="$attrs as { id: string; title: string }">
      <Tree.Root aria-label="부서별 프로젝트" :aria-busy="tree.status.value === 'loading'">
        <Tree.Header>
          <Tree.HeaderRow>
            <Tree.ColumnHeader column="name">부서 · 프로젝트</Tree.ColumnHeader>
            <Tree.ColumnHeader column="summary">요약</Tree.ColumnHeader>
          </Tree.HeaderRow>
        </Tree.Header>
        <Tree.Body manual v-slot="{ rows: visibleRows }">
          <UITabularRows>
            <Tree.Row v-for="row in visibleRows" :key="row.id" :row-i-d="row.id">
              <Tree.Cell :row-i-d="row.id" column="name" data-ui-tree-column>
                <Tree.RowDisclosure v-if="row.kind === 'group'" :row-i-d="row.id" :aria-label="`${row.cells.name} 프로젝트`">
                  <ChevronRight aria-hidden="true" />
                </Tree.RowDisclosure>
                {{ row.cells.name }}
              </Tree.Cell>
              <Tree.Cell :row-i-d="row.id" column="summary">{{ row.cells.summary }}</Tree.Cell>
            </Tree.Row>
          </UITabularRows>
        </Tree.Body>
      </Tree.Root>
      <template #footer>
        <output>{{ tree.status.value === 'loading' ? '프로젝트를 불러오는 중' : `표시 중인 행 ${rows.length}개` }}</output>
      </template>
    </PlaygroundExample>
  </Tree.Provider>
</template>
