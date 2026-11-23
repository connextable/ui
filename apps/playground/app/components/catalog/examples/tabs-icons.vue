<script setup lang="ts">
import { UITabs } from "@connextable/ui";
import { LayoutDashboard, Settings } from "@lucide/vue";
import { ref } from "vue";

const tabs = [
  { value: "overview", label: "개요", description: "보고서 요약입니다.", icon: LayoutDashboard },
  { value: "settings", label: "설정", description: "보고서 접근 권한을 관리합니다.", icon: Settings },
];
const tab = ref("overview");
</script>

<template>
  <UITabs v-model="tab" :items="tabs" label="보고서" />
</template>
