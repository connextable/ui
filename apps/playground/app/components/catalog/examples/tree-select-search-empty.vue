<script setup lang="ts">
import { UITreeSelect, UITreeSelectContent, UITreeSelectGroup, UITreeSelectInput, UITreeSelectItem } from "@connextable/ui";
import { useTemplateRef } from "vue";

const nodes = [
  { id: "design", parentID: null },
  { id: "ui", parentID: "design" },
  { id: "brand", parentID: "design" },
] as const;
const tree = useTemplateRef("tree");
const labels = { design: "디자인", ui: "화면", brand: "브랜드" } as const;

function teamLabel(id: keyof typeof labels) {
  return labels[id];
}
</script>

<template>
  <UITreeSelect
    ref="tree"
    :nodes="nodes"
    :default-expanded-values="['design']"
    @search="request => tree?.resolveSearch(request, nodes.filter(node => labels[node.id].includes(request.query)).map(node => node.id))"
    v-slot="{ query, getChildren }"
  >
    <UITreeSelectInput aria-label="팀 검색" placeholder="예시: 화면" />
    <UITreeSelectContent>
      <template v-if="getChildren(null).includes('design')">
        <UITreeSelectItem value="design">{{ labels.design }}</UITreeSelectItem>
        <UITreeSelectGroup for="design">
          <UITreeSelectItem v-for="id in getChildren('design')" :key="id" :value="id">{{ teamLabel(id) }}</UITreeSelectItem>
        </UITreeSelectGroup>
      </template>
      <p v-else-if="query" role="status">검색 결과가 없습니다.</p>
    </UITreeSelectContent>
  </UITreeSelect>
</template>
