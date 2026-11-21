<script setup lang="ts">
import { UIRadioGroup } from "@connextable/ui";
const options = [
  { value: "internal", label: "내부 공개" },
  { value: "public", label: "전체 공개" },
];
</script>

<template>
  <UIRadioGroup :options="options" label="공개 범위" default-value="internal" readonly />
</template>
