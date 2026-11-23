<script setup lang="ts">
import { UICheckboxTree } from "@connextable/ui";
import { ref } from "vue";

const nodes = [
  { id: "notifications", parentID: null, label: "알림 채널" },
  { id: "email", parentID: "notifications", label: "이메일" },
  { id: "mobile", parentID: "notifications", label: "모바일" },
];

const channels = ref<readonly string[]>(["email"]);
</script>

<template>
  <UICheckboxTree
    v-model="channels"
    :nodes="nodes"
    :default-expanded-values="['notifications']"
    label="알림 채널"
    clearable
  />
</template>
