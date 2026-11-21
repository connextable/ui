<script setup lang="ts">
import { UIHostProvider, UITabs, UITabsList, UITabsTrigger } from "@connextable/ui";
const tabs = ["요약", "파일", "설정"];
</script>

<template>
  <UIHostProvider direction="rtl">
    <div dir="rtl">
      <UITabs :items="tabs" :default-value="tabs[0]" aria-label="오른쪽에서 왼쪽으로 탐색">
        <UITabsList><UITabsTrigger v-for="tab in tabs" :key="tab" :value="tab">{{ tab }}</UITabsTrigger></UITabsList>
      </UITabs>
    </div>
  </UIHostProvider>
</template>
