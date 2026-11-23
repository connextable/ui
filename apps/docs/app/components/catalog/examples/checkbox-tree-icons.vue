<script setup lang="ts">
import { UICheckboxTree } from "@connextable/ui";
import { Bell, Mail, Smartphone } from "@lucide/vue";
import { ref } from "vue";

const nodes = [
  { id: "alerts", parentID: null, label: "알림", icon: Bell },
  { id: "email", parentID: "alerts", label: "이메일", icon: Mail },
  { id: "mobile", parentID: "alerts", label: "앱 푸시", icon: Smartphone },
];
const channels = ref<readonly string[]>([]);
</script>

<template>
  <UICheckboxTree
    v-model="channels"
    :nodes="nodes"
    :default-expanded-values="['alerts']"
    label="알림 채널"
  />
</template>
