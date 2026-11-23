<script setup lang="ts">
import { UISheet } from "@connextable/ui";
import { ArrowDownUp } from "@lucide/vue";

</script>

<template>
  <UISheet
    trigger-label="정렬 기준 보기"
    :trigger-icon="ArrowDownUp"
    title="현재 정렬 기준"
    description="문서가 최근 수정된 순서로 표시됩니다."
  />
</template>
