<script setup lang="ts">
import {
  UIButton, UIDateField, UIDateTimeField, UIForm, UIFormActions, UIFormField, UIFormSubmit,
  UITemporalProvider, UITimeField, type UITemporalInputFormats,
} from "@connextable/ui";
import { ref } from "vue";

const inputFormats: UITemporalInputFormats = {
  date: { order: ["day", "month", "year"], separator: "/" },
  time: { hourCycle: "h12", separator: ".", dayPeriods: ["오전", "오후"] },
  dateTime: { order: ["time", "date"], separator: " · " },
};
const custom = ref(true);
const date = ref({ year: 2026, month: 8, day: 22 });
const time = ref({ hour: 17, minute: 30, second: 0, millisecond: 0 });
const dateTime = ref({ date: date.value, time: time.value });
const submitted = ref("");
</script>

<template>
  <UITemporalProvider :input-formats="custom ? inputFormats : undefined">
    <UIForm @submit="({ formData }) => { submitted = String(formData.get('appointment') ?? '') }">
      <UIFormField label="방문 날짜">
        <UIDateField v-model="date" />
      </UIFormField>
      <UIFormField label="알림 시간">
        <UITimeField v-model="time" />
      </UIFormField>
      <UIFormField label="예약 일시" name="appointment" required>
        <UIDateTimeField v-model="dateTime" />
      </UIFormField>
      <UIFormActions>
        <UIButton variant="outline" :aria-pressed="custom" @click="custom = !custom">사용자 지정 서식</UIButton>
        <UIFormSubmit>예약 일시 제출</UIFormSubmit>
      </UIFormActions>
      <template #output>{{ submitted }}</template>
    </UIForm>
  </UITemporalProvider>
</template>
