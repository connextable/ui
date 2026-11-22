<script setup lang="ts">
import { UITreeSelect, UITreeSelectContent, UITreeSelectDisclosure, UITreeSelectField, UITreeSelectGroup, UITreeSelectItem } from "@connextable/ui";
import { Check, Folder, Users } from "@lucide/vue";
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
    v-slot="{ query, getChildren, value }"
  >
    <UITreeSelectField aria-label="팀 검색" :selected="!!value.length" :placeholder="value[0] ? teamLabel(value[0]) : '예시: 화면'" />
    <UITreeSelectContent>
      <template v-if="getChildren(null).includes('design')">
        <UITreeSelectItem value="design">
          <UITreeSelectDisclosure for="design" as="button" aria-label="디자인 하위 팀 펼치기 또는 접기" />
          <Folder :size="16" aria-hidden="true" /> {{ labels.design }}
          <Check v-if="value.includes('design')" :size="16" aria-hidden="true" />
        </UITreeSelectItem>
        <UITreeSelectGroup for="design">
          <UITreeSelectItem v-for="id in getChildren('design')" :key="id" :value="id">
            <Users :size="16" aria-hidden="true" /> {{ teamLabel(id) }}
            <Check v-if="value.includes(id)" :size="16" aria-hidden="true" />
          </UITreeSelectItem>
        </UITreeSelectGroup>
      </template>
      <p v-else-if="query" role="status">검색 결과가 없습니다.</p>
    </UITreeSelectContent>
  </UITreeSelect>
</template>
