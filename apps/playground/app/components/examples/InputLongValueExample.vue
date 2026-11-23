<script setup lang="ts">
import { UIInput } from "@connextable/ui";
import { Search } from "@lucide/vue";
import { ref } from "vue";

const query = ref("다음 분기에 팀 전체에서 확인해야 하는 디자인 시스템 접근성 검사 항목");
</script>

<template>
  <UIInput
    v-model="query"
    :icon="Search"
    aria-label="긴 검색어"
    placeholder="문서 제목으로 검색"
    clearable
    clear-label="검색어 지우기"
    style="inline-size: min(100%, 15rem)"
  />
</template>
