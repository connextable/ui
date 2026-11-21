<script setup lang="ts">
import {
  UITimePicker,
  UITimePickerColumn,
  UITimePickerContent,
  UITimePickerInput,
  UITimePickerItem,
  UITimePickerTrigger,

} from "@connextable/ui";
import { Clock } from "@lucide/vue";

const labels: Record<string, string> = { hour: "시", minute: "분" };
const initial = { hour: 10, minute: 30, second: 0, millisecond: 0 };
const min = { hour: 9, minute: 0, second: 0, millisecond: 0 };
const max = { hour: 17, minute: 0, second: 0, millisecond: 0 };
</script>

<template>
  <UITimePicker label="시간 선택" :default-value="initial" precision="minute" :policies="{ min, max }">
    <UITimePickerInput label="시작 시간" />
    <UITimePickerTrigger aria-label="시작 시간 선택"><Clock :size="16" aria-hidden="true" /></UITimePickerTrigger>
    <UITimePickerContent v-slot="{ columns }">

      <UITimePickerColumn v-for="column in columns" :key="column.part" :part="column.part" :label="labels[column.part] ?? column.part">
        <UITimePickerItem v-for="choice in column.choices" :key="choice.id" :value="choice.id">{{ choice.label }}</UITimePickerItem>
      </UITimePickerColumn>
    </UITimePickerContent>
  </UITimePicker>
</template>
