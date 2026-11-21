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
import { ChartNoAxesCombined, ChevronDown, LayoutDashboard, ListFilter, Table } from "@lucide/vue";

const destinations = [
  { id: "dashboard", title: "대시보드", description: "사이드바와 본문 영역 구성", href: "/components/dashboard", icon: LayoutDashboard },
  { id: "table", title: "데이터 테이블", description: "행과 열로 데이터 비교", href: "/components/data-table", icon: Table },
  { id: "chart", title: "차트", description: "추세와 분포를 시각화", href: "/components/chart", icon: ChartNoAxesCombined },
  { id: "list", title: "가상 리스트", description: "대량 항목을 스크롤로 탐색", href: "/components/virtual-list", icon: ListFilter },
];
const items = [
  { id: "tools", parentID: null },
  ...destinations.map(({ id }) => ({ id, parentID: "tools" })),
];
</script>

<template>
  <UINavigationMenu as="nav" :items="items" label="도구 탐색">
    <UINavigationMenuList>
      <UINavigationMenuItem>
        <UINavigationMenuTrigger value="tools" as="button" type="button">
          도구 살펴보기
          <ChevronDown :size="14" aria-hidden="true" data-ui-navigation-chevron="down" />
        </UINavigationMenuTrigger>
      </UINavigationMenuItem>
    </UINavigationMenuList>
    <UINavigationMenuViewport>
      <UINavigationMenuContent for="tools" data-layout="columns">
        <UINavigationMenuLink v-for="destination in destinations" :key="destination.id" :value="destination.id" as="a" :href="destination.href">
          <component :is="destination.icon" :size="18" aria-hidden="true" />
          <span>
            {{ destination.title }}
            <small>{{ destination.description }}</small>
          </span>
        </UINavigationMenuLink>
      </UINavigationMenuContent>
    </UINavigationMenuViewport>
  </UINavigationMenu>
</template>
