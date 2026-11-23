<script setup lang="ts">
import { UIRadioGroup } from "@connextable/ui";
import { Mail, Smartphone } from "@lucide/vue";
import { ref } from "vue";

const options = [
  { value: "email", label: "이메일", icon: Mail },
  { value: "app", label: "앱 푸시", icon: Smartphone },
];
const channel = ref("email");
</script>

<template>
  <UIRadioGroup v-model="channel" :options="options" label="기본 알림 채널" />
</template>
