<script setup lang="ts">
import {
  UIDateTimeRangeField,
  UIDateTimeRangeFieldStartInput,
  UIDateTimeRangeFieldEndInput,
  UIForm,
  UIFormActions,
  UIFormFieldGroup,
  UIFormSubmit,
} from "@connextable/ui";
import { computed, ref } from "vue";

type Range = NonNullable<InstanceType<typeof UIDateTimeRangeField>["$props"]["modelValue"]>;
const initialRange: Range = {
  start: { date: { year: 2026, month: 8, day: 22 }, time: { hour: 9, minute: 0, second: 0, millisecond: 0 } },
  end: { date: { year: 2026, month: 8, day: 22 }, time: { hour: 18, minute: 0, second: 0, millisecond: 0 } },
};
const range = ref<Range | null>(initialRange);
const fieldValues = computed({
  get: () => range.value ?? initialRange,
  set: (value: Range) => { range.value = value; },
});
const submitted = ref("");
</script>

<template>
  <UIForm @submit="({ formData }) => { submitted = Array.from(formData.values()).map(String).join(' ~ ') }">
    <UIFormFieldGroup v-model="fieldValues" label="예약 기간" name="period" v-slot="{ field }">
      <UIDateTimeRangeField v-model="range" precision="minute" start-label="시작" end-label="종료">
        <UIDateTimeRangeFieldStartInput :name="field('start').name" />
        <UIDateTimeRangeFieldEndInput :name="field('end').name" />
      </UIDateTimeRangeField>
    </UIFormFieldGroup>
    <UIFormActions><UIFormSubmit>제출</UIFormSubmit></UIFormActions>
    <template #output><span v-if="submitted">제출한 범위 {{ submitted }}</span></template>
  </UIForm>
</template>
