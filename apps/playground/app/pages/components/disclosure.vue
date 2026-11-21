<script setup lang="ts">
import DisclosureControlledExample from "~/components/examples/DisclosureControlledExample.vue";
import DisclosureControlledExampleSource from "~/components/examples/DisclosureControlledExample.vue?example-code&raw";
import DisclosureExample from "~/components/examples/DisclosureExample.vue";
import source from "~/components/examples/DisclosureExample.vue?example-code&raw";
import DisclosureTriggerExample from "~/components/examples/DisclosureTriggerExample.vue";
import triggerSource from "~/components/examples/DisclosureTriggerExample.vue?example-code&raw";
import DisclosureContentExample from "~/components/examples/DisclosureContentExample.vue";
import contentSource from "~/components/examples/DisclosureContentExample.vue?example-code&raw";
import { disclosureParts } from "~/data/disclosure-parts";

definePageMeta({
  title: "UIDisclosure",
  category: "레이아웃",
  description: "버튼으로 연결된 콘텐츠를 펼치고 접습니다.",
  componentParts: Object.keys(disclosureParts),
});

const parts = {
  UIDisclosureTrigger: { component: DisclosureTriggerExample, source: triggerSource },
  UIDisclosureContent: { component: DisclosureContentExample, source: contentSource },
} satisfies Record<keyof typeof disclosureParts, { component: unknown; source: string }>;
</script>

<template>
  <div>
    <PlaygroundExample id="disclosure-example" title="펼치기와 접기" :source="source">
      <DisclosureExample />
    </PlaygroundExample>
    <PlaygroundExample
      v-for="(part, name) in parts"
      :id="name"
      :key="name"
      :title="name"
      :description="disclosureParts[name]"
      :source="part.source"
    >
      <component :is="part.component" />
    </PlaygroundExample>
    <PlaygroundExample id="disclosure-controlled" title="외부에서 열림 제어"
      description="외부 UIButton과 Disclosure가 같은 열림 상태를 공유합니다." :source="DisclosureControlledExampleSource" :heading-level="3">
      <DisclosureControlledExample />
    </PlaygroundExample>
  </div>
</template>
