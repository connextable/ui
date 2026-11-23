<script setup lang="ts">
import { UITransfer } from "@connextable/ui";
import { Mail, Smartphone } from "@lucide/vue";
import { ref } from "vue";

const nodes = ref<readonly { id: string; parentID: string | null }[]>([
  { id: "available", parentID: null },
  { id: "chosen", parentID: null },
  { id: "이메일", parentID: "available" },
  { id: "앱 푸시", parentID: "chosen" },
]);
const icons = new Map([["이메일", Mail], ["앱 푸시", Smartphone]]);
</script>

<template>
  <UITransfer
    v-model:nodes="nodes"
    source-id="available"
    target-id="chosen"
    :icon-for="id => icons.get(id)"
  />
</template>
