<script setup lang="ts">
import {
  UITabularRows, UITreeGrid, UITreeGridCell, UITreeGridDisclosure,
  UITreeGridHeader, UITreeGridHeaderCell, UITreeGridRow,
  UIDataStatus,
} from "@connextable/ui";
import { ChevronRight } from "@lucide/vue";

const headers = ["서비스", "담당 팀", "상태"];
const services = [
  { id: "platform", parentID: null, name: "제품 플랫폼", owner: "플랫폼", status: "운영 중" },
  { id: "search", parentID: "platform", name: "문서 검색", owner: "서비스", status: "점검 중" },
  { id: "api", parentID: "platform", name: "공개 API", owner: "서버", status: "운영 중" },
  { id: "support", parentID: null, name: "지원 센터", owner: "운영", status: "운영 중" },
];
const rows = services.map(({ id, parentID }) => ({
  id, parentID, cells: [`${id}-name`, `${id}-owner`, `${id}-status`],
}));
const values = new Map(services.flatMap<[string, string]>(({ id, name, owner, status }) => [
  [`${id}-name`, name], [`${id}-owner`, owner], [`${id}-status`, status],
]));
</script>

<template>
  <UITreeGrid :rows="rows" :headers="headers" :default-expanded-value="['platform']" readonly
    :get-cell-value="id => values.get(id) ?? ''" :set-cell-value="() => {}"
    aria-label="서비스 목록" v-slot="{ expandedValue }">
    <UITreeGridHeader>
      <UITreeGridHeaderCell v-for="(_, index) in headers" :key="index" :column-index="index + 1" />
    </UITreeGridHeader>
    <UITabularRows>
      <UITreeGridRow
        v-for="(service, index) in services.filter(row => row.parentID === null || expandedValue.includes(row.parentID))"
        :key="service.id" :value="service.id" :row-index="index + 1"
        :level="service.parentID ? 2 : 1" :expandable="service.id === 'platform'"
      >
        <UITreeGridCell :value="`${service.id}-name`" :column-index="1">
          <UITreeGridDisclosure v-if="service.id === 'platform'" as="button" type="button" :for="service.id" aria-label="제품 플랫폼 하위 서비스">
            <ChevronRight aria-hidden="true" />
          </UITreeGridDisclosure>
          {{ service.name }}
        </UITreeGridCell>
        <UITreeGridCell :value="`${service.id}-owner`" :column-index="2">{{ service.owner }}</UITreeGridCell>
        <UITreeGridCell :value="`${service.id}-status`" :column-index="3">
          <UIDataStatus :tone="service.status === '운영 중' ? 'success' : 'warning'">{{ service.status }}</UIDataStatus>
        </UITreeGridCell>
      </UITreeGridRow>
    </UITabularRows>
  </UITreeGrid>
</template>
