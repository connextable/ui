<script setup lang="ts">
import { UIButton, UIDashboard, UIDashboardNavbar, UIDashboardPanel, UIDashboardToolbar } from "@connextable/ui";
import { ref } from "vue";

const active = ref(false);
</script>

<template>
  <UIDashboard class="example">
    <UIDashboardPanel>
      <template #header>
        <UIDashboardNavbar>
          <template #leading>프로젝트</template>
          실행 내역
          <template #trailing><UIButton size="sm" variant="ghost" @click="active = false">초기화</UIButton></template>
        </UIDashboardNavbar>
      </template>
      <template #toolbar>
        <UIDashboardToolbar label="실행 내역 필터">
          <UIButton size="sm" variant="soft" :aria-pressed="active" @click="active = !active">진행 중</UIButton>
          <template #trailing><span aria-live="polite">{{ active ? "1건" : "2건" }}</span></template>
        </UIDashboardToolbar>
      </template>
      <p>{{ active ? "타입 검사 진행 중" : "빌드 완료 · 타입 검사 진행 중" }}</p>
      <template #footer>최근 갱신 · 지금</template>
    </UIDashboardPanel>
  </UIDashboard>
</template>

<style scoped>
.example {
  --ui-dashboard-height: 15rem;
  border: 1px solid var(--ui-color-divider);
}
</style>
