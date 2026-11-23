<script setup lang="ts">
import {
  UITimeRangeField,
  UITimeRangeFieldStartInput,
  UITimeRangeFieldEndInput,
  UIForm,
  UIFormActions,
  UIFormFieldGroup,
  UIFormSubmit,
  type UIFormSubmitEvent,
} from "@connextable/ui";
import { computed, ref } from "vue";

type Range = NonNullable<InstanceType<typeof UITimeRangeField>["$props"]["modelValue"]>;
const initialRange: Range = {
  start: { hour: 9, minute: 0, second: 0, millisecond: 0 },
  end: { hour: 17, minute: 30, second: 0, millisecond: 0 },
};
const range = ref<Range | null>(initialRange);
const fieldValues = computed({
  get: () => range.value ?? initialRange,
  set: (value: Range) => { range.value = value; },
});
const submitted = ref("");

function submit({ values }: UIFormSubmitEvent<{ period?: { start?: string; end?: string } }>) {
  const { start, end } = values.period ?? {};
  submitted.value = start && end ? `${start} ~ ${end}` : "";
}
</script>

<template>
  <UIForm @submit="submit">
    <UIFormFieldGroup v-model="fieldValues" label="알림 운영 시간" name="period" v-slot="{ field }">
      <UITimeRangeField v-model="range" precision="minute" start-label="시작" end-label="종료">
        <UITimeRangeFieldStartInput :name="field('start').name" />
        <UITimeRangeFieldEndInput :name="field('end').name" />
      </UITimeRangeField>
    </UIFormFieldGroup>
    <UIFormActions><UIFormSubmit>제출</UIFormSubmit></UIFormActions>
    <template #output><span v-if="submitted">제출한 범위 {{ submitted }}</span></template>
  </UIForm>
</template>
