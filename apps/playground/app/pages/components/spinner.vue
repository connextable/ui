<script setup lang="ts">
import SpinnerAsyncExample from "~/components/examples/SpinnerAsyncExample.vue";
import SpinnerAsyncExampleSource from "~/components/examples/SpinnerAsyncExample.vue?example-code&raw";
import SpinnerArcExample from "~/components/examples/SpinnerArcExample.vue";
import arcSource from "~/components/examples/SpinnerArcExample.vue?example-code&raw";
import SpinnerExample from "~/components/examples/SpinnerExample.vue";
import spinnerSource from "~/components/examples/SpinnerExample.vue?example-code&raw";
import SpinnerStatusExample from "~/components/examples/SpinnerStatusExample.vue";
import statusSource from "~/components/examples/SpinnerStatusExample.vue?example-code&raw";
import SpinnerWaveExample from "~/components/examples/SpinnerWaveExample.vue";
import waveSource from "~/components/examples/SpinnerWaveExample.vue?example-code&raw";

definePageMeta({
  title: "UISpinner",
  category: "상태 표시",
  description: "완료 시점을 알 수 없는 작업이 진행 중임을 표시합니다.",
});
</script>

<template>
  <div>
    <PlaygroundExampleSection id="usage" title="기본 사용법">
      <PlaygroundExample :heading-level="3"
        id="spinner-example"
        title="단독 표시"
        description="스피너를 단독으로 쓸 때는 label로 진행 상태의 이름을 지정합니다."
        :source="spinnerSource"
      >
        <SpinnerExample />
      </PlaygroundExample>
    </PlaygroundExampleSection>
    <PlaygroundExampleSection id="examples" title="동작별 예제">
      <PlaygroundExample :heading-level="3"
        id="spinner-status"
        title="상태 메시지와 함께 표시"
        description="텍스트가 상태를 알릴 때는 메시지에 status 역할을 지정합니다."
        :source="statusSource"
      >
        <SpinnerStatusExample />
      </PlaygroundExample>
      <PlaygroundExample id="spinner-async" title="영역의 로딩 상태"
        description="새로 고침을 누르면 작업 중에만 스피너가 표시되고 완료 메시지가 나타납니다." :source="SpinnerAsyncExampleSource" :heading-level="3">
        <SpinnerAsyncExample />
      </PlaygroundExample>
    </PlaygroundExampleSection>
    <PlaygroundExampleSection id="appearance" title="모양">
      <PlaygroundExample :heading-level="3"
        id="spinner-wave"
        title="웨이브"
        description="variant를 wave로 지정하면 버튼에 쓰이는 막대형 로딩 표시를 사용할 수 있습니다."
        :source="waveSource"
      >
        <SpinnerWaveExample />
      </PlaygroundExample>
      <PlaygroundExample :heading-level="3"
        id="spinner-arc"
        title="원호형"
        description="목록이나 표를 그대로 보여주면서 데이터를 다시 불러올 때 사용할 수 있습니다."
        :source="arcSource"
      >
        <SpinnerArcExample />
      </PlaygroundExample>
    </PlaygroundExampleSection>
  </div>
</template>
