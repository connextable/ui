<script setup lang="ts">
import { UIButton } from "@connextable/ui";
import { ArrowRight } from "@lucide/vue";
import { ref } from "vue";
import source from "./ButtonTrailingIconExample.vue?example-code&raw";

const step = ref(1);
const lastStep = 3;
</script>

<template>
  <PlaygroundExample
    id="button-trailing-icon"
    title="뒤쪽 아이콘"
    description="trailing 슬롯에 버튼 텍스트 뒤에 둘 아이콘을 넣습니다."
    :source="source"
    :heading-level="3"
  >
    <UIButton variant="outline" :disabled="step === lastStep" @click="step++">
      다음 단계
      <template #trailing><ArrowRight /></template>
    </UIButton>
    <template #footer>
      <output>{{ step }} / {{ lastStep }} 단계</output>
    </template>
  </PlaygroundExample>
</template>
