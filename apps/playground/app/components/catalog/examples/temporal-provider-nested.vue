<script setup lang="ts">
import { UITemporalProvider, useTemporalDisplay, useTemporalReferenceDate } from "@connextable/ui";
import { defineComponent, h } from "vue";

const ReferenceDate = defineComponent({
  setup() {
    const reference = useTemporalReferenceDate();
    const display = useTemporalDisplay();
    return () => h("strong", display.date(reference.value));
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
