<script setup lang="ts">
import { UIButton, UIDateField, UIFormActions, UITemporalProvider, UITimeField } from "@connextable/ui";
import { ref } from "vue";

const locales = [
  { value: "ko-KR-u-hc-h23", label: "한국어 (24시간제)" },
  { value: "en-US-u-hc-h12", label: "미국 영어 (12시간제)" },
] as const;
const locale = ref<string>(locales[0].value);
const date = ref({ year: 2026, month: 8, day: 22 });
const time = ref({ hour: 17, minute: 30, second: 0, millisecond: 0 });
</script>

<template>
  <div class="ui-field">
    <UIFormActions>
      <UIButton
        v-for="option in locales"
        :key="option.value"
        :variant="locale === option.value ? 'solid' : 'outline'"
        size="sm"
        :aria-pressed="locale === option.value"
        @click="locale = option.value"
      >
        {{ option.label }}
      </UIButton>
    </UIFormActions>
    <UITemporalProvider :formatting="{ locale }">
      <div class="locale-example__row">
        <UIDateField v-model="date" label="예약 날짜" />
        <UITimeField v-model="time" label="예약 시간" />
      </div>
    </UITemporalProvider>
  </div>
</template>

<style scoped>
.locale-example__row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--ui-space-sm);
}
</style>
