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
      return h("span", result?.ok ? result.value : `${date.year}-${date.month}-${date.day}`);
    };
  },
});

const instant = Date.UTC(2026, 7, 22, 2);
</script>

<template>
  <dl class="reference-dates">
    <div v-for="city in [
      { name: '서울', timeZone: 'Asia/Seoul' },
      { name: '뉴욕', timeZone: 'America/New_York' },
    ]" :key="city.timeZone">
      <dt>{{ city.name }}</dt>
      <dd>
        <UITemporalProvider :reference-instant="instant" :formatting="{ locale: 'ko-KR', timeZone: city.timeZone }">
          <ReferenceDate />
        </UITemporalProvider>
      </dd>
    </div>
  </dl>
</template>

<style scoped>
.reference-dates {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--ui-space-md);
  margin: 0;
  font-variant-numeric: tabular-nums;
}

.reference-dates > div {
  display: grid;
  gap: var(--ui-space-xs);
  min-inline-size: 8rem;
  padding: var(--ui-space-sm) var(--ui-space-md);
  border-inline-start: 1px solid var(--ui-color-divider);
}

.reference-dates dt {
  color: var(--ui-color-text-muted);
  font-size: var(--ui-font-size-metadata);
}

.reference-dates dd {
  margin: 0;
  font-weight: 600;
}
</style>
