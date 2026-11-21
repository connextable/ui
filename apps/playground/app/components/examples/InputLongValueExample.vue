<script setup lang="ts">
import { UIButton, UIInput } from "@connextable/ui";
import { Search, X } from "@lucide/vue";
import { ref } from "vue";

const query = ref("다음 분기에 팀 전체에서 확인해야 하는 디자인 시스템 접근성 검사 항목");
</script>

<template>
  <UIInput v-model="query" aria-label="긴 검색어" style="inline-size: min(100%, 15rem)">
    <template #leading><Search aria-hidden="true" /></template>
    <template #trailing>
      <UIButton icon-only size="sm" variant="ghost" aria-label="검색어 지우기" @click="query = ''">
        <template #leading><X /></template>
      </UIButton>
    </template>
  </UIInput>
</template>
