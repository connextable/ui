<script setup lang="ts">
import { UITransfer } from "@connextable/ui";

const nodes = [
  { id: "available", parentID: null },
  { id: "chosen", parentID: null },
  { id: "이메일", parentID: "available" },
  { id: "메시지", parentID: "available" },
  { id: "모바일", parentID: "chosen" },
] as const;
</script>

<template>
  <UITransfer
    :disabled-items="['이메일']"
    :nodes="nodes"
    source-id="available"
    target-id="chosen"
    source-label="사용 가능한 채널"
    target-label="선택한 채널"
  />
</template>
