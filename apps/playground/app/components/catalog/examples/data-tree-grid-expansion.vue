<script setup lang="ts">
import { createUIDataTreeGridComponents, useDataTreeGrid, useDataTreeGridContext } from "@connextable/ui";
import { ChevronRight } from "@lucide/vue";
import { defineComponent, h } from "vue";

const storefront = { kind: "leaf", id: "storefront", cells: { service: "쇼핑몰", team: "서비스 팀" } } as const;
const backend = { kind: "leaf", id: "orders", cells: { service: "주문 API", team: "서버 팀" } } as const;

const tree = useDataTreeGrid({
  source: (request) => {
    const rootOpen = request.expansion.includes("platform");
    const apiOpen = request.expansion.includes("apis");
    const platform = {
      kind: "group", id: "platform", parentGroupID: null, depth: 0, expanded: rootOpen,
      cells: { service: "플랫폼", team: "2개 서비스" },
    } as const;
    const apis = {
      kind: "group", id: "apis", parentGroupID: "platform", depth: 1, expanded: apiOpen,
      cells: { service: "API 묶음", team: "1개 서비스" },
    } as const;
    const rows = [platform, ...(rootOpen ? [apis, ...(apiOpen ? [backend] : []), storefront] : [])];
    return {
      ...request,
      rows,
      viewRevision: request.requestID,
      matchingLeafCount: { kind: "known", value: 2 },
      visibleRowCount: { kind: "known", value: rows.length },
      columnSchema: { revision: request.columnSchemaRevision, columns: [{ id: "service" }, { id: "team" }], headers: [] },
      removedRowIDs: [],
    };
  },
});
const DataTreeGrid = createUIDataTreeGridComponents(tree);

const ExpansionSummary = defineComponent({
  setup() {
    const { snapshot } = useDataTreeGridContext();
    return () => h("p", { "aria-live": "polite" }, `펼친 그룹 ${snapshot.value.tabular.state.expansion.length}개`);
  },
});
</script>

<template>
  <div>
    <DataTreeGrid.Provider>
      <DataTreeGrid.Root aria-label="플랫폼 서비스 목록">
        <DataTreeGrid.Header>
          <DataTreeGrid.HeaderRow>
            <DataTreeGrid.ColumnHeader column="service">서비스</DataTreeGrid.ColumnHeader>
            <DataTreeGrid.ColumnHeader column="team">요약</DataTreeGrid.ColumnHeader>
          </DataTreeGrid.HeaderRow>
        </DataTreeGrid.Header>
        <DataTreeGrid.Body v-slot="{ row }">
          <DataTreeGrid.Cell column="service" data-ui-tree-column>
            <DataTreeGrid.RowDisclosure v-if="row.kind === 'group'" :aria-label="`${row.cells.service} 펼치기 또는 접기`">
              <ChevronRight aria-hidden="true" />
            </DataTreeGrid.RowDisclosure>
            {{ row.cells.service }}
          </DataTreeGrid.Cell>
          <DataTreeGrid.Cell column="team">{{ row.cells.team }}</DataTreeGrid.Cell>
        </DataTreeGrid.Body>
      </DataTreeGrid.Root>
      <ExpansionSummary />
    </DataTreeGrid.Provider>
  </div>
</template>
