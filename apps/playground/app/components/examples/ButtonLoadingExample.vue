<script setup lang="ts">
import { UIButton, UISwitch } from "@connextable/ui";
import { Check } from "@lucide/vue";
import { ref } from "vue";
import source from "./ButtonLoadingExample.vue?example-code&raw";

const loading = ref(true);
const clicks = ref(0);
</script>

<template>
  <PlaygroundExample
    id="button-loading"
    title="로딩 표시"
    description="loading을 켜면 스피너를 표시하고 버튼의 실행을 막습니다. 상태를 바꿔 실행 횟수를 확인하세요."
    :source="source"
    :heading-level="3"
  >
    <template #header>
      <UISwitch v-model="loading" label="로딩 상태" size="sm" />
    </template>
    <UIButton :loading="loading" @click="clicks++">
      <template #leading><Check /></template>
      실행
    </UIButton>
    <template #footer>
      <output>실행 {{ clicks }}회</output>
    </template>
  </PlaygroundExample>
</template>
