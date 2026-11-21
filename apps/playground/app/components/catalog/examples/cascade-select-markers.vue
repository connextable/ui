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

const nodes = [{ id: 'asia', parentID: null }, { id: 'kr', parentID: 'asia' }, { id: 'seoul', parentID: 'kr' }]
</script>
<template>
  <UICascadeSelect :nodes="nodes" default-value="seoul" v-slot="{ columns }">
    <UICascadeSelectTrigger><UICascadeSelectValue placeholder="Choose a destination" /></UICascadeSelectTrigger>
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
