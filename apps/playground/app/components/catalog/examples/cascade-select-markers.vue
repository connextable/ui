<script setup lang="ts">
import {
  UICascadeSelect,
  UICascadeSelectColumn,
  UICascadeSelectContent,
  UICascadeSelectItem,
  UICascadeSelectItemChevron,
  UICascadeSelectItemIndicator,
  UICascadeSelectTrigger,
  UICascadeSelectValue,
} from "@connextable/ui";

import { Check, ChevronRight } from "@lucide/vue";
import { ref } from "vue";

const nodes = [{ id: '아시아', parentID: null }, { id: '한국', parentID: '아시아' }, { id: '서울', parentID: '한국' }]

const region = ref<string | null>("서울");
</script>
<template>
  <UICascadeSelect :nodes="nodes" v-model="region" v-slot="{ columns }">
    <UICascadeSelectTrigger><UICascadeSelectValue placeholder="목적지 선택" /></UICascadeSelectTrigger>
    <UICascadeSelectContent>
      <UICascadeSelectColumn v-for="(_, depth) in columns" :key="depth" :depth="depth" v-slot="{ items }">
        <UICascadeSelectItem v-for="item in items" :key="item" :value="item">{{ item }}
          <UICascadeSelectItemChevron><ChevronRight :size="14" /></UICascadeSelectItemChevron>
          <UICascadeSelectItemIndicator><Check :size="14" /></UICascadeSelectItemIndicator>
        </UICascadeSelectItem>
      </UICascadeSelectColumn>
    </UICascadeSelectContent>
  </UICascadeSelect>
</template>
