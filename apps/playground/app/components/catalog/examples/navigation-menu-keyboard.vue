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

const categories = [
  { id: "inputs", label: "입력", links: [
    { id: "input", label: "텍스트 입력", href: "/components/input" },
    { id: "select", label: "선택 목록", href: "/components/select" },
  ] },
  { id: "actions", label: "동작", links: [
    { id: "button", label: "버튼", href: "/components/button" },
    { id: "disclosure", label: "접기와 펼치기", href: "/components/disclosure" },
  ] },
];
const items = categories.flatMap(({ id, links }) => [
  { id, parentID: null },
  ...links.map((link) => ({ id: link.id, parentID: id })),
]);
</script>

<template>
  <UINavigationMenu as="nav" :items="items" label="키보드 탐색 연습">
    <UINavigationMenuList>
      <UINavigationMenuItem v-for="category in categories" :key="category.id">
        <UINavigationMenuTrigger :value="category.id" as="button" type="button">
          {{ category.label }}
          <ChevronDown :size="14" aria-hidden="true" data-ui-navigation-chevron="down" />
        </UINavigationMenuTrigger>
      </UINavigationMenuItem>
    </UINavigationMenuList>
    <UINavigationMenuViewport>
      <UINavigationMenuContent v-for="category in categories" :key="category.id" :for="category.id">
        <UINavigationMenuLink v-for="link in category.links" :key="link.id" :value="link.id" as="a" :href="link.href">
          {{ link.label }}
        </UINavigationMenuLink>
      </UINavigationMenuContent>
    </UINavigationMenuViewport>
  </UINavigationMenu>
</template>
