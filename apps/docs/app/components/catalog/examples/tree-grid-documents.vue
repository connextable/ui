<script setup lang="ts">
import { ChevronRight, FileText, Folder } from "@lucide/vue";
import {
  UIDataLabel, UIDataSurface, UITabularRows, UITreeGrid, UITreeGridCell, UITreeGridDisclosure,
  UITreeGridHeader, UITreeGridHeaderCell, UITreeGridRow,
} from "@connextable/ui";

const files = [
  { id: "team", parentID: null, name: "팀 문서", level: 1, folder: true, date: "—" },
  { id: "notes", parentID: "team", name: "회의 기록", level: 2, folder: true, date: "—" },
  { id: "nov", parentID: "notes", name: "11월 회의 기록", level: 3, folder: false, date: "11. 18." },
  { id: "guide", parentID: "team", name: "온보딩 안내", level: 2, folder: false, date: "11. 12." },
  { id: "policy", parentID: null, name: "보관 정책", level: 1, folder: false, date: "10. 24." },
];
const headers = ["이름", "수정일"];
const rows = files.map(file => ({ id: file.id, parentID: file.parentID, cells: [file.id, `${file.id}-date`] }));
const values = new Map(files.flatMap(file => [[file.id, file.name], [`${file.id}-date`, file.date]]));
</script>

<template>
  <UIDataSurface>
    <UITreeGrid :rows="rows" :headers="headers" readonly :get-cell-value="id => values.get(id) ?? ''"
      :set-cell-value="() => {}" aria-label="문서 보관함" v-slot="{ expandedValue }">
      <UITreeGridHeader>
        <UITreeGridHeaderCell v-for="(_, index) in headers" :key="index" :column-index="index + 1" />
      </UITreeGridHeader>
      <UITabularRows>
        <UITreeGridRow v-for="(file, index) in files.filter(file =>
          !file.parentID || expandedValue.includes(file.parentID) && (file.level < 3 || expandedValue.includes('team'))
        )" :key="file.id" :value="file.id" :row-index="index + 1" :level="file.level" :expandable="file.folder">
          <UITreeGridCell :value="file.id" :column-index="1">
            <UITreeGridDisclosure v-if="file.folder" as="button" type="button" :for="file.id" :aria-label="`${file.name} 하위 항목`">
              <ChevronRight aria-hidden="true" />
            </UITreeGridDisclosure>
            <UIDataLabel :label="file.name">
              <template #icon><component :is="file.folder ? Folder : FileText" aria-hidden="true" /></template>
            </UIDataLabel>
          </UITreeGridCell>
          <UITreeGridCell :value="`${file.id}-date`" :column-index="2" data-ui-tabular-numeric>{{ file.date }}</UITreeGridCell>
        </UITreeGridRow>
      </UITabularRows>
    </UITreeGrid>
  </UIDataSurface>
</template>
