<script setup lang="ts">
import {
  UIDateRangeField,
  UIDateRangeFieldStartInput,
  UIDateRangeFieldEndInput,
  UIForm,
  UIFormActions,
  UIFormFieldGroup,
  UIFormSubmit,
} from "@connextable/ui";
import { computed, ref } from "vue";

type Range = NonNullable<InstanceType<typeof UIDateRangeField>["$props"]["modelValue"]>;
const initialRange: Range = { start: { year: 2026, month: 8, day: 22 }, end: { year: 2026, month: 8, day: 25 } };
const range = ref<Range | null>(initialRange);
const fieldValues = computed({
  get: () => range.value ?? initialRange,
  set: (value: Range) => { range.value = value; },
});
const submitted = ref("");
</script>

<template>
  <UIForm @submit="({ formData }) => { submitted = Array.from(formData.values()).map(String).join(' ~ ') }">
    <UIFormFieldGroup v-model="fieldValues" label="서비스 적용 기간" name="period" v-slot="{ field }">
      <UIDateRangeField v-model="range" start-label="시작" end-label="종료">
        <UIDateRangeFieldStartInput :name="field('start').name" />
        <UIDateRangeFieldEndInput :name="field('end').name" />
      </UIDateRangeField>
    </UIFormFieldGroup>
    <UIFormActions><UIFormSubmit>제출</UIFormSubmit></UIFormActions>
    <template #output><span v-if="submitted">제출한 범위 {{ submitted }}</span></template>
  </UIForm>
</template>
