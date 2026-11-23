<script setup lang="ts">
import { UIButton, UIAlertDialog } from "@connextable/ui";
import { Archive } from "@lucide/vue";

</script>

<template>
  <UIAlertDialog
    trigger-label="보고서 보관"
    :trigger-icon="Archive"
    title="보고서를 보관할까요?"
    description="보관한 보고서는 보관함에서 다시 열 수 있습니다."
  >
    <template #actions="{ close }">
      <UIButton variant="outline" @click="close()">취소</UIButton>
    </template>
  </UIAlertDialog>
</template>
