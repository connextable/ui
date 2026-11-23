<script setup lang="ts">
import RadioGroupIconExample from "~/components/examples/RadioGroupIconExample.vue";
import iconSource from "~/components/examples/RadioGroupIconExample.vue?example-code&raw";
import RadioGroupHorizontalExample from "~/components/examples/RadioGroupHorizontalExample.vue";
import RadioGroupHorizontalExampleSource from "~/components/examples/RadioGroupHorizontalExample.vue?example-code&raw";
import RadioGroupDescriptionExample from "~/components/examples/RadioGroupDescriptionExample.vue";
import RadioGroupDescriptionExampleSource from "~/components/examples/RadioGroupDescriptionExample.vue?example-code&raw";
import RadioGroupReadonlyExample from "~/components/examples/RadioGroupReadonlyExample.vue";
import RadioGroupReadonlyExampleSource from "~/components/examples/RadioGroupReadonlyExample.vue?example-code&raw";
import RadioGroupExample from "~/components/examples/RadioGroupExample.vue";
import RadioGroupDisabledExample from "~/components/examples/RadioGroupDisabledExample.vue";
import radioGroupDisabledExampleSource from "~/components/examples/RadioGroupDisabledExample.vue?example-code&raw";
import RadioGroupFormExample from "~/components/form/RadioGroupFormExample.vue";
import formSource from "~/components/form/RadioGroupFormExample.vue?example-code&raw";

definePageMeta({
  title: "UIRadioGroup",
  description: "여러 선택지 중 하나를 선택합니다. 목록과 카드에서 같은 선택 상태를 비교할 수 있습니다.",
  componentParts: ["UIRadioGroupItem", "UIRadioGroupIndicator"],
});
</script>

<template>
  <div>
    <PlaygroundExampleSection id="usage" title="기본 사용법">
      <RadioGroupExample />
    </PlaygroundExampleSection>
    <PlaygroundExampleSection id="settings-and-behavior" title="설정과 동작">
      <PlaygroundExampleSection id="examples" title="옵션 상태와 배치">
        <PlaygroundExample :heading-level="3"
          id="radio-disabled"
          title="비활성 옵션"
          description="방향키로 이동하면 disabled 옵션을 건너뜁니다."
          :source="radioGroupDisabledExampleSource"
        >
          <RadioGroupDisabledExample />
        </PlaygroundExample>
        <PlaygroundExample id="radio-horizontal" title="가로 배치"
          description="orientation을 horizontal로 지정하면 좌우 방향키로 탐색할 수 있습니다." :source="RadioGroupHorizontalExampleSource" :heading-level="3">
          <RadioGroupHorizontalExample />
        </PlaygroundExample>
        <PlaygroundExample id="radio-description" title="옵션 설명"
          description="항목 아래 설명을 넣어 선택에 필요한 정보를 표시합니다." :source="RadioGroupDescriptionExampleSource" :heading-level="3">
          <RadioGroupDescriptionExample />
        </PlaygroundExample>
        <PlaygroundExample id="radio-readonly" title="읽기 전용 선택"
          description="현재 값을 계속 읽을 수 있으며 다른 값으로 바뀌지 않습니다." :source="RadioGroupReadonlyExampleSource" :heading-level="3">
          <RadioGroupReadonlyExample />
        </PlaygroundExample>
        <PlaygroundExample
          id="radio-icons"
          title="라디오 옵션 아이콘"
          description="options의 icon으로 이메일과 앱 푸시를 구분합니다."
          :source="iconSource"
        >
          <RadioGroupIconExample />
        </PlaygroundExample>
      </PlaygroundExampleSection>
      <PlaygroundFormSection>
        <PlaygroundExample
          id="radio-form"
          title="선택값 제출"
          description="그룹에서 선택한 값을 제출 핸들러의 values.density에서 읽습니다."
          :source="formSource"
          :heading-level="3"
        >
          <RadioGroupFormExample />
        </PlaygroundExample>
      </PlaygroundFormSection>
    </PlaygroundExampleSection>
  </div>
</template>
