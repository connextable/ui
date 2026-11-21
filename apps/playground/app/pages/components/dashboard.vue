<script setup lang="ts">
import { onMounted, onScopeDispose, ref } from "vue";
import DashboardAnatomy from "~/components/examples/DashboardAnatomy.vue";
import DashboardExample from "~/components/examples/DashboardExample.vue";
import source from "~/components/examples/DashboardExample.vue?example-code&raw";
import DashboardAsideExample from "~/components/examples/DashboardAsideExample.vue";
import asideSource from "~/components/examples/DashboardAsideExample.vue?example-code&raw";
import DashboardPanelSlotsExample from "~/components/examples/DashboardPanelSlotsExample.vue";
import panelSource from "~/components/examples/DashboardPanelSlotsExample.vue?example-code&raw";
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
    <PlaygroundExampleSection id="usage" title="기본 사용법">
      <PlaygroundExample id="dashboard-example" title="사이드바와 본문"
        description="사이드바에서 메뉴를 선택하면 본문의 해당 위치로 이동합니다."
        :source="source" :heading-level="3" wide>
        <DashboardExample />
      </PlaygroundExample>
    </PlaygroundExampleSection>
    <PlaygroundExampleSection id="examples" title="동작별 예제">
      <PlaygroundExample id="dashboard-aside" title="목록과 상세 패널"
        description="선택한 문서의 내용이 aside 슬롯에 표시됩니다." :source="asideSource" :heading-level="3" wide>
        <DashboardAsideExample />
      </PlaygroundExample>
      <PlaygroundExample id="dashboard-panel-slots" title="패널의 헤더와 툴바"
        description="필터는 toolbar에, 페이지 제목과 초기화는 header에 배치합니다."
        :source="panelSource" :heading-level="3" wide>
        <DashboardPanelSlotsExample />
      </PlaygroundExample>
    </PlaygroundExampleSection>
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

</style>
