<script setup lang="ts">
import { UITransfer } from "@connextable/ui";
import { Mail, MessageSquare, Smartphone } from "@lucide/vue";
import { ref } from "vue";

const nodes = ref<readonly { id: string; parentID: string | null }[]>([
  { id: "available", parentID: null },
  { id: "chosen", parentID: null },
  { id: "이메일", parentID: "available" },
  { id: "메시지", parentID: "available" },
  { id: "모바일", parentID: "chosen" },
]);
const icons = new Map([
  ["이메일", Mail],
  ["메시지", MessageSquare],
  ["모바일", Smartphone],
]);
</script>

<template>
  <UITransfer
    v-model:nodes="nodes"
    source-id="available"
    target-id="chosen"
    source-label="사용 가능한 채널"
    target-label="선택한 채널"
    :icon-for="id => icons.get(id)"
  />
</template>
