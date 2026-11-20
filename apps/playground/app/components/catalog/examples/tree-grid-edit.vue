<script setup lang="ts">
import {
  UITreeGrid,
  UITreeGridCell,
  UITreeGridDisclosure,
  UITreeGridEditor,
  UITreeGridGroup,
  UITreeGridHeader,
  UITreeGridRow,
} from "@connextable/ui";
import { ChevronRight } from "@lucide/vue";
import { reactive } from "vue";

const rows = [
  { id: "platform", parentID: null, cells: ["platform-name", "platform-owner"] },
  { id: "site", parentID: "platform", cells: ["site-name", "site-owner"] },
];
const labels = reactive(new Map([
  ["platform-name", "플랫폼"], ["platform-owner", "제품 팀"],
  ["site-name", "웹사이트"], ["site-owner", "민지"],
]));

function read(id: string) {
  return labels.get(id) ?? "";
}

function update(id: string, value: string) {
  labels.set(id, value);
}
</script>

<template>
  <div>
    <UITreeGrid :rows="rows" :headers="['서비스', '담당자']" :get-cell-value="read" :set-cell-value="update" :default-expanded-value="['platform']" aria-label="서비스 담당자">
      <UITreeGridHeader />
      <UITreeGridRow value="platform" :row-index="1" expandable>
        <UITreeGridCell value="platform-name" :column-index="1">
          <UITreeGridDisclosure as="button" type="button" for="platform" aria-label="플랫폼 하위 서비스">
            <ChevronRight :size="16" aria-hidden="true" />
          </UITreeGridDisclosure>
          {{ read("platform-name") }}
        </UITreeGridCell>
        <UITreeGridCell value="platform-owner" :column-index="2">{{ read("platform-owner") }}</UITreeGridCell>
      </UITreeGridRow>
      <UITreeGridGroup for="platform">
        <UITreeGridRow value="site" :row-index="2" :level="2">
          <UITreeGridCell value="site-name" :column-index="1">{{ read("site-name") }}</UITreeGridCell>
          <UITreeGridCell value="site-owner" :column-index="2" v-slot="{ editing }">
            <span v-if="!editing">{{ read("site-owner") }}</span>
            <UITreeGridEditor for="site-owner" label="웹사이트 담당자" />
          </UITreeGridCell>
        </UITreeGridRow>
      </UITreeGridGroup>
    </UITreeGrid>
    <output>웹사이트 담당자 {{ read("site-owner") }}</output>
  </div>
</template>
