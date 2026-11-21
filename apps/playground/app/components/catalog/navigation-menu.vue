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
import { ChevronDown } from "@lucide/vue";

const groups = [
  {
    id: "components",
    label: "컴포넌트",
    links: [
      { id: "button", label: "버튼", href: "/components/button" },
      { id: "input", label: "텍스트 입력", href: "/components/input" },
      { id: "select", label: "선택 목록", href: "/components/select" },
    ],
  },
  {
    id: "data",
    label: "데이터 표현",
    links: [
      { id: "table", label: "데이터 테이블", href: "/components/data-table" },
      { id: "chart", label: "차트", href: "/components/chart" },
    ],
  },
];

const items = [
  { id: "design", parentID: null },
  ...groups.flatMap(({ id, links }) => [
    { id, parentID: null },
    ...links.map((link) => ({ id: link.id, parentID: id })),
  ]),
];
</script>

<template>
  <UINavigationMenu as="nav" :items="items" label="Playground 탐색">
    <UINavigationMenuList>
      <UINavigationMenuItem>
        <UINavigationMenuLink value="design" as="a" href="/">디자인 시스템</UINavigationMenuLink>
      </UINavigationMenuItem>
      <UINavigationMenuItem v-for="group in groups" :key="group.id">
        <UINavigationMenuTrigger :value="group.id" as="button" type="button">
          {{ group.label }}
          <ChevronDown :size="14" aria-hidden="true" data-ui-navigation-chevron="down" />
        </UINavigationMenuTrigger>
      </UINavigationMenuItem>
    </UINavigationMenuList>
    <UINavigationMenuViewport>
      <UINavigationMenuContent v-for="group in groups" :key="group.id" :for="group.id">
        <UINavigationMenuLink v-for="link in group.links" :key="link.id" :value="link.id" as="a" :href="link.href">
          {{ link.label }}
        </UINavigationMenuLink>
      </UINavigationMenuContent>
    </UINavigationMenuViewport>
  </UINavigationMenu>
</template>
