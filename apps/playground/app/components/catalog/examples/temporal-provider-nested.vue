<script setup lang="ts">
import { UITemporalProvider, useUITemporalFormatter, useUITemporalReferenceDate } from "@connextable/ui";
import { defineComponent, h } from "vue";

const ReferenceDate = defineComponent({
  setup() {
    const reference = useUITemporalReferenceDate();
    const formatter = useUITemporalFormatter();
    return () => {
      const date = reference.value;
      const result = formatter.value?.date(date);
      return h("strong", result?.ok ? result.value : `${date.year}-${String(date.month).padStart(2, "0")}-${String(date.day).padStart(2, "0")}`);
    };
  },
});
</script>

<template>
  <div class="ui-field">
    <UITemporalProvider :reference-date="{ year: 2026, month: 8, day: 22 }">
      <span>공통 기준일 <ReferenceDate /></span>
      <UITemporalProvider :reference-date="{ year: 2027, month: 1, day: 10 }">
        <span>안쪽 영역의 기준일 <ReferenceDate /></span>
      </UITemporalProvider>
    </UITemporalProvider>
  </div>
</template>
