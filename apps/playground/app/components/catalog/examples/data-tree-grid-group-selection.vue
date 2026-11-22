<script setup lang="ts">
import { UICheckbox, createUIDataTreeGridComponents, createUITabularSource, useUIDataTreeGrid } from "@connextable/ui";
import { ChevronRight } from "@lucide/vue";
import { computed, ref } from "vue";

const groupID = "platform";
const children = [
  { kind: "leaf", id: "site", parentGroupID: groupID, depth: 1, cells: { selected: null, service: "웹사이트", team: "프런트엔드" } },
  { kind: "leaf", id: "api", parentGroupID: groupID, depth: 1, cells: { selected: null, service: "API", team: "백엔드" } },
] as const;
const ids = children.map(row => row.id);
type RowSelection = NonNullable<Parameters<typeof useUIDataTreeGrid>[0]["defaultRowSelection"]>;
const rowSelection = ref<RowSelection>({ kind: "explicit-rows", rowIDs: [] });

const tree = useUIDataTreeGrid({
  defaultExpansion: [groupID],
  rowSelection,
  onRowSelectionChange: selection => { rowSelection.value = selection; },
  source: createUITabularSource({
    columns: [{ id: "selected" }, { id: "service" }, { id: "team" }],
    load({ expansion }) {
      const expanded = expansion.includes(groupID);
      const group = {
        kind: "group", id: groupID, parentGroupID: null, depth: 0, expanded,
        cells: { selected: null, service: "플랫폼", team: "서비스 팀" },
      } as const;
      return { rows: expanded ? [group, ...children] : [group], matchingLeafCount: children.length };
    },
  }),
});
const DataTreeGrid = createUIDataTreeGridComponents(tree);
const groupSelection = computed({
  get() {
    const selection = rowSelection.value;
    if (selection.kind !== "explicit-rows") return false;
    const count = ids.filter(id => selection.rowIDs.includes(id)).length;
    return count === ids.length ? true : count > 0 ? "indeterminate" as const : false;
  },
  set(checked: boolean | "indeterminate") {
    const selection = rowSelection.value;
    if (selection.kind !== "explicit-rows") return;
    const otherRows = selection.rowIDs.filter(id => !children.some(row => row.id === id));
    rowSelection.value = { kind: "explicit-rows", rowIDs: checked === true ? [...otherRows, ...ids] : otherRows };
  },
});
</script>

<template>
  <DataTreeGrid.Provider>
    <DataTreeGrid.Root aria-label="서비스 담당 팀">
      <DataTreeGrid.Header>
        <DataTreeGrid.HeaderRow>
          <DataTreeGrid.ColumnHeader column="selected">선택</DataTreeGrid.ColumnHeader>
          <DataTreeGrid.ColumnHeader column="service">서비스</DataTreeGrid.ColumnHeader>
          <DataTreeGrid.ColumnHeader column="team">담당 팀</DataTreeGrid.ColumnHeader>
        </DataTreeGrid.HeaderRow>
      </DataTreeGrid.Header>
      <DataTreeGrid.Body v-slot="{ row }">
        <DataTreeGrid.Cell column="selected">
          <UICheckbox v-if="row.kind === 'group'" v-model="groupSelection" label="하위 서비스 모두 선택" />
          <DataTreeGrid.RowSelectionControl v-else name="service" :value="row.id" :aria-label="`${row.cells.service} 선택`" />
        </DataTreeGrid.Cell>
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
