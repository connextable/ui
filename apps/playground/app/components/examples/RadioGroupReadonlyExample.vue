<script setup lang="ts">
import { UIRadioGroup } from "@connextable/ui";
import { ref } from "vue";
const options = [
  { value: "internal", label: "내부 공개" },
  { value: "public", label: "전체 공개" },
];

const selected = ref("internal");
</script>

<template>
  <UIRadioGroup :options="options" label="공개 범위" v-model="selected" readonly />
</template>
