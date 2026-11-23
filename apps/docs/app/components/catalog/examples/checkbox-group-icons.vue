<script setup lang="ts">
import { UICheckboxGroup } from "@connextable/ui";
import { Mail, Smartphone } from "@lucide/vue";
import { ref } from "vue";

const options = [
  { value: "email", label: "이메일", icon: Mail },
  { value: "mobile", label: "앱 푸시", icon: Smartphone },
];
const channels = ref<readonly string[]>(["email"]);
</script>

<template>
  <UICheckboxGroup v-model="channels" :options="options" label="알림 채널" />
</template>
