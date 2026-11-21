<script setup lang="ts">
import {
  UINavigationMenu,
  UINavigationMenuItem,
  UINavigationMenuLink,
  UINavigationMenuList,
} from "@connextable/ui";

const pages = [
  { id: "design", label: "디자인 시스템", to: "/" },
  { id: "navigation", label: "내비게이션 메뉴", to: "/components/navigation-menu" },
  { id: "dashboard", label: "대시보드", to: "/components/dashboard" },
];
const items = pages.map(({ id }) => ({ id, parentID: null }));
</script>

<template>
  <UINavigationMenu as="nav" :items="items" label="Playground 주요 페이지">
    <UINavigationMenuList>
      <UINavigationMenuItem v-for="page in pages" :key="page.id">
        <UINavigationMenuLink :value="page.id" as-child>
          <NuxtLink :to="page.to">{{ page.label }}</NuxtLink>
        </UINavigationMenuLink>
      </UINavigationMenuItem>
    </UINavigationMenuList>
  </UINavigationMenu>
</template>
