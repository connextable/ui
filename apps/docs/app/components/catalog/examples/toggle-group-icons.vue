<script setup lang="ts">
import { UIToggleGroup } from "@connextable/ui";
import { AlignCenter, AlignLeft, AlignRight } from "@lucide/vue";
import { ref } from "vue";

const options = [
  { value: "left", label: "왼쪽", icon: AlignLeft },
  { value: "center", label: "가운데", icon: AlignCenter },
  { value: "right", label: "오른쪽", icon: AlignRight },
];
const alignment = ref(["left"]);
</script>

<template>
  <UIToggleGroup v-model="alignment" :options="options" label="텍스트 정렬" />
</template>
