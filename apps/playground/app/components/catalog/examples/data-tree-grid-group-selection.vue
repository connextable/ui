<script setup lang="ts">
import { createUIDataTreeGridComponents, createUITabularSource, useUIDataTreeGrid } from "@connextable/ui";
import { ChevronRight } from "@lucide/vue";

const site = { kind: "leaf", id: "site", parentGroupID: "platform", depth: 1, cells: { selected: null, service: "웹사이트", team: "프런트엔드" } } as const;
const api = { kind: "leaf", id: "api", parentGroupID: "integrations", depth: 2, cells: { selected: null, service: "파트너 API", team: "백엔드" } } as const;
const support = { kind: "leaf", id: "support", parentGroupID: null, depth: 0, cells: { selected: null, service: "고객 지원", team: "운영" } } as const;

// The row endpoint returns the current view. A separate endpoint returns only group membership.
const membership: Readonly<Record<string, readonly string[]>> = {
  platform: [site.id, api.id],
  integrations: [api.id],
};

const tree = useUIDataTreeGrid({
  defaultExpansion: ["platform"],
  source: createUITabularSource({
    columns: [{ id: "selected" }, { id: "service" }, { id: "team" }],
    load({ expansion }) {
      const platformOpen = expansion.includes("platform");
      const integrationsOpen = expansion.includes("integrations");
      const platform = {
        kind: "group", id: "platform", parentGroupID: null, depth: 0, expanded: platformOpen,
        cells: { selected: null, service: "플랫폼", team: "서비스 팀" },
      } as const;
      const integrations = {
        kind: "group", id: "integrations", parentGroupID: "platform", depth: 1, expanded: integrationsOpen,
        cells: { selected: null, service: "외부 연동", team: "파트너 팀" },
      } as const;
      return {
        rows: platformOpen ? [platform, site, integrations, ...(integrationsOpen ? [api] : []), support] : [platform, support],
        matchingLeafCount: 3,
      };
    },
  }),
});
const DataTreeGrid = createUIDataTreeGridComponents(tree, {
  async loadGroupLeafIDs({ groupID }, { signal }) {
    await new Promise<void>(resolve => setTimeout(resolve, 200));
    signal.throwIfAborted();
    return membership[groupID] ?? [];
  },
});
</script>

<template>
  <DataTreeGrid.Provider>
    <DataTreeGrid.Root aria-label="서비스 담당 팀">
      <DataTreeGrid.Header>
        <DataTreeGrid.HeaderRow>
          <DataTreeGrid.ColumnHeader column="selected">
            <DataTreeGrid.BulkSelectionControl :target="{ kind: 'all-matching' }" aria-label="검색 결과 모두 선택" />
          </DataTreeGrid.ColumnHeader>
          <DataTreeGrid.ColumnHeader column="service">서비스</DataTreeGrid.ColumnHeader>
          <DataTreeGrid.ColumnHeader column="team">담당 팀</DataTreeGrid.ColumnHeader>
        </DataTreeGrid.HeaderRow>
      </DataTreeGrid.Header>
      <DataTreeGrid.Body v-slot="{ row }">
        <DataTreeGrid.Cell column="selected">
          <DataTreeGrid.BulkSelectionControl
            v-if="row.kind === 'group'"
            :target="{ kind: 'group-leaves', groupID: row.id }"
            :aria-label="`${row.cells.service} 하위 서비스 선택`"
          />
          <DataTreeGrid.RowSelectionControl v-else name="service" :value="row.id" :aria-label="`${row.cells.service} 선택`" />
        </DataTreeGrid.Cell>
        <DataTreeGrid.Cell column="service" data-ui-tree-column>
          <DataTreeGrid.RowDisclosure v-if="row.kind === 'group'" :aria-label="`${row.cells.service} 하위 서비스 펼치기`">
            <ChevronRight :size="16" aria-hidden="true" />
          </DataTreeGrid.RowDisclosure>
          {{ row.cells.service }}
        </DataTreeGrid.Cell>
        <DataTreeGrid.Cell column="team">{{ row.cells.team }}</DataTreeGrid.Cell>
      </DataTreeGrid.Body>
    </DataTreeGrid.Root>
  </DataTreeGrid.Provider>
</template>
