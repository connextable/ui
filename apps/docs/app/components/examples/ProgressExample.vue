<script setup lang="ts">
import { UIButton, UIProgress } from "@connextable/ui";
import { computed, ref } from "vue";
import { vueExampleCode } from "~/utils/vue-example-code";

const progress = ref(25);
const code = computed(() => vueExampleCode("UIProgress", {
  script: ['import { UIProgress } from "@connextable/ui";'],
  attributes: { label: "검사 진행률", value: progress.value, showValue: true },
}));
</script>

<template>
  <PlaygroundExample
    id="progress-example"
    title="검사 진행률"
    description="value에 현재 진행률을 전달합니다. 단계를 완료할 때마다 진행 바가 채워집니다."
    :code="code"
    wide
  >
    <template #header>
      <UIButton size="sm" :disabled="progress === 100" @click="progress += 25">검사 한 단계 완료</UIButton>
    </template>
    <UIProgress label="검사 진행률" :value="progress" show-value />
  </PlaygroundExample>
</template>
