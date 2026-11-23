<script setup lang="ts">
import { UIButton } from "@connextable/ui";
import { onScopeDispose, ref } from "vue";
import source from "./ButtonPendingExample.vue?example-code&raw";

const pending = ref(false);
const completed = ref(0);
let timer: ReturnType<typeof setTimeout> | undefined;

function save() {
  pending.value = true;
  timer = setTimeout(() => {
    completed.value++;
    pending.value = false;
  }, 1200);
}

onScopeDispose(() => clearTimeout(timer));
</script>

<template>
  <PlaygroundExample
    id="button-pending"
    title="요청 중 중복 실행 방지"
    description="저장을 연속으로 눌러 요청이 한 번만 처리되는지 확인하세요."
    :source="source"
  >
    <UIButton :loading="pending" @click="save">저장</UIButton>
    <template #footer>
      <output>완료된 요청 {{ completed }}건</output>
    </template>
  </PlaygroundExample>
</template>
