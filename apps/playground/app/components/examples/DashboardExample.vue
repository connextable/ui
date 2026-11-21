<script setup lang="ts">
import {
  UIDashboard,
  UIDashboardNavbar,
  UIDashboardNavGroup,
  UIDashboardNavItem,
  UIDashboardPanel,
  UIDashboardSidebar,
} from "@connextable/ui";
</script>

<template>
  <UIDashboard class="example">
    <template #sidebar>
      <UIDashboardSidebar label="프로젝트">
        <UIDashboardNavGroup label="팀 공간">
          <UIDashboardNavItem><a href="#dashboard-basic-overview" aria-current="location">개요</a></UIDashboardNavItem>
          <UIDashboardNavItem><a href="#dashboard-basic-notes">메모</a></UIDashboardNavItem>
        </UIDashboardNavGroup>
      </UIDashboardSidebar>
    </template>
    <UIDashboardPanel>
      <template #header><UIDashboardNavbar>팀 공간</UIDashboardNavbar></template>
      <h3 id="dashboard-basic-overview">개요</h3>
      <p>팀에서 관리하는 항목을 확인합니다.</p>
      <h3 id="dashboard-basic-notes">메모</h3>
      <p>공유할 변경 내역을 남깁니다.</p>
    </UIDashboardPanel>
  </UIDashboard>
</template>

<style scoped>
.example {
  --ui-dashboard-height: 18rem;
  --ui-dashboard-sidebar-width: 11rem;
  --ui-dashboard-sidebar-height: auto;
  border: 1px solid var(--ui-color-divider);
}
</style>
