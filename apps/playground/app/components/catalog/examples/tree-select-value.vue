<script setup lang="ts">
import { UITreeSelect, UITreeSelectContent, UITreeSelectGroup, UITreeSelectInput, UITreeSelectItem } from "@connextable/ui";

const labels: Record<string, string> = { design: "디자인", ui: "제품 디자인", brand: "브랜드" };
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
      <UITreeSelectItem value="design">{{ labels.design }}</UITreeSelectItem>
      <UITreeSelectGroup for="design">
        <UITreeSelectItem value="ui">{{ labels.ui }}</UITreeSelectItem>
        <UITreeSelectItem value="brand">{{ labels.brand }}</UITreeSelectItem>
      </UITreeSelectGroup>
    </UITreeSelectContent>
    <output>{{ value.map(id => labels[id]).join(", ") || "선택 없음" }}</output>
  </UITreeSelect>
</template>
