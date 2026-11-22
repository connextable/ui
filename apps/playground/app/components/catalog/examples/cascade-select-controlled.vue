<script setup lang="ts">
import {
  UIButton,
  UICascadeSelect,
  UICascadeSelectColumn,
  UICascadeSelectContent,
  UICascadeSelectItem,
  UICascadeSelectTrigger,
  UICascadeSelectValue,
} from "@connextable/ui";
import { ref } from "vue";

const open = ref(false);
const nodes = [
  { id: "아시아", parentID: null },
  { id: "한국", parentID: "아시아" },
  { id: "서울", parentID: "한국" },
];
</script>

<template>
  <div>
    <UICascadeSelect v-model:open="open" :nodes="nodes" default-value="서울" aria-label="배송 지역" clearable v-slot="{ columns }">
      <UICascadeSelectTrigger><UICascadeSelectValue placeholder="배송 지역" /></UICascadeSelectTrigger>
      <UICascadeSelectContent>
        <UICascadeSelectColumn v-for="(_, depth) in columns" :key="depth" :depth="depth" v-slot="{ items }">
          <UICascadeSelectItem v-for="item in items" :key="item" :value="item">{{ item }}</UICascadeSelectItem>
        </UICascadeSelectColumn>
      </UICascadeSelectContent>
    </UICascadeSelect>
    <UIButton size="sm" variant="outline" @click="open = !open">{{ open ? "선택 창 닫기" : "선택 창 열기" }}</UIButton>
  </div>
</template>
