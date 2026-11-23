<script setup lang="ts">
import { UITimeField, useTemporalDisplay } from "@connextable/ui";
import { ref } from "vue";

type TimeValue = InstanceType<typeof UITimeField>["$props"]["modelValue"];
const value = ref<TimeValue>({ hour: 14, minute: 30, second: 0, millisecond: 0 });
const display = useTemporalDisplay();
</script>

<template>
  <PlaygroundExample v-bind="$attrs as { id: string; title: string }">
    <div>
      <UITimeField v-model="value" label="발송 시간" precision="minute" />
    </div>
    <template #footer>
      <output>{{ value ? `확정 시간 ${display.time(value)}` : "확정한 시간 없음" }}</output>
    </template>
  </PlaygroundExample>
</template>
