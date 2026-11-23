<script setup lang="ts">
import { UIMenuButton, UIMenuButtonContent, UIMenuButtonTrigger, UIMenuItem } from "@connextable/ui";

const items = [
  { id: "colors", parentID: null },
  { id: "scroll", parentID: null },
];
</script>

<template>
  <UIMenuButton :items="items">
    <UIMenuButtonTrigger>문서 바로가기</UIMenuButtonTrigger>
    <UIMenuButtonContent>
      <UIMenuItem value="colors" :to="{ path: '/', hash: '#design-colors' }">색상 토큰</UIMenuItem>
      <UIMenuItem value="scroll" href="/components/scroll-area">스크롤 영역</UIMenuItem>
    </UIMenuButtonContent>
  </UIMenuButton>
</template>
