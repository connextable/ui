<script setup lang="ts">
import ProgressCountExample from "~/components/examples/ProgressCountExample.vue";
import ProgressCountExampleSource from "~/components/examples/ProgressCountExample.vue?example-code&raw";
import ProgressValueExample from "~/components/examples/ProgressValueExample.vue";
import ProgressValueExampleSource from "~/components/examples/ProgressValueExample.vue?example-code&raw";
import ProgressExample from "~/components/examples/ProgressExample.vue";
import ProgressIndeterminateExample from "~/components/examples/ProgressIndeterminateExample.vue";
import indeterminateSource from "~/components/examples/ProgressIndeterminateExample.vue?example-code&raw";

definePageMeta({
  title: "UIProgress",
  category: "상태 표시",
  description: "전체 항목 중 완료된 비율을 진행 바로 표시합니다.",
  componentParts: ["UIProgressTrack", "UIProgressIndicator", "UIProgressValueText"],
});
</script>

<template>
  <div style="--playground-preview-inline-size: 20rem">
    <PlaygroundExampleSection id="usage" title="기본 사용법">
      <ProgressExample />
    </PlaygroundExampleSection>
    <PlaygroundExampleSection id="examples" title="진행 상태와 값 표시">
      <PlaygroundExample :heading-level="3"
        id="progress-indeterminate"
        title="진행률을 알 수 없는 상태"
        description="value가 null이면 완료 비율이 정해지지 않은 작업으로 표시합니다."
        :source="indeterminateSource"
      >
        <ProgressIndeterminateExample />
      </PlaygroundExample>
      <PlaygroundExample id="progress-max" title="전체 항목 수 지정"
        description="전체 항목 수를 max로 넘기면 완료 수에 맞춰 채움이 바뀝니다." :source="ProgressCountExampleSource" :heading-level="3">
        <ProgressCountExample />
      </PlaygroundExample>
      <PlaygroundExample id="progress-value" title="값 텍스트 표시"
        description="value 슬롯으로 진행 바 위에 단위와 문맥을 함께 표시합니다." :source="ProgressValueExampleSource" :heading-level="3">
        <ProgressValueExample />
      </PlaygroundExample>
    </PlaygroundExampleSection>
    <PlaygroundParts :parts="['UIProgressTrack', 'UIProgressIndicator', 'UIProgressValueText']" />
  </div>
</template>
