<script setup lang="ts">
import { UITimePicker } from "@connextable/ui";

const initial = { hour: 9, minute: 30, second: 0, millisecond: 0 };
</script>

<template>
  <UITimePicker label="시간 선택" :default-value="initial" />
</template>
