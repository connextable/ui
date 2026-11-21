<script setup lang="ts">
import {
  UINavigationMenu,
  UINavigationMenuContent,
  UINavigationMenuItem,
  UINavigationMenuIndicator,
  UINavigationMenuLink,
  UINavigationMenuList,
  UINavigationMenuTrigger,
  UINavigationMenuViewport,
} from "@connextable/ui";
import { ChevronDown } from "@lucide/vue";

const groups = [
  { id: "form", label: "폼", link: "동적 폼 예제", href: "/components/form" },
  { id: "grid", label: "그리드", link: "데이터 그리드 예제", href: "/components/data-grid" },
];

const items = groups.flatMap(({ id }) => [
  { id, parentID: null },
  { id: `${id}-example`, parentID: id },
]);
</script>

<template>
  <UINavigationMenu as="nav" :items="items" label="예제 그룹" v-slot="{ openPath }">
    <UINavigationMenuList>
      <UINavigationMenuItem v-for="group in groups" :key="group.id">
        <UINavigationMenuTrigger :value="group.id" as="button" type="button">
          {{ group.label }}
          <ChevronDown :size="14" aria-hidden="true" data-ui-navigation-chevron="down" />
        </UINavigationMenuTrigger>
        <UINavigationMenuIndicator as="span" :open="openPath[0] === group.id" />
      </UINavigationMenuItem>
    </UINavigationMenuList>
    <UINavigationMenuViewport>
      <UINavigationMenuContent v-for="group in groups" :key="group.id" :for="group.id">
        <UINavigationMenuLink :value="`${group.id}-example`" as="a" :href="group.href">
          {{ group.link }}
        </UINavigationMenuLink>
      </UINavigationMenuContent>
    </UINavigationMenuViewport>
  </UINavigationMenu>
</template>
