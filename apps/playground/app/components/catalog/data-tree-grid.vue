<script setup lang="ts">
import { createUIDataTreeGridComponents, useUIDataTreeGrid } from "@connextable/ui";
import { ChevronRight } from "@lucide/vue";

const children = [
  { kind: "leaf", id: "site", cells: { service: "웹사이트", team: "프런트엔드" } },
  { kind: "leaf", id: "api", cells: { service: "API", team: "백엔드" } },
] as const;

const tree = useUIDataTreeGrid({
  defaultExpansion: ["platform"],
  source: (request) => {
    const expanded = request.expansion.includes("platform");
    const group = {
      kind: "group", id: "platform", parentGroupID: null, depth: 0, expanded,
      cells: { service: "플랫폼", team: "서비스 팀" },
    } as const;
    const rows = expanded ? [group, ...children] : [group];
    return {
      ...request,
      rows,
      viewRevision: request.requestID,
      matchingLeafCount: { kind: "known", value: children.length },
      visibleRowCount: { kind: "known", value: rows.length },
      columnSchema: {
        revision: request.columnSchemaRevision,
        columns: [{ id: "service" }, { id: "team" }],
        headers: [],
      },
      removedRowIDs: [],
    };
  },
});
const DataTreeGrid = createUIDataTreeGridComponents(tree);
</script>

<template>
  <DataTreeGrid.Provider>
    <DataTreeGrid.Root aria-label="서비스 담당 팀">
      <DataTreeGrid.Header>
        <DataTreeGrid.HeaderRow>
          <DataTreeGrid.ColumnHeader column="service">서비스</DataTreeGrid.ColumnHeader>
          <DataTreeGrid.ColumnHeader column="team">담당 팀</DataTreeGrid.ColumnHeader>
        </DataTreeGrid.HeaderRow>
      </DataTreeGrid.Header>
      <DataTreeGrid.Body v-slot="{ row }">
        <DataTreeGrid.Cell column="service" data-ui-tree-column>
          <DataTreeGrid.RowDisclosure v-if="row.kind === 'group'" aria-label="하위 서비스">
            <ChevronRight :size="16" aria-hidden="true" />
          </DataTreeGrid.RowDisclosure>
          {{ row.cells.service }}
        </DataTreeGrid.Cell>
        <DataTreeGrid.Cell column="team">{{ row.cells.team }}</DataTreeGrid.Cell>
      </DataTreeGrid.Body>
    </DataTreeGrid.Root>
  </DataTreeGrid.Provider>
</template>
