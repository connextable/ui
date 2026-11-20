<script setup lang="ts">
import PlaygroundAnatomy from "~/components/PlaygroundAnatomy.vue";
import { dashboardParts } from "~/data/dashboard-parts";

const part = defineModel<string>({ required: true });
</script>

<template>
  <PlaygroundAnatomy v-model="part" label="Dashboard 구성 영역" :parts="dashboardParts">
    <div class="dashboard-diagram">
      <div class="dashboard-diagram__sidebar" data-ui-anatomy-part="UIDashboardSidebar">
        <strong>작업 공간</strong>
        <div class="dashboard-diagram__nav" data-ui-anatomy-part="UIDashboardNavGroup">
          <span class="dashboard-diagram__caption">탐색</span>
          <div class="dashboard-diagram__nav-item" data-ui-anatomy-part="UIDashboardNavItem">개요</div>
          <div class="dashboard-diagram__nav-item" data-ui-anatomy-part="UIDashboardNavItem">설정</div>
        </div>
      </div>
      <div class="dashboard-diagram__panel" data-ui-anatomy-part="UIDashboardPanel">
        <div class="dashboard-diagram__bar" data-ui-anatomy-part="UIDashboardNavbar">
          <strong>프로젝트</strong>
          <span class="dashboard-diagram__caption">새 프로젝트</span>
        </div>
        <div class="dashboard-diagram__bar dashboard-diagram__toolbar" data-ui-anatomy-part="UIDashboardToolbar">
          <span>상태 필터</span>
          <span class="dashboard-diagram__caption">전체</span>
        </div>
        <div class="dashboard-diagram__body">프로젝트 목록</div>
      </div>
    </div>
  </PlaygroundAnatomy>
</template>

<style scoped>
.dashboard-diagram {
  display: grid;
  grid-template-columns: minmax(5.5rem, 28%) minmax(0, 1fr);
  min-block-size: 14rem;
  border: 1px solid var(--ui-color-divider);
  border-radius: var(--ui-control-radius);
  background: var(--ui-color-surface);
  font-size: 0.875rem;
  overflow-wrap: anywhere;
}

.dashboard-diagram__sidebar {
  display: grid;
  align-content: start;
  gap: 0.625rem;
  padding: 0.75rem clamp(0.375rem, 2vw, 0.875rem);
  border-inline-end: 1px solid var(--ui-color-divider);
}

.dashboard-diagram__nav {
  display: grid;
  gap: 0.125rem;
  padding: 0.375rem;
  border-radius: var(--ui-control-radius);
  background: var(--ui-color-surface-muted);
}

.dashboard-diagram__caption {
  color: var(--ui-color-text-muted);
  font-size: 0.8125rem;
}

.dashboard-diagram__nav-item {
  padding: 0.25rem 0.375rem;
}

.dashboard-diagram__panel {
  display: grid;
  grid-template-rows: auto auto 1fr;
}

.dashboard-diagram__bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.25rem 0.5rem;
  padding: 0.75rem;
  border-block-end: 1px solid var(--ui-color-divider);
}

.dashboard-diagram__toolbar {
  background: var(--ui-color-surface-muted);
}

.dashboard-diagram__body {
  padding: 1rem 0.75rem;
  color: var(--ui-color-text-muted);
}
</style>
