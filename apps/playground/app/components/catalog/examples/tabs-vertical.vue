<script setup lang="ts">
import {
  UITabs,
  UITabsContent,
  UITabsIndicator,
  UITabsList,
  UITabsTrigger,
} from "@connextable/ui";

const labels: Record<string, string> = { overview: "개요", activity: "활동", settings: "설정" };
const tabs = Object.keys(labels);
</script>
<template><UITabs orientation="vertical" :items="tabs" default-value="overview"><UITabsList><UITabsTrigger v-for="tab in tabs" :key="tab" :value="tab">{{ labels[tab] }}</UITabsTrigger><UITabsIndicator /></UITabsList><UITabsContent v-for="tab in tabs" :key="tab" :value="tab">{{ labels[tab] }}</UITabsContent></UITabs></template>
