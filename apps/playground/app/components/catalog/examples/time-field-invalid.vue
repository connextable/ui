<script setup lang="ts">
import { UITimeField } from "@connextable/ui";
import { ref } from "vue";

type TimeValue = InstanceType<typeof UITimeField>["$props"]["modelValue"];
const value = ref<TimeValue>({ hour: 14, minute: 30, second: 0, millisecond: 0 });
const pad = (value: number) => String(value).padStart(2, "0");
</script>

<template>
  <div>
    <UITimeField v-model="value" label="발송 시간" precision="minute" />
    <output>{{ value ? `확정 시간 ${pad(value.hour)}:${pad(value.minute)}` : "확정한 시간 없음" }}</output>
  </div>
</template>
