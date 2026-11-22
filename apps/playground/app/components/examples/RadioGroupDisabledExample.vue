<script setup lang="ts">
import { UIRadioGroup } from "@connextable/ui";
import { ref } from "vue";

const options = [
  { value: "compact", label: "간결하게" },
  { value: "automatic", label: "시스템 설정 사용", disabled: true },
  { value: "comfortable", label: "여유 있게" },
];

const selected = ref("compact");
</script>

<template>
  <UIRadioGroup label="화면 밀도" :options="options" v-model="selected" />
</template>
