<script setup lang="ts">
import {
  UICascadeSelect,
  UICascadeSelectColumn,
  UICascadeSelectContent,
  UICascadeSelectItem,
  UICascadeSelectTrigger,
  UICascadeSelectValue,
} from "@connextable/ui";

const nodes = [{ id: 'asia', parentID: null }, { id: 'kr', parentID: 'asia' }, { id: 'seoul', parentID: 'kr' }]
</script>
<template>
  <UICascadeSelect :disabled-items="['seoul']" aria-label="지역" :nodes="nodes" v-slot="{ columns }">
    <UICascadeSelectTrigger><UICascadeSelectValue placeholder="Choose a destination" /></UICascadeSelectTrigger>
    <UICascadeSelectContent>
      <UICascadeSelectColumn v-for="(_, depth) in columns" :key="depth" :depth="depth" v-slot="{ items }">
        <UICascadeSelectItem v-for="item in items" :key="item" :value="item">{{ item }}</UICascadeSelectItem>
      </UICascadeSelectColumn>
    </UICascadeSelectContent>
  </UICascadeSelect>
</template>
