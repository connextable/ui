<script setup lang="ts">
import ProgressExample from "~/components/examples/ProgressExample.vue";
import source from "~/components/examples/ProgressExample.vue?example-code&raw";

definePageMeta({
  title: "UIProgress",
  category: "상태 표시",
  description: "전체 항목 중 완료된 비율을 진행 바로 표시합니다.",
});
</script>

<template>
  <PlaygroundExample
    id="progress-example"
    title="검사 진행률"
    description="완료 수를 value에, 전체 수를 max에 전달합니다."
    :source="source"
  >
    <ProgressExample />
  </PlaygroundExample>
</template>
