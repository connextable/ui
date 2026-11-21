<script setup lang="ts">
import { UITreeSelect, UITreeSelectContent, UITreeSelectGroup, UITreeSelectInput, UITreeSelectItem } from "@connextable/ui";

const nodes = [
  { id: "design", parentID: null },
  { id: "ui", parentID: "design" },
  { id: "brand", parentID: "design" },
] as const;
</script>

<template>
  <UITreeSelect v-slot="{ value }" :nodes="nodes" :default-expanded-values="['design']" selection-mode="single">
    <UITreeSelectInput aria-label="팀" placeholder="팀 선택" />
    <UITreeSelectContent>
      <UITreeSelectItem value="design">디자인</UITreeSelectItem>
      <UITreeSelectGroup for="design">
        <UITreeSelectItem value="ui">UI</UITreeSelectItem>
        <UITreeSelectItem value="brand">브랜드</UITreeSelectItem>
      </UITreeSelectGroup>
    </UITreeSelectContent>
    <output>{{ value.join(", ") || "선택 없음" }}</output>
  </UITreeSelect>
</template>
