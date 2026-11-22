<script setup lang="ts">
import { UITreeSelect, UITreeSelectContent, UITreeSelectDisclosure, UITreeSelectField, UITreeSelectGroup, UITreeSelectItem } from "@connextable/ui";
import { Check, Folder, Users } from "@lucide/vue";

const nodes = [
  { id: "design", parentID: null },
  { id: "ui", parentID: "design" },
  { id: "brand", parentID: "design" },
] as const;
const labels: Record<string, string> = { design: "디자인", ui: "제품 디자인", brand: "브랜드" };
</script>

<template>
  <UITreeSelect :nodes="nodes" :default-expanded-values="['design']" selection-mode="single" v-slot="{ value, query }">
    <UITreeSelectField aria-label="팀 검색" placeholder="팀을 검색하거나 선택하세요" :query="query" :display-value="value[0] ? labels[value[0]] : ''" />
    <UITreeSelectContent>
      <UITreeSelectItem value="design">
        <UITreeSelectDisclosure for="design" as="button" aria-label="디자인 하위 팀 펼치기 또는 접기" />
        <Folder :size="16" aria-hidden="true" /> 디자인
        <Check v-if="value.includes('design')" :size="16" aria-hidden="true" />
      </UITreeSelectItem>
      <UITreeSelectGroup for="design">
        <UITreeSelectItem v-for="id in ['ui', 'brand'] as const" :key="id" :value="id">
          <Users :size="16" aria-hidden="true" /> {{ labels[id] }}
          <Check v-if="value.includes(id)" :size="16" aria-hidden="true" />
        </UITreeSelectItem>
      </UITreeSelectGroup>
    </UITreeSelectContent>
  </UITreeSelect>
</template>
