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
import { ChevronDown, LockKeyhole } from "@lucide/vue";

const items = [
  { id: "workspace", parentID: null },
  { id: "dashboard", parentID: "workspace" },
  { id: "preview", parentID: "workspace" },
  { id: "charts", parentID: "workspace" },
];
const disabledItems = ["preview"];
</script>

<template>
  <UINavigationMenu as="nav" :items="items" :disabled-items="disabledItems" label="워크스페이스 탐색">
    <UINavigationMenuList>
      <UINavigationMenuItem>
        <UINavigationMenuTrigger value="workspace" as="button" type="button">
          워크스페이스
          <ChevronDown :size="14" aria-hidden="true" data-ui-navigation-chevron="down" />
        </UINavigationMenuTrigger>
      </UINavigationMenuItem>
    </UINavigationMenuList>
    <UINavigationMenuViewport>
      <UINavigationMenuContent for="workspace">
        <UINavigationMenuLink value="dashboard" as="a" href="/components/dashboard">대시보드</UINavigationMenuLink>
        <UINavigationMenuLink value="preview" as="a" href="/components/virtual-grid">
          <LockKeyhole :size="15" aria-hidden="true" />
          <span>가상 그리드 <small>이 예제에서는 접근할 수 없습니다.</small></span>
        </UINavigationMenuLink>
        <UINavigationMenuLink value="charts" as="a" href="/components/chart">차트</UINavigationMenuLink>
      </UINavigationMenuContent>
    </UINavigationMenuViewport>
  </UINavigationMenu>
</template>
