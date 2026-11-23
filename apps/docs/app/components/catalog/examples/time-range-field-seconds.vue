<script setup lang="ts">
import {
  UITimeRangeField,
  UITimeRangeFieldEndInput,
  UITimeRangeFieldStartInput,
} from "@connextable/ui";

import { ref } from 'vue'
const hours = ref({
  start: { hour: 9, minute: 30, second: 0, millisecond: 0 },
  end: { hour: 17, minute: 45, second: 0, millisecond: 0 },
})
</script>

<template>
  <UITimeRangeField precision="second" v-model="hours" aria-label="운영 시간" start-label="개장 시각" end-label="마감 시각">
    <UITimeRangeFieldStartInput name="opens" />
    <UITimeRangeFieldEndInput name="closes" />
  </UITimeRangeField>
</template>
