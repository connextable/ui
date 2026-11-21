<script setup lang="ts">
import { UIButton, UIDashboard, UIDashboardNavbar, UIDashboardPanel } from "@connextable/ui";
import { ref } from "vue";

const selection = ref("가이드");
</script>

<template>
  <UIDashboard class="example">
    <UIDashboardPanel>
      <template #header><UIDashboardNavbar>문서 목록</UIDashboardNavbar></template>
      <UIButton v-for="title in ['가이드', '변경 기록']" :key="title" size="sm" variant="ghost"
        :aria-pressed="selection === title" @click="selection = title">{{ title }}</UIButton>
    </UIDashboardPanel>
    <template #aside>
      <UIDashboardPanel as="aside" variant="subtle" aria-label="선택한 문서">
        <strong>{{ selection }}</strong>
        <p>{{ selection === "가이드" ? "팀의 공통 규칙입니다." : "최근 변경 사항입니다." }}</p>
      </UIDashboardPanel>
    </template>
  </UIDashboard>
</template>

<style scoped>
.example {
  --ui-dashboard-height: 16rem;
  border: 1px solid var(--ui-color-divider);
}
</style>
