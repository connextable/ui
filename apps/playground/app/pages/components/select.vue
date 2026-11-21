<script setup lang="ts">
import SelectControlledOpenExample from "~/components/examples/SelectControlledOpenExample.vue";
import SelectControlledOpenExampleSource from "~/components/examples/SelectControlledOpenExample.vue?example-code&raw";
import SelectReadonlyExample from "~/components/examples/SelectReadonlyExample.vue";
import SelectReadonlyExampleSource from "~/components/examples/SelectReadonlyExample.vue?example-code&raw";
import SelectTypeaheadExample from "~/components/examples/SelectTypeaheadExample.vue";
import SelectTypeaheadExampleSource from "~/components/examples/SelectTypeaheadExample.vue?example-code&raw";
import SelectFormExample from "~/components/form/SelectFormExample.vue";
import formSource from "~/components/form/SelectFormExample.vue?example-code&raw";
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
import SelectFieldExample from "~/components/select/SelectFieldExample.vue";
import fieldSource from "~/components/select/SelectFieldExample.vue?example-code&raw";
import SelectTriggerExample from "~/components/select/SelectTriggerExample.vue";
import triggerSource from "~/components/select/SelectTriggerExample.vue?example-code&raw";
import SelectValueExample from "~/components/select/SelectValueExample.vue";
import valueSource from "~/components/select/SelectValueExample.vue?example-code&raw";
import SelectPortalExample from "~/components/select/SelectPortalExample.vue";
import portalSource from "~/components/select/SelectPortalExample.vue?example-code&raw";
import { selectParts } from "~/data/select-parts";

definePageMeta({
  title: "UISelect",
  category: "선택",
  description: "목록에서 항목 하나를 선택합니다. 옵션에 설명과 상태 표시를 조합할 수 있습니다.",
  componentParts: Object.keys(selectParts),
});

const parts = {
  UISelectTrigger: { component: SelectTriggerExample, source: triggerSource },
  UISelectContent: { component: SelectContentExample, source: contentSource },
  UISelectItem: { component: SelectItemExample, source: itemSource },
  UISelectValue: { component: SelectValueExample, source: valueSource },
  UISelectPortal: { component: SelectPortalExample, source: portalSource },
} satisfies Record<keyof typeof selectParts, { component: unknown; source: string }>;
</script>

<template>
  <div class="select-page">
    <PlaygroundExampleSection id="usage" title="기본 사용법">
      <PlaygroundExample :heading-level="3"
        id="select-example"
        title="기본 사용법"
        description="options로 목록을 만들고 v-model로 선택값을 연결합니다."
        :source="basicSource"
      >
        <SelectBasicExample />
      </PlaygroundExample>
    </PlaygroundExampleSection>
    <PlaygroundExampleSection id="examples" title="동작별 예제">
      <PlaygroundExample :heading-level="3"
        id="select-disabled-option"
        title="비활성 옵션"
        description="옵션의 disabled를 지정하면 목록에서 그 옵션을 선택할 수 없습니다."
        :source="disabledOptionSource"
      >
        <SelectDisabledOptionExample />
      </PlaygroundExample>
      <PlaygroundExample id="select-controlled-open" title="열림 상태 제어"
        description="외부 버튼의 동작을 v-model:open에 연결합니다." :source="SelectControlledOpenExampleSource" :heading-level="3">
        <SelectControlledOpenExample />
      </PlaygroundExample>
      <PlaygroundExample id="select-readonly" title="읽기 전용 선택값"
        description="현재 선택을 표시합니다. 트리거를 눌러도 값을 바꾸는 목록은 열리지 않습니다." :source="SelectReadonlyExampleSource" :heading-level="3">
        <SelectReadonlyExample />
      </PlaygroundExample>
      <PlaygroundExample id="select-typeahead" title="키보드로 이름 검색"
        description="목록을 열고 P 또는 M을 눌러 해당 글자로 시작하는 형식으로 이동합니다." :source="SelectTypeaheadExampleSource" :heading-level="3">
        <SelectTypeaheadExample />
      </PlaygroundExample>
    </PlaygroundExampleSection>
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
    <PlaygroundFormSection>
      <PlaygroundExample
        id="select-field"
        title="필드 라벨"
        description="UIFormField 안에 배치하면 라벨과 도움말이 연결됩니다. 라벨을 눌러 선택 목록을 열 수 있습니다."
        :source="fieldSource"
        :heading-level="3"
      >
        <SelectFieldExample />
      </PlaygroundExample>
      <PlaygroundExample
        id="select-form"
        title="선택값 제출"
        description="UIFormField에 name을 지정하면 선택한 값이 FormData에 포함됩니다."
        :source="formSource"
        :heading-level="3"
      >
        <SelectFormExample />
      </PlaygroundExample>
    </PlaygroundFormSection>
  </div>
</template>

<style scoped>
.select-page__parts-heading {
  margin: 0 0 1.5rem;
  font-size: 1.5rem;
  letter-spacing: -0.025em;
}
</style>
