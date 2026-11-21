<script setup lang="ts">
import {
  UITabs,
  UITabsContent,
  UITabsIndicator,
  UITabsList,
  UITabsTrigger,
} from "@connextable/ui";

const tabs = [
  { value: "overview", label: "개요", description: "정산 보고서의 검토 상태와 마감일을 확인합니다." },
  { value: "activity", label: "활동", description: "재무팀이 오늘 오전에 수수료 내역을 갱신했습니다." },
  { value: "settings", label: "설정", description: "보고서 접근 권한은 프로젝트 구성원에게만 부여됩니다." },
];
</script>
<template>
  <UITabs :items="tabs.map(tab => tab.value)" default-value="overview">
    <UITabsList label="정산 보고서">
      <UITabsTrigger v-for="tab in tabs" :key="tab.value" :value="tab.value">{{ tab.label }}</UITabsTrigger>
      <UITabsIndicator />
    </UITabsList>
    <UITabsContent v-for="tab in tabs" :key="tab.value" :value="tab.value">{{ tab.description }}</UITabsContent>
  </UITabs>
</template>
