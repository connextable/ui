<script setup lang="ts">
import { Check, Minus } from "@lucide/vue";
import { createUIDataTableComponents, useUIDataTable, useUIDataTableContext } from "@connextable/ui";
import { defineComponent, h } from "vue";

const users = [
  { kind: "leaf", id: "minji", cells: { selection: null, name: "민지", team: "디자인" } },
  { kind: "leaf", id: "seojun", cells: { selection: null, name: "서준", team: "개발" } },
] as const;
const data = useUIDataTable({
  source: (request) => ({
    ...request,
    rows: users,
    viewRevision: request.requestID,
    matchingLeafCount: { kind: "known", value: users.length },
    visibleRowCount: { kind: "known", value: users.length },
    columnSchema: { revision: request.columnSchemaRevision, columns: [{ id: "selection" }, { id: "name" }, { id: "team" }], headers: [] },
    removedRowIDs: [],
  }),
});
const DataTable = createUIDataTableComponents(data);

const SelectionSummary = defineComponent({
  setup() {
    const { rowSelection } = useUIDataTableContext();
    return () => {
      const value = rowSelection.value;
      const text = value.kind === "all-matching" ? "이 범위의 모든 행을 선택했습니다." : `${value.rowIDs.length}개 행을 선택했습니다.`;
      return h("p", { "aria-live": "polite" }, text);
    };
  },
});
</script>

<template>
  <div>
    <DataTable.Provider>
      <DataTable.Root>
        <DataTable.Caption>사용자</DataTable.Caption>
        <DataTable.Header>
          <DataTable.HeaderRow>
            <DataTable.ColumnHeader column="selection">
              <DataTable.BulkSelectionControl :target="{ kind: 'all-matching' }" aria-label="현재 범위의 행 모두 선택">
                <Check :size="14" :stroke-width="3" aria-hidden="true" />
                <Minus :size="14" :stroke-width="3" aria-hidden="true" />
              </DataTable.BulkSelectionControl>
            </DataTable.ColumnHeader>
            <DataTable.ColumnHeader column="name">이름</DataTable.ColumnHeader>
            <DataTable.ColumnHeader column="team">팀</DataTable.ColumnHeader>
          </DataTable.HeaderRow>
        </DataTable.Header>
        <DataTable.Body v-slot="{ row }">
          <DataTable.Cell column="selection">
            <DataTable.SelectionControl name="row" :value="row.id" :aria-label="`${row.cells.name} 선택`" />
          </DataTable.Cell>
          <DataTable.Cell column="name">{{ row.cells.name }}</DataTable.Cell>
          <DataTable.Cell column="team">{{ row.cells.team }}</DataTable.Cell>
        </DataTable.Body>
      </DataTable.Root>
      <SelectionSummary />
    </DataTable.Provider>
  </div>
</template>
