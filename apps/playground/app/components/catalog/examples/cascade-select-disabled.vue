<script setup lang="ts">
import {
  UICascadeSelect,
  UICascadeSelectColumn,
  UICascadeSelectContent,
  UICascadeSelectItem,
  UICascadeSelectTrigger,
  UICascadeSelectValue,
} from "@connextable/ui";

const nodes = [{ id: '아시아', parentID: null }, { id: '한국', parentID: '아시아' }, { id: '서울', parentID: '한국' }]
</script>
<template>
  <UICascadeSelect :disabled-items="['서울']" aria-label="지역" :nodes="nodes" v-slot="{ columns }">
    <UICascadeSelectTrigger><UICascadeSelectValue placeholder="목적지 선택" /></UICascadeSelectTrigger>
    <UICascadeSelectContent>
      <UICascadeSelectColumn v-for="(_, depth) in columns" :key="depth" :depth="depth" v-slot="{ items }">
        <UICascadeSelectItem v-for="item in items" :key="item" :value="item">{{ item }}</UICascadeSelectItem>
      </UICascadeSelectColumn>
    </UICascadeSelectContent>
  </UICascadeSelect>
</template>
