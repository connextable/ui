<script setup lang="ts">
import SwitchIconExample from "~/components/examples/SwitchIconExample.vue";
import iconSource from "~/components/examples/SwitchIconExample.vue?example-code&raw";
import SwitchThumbExample from "~/components/examples/SwitchThumbExample.vue";
import thumbSource from "~/components/examples/SwitchThumbExample.vue?example-code&raw";
import SwitchDefaultExample from "~/components/examples/SwitchDefaultExample.vue";
import SwitchDefaultExampleSource from "~/components/examples/SwitchDefaultExample.vue?example-code&raw";
import SwitchDisabledExample from "~/components/examples/SwitchDisabledExample.vue";
import SwitchDisabledExampleSource from "~/components/examples/SwitchDisabledExample.vue?example-code&raw";
import SwitchExample from "~/components/examples/SwitchExample.vue";
import SwitchSizeExample from "~/components/examples/SwitchSizeExample.vue";
import switchSizeExampleSource from "~/components/examples/SwitchSizeExample.vue?example-code&raw";
import SwitchReadonlyExample from "~/components/examples/SwitchReadonlyExample.vue";
import switchReadonlyExampleSource from "~/components/examples/SwitchReadonlyExample.vue?example-code&raw";
import SwitchFormExample from "~/components/form/SwitchFormExample.vue";
import formSource from "~/components/form/SwitchFormExample.vue?example-code&raw";

definePageMeta({
  title: "UISwitch",
  componentParts: ["UISwitchThumb"],
  description: "알림이나 자동 저장처럼 켜고 끄는 설정에 사용합니다.",
});
</script>

<template>
  <div>
    <PlaygroundExampleSection id="usage" title="기본 사용법">
      <SwitchExample />
    </PlaygroundExampleSection>
    <PlaygroundExampleSection id="settings-and-behavior" title="설정과 동작">
      <div id="switch-states" data-playground-anchor tabindex="-1">
        <PlaygroundExample
          id="switch-readonly"
          title="읽기 전용"
          description="readonly를 지정하면 사용자가 켜짐 상태를 바꿀 수 없습니다."
          :source="switchReadonlyExampleSource"
        >
          <SwitchReadonlyExample />
        </PlaygroundExample>
        <PlaygroundExample id="switch-default" title="초기값"
          description="v-model에 연결한 상태를 true로 시작하면 스위치가 처음부터 켜져 있습니다." :source="SwitchDefaultExampleSource">
          <SwitchDefaultExample />
        </PlaygroundExample>
        <PlaygroundExample id="switch-disabled" title="비활성"
          description="disabled를 지정한 스위치는 상태 변경 동작을 받지 않습니다." :source="SwitchDisabledExampleSource">
          <SwitchDisabledExample />
        </PlaygroundExample>
      </div>
      <div id="appearance" data-playground-anchor tabindex="-1">
        <PlaygroundExample
          id="switch-size"
          title="크기"
          description="size로 입력 컨트롤의 공용 크기를 적용합니다."
          :source="switchSizeExampleSource"
        >
          <SwitchSizeExample />
        </PlaygroundExample>
        <PlaygroundExample
          id="switch-icon"
          title="스위치 라벨 아이콘"
          description="icon으로 배포 알림 라벨 앞에 아이콘을 표시합니다."
          :source="iconSource"
        >
          <SwitchIconExample />
        </PlaygroundExample>
      </div>
      <div id="form" data-playground-anchor tabindex="-1">
        <PlaygroundExample
          id="switch-form"
          title="설정 제출"
          description="스위치가 켜졌을 때 UIFormField의 name으로 값이 제출됩니다."
          :source="formSource"
        >
          <SwitchFormExample />
        </PlaygroundExample>
      </div>
    </PlaygroundExampleSection>
    <PlaygroundExampleSection id="composition-and-extension" title="조합과 확장">
      <div id="examples" data-playground-anchor tabindex="-1">
        <PlaygroundExample id="UISwitchThumb" title="UISwitchThumb"
          description="thumb 슬롯에서 checked를 읽어 스위치가 켜져 있을 때 손잡이 가운데에 체크 아이콘을 표시합니다." :source="thumbSource">
          <SwitchThumbExample />
        </PlaygroundExample>
      </div>
    </PlaygroundExampleSection>
  </div>
</template>
