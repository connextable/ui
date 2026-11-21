<script setup lang="ts">
import SwitchThumbExample from "~/components/examples/SwitchThumbExample.vue";
import thumbSource from "~/components/examples/SwitchThumbExample.vue?example-code&raw";
import SwitchDefaultExample from "~/components/examples/SwitchDefaultExample.vue";
import SwitchDefaultExampleSource from "~/components/examples/SwitchDefaultExample.vue?example-code&raw";
import SwitchDisabledExample from "~/components/examples/SwitchDisabledExample.vue";
import SwitchDisabledExampleSource from "~/components/examples/SwitchDisabledExample.vue?example-code&raw";
import SwitchExample from "~/components/examples/SwitchExample.vue";
import switchExampleSource from "~/components/examples/SwitchExample.vue?example-code&raw";
import SwitchSizeExample from "~/components/examples/SwitchSizeExample.vue";
import switchSizeExampleSource from "~/components/examples/SwitchSizeExample.vue?example-code&raw";
import SwitchReadonlyExample from "~/components/examples/SwitchReadonlyExample.vue";
import switchReadonlyExampleSource from "~/components/examples/SwitchReadonlyExample.vue?example-code&raw";
import SwitchFormExample from "~/components/form/SwitchFormExample.vue";
import formSource from "~/components/form/SwitchFormExample.vue?example-code&raw";

definePageMeta({
  title: "UISwitch",
  category: "선택",
  componentParts: ["UISwitchThumb"],
  description: "알림이나 자동 저장처럼 켜고 끄는 설정에 사용합니다.",
});
</script>

<template>
  <div>
    <PlaygroundExampleSection id="usage" title="기본 사용법">
      <PlaygroundExample :heading-level="3"
        id="switch-example"
        title="댓글 알림 설정"
        description="v-model에 알림 수신 여부를 연결합니다. 스위치를 누르면 설정이 즉시 바뀝니다."
        :source="switchExampleSource"
      >
        <SwitchExample />
      </PlaygroundExample>
    </PlaygroundExampleSection>
    <PlaygroundExampleSection id="examples" title="동작별 예제">
      <PlaygroundExample :heading-level="3"
        id="switch-readonly"
        title="읽기 전용"
        description="readonly를 지정하면 사용자가 켜짐 상태를 바꿀 수 없습니다."
        :source="switchReadonlyExampleSource"
      >
        <SwitchReadonlyExample />
      </PlaygroundExample>
      <PlaygroundExample id="switch-default" title="초기값"
        description="default-value를 켜 둔 스위치는 처음 표시할 때 켜진 상태로 시작합니다." :source="SwitchDefaultExampleSource" :heading-level="3">
        <SwitchDefaultExample />
      </PlaygroundExample>
      <PlaygroundExample id="switch-disabled" title="비활성"
        description="disabled를 지정한 스위치는 상태 변경 동작을 받지 않습니다." :source="SwitchDisabledExampleSource" :heading-level="3">
        <SwitchDisabledExample />
      </PlaygroundExample>
      <PlaygroundExample id="UISwitchThumb" title="UISwitchThumb"
        description="thumb 슬롯으로 켜짐 상태의 표시를 조합합니다." :source="thumbSource" :heading-level="3">
        <SwitchThumbExample />
      </PlaygroundExample>
    </PlaygroundExampleSection>
    <PlaygroundExampleSection id="appearance" title="모양">
      <PlaygroundExample :heading-level="3"
        id="switch-size"
        title="크기"
        description="size로 입력 컨트롤의 공용 크기를 적용합니다."
        :source="switchSizeExampleSource"
      >
        <SwitchSizeExample />
      </PlaygroundExample>
    </PlaygroundExampleSection>
    <PlaygroundFormSection>
      <PlaygroundExample
        id="switch-form"
        title="설정 제출"
        description="스위치가 켜졌을 때 UIFormField의 name으로 값이 제출됩니다."
        :source="formSource"
        :heading-level="3"
      >
        <SwitchFormExample />
      </PlaygroundExample>
    </PlaygroundFormSection>
  </div>
</template>
