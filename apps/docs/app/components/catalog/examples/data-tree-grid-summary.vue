<script setup lang="ts">
import { UIDataStatus, UIDataSurface, UITabularRows, createUIDataTreeGridComponents, useDataTreeGrid } from "@connextable/ui";
import { ChevronRight, CircleCheck, TriangleAlert } from "@lucide/vue";

const regions = [
  { id: "kr", name: "한국", cities: [{ name: "서울", alerts: 2 }, { name: "부산", alerts: 0 }] },
  { id: "jp", name: "일본", cities: [{ name: "도쿄", alerts: 1 }, { name: "오사카", alerts: 0 }] },
  { id: "de", name: "독일", cities: [{ name: "프랑크푸르트", alerts: 0 }] },
];
const tree = useDataTreeGrid({
  source: request => {
    const rows = regions.flatMap(region => {
      const expanded = request.expansion.includes(region.id);
      const group = {
        kind: "group" as const, id: region.id, parentGroupID: null, depth: 0, expanded,
        cells: { name: region.name, alerts: region.cities.reduce((sum, city) => sum + city.alerts, 0) },
      };
      return [group, ...(expanded ? region.cities.map((city, index) => ({
        kind: "leaf" as const, id: `${region.id}-${index}`, parentGroupID: region.id, depth: 1, cells: city,
      })) : [])];
    });
    return {
      ...request, rows, viewRevision: request.requestID,
      matchingLeafCount: { kind: "known", value: 5 },
      visibleRowCount: { kind: "known", value: rows.length },
      columnSchema: { revision: request.columnSchemaRevision, columns: [{ id: "name" }, { id: "alerts" }], headers: [] },
      removedRowIDs: [],
    };
  },
});
const Tree = createUIDataTreeGridComponents(tree);
</script>

<template>
  <UIDataSurface>
    <template #toolbar><strong>지역별 운영 지점</strong></template>
    <Tree.Provider>
      <Tree.Root aria-label="지역별 경보">
        <Tree.Header>
          <Tree.HeaderRow>
            <Tree.ColumnHeader column="name">지역과 지점</Tree.ColumnHeader>
            <Tree.ColumnHeader column="alerts" data-ui-tabular-align="end">미처리 경보</Tree.ColumnHeader>
          </Tree.HeaderRow>
        </Tree.Header>
        <Tree.Body manual v-slot="{ rows }">
          <UITabularRows>
            <Tree.Row v-for="row in rows" :key="row.id" :row-i-d="row.id">
              <Tree.Cell :row-i-d="row.id" column="name" data-ui-tree-column>
                <Tree.RowDisclosure v-if="row.kind === 'group'" :row-i-d="row.id" :aria-label="`${row.cells.name} 지점`">
                  <ChevronRight aria-hidden="true" />
                </Tree.RowDisclosure>
                {{ row.cells.name }}
              </Tree.Cell>
              <Tree.Cell :row-i-d="row.id" column="alerts" data-ui-tabular-align="end" data-ui-tabular-numeric>
                <UIDataStatus :tone="row.cells.alerts ? 'warning' : 'success'" :icon="row.cells.alerts ? TriangleAlert : CircleCheck">
                  {{ row.cells.alerts ? `${row.cells.alerts}건` : "정상" }}
                </UIDataStatus>
              </Tree.Cell>
            </Tree.Row>
          </UITabularRows>
        </Tree.Body>
      </Tree.Root>
    </Tree.Provider>
  </UIDataSurface>
</template>
