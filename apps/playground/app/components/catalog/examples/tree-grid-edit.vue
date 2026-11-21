<script setup lang="ts">
import {
  UITreeGrid,
  UITreeGridCell,
  UITreeGridDisclosure,
  UITreeGridEditor,
  UITreeGridGroup,
  UITreeGridHeader,
  UITreeGridRow,
  UITabularEditTrigger,
} from "@connextable/ui";
import { ChevronRight } from "@lucide/vue";
import { reactive, ref } from "vue";

const rows = [
  { id: "platform", parentID: null, cells: ["platform-name", "platform-owner"] },
  { id: "site", parentID: "platform", cells: ["site-name", "site-owner"] },
];
const labels = reactive(new Map([
  ["platform-name", "플랫폼"], ["platform-owner", "제품 팀"],
  ["site-name", "웹사이트"], ["site-owner", "민지"],
]));
const highlighted = ref<string | null>("site-owner");
const editMode = ref<"navigation" | "editing">("navigation");

function read(id: string) {
  return labels.get(id) ?? "";
}

function update(id: string, value: string) {
  labels.set(id, value);
}

function editOwner() {
  highlighted.value = "site-owner";
  editMode.value = "editing";
}
</script>

<template>
  <div>
    <UITreeGrid v-model:highlighted-value="highlighted" v-model:edit-mode="editMode"
      :rows="rows" :headers="['서비스', '담당자']" :get-cell-value="read" :set-cell-value="update"
      :default-expanded-value="['platform']" aria-label="서비스 담당자">
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
            <UITabularEditTrigger v-if="!editing" :aria-label="`웹사이트 담당자 편집, 현재 ${read('site-owner')}`" @click="editOwner">
              {{ read("site-owner") }}
            </UITabularEditTrigger>
            <UITreeGridEditor for="site-owner" label="웹사이트 담당자" />
          </UITreeGridCell>
        </UITreeGridRow>
      </UITreeGridGroup>
    </UITreeGrid>
    <output>웹사이트 담당자 {{ read("site-owner") }}</output>
  </div>
</template>
