<script setup lang="ts">
import { UITimePicker, UITimePickerColumn, UITimePickerContent, UITimePickerPortal, UITimePickerInput, UITimePickerItem, UITimePickerTrigger } from "@connextable/ui";
import { Clock } from "@lucide/vue";
import { ref } from "vue";

const time = ref({ hour: 9, minute: 30, second: 0, millisecond: 0 });

</script>

<template>
  <UITimePicker label="시간 선택" precision="minute" v-model="time">
    <UITimePickerInput label="시작 시간" />
    <UITimePickerTrigger aria-label="시간 선택 열기"><Clock aria-hidden="true" /></UITimePickerTrigger>
    <UITimePickerPortal>
      <UITimePickerContent v-slot="{ columns }">
        <UITimePickerColumn v-for="column in columns" :key="column.part" :part="column.part">
          <UITimePickerItem v-for="choice in column.choices" :key="choice.id" :value="choice.id">
            {{ choice.label }}
          </UITimePickerItem>
        </UITimePickerColumn>
      </UITimePickerContent>
    </UITimePickerPortal>
  </UITimePicker>
</template>
