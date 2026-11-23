<script setup lang="ts">
import { UIDialog } from "@connextable/ui";
import { ClipboardList } from "@lucide/vue";

</script>

<template>
  <UIDialog
    trigger-label="검토 기록 열기"
    :trigger-icon="ClipboardList"
    title="지난 검토 기록"
    description="접근성 검사와 배포 확인을 완료했습니다."
  />
</template>
