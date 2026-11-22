<script setup lang="ts">
import { ChevronRight } from "@lucide/vue";
import {
  UITreeView,
  UITreeViewDisclosure,
  UITreeViewGroup,
  UITreeViewItem,
} from "@connextable/ui";

import { ref } from 'vue'
const nodes = [
  { id: 'atlas', parentID: null },
  { id: 'apps', parentID: 'atlas' },
  { id: 'dashboard', parentID: 'apps' },
  { id: 'overview', parentID: 'dashboard' },
  { id: 'settings', parentID: 'dashboard' },
  { id: 'packages', parentID: 'atlas' },
  { id: 'tokens', parentID: 'packages' },
]
const expandedValues = ref(['atlas', 'apps', 'dashboard', 'packages'])

const selected = ref<readonly string[]>(['settings']);
</script>

<template>
  <UITreeView
    :nodes="nodes"

    v-model:expanded-values="expandedValues"
    v-model="selected"
    label="아틀라스 프로젝트 파일"

  >
    <UITreeViewItem value="atlas"><UITreeViewDisclosure for="atlas" as="button" aria-label="하위 항목 펼치기 또는 접기"><ChevronRight :size="16" aria-hidden="true" /></UITreeViewDisclosure>아틀라스 작업 공간</UITreeViewItem>
    <UITreeViewGroup for="atlas">
      <UITreeViewItem value="apps"><UITreeViewDisclosure for="apps" as="button" aria-label="하위 항목 펼치기 또는 접기"><ChevronRight :size="16" aria-hidden="true" /></UITreeViewDisclosure>앱</UITreeViewItem>
      <UITreeViewGroup for="apps">
        <UITreeViewItem value="dashboard"><UITreeViewDisclosure for="dashboard" as="button" aria-label="하위 항목 펼치기 또는 접기"><ChevronRight :size="16" aria-hidden="true" /></UITreeViewDisclosure>대시보드</UITreeViewItem>
        <UITreeViewGroup for="dashboard">
          <UITreeViewItem value="overview">Overview.vue</UITreeViewItem>
          <UITreeViewItem value="settings">Settings.vue</UITreeViewItem>
        </UITreeViewGroup>
      </UITreeViewGroup>
      <UITreeViewItem value="packages"><UITreeViewDisclosure for="packages" as="button" aria-label="하위 항목 펼치기 또는 접기"><ChevronRight :size="16" aria-hidden="true" /></UITreeViewDisclosure>패키지</UITreeViewItem>
      <UITreeViewGroup for="packages"><UITreeViewItem value="tokens">tokens.ts</UITreeViewItem></UITreeViewGroup>
    </UITreeViewGroup>
  </UITreeView>
</template>
