<script setup lang="ts">
import { UIForm, UIFormFieldGroup, UIInput } from "@connextable/ui";
import { computed, ref } from "vue";

const hours = ref("09");
const minutes = ref("30");
const time = computed({
  get: () => ({ hours: hours.value, minutes: minutes.value }),
  set: (next) => {
    hours.value = next.hours;
    minutes.value = next.minutes;
  },
});
</script>

<template>
  <UIForm>
    <UIFormFieldGroup v-model="time" label="시작 시각" name="time" v-slot="{ field }">
      <label>시 <UIInput v-model="hours" :name="field('hours').name" inputmode="numeric" /></label>
      <label>분 <UIInput v-model="minutes" :name="field('minutes').name" inputmode="numeric" /></label>
    </UIFormFieldGroup>
    <template #output>{{ time.hours }}:{{ time.minutes }}</template>
  </UIForm>
</template>
