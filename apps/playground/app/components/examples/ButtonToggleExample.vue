<script setup lang="ts">
import { UIToggleButton } from "@connextable/ui";
import { ref } from "vue";
import source from "./ButtonToggleExample.vue?example-code&raw";

const pinned = ref(false);
</script>

<template>
  <PlaygroundExample
    id="UIToggleButton"
    title="UIToggleButton"
    description="v-model로 켜짐 상태를 연결하면 aria-pressed가 함께 바뀝니다."
    :source="source"
    :heading-level="3"
  >
    <UIToggleButton v-model="pinned" variant="outline">상단에 고정</UIToggleButton>
  </PlaygroundExample>
</template>
