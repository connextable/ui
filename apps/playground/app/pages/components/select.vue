<script setup lang="ts">
import SelectBasicExample from "~/components/select/SelectBasicExample.vue";
import basicSource from "~/components/select/SelectBasicExample.vue?example-code&raw";
import SelectDisabledOptionExample from "~/components/select/SelectDisabledOptionExample.vue";
import disabledOptionSource from "~/components/select/SelectDisabledOptionExample.vue?example-code&raw";
import SelectContentExample from "~/components/select/SelectContentExample.vue";
import contentSource from "~/components/select/SelectContentExample.vue?example-code&raw";
import SelectContentScrollExample from "~/components/select/SelectContentScrollExample.vue";
import scrollSource from "~/components/select/SelectContentScrollExample.vue?example-code&raw";
import SelectItemExample from "~/components/select/SelectItemExample.vue";
import itemSource from "~/components/select/SelectItemExample.vue?example-code&raw";
import SelectItemMarkerExample from "~/components/select/SelectItemMarkerExample.vue";
import markerSource from "~/components/select/SelectItemMarkerExample.vue?example-code&raw";
import SelectLabelExample from "~/components/select/SelectLabelExample.vue";
import labelSource from "~/components/select/SelectLabelExample.vue?example-code&raw";
import SelectTriggerExample from "~/components/select/SelectTriggerExample.vue";
import triggerSource from "~/components/select/SelectTriggerExample.vue?example-code&raw";
import SelectValueExample from "~/components/select/SelectValueExample.vue";
import valueSource from "~/components/select/SelectValueExample.vue?example-code&raw";
import { selectParts } from "~/data/select-parts";

definePageMeta({
  title: "UISelect",
  category: "입력",
  description: "목록에서 항목 하나를 선택합니다. 옵션에 설명과 상태 표시를 조합할 수 있습니다.",
  componentParts: Object.keys(selectParts),
});

const parts = {
  UISelectLabel: { component: SelectLabelExample, source: labelSource },
  UISelectTrigger: { component: SelectTriggerExample, source: triggerSource },
  UISelectValue: { component: SelectValueExample, source: valueSource },
  UISelectContent: { component: SelectContentExample, source: contentSource },
  UISelectItem: { component: SelectItemExample, source: itemSource },
} satisfies Record<keyof typeof selectParts, { component: unknown; source: string }>;
</script>

<template>
  <div class="select-page">
    <PlaygroundExample
      id="select-example"
      title="기본 사용법"
      description="options로 목록을 만들고 v-model로 선택값을 연결합니다."
      :source="basicSource"
    >
      <SelectBasicExample />
    </PlaygroundExample>
    <PlaygroundExample
      id="select-disabled-option"
      title="비활성 옵션"
      description="옵션의 disabled를 지정하면 목록에서 그 옵션을 선택할 수 없습니다."
      :source="disabledOptionSource"
    >
      <SelectDisabledOptionExample />
    </PlaygroundExample>
    <section aria-labelledby="select-parts">
      <h2 id="select-parts" class="select-page__parts-heading" data-playground-heading tabindex="-1">구성 컴포넌트</h2>
      <PlaygroundExample
        v-for="(part, name) in parts"
        :id="name"
        :key="name"
        :title="name"
        :description="selectParts[name]"
        :source="part.source"
        :heading-level="3"
      >
        <component :is="part.component" />
      </PlaygroundExample>
      <PlaygroundExample
        id="select-content-scroll"
        title="긴 옵션 목록"
        description="목록을 열고 스크롤하거나 End 키로 마지막 도시까지 이동합니다."
        :source="scrollSource"
        :heading-level="3"
      >
        <SelectContentScrollExample />
      </PlaygroundExample>
      <PlaygroundExample
        id="select-item-marker"
        title="옵션 앞 상태 표시"
        description="UISelectItem의 leading 슬롯에 상태 점을 넣습니다."
        :source="markerSource"
        :heading-level="3"
      >
        <SelectItemMarkerExample />
      </PlaygroundExample>
    </section>
  </div>
</template>

<style scoped>
.select-page__parts-heading {
  margin: 0 0 1.5rem;
  font-size: 1.5rem;
  letter-spacing: -0.025em;
}
</style>
