<script setup lang="ts">
import { UITabularEditTrigger, createUIDataTreeGridComponents, useUIDataTreeGrid } from "@connextable/ui";
import { ChevronRight } from "@lucide/vue";
import { onScopeDispose, ref } from "vue";

let owner = "민지";
const saved = ref("");
const tree = useUIDataTreeGrid({
  defaultExpansion: ["platform"],
  source: (request) => {
    const expanded = request.expansion.includes("platform");
    const group = {
      kind: "group", id: "platform", parentGroupID: null, depth: 0, expanded,
      cells: { service: "플랫폼", owner: "제품 팀" },
    } as const;
    const child = { kind: "leaf", id: "site", parentGroupID: "platform", depth: 1, cells: { service: "웹사이트", owner } } as const;
    const rows = expanded ? [group, child] : [group];
    return {
      ...request,
      rows,
      viewRevision: request.requestID,
      matchingLeafCount: { kind: "known", value: 1 },
      visibleRowCount: { kind: "known", value: rows.length },
      columnSchema: {
        revision: request.columnSchemaRevision,
        columns: [{ id: "service" }, { id: "owner", capabilities: ["edit"] }],
        headers: [],
      },
      removedRowIDs: [],
    };
  },
});
onScopeDispose(tree.subscribeCommands(command => {
  if (command.type !== "commit-edit" || command.cell.rowID !== "site" || command.cell.columnID !== "owner") return;
  owner = String(command.value ?? "");
  saved.value = owner;
  tree.reload();
}));
const DataTreeGrid = createUIDataTreeGridComponents(tree);
</script>

<template>
  <div>
    <DataTreeGrid.Provider>
      <DataTreeGrid.Root aria-label="서비스 담당자">
        <DataTreeGrid.Header>
          <DataTreeGrid.HeaderRow>
            <DataTreeGrid.ColumnHeader column="service">서비스</DataTreeGrid.ColumnHeader>
            <DataTreeGrid.ColumnHeader column="owner">담당자</DataTreeGrid.ColumnHeader>
          </DataTreeGrid.HeaderRow>
        </DataTreeGrid.Header>
        <DataTreeGrid.Body v-slot="{ row }">
          <DataTreeGrid.Cell column="service" data-ui-tree-column>
            <DataTreeGrid.RowDisclosure v-if="row.kind === 'group'" aria-label="플랫폼 그룹">
              <ChevronRight aria-hidden="true" />
            </DataTreeGrid.RowDisclosure>
            {{ row.cells.service }}
          </DataTreeGrid.Cell>
          <DataTreeGrid.Cell column="owner">
            <DataTreeGrid.Editor v-if="row.kind === 'leaf'" column="owner" :value="row.cells.owner" aria-label="새 담당자" />
            <UITabularEditTrigger v-if="row.kind === 'leaf'"
              :aria-label="`${row.cells.service} 담당자 편집, 현재 ${row.cells.owner}`"
              @click="tree.dispatch({ type: 'begin-edit', cell: { rowID: row.id, columnID: 'owner' } })">
              {{ row.cells.owner }}
            </UITabularEditTrigger>
            <template v-if="row.kind === 'group'">{{ row.cells.owner }}</template>
          </DataTreeGrid.Cell>
        </DataTreeGrid.Body>
      </DataTreeGrid.Root>
    </DataTreeGrid.Provider>
    <output v-if="saved">저장한 담당자 {{ saved }}</output>
  </div>
</template>
