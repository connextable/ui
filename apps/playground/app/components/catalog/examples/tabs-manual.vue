<script setup lang="ts">
import { UITabs, UITabsContent, UITabsList, UITabsTrigger } from "@connextable/ui";
</script>

<template>
  <UITabs :items="['summary', 'history']" default-value="summary" activation-mode="manual">
    <UITabsList label="문서 정보">
      <UITabsTrigger value="summary">요약</UITabsTrigger>
      <UITabsTrigger value="history">변경 내역</UITabsTrigger>
    </UITabsList>
    <UITabsContent value="summary">검토 중인 문서입니다.</UITabsContent>
    <UITabsContent value="history">오전 10시에 제목을 변경했습니다.</UITabsContent>
  </UITabs>
</template>
