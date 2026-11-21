<script setup lang="ts">
import {
  UIButton,
  UITabs,
  UITabsContent,
  UITabsIndicator,
  UITabsList,
  UITabsTrigger,
} from "@connextable/ui";

import { ref } from "vue";

const selected = ref("overview");
const labels: Record<string, string> = { overview: "개요", activity: "활동", settings: "설정" };
const tabs = Object.keys(labels);
</script>
<template>
  <UIButton size="sm" @click="selected = 'settings'">설정으로 이동</UIButton>
  <UITabs v-model="selected" :items="tabs"><UITabsList><UITabsTrigger v-for="tab in tabs" :key="tab" :value="tab">{{ labels[tab] }}</UITabsTrigger><UITabsIndicator /></UITabsList><UITabsContent v-for="tab in tabs" :key="tab" :value="tab">{{ labels[tab] }}</UITabsContent></UITabs>
</template>
