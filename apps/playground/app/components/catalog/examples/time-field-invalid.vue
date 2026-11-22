<script setup lang="ts">
import { UITimeField, useUITemporalDisplay } from "@connextable/ui";
import { ref } from "vue";

type TimeValue = InstanceType<typeof UITimeField>["$props"]["modelValue"];
const value = ref<TimeValue>({ hour: 14, minute: 30, second: 0, millisecond: 0 });
const display = useUITemporalDisplay();
</script>

<template>
  <div>
    <UITimeField v-model="value" label="발송 시간" precision="minute" />
    <output>{{ value ? `확정 시간 ${display.time(value)}` : "확정한 시간 없음" }}</output>
  </div>
</template>
