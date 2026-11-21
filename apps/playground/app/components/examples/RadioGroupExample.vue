<script setup lang="ts">
import { UIRadioGroup } from "@connextable/ui";
import { ref } from "vue";

const options = [
  { value: "compact", label: "간결하게" },
  { value: "comfortable", label: "여유 있게" },
];
const density = ref("compact");
</script>

<template>
  <UIRadioGroup v-model="density" label="화면 밀도" :options="options" />
</template>
