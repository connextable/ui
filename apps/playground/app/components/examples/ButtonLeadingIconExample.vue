<script setup lang="ts">
import { UIButton } from "@connextable/ui";
import { Plus } from "@lucide/vue";
import { ref } from "vue";
import source from "./ButtonLeadingIconExample.vue?example-code&raw";

const drafts = ref(0);
</script>

<template>
  <PlaygroundExample
    id="button-leading-icon"
    title="앞쪽 아이콘"
    description="leading 슬롯에 버튼 텍스트 앞에 둘 아이콘을 넣습니다."
    :source="source"
    :heading-level="3"
  >
    <UIButton @click="drafts++">
      <template #leading><Plus /></template>
      초안 추가
    </UIButton>
    <template #footer>
      <output>초안 {{ drafts }}개</output>
    </template>
  </PlaygroundExample>
</template>
