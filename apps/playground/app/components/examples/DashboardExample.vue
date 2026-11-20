<script setup lang="ts">
import {
  UIButton,
  UICheckbox,
  UIDashboard,
  UIDashboardNavbar,
  UIDashboardNavGroup,
  UIDashboardNavItem,
  UIDashboardPanel,
  UIDashboardSidebar,
  UIDashboardToolbar,
  UIProgress,
  UIRadioGroup,
} from "@connextable/ui";
import { computed, nextTick, ref, useTemplateRef } from "vue";

const layouts = [
  { value: "workspace", label: "워크스페이스" },
  { value: "split", label: "목록과 상세" },
  { value: "single", label: "단일 패널" },
];

const checks = [
  { id: "install", title: "의존성 설치", command: "dvt run install:workspace" },
  { id: "build", title: "워크스페이스 빌드", command: "dvt run build:workspace" },
  { id: "types", title: "타입 검사", command: "dvt run typecheck:workspace" },
  { id: "pack", title: "배포 파일 확인", command: "pnpm --filter @connextable/ui pack" },
];

const layout = ref("workspace");
const completed = ref(["install"]);
const selected = ref("build");
const remainingOnly = ref(false);
const checklistTitle = useTemplateRef<HTMLHeadingElement>("checklistTitle");
const visibleChecks = computed(() =>
  remainingOnly.value ? checks.filter((check) => !completed.value.includes(check.id)) : checks,
);
const detail = computed(() =>
  visibleChecks.value.find((check) => check.id === selected.value) ?? visibleChecks.value[0],
);

async function updateCheck(id: string, checked: boolean) {
  completed.value = checked
    ? [...completed.value, id]
    : completed.value.filter((value) => value !== id);
  if (!remainingOnly.value || !checked) return;
  await nextTick();
  checklistTitle.value?.focus({ preventScroll: true });
}
</script>

<template>
  <div class="dashboard-layout-picker">
    <UIRadioGroup
      v-model="layout"
      label="레이아웃 전환"
      :options="layouts"
      orientation="horizontal"
    />
  </div>
  <UIDashboard class="dashboard-example">
    <template v-if="layout === 'workspace'" #sidebar>
      <UIDashboardSidebar class="dashboard-example__sidebar" label="예제 탐색">
        <template #header>
          <span class="dashboard-example__workspace">패키지 작업실</span>
        </template>
        <UIDashboardNavGroup label="릴리스">
          <UIDashboardNavItem>
            <a href="#release-progress">준비 현황</a>
          </UIDashboardNavItem>
          <UIDashboardNavItem>
            <a href="#release-checklist">체크리스트</a>
          </UIDashboardNavItem>
        </UIDashboardNavGroup>
        <template #footer>
          <code>@connextable/ui</code>
        </template>
      </UIDashboardSidebar>
    </template>

    <UIDashboardPanel>
      <template #header>
        <UIDashboardNavbar>
          <h2 class="dashboard-example__title">릴리스 준비</h2>
          <template #trailing>
            <UIButton
              size="sm"
              variant="outline"
              :disabled="completed.length === 0"
              @click="completed = []"
            >
              체크 초기화
            </UIButton>
          </template>
        </UIDashboardNavbar>
      </template>
      <template #toolbar>
        <UIDashboardToolbar label="체크리스트 필터">
          <UIButton
            size="sm"
            :variant="remainingOnly ? 'ghost' : 'soft'"
            :aria-pressed="!remainingOnly"
            @click="remainingOnly = false"
          >전체</UIButton>
          <UIButton
            size="sm"
            :variant="remainingOnly ? 'soft' : 'ghost'"
            :aria-pressed="remainingOnly"
            @click="remainingOnly = true"
          >남은 항목</UIButton>
          <template #trailing>
            <output class="dashboard-example__summary">{{ completed.length }} / {{ checks.length }} 완료</output>
          </template>
        </UIDashboardToolbar>
      </template>

      <UIDashboardPanel v-if="layout === 'workspace'" variant="subtle" class="dashboard-progress">
        <div class="dashboard-progress__heading">
          <h3 id="release-progress" tabindex="-1">준비 현황</h3>
          <strong>{{ completed.length / checks.length * 100 }}%</strong>
        </div>
        <UIProgress
          class="dashboard-progress__bar"
          :value="completed.length"
          :max="checks.length"
          label="준비 현황"
        />
      </UIDashboardPanel>

      <div class="dashboard-checklist">
        <h3 id="release-checklist" ref="checklistTitle" tabindex="-1">체크리스트</h3>
        <ul
          v-if="visibleChecks.length"
          class="dashboard-checklist__items"
          role="list"
          aria-labelledby="release-checklist"
        >
          <li v-for="check in visibleChecks" :key="check.id">
            <UICheckbox
              class="dashboard-checklist__check"
              :model-value="completed.includes(check.id)"
              :label="check.title"
              @update:model-value="updateCheck(check.id, $event === true)"
            />
            <UIButton
              v-if="layout === 'split'"
              size="sm"
              variant="ghost"
              :aria-label="`${check.title} 상세`"
              :aria-pressed="detail?.id === check.id"
              @click="selected = check.id"
            >상세</UIButton>
          </li>
        </ul>
        <p v-else class="dashboard-checklist__empty">남은 항목이 없습니다.</p>
      </div>
    </UIDashboardPanel>

    <template v-if="layout === 'split'" #aside>
      <UIDashboardPanel as="aside" aria-labelledby="release-detail" class="dashboard-detail">
        <template #header>
          <UIDashboardNavbar>
            <h3 id="release-detail">항목 상세</h3>
          </UIDashboardNavbar>
        </template>
        <div v-if="detail">
          <p>{{ detail.title }}</p>
          <code>{{ detail.command }}</code>
        </div>
        <p v-else>표시할 항목이 없습니다.</p>
      </UIDashboardPanel>
    </template>
  </UIDashboard>
</template>

<style scoped>
.dashboard-layout-picker {
  min-inline-size: 0;
  margin: 0 0 1rem;
  font-size: 0.875rem;
}

.dashboard-example {
  --ui-dashboard-height: 26rem;
  --ui-dashboard-sidebar-height: auto;
  --ui-dashboard-sidebar-width: 11rem;
  --ui-dashboard-sidebar-background: #18373d;
  --ui-dashboard-bar-padding-inline: 1.25rem;
  --ui-dashboard-panel-padding: 1.25rem;

  border: 1px solid var(--ui-color-divider);
  overflow: clip;
}

.dashboard-example__sidebar {
  --ui-color-text: #f3f9f8;
  --ui-color-surface: #18373d;
  --ui-color-accent: #e5fdf9;
  --ui-color-surface-hover: #274b52;
  --ui-color-accent-soft: #32555c;
  --ui-color-focus: #8de3d1;
  --ui-color-divider: #38575d;

  color: var(--ui-color-text);
}

.dashboard-example__workspace {
  font-weight: 750;
}

.dashboard-example__sidebar code {
  font-size: 0.6875rem;
}

.dashboard-example__title {
  margin: 0;
  font-size: 1.1875rem;
  letter-spacing: -0.025em;
}

.dashboard-example__summary {
  color: var(--ui-color-text-muted);
  font-size: 0.8125rem;
  font-variant-numeric: tabular-nums;
}

.dashboard-progress {
  --ui-dashboard-panel-background: #e7f4f0;
  --ui-dashboard-panel-padding: 0.875rem 1rem;
  margin-block-end: 1.25rem;
}

.dashboard-progress__heading {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.25rem 0.75rem;
}

.dashboard-progress__heading strong {
  color: var(--ui-color-accent);
  font-size: 1.25rem;
  font-variant-numeric: tabular-nums;
}

.dashboard-progress h3,
.dashboard-checklist h3,
.dashboard-detail h3 {
  margin: 0;
  font-size: 0.9375rem;
  scroll-margin-block-start: 8.5rem;
}

.dashboard-progress__bar {
  margin-block-start: 0.5rem;
}

.dashboard-checklist__items {
  margin: 0.5rem 0 0;
  padding: 0;
  list-style: none;
}

.dashboard-checklist__items li {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0 0.5rem;
  border-block-end: 1px solid var(--ui-color-divider);
}

.dashboard-checklist__check {
  flex: 1 1 8rem;
  font-size: 0.875rem;
}

.dashboard-detail {
  --ui-dashboard-panel-background: var(--ui-color-surface-muted);
}

.dashboard-detail p,
.dashboard-checklist__empty {
  margin: 0;
  font-size: 0.875rem;
}

.dashboard-checklist__empty {
  margin-block-start: 0.75rem;
  color: var(--ui-color-text-muted);
}

.dashboard-detail code {
  display: block;
  margin-block-start: 0.75rem;
  padding: 0.625rem;
  border-radius: var(--ui-control-radius);
  background: var(--ui-color-surface);
  font-size: 0.75rem;
  overflow-wrap: anywhere;
}
</style>
