<script setup lang="ts">
import {
  UITabs,
  UITabsContent,
  UITabsIndicator,
  UITabsList,
  UITabsTrigger,
} from "@connextable/ui";
import { ref } from "vue";

const labels: Record<string, string> = { overview: "개요", activity: "활동", settings: "설정" };
const tabs = Object.keys(labels);

const activeTab = ref("overview");
</script>
<template><UITabs :disabled-items="['activity']" :items="tabs" v-model="activeTab"><UITabsList><UITabsTrigger v-for="tab in tabs" :key="tab" :value="tab">{{ labels[tab] }}</UITabsTrigger><UITabsIndicator /></UITabsList><UITabsContent v-for="tab in tabs" :key="tab" :value="tab">{{ labels[tab] }}</UITabsContent></UITabs></template>
