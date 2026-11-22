<script setup lang="ts">
import { UIPinInput } from "@connextable/ui";
import { ref } from "vue";

const complete = ref(false);
const code = ref("");
</script>

<template>
  <PlaygroundExample v-bind="$attrs as { id: string; title: string }">
    <UIPinInput v-model="code" :length="4" @complete="complete = true" @update:model-value="complete = false" label="확인 코드" clearable />
    <template #footer><output>{{ complete ? "확인 코드 입력 완료" : "네 자리를 입력하세요." }}</output></template>
  </PlaygroundExample>
</template>
