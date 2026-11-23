<script setup lang="ts">
import DisclosureDisabledExample from "~/components/examples/DisclosureDisabledExample.vue";
import DisclosureDisabledExampleSource from "~/components/examples/DisclosureDisabledExample.vue?example-code&raw";
import DisclosureExample from "~/components/examples/DisclosureExample.vue";
import source from "~/components/examples/DisclosureExample.vue?example-code&raw";
import DisclosureTriggerExample from "~/components/examples/DisclosureTriggerExample.vue";
import triggerSource from "~/components/examples/DisclosureTriggerExample.vue?example-code&raw";
import DisclosureContentExample from "~/components/examples/DisclosureContentExample.vue";
import contentSource from "~/components/examples/DisclosureContentExample.vue?example-code&raw";
import { disclosureParts } from "~/data/disclosure-parts";

definePageMeta({
  title: "UIDisclosure",
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
    <PlaygroundExampleSection id="usage" title="기본 사용법">
      <PlaygroundExample id="disclosure-example" title="펼치기와 접기" :source="source">
        <DisclosureExample />
      </PlaygroundExample>
    </PlaygroundExampleSection>
    <PlaygroundExampleSection id="settings-and-behavior" title="설정과 동작">
      <PlaygroundExample id="disclosure-disabled" title="비활성 트리거"
        description="비활성 상태에서는 버튼을 눌러도 콘텐츠가 펼쳐지지 않습니다." :source="DisclosureDisabledExampleSource">
        <DisclosureDisabledExample />
      </PlaygroundExample>
    </PlaygroundExampleSection>
    <PlaygroundExampleSection id="composition-and-extension" title="조합과 확장">
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
    </PlaygroundExampleSection>
  </div>
</template>
