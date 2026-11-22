<script setup lang="ts">
import { UITimePicker, UITimePickerColumn, UITimePickerContent, UITimePickerInput, UITimePickerItem, UITimePickerTrigger } from "@connextable/ui";
import { Clock } from "@lucide/vue";

</script>

<template>
  <UITimePicker label="시간 선택" precision="second" :default-value="{ hour: 9, minute: 30, second: 0, millisecond: 0 }">
    <UITimePickerInput label="시작 시간" />
    <UITimePickerTrigger aria-label="시간 선택 열기"><Clock :size="16" aria-hidden="true" /></UITimePickerTrigger>
    <UITimePickerContent v-slot="{ columns }">
      <UITimePickerColumn v-for="column in columns" :key="column.part" :part="column.part">
        <UITimePickerItem v-for="choice in column.choices" :key="choice.id" :value="choice.id">
          {{ choice.label }}
        </UITimePickerItem>
      </UITimePickerColumn>
    </UITimePickerContent>
  </UITimePicker>
</template>
