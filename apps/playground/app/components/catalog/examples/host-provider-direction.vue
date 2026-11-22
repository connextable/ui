<script setup lang="ts">
import { UIHostProvider, UITabs, UITabsList, UITabsTrigger } from "@connextable/ui";
import { ref } from "vue";
const tabs = ["요약", "파일", "설정"];

const activeTab = ref(tabs[0]);
</script>

<template>
  <UIHostProvider direction="rtl">
    <div dir="rtl">
      <UITabs :items="tabs" v-model="activeTab" aria-label="오른쪽에서 왼쪽으로 탐색">
        <UITabsList><UITabsTrigger v-for="tab in tabs" :key="tab" :value="tab">{{ tab }}</UITabsTrigger></UITabsList>
      </UITabs>
    </div>
  </UIHostProvider>
</template>
