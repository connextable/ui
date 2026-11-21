<script setup lang="ts">
import { UITreeSelect, UITreeSelectContent, UITreeSelectDisclosure, UITreeSelectGroup, UITreeSelectInput, UITreeSelectItem } from "@connextable/ui";

const nodes = [
  { id: "design", parentID: null },
  { id: "ui", parentID: "design" },
  { id: "brand", parentID: "design" },
] as const;
</script>

<template>
  <UITreeSelect :nodes="nodes" selection-mode="single">
    <UITreeSelectInput aria-label="팀" placeholder="팀 선택" />
    <UITreeSelectContent>
      <UITreeSelectItem value="design">
        <UITreeSelectDisclosure for="design" as="button" aria-label="디자인 하위 팀 펼치기">펼치기</UITreeSelectDisclosure>
        디자인
      </UITreeSelectItem>
      <UITreeSelectGroup for="design">
        <UITreeSelectItem value="ui">UI</UITreeSelectItem>
        <UITreeSelectItem value="brand">브랜드</UITreeSelectItem>
      </UITreeSelectGroup>
    </UITreeSelectContent>
  </UITreeSelect>
</template>
