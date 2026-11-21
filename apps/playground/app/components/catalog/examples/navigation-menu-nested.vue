<script setup lang="ts">
import {
  UINavigationMenu,
  UINavigationMenuContent,
  UINavigationMenuItem,
  UINavigationMenuLink,
  UINavigationMenuList,
  UINavigationMenuTrigger,
  UINavigationMenuViewport,
} from "@connextable/ui";
import { ChevronDown, ChevronRight } from "@lucide/vue";

const items = [
  { id: "components", parentID: null },
  { id: "dashboard", parentID: "components" },
  { id: "tabular", parentID: "components" },
  { id: "table", parentID: "tabular" },
  { id: "tree", parentID: "tabular" },
];
</script>

<template>
  <UINavigationMenu as="nav" :items="items" label="계층형 컴포넌트 탐색">
    <UINavigationMenuList>
      <UINavigationMenuItem>
        <UINavigationMenuTrigger value="components" as="button" type="button">
          컴포넌트 분류
          <ChevronDown :size="14" aria-hidden="true" data-ui-navigation-chevron="down" />
        </UINavigationMenuTrigger>
      </UINavigationMenuItem>
    </UINavigationMenuList>
    <UINavigationMenuViewport>
      <UINavigationMenuContent for="components">
        <UINavigationMenuLink value="dashboard" as="a" href="/components/dashboard">대시보드</UINavigationMenuLink>
        <UINavigationMenuTrigger value="tabular" as="button" type="button">
          표와 그리드
          <ChevronRight :size="14" aria-hidden="true" data-ui-navigation-chevron="side" />
        </UINavigationMenuTrigger>
      </UINavigationMenuContent>
      <UINavigationMenuContent for="tabular">
        <UINavigationMenuLink value="table" as="a" href="/components/data-table">데이터 테이블</UINavigationMenuLink>
        <UINavigationMenuLink value="tree" as="a" href="/components/data-tree-grid">트리 그리드</UINavigationMenuLink>
      </UINavigationMenuContent>
    </UINavigationMenuViewport>
  </UINavigationMenu>
</template>
