<script setup lang="ts">
import {
  UITimeRangeField,
  UITimeRangeFieldStartInput,
  UITimeRangeFieldEndInput,
  UIForm,
  UIFormActions,
  UIFormFieldGroup,
  UIFormSubmit,
} from "@connextable/ui";
import { ref } from "vue";

type Range = NonNullable<InstanceType<typeof UITimeRangeField>["$props"]["modelValue"]>;
const range = ref<Range>({ start: { hour: 9, minute: 0, second: 0, millisecond: 0 }, end: { hour: 17, minute: 30, second: 0, millisecond: 0 } });
const submitted = ref("");
</script>

<template>
  <UIForm @submit="({ formData }) => { submitted = Array.from(formData.values()).map(String).join(' ~ ') }">
    <UIFormFieldGroup v-model="range" label="알림 운영 시간" name="period" v-slot="{ field }">
      <UITimeRangeField precision="minute" :default-value="range" start-label="시작" end-label="종료"
        @update:model-value="value => { if (value) range = value }">
        <UITimeRangeFieldStartInput :name="field('start').name" />
        <UITimeRangeFieldEndInput :name="field('end').name" />
      </UITimeRangeField>
    </UIFormFieldGroup>
    <UIFormActions><UIFormSubmit>제출</UIFormSubmit></UIFormActions>
    <template #output><span v-if="submitted">제출한 범위 {{ submitted }}</span></template>
  </UIForm>
</template>
