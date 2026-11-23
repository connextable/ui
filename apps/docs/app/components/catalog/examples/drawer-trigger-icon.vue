<script setup lang="ts">
import { UIDrawer } from "@connextable/ui";
import { ListFilter } from "@lucide/vue";

</script>

<template>
  <UIDrawer
    trigger-label="필터 요약"
    :trigger-icon="ListFilter"
    title="적용한 필터"
    description="운영 환경의 배포만 표시하고 있습니다."
  />
</template>
