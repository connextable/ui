<script setup lang="ts">
import SwitchExample from "~/components/examples/SwitchExample.vue";
import switchExampleSource from "~/components/examples/SwitchExample.vue?example-code&raw";
import SwitchSizeExample from "~/components/examples/SwitchSizeExample.vue";
import switchSizeExampleSource from "~/components/examples/SwitchSizeExample.vue?example-code&raw";
import SwitchReadonlyExample from "~/components/examples/SwitchReadonlyExample.vue";
import switchReadonlyExampleSource from "~/components/examples/SwitchReadonlyExample.vue?example-code&raw";

definePageMeta({
  title: "UISwitch",
  category: "입력",
  description: "미리보기처럼 즉시 반영되는 설정을 켜고 끕니다.",
});
</script>

<template>
  <div>
    <PlaygroundExample
      id="switch-example"
      title="즉시 반영"
      description="스위치를 끄면 미리보기 설명이 접힙니다."
      :source="switchExampleSource"
    >
      <SwitchExample />
    </PlaygroundExample>
    <PlaygroundExample
      id="switch-size"
      title="크기"
      description="size로 입력 컨트롤의 공용 크기를 적용합니다."
      :source="switchSizeExampleSource"
    >
      <SwitchSizeExample />
    </PlaygroundExample>
    <PlaygroundExample
      id="switch-readonly"
      title="읽기 전용"
      description="readonly를 지정하면 사용자가 켜짐 상태를 바꿀 수 없습니다."
      :source="switchReadonlyExampleSource"
    >
      <SwitchReadonlyExample />
    </PlaygroundExample>
  </div>
</template>
