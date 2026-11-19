<script setup lang="ts">
import {
  UIDashboard,
  UIDashboardNavGroup,
  UIDashboardNavItem,
  UIDashboardSidebar,
} from "@connextable/ui";

definePageMeta({
  title: "UIDashboard",
  category: "레이아웃",
});
</script>

<template>
  <section class="playground-example" aria-labelledby="dashboard-example">
    <h2 id="dashboard-example">사이드바와 본문</h2>
    <UIDashboard class="dashboard-example">
      <template #sidebar>
        <UIDashboardSidebar label="미리보기 탐색">
          <UIDashboardNavGroup label="워크스페이스">
            <UIDashboardNavItem>
              <a href="#dashboard-overview" aria-current="location">개요</a>
            </UIDashboardNavItem>
          </UIDashboardNavGroup>
        </UIDashboardSidebar>
      </template>
      <div class="dashboard-example__content">
        <h3 id="dashboard-overview" tabindex="-1">개요</h3>
        <dl>
          <dt>패키지</dt>
          <dd>@connextable/ui</dd>
        </dl>
      </div>
    </UIDashboard>
  </section>
</template>

<style scoped>
.dashboard-example {
  --ui-dashboard-height: 18rem;
  --ui-dashboard-sidebar-width: 11rem;

  overflow: clip;
  border: 1px solid var(--ui-dashboard-divider);
  border-radius: var(--ui-control-radius);
}

.dashboard-example__content {
  padding: 1.25rem;
}

.dashboard-example__content h3 {
  margin-block-start: 0;
  scroll-margin-block-start: 8rem;
}

.dashboard-example__content dl {
  display: grid;
  gap: 0.25rem;
  margin: 0;
  overflow-wrap: anywhere;
}

.dashboard-example__content dt {
  font-size: 0.875rem;
}

.dashboard-example__content dd {
  margin: 0;
  font-family: ui-monospace, monospace;
}
</style>
