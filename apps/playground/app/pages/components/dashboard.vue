<script setup lang="ts">
import { onMounted, onScopeDispose, ref } from "vue";
import DashboardAnatomy from "~/components/examples/DashboardAnatomy.vue";
import DashboardExample from "~/components/examples/DashboardExample.vue";
import source from "~/components/examples/DashboardExample.vue?example-code&raw";
import { dashboardParts } from "~/data/dashboard-parts";

definePageMeta({
  title: "UIDashboard",
  category: "레이아웃",
  description: "사이드바, 상단 바, 툴바, 상세 패널을 조합해 화면의 목적에 맞는 레이아웃을 구성합니다.",
  componentParts: Object.keys(dashboardParts),
});

const route = useRoute();
const router = useRouter();
const selectedPart = ref("UIDashboardPanel");

function selectLinkedPart(hash: string) {
  const name = hash.slice(1);
  if (Object.hasOwn(dashboardParts, name)) selectedPart.value = name;
}

onMounted(() => selectLinkedPart(route.hash));
// Re-select the part when the current sidebar link is activated again.
const removeRouteHook = router.afterEach((to) => {
  if (to.path === route.path) selectLinkedPart(to.hash);
});
onScopeDispose(removeRouteHook);
</script>

<template>
  <div>
    <PlaygroundExample
      id="dashboard-example"
      title="레이아웃 조합"
      description="사이드바를 포함한 화면, 목록과 상세, 단일 패널을 전환해 보세요."
      :source="source"
      wide
    >
      <DashboardExample />
    </PlaygroundExample>
    <section class="dashboard-anatomy" aria-labelledby="dashboard-parts-title">
      <span v-for="(_, name) in dashboardParts" :id="name" :key="name" class="dashboard-anatomy__anchor" aria-hidden="true" />
      <h2 id="dashboard-parts-title" data-playground-heading tabindex="-1">구성도</h2>
      <p>영역이나 컴포넌트 이름을 가리키면 해당 위치에 점선과 이름이 표시됩니다.</p>
      <DashboardAnatomy v-model="selectedPart" />
    </section>
  </div>
</template>

<style scoped>
.dashboard-anatomy {
  margin-block-end: 3rem;
}

.dashboard-anatomy h2 {
  margin: 0;
  font-size: 1.5rem;
}

.dashboard-anatomy__anchor {
  display: block;
  scroll-margin-block-start: 2rem;
}

.dashboard-anatomy p {
  margin: 0.625rem 0 1rem;
  color: var(--ui-color-text-muted);
}

@media (width <= 42rem) {
  .dashboard-anatomy__anchor {
    scroll-margin-block-start: 5.25rem;
  }
}
</style>
