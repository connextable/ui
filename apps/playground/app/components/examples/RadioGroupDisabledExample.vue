<script setup lang="ts">
import { UIRadioGroup } from "@connextable/ui";

const options = [
  { value: "compact", label: "간결하게" },
  { value: "automatic", label: "시스템 설정 사용", disabled: true },
  { value: "comfortable", label: "여유 있게" },
];
</script>

<template>
  <UIRadioGroup label="화면 밀도" :options="options" default-value="compact" />
</template>
