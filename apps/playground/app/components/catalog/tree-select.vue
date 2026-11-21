<script setup lang="ts">
import { UITreeSelect, UITreeSelectContent, UITreeSelectDisclosure, UITreeSelectGroup, UITreeSelectInput, UITreeSelectItem } from "@connextable/ui";
import { Check, ChevronDown, ChevronRight, Folder, Users } from "@lucide/vue";
import { ref } from "vue";

const nodes = [
  { id: "design", parentID: null },
  { id: "ui", parentID: "design" },
  { id: "brand", parentID: "design" },
] as const;
const labels: Record<string, string> = { design: "디자인", ui: "제품 디자인", brand: "브랜드" };
const open = ref(false);
function openFromField(event: MouseEvent) {
  if (!(event.currentTarget instanceof HTMLInputElement)) return;
  const input = event.currentTarget;
  const { left, right, height } = input.getBoundingClientRect();
  const distanceFromEnd = input.matches(":dir(rtl)") ? event.clientX - left : right - event.clientX;
  open.value = distanceFromEnd < height ? !open.value : true;
}
</script>

<template>
  <UITreeSelect v-model:open="open" :nodes="nodes" :default-expanded-values="['design']" selection-mode="single" v-slot="{ value }">
    <div class="ui-tree-select-field" :data-has-selection="!!value.length || undefined" :data-open="open || undefined">
      <UITreeSelectInput aria-label="팀 검색" :placeholder="value[0] ? labels[value[0]] : '팀을 검색하거나 선택하세요'" @click="openFromField" />
      <ChevronDown :size="16" aria-hidden="true" />
    </div>
    <UITreeSelectContent>
      <UITreeSelectItem value="design">
        <UITreeSelectDisclosure for="design" as="button" aria-label="디자인 하위 팀 펼치기 또는 접기">
          <ChevronRight :size="16" aria-hidden="true" />
        </UITreeSelectDisclosure>
        <Folder :size="16" aria-hidden="true" /> 디자인
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
