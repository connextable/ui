<script setup lang="ts">
import { ChevronDown, ChevronLeft, ChevronRight } from "@lucide/vue";
import { provideFormBoundary } from "@sectile/vue/form-boundary";
import {
  YearPickerRoot,
  YearPickerCell,
  YearPickerContent,
  YearPickerGrid,
  YearPickerNextPage,
  YearPickerPreviousPage,
  YearPickerTrigger,
} from "@sectile/vue/temporal/year-picker";
import type { DateValue } from "@sectile/temporal/date-field";
import { computed, nextTick, ref, useTemplateRef, watch } from "vue";
import { useUITemporalDisplay } from "./temporal-display";

const { view, choosingMonth = false, yearFirst = false, min, max, labels } = defineProps<{
  view: { year: number; month: number };
  choosingMonth?: boolean;
  yearFirst?: boolean;
  disabled?: boolean;
  min?: DateValue;
  max?: DateValue;
  labels?: { selectYear?: string; previousYears?: string; nextYears?: string };
}>();

const emit = defineEmits<{ "select-year": [year: number] }>();
provideFormBoundary();
const display = useUITemporalDisplay();
const selectYearLabel = computed(() => labels?.selectYear ?? (display.locale.value.startsWith("ko") ? "연도 선택" : "Select year"));
const previousYearsLabel = computed(() => labels?.previousYears ?? (display.locale.value.startsWith("ko") ? "이전 연도 목록" : "Previous years"));
const nextYearsLabel = computed(() => labels?.nextYears ?? (display.locale.value.startsWith("ko") ? "다음 연도 목록" : "Next years"));
const currentYear = computed(() => ({ year: view.year, month: 1, day: 1 }));
const yearPolicies = computed(() => ({
  min: min && { year: min.year, month: 1, day: 1 },
  max: max && { year: max.year, month: 1, day: 1 },
}));
const highlightedYear = ref(currentYear.value);
const yearOpen = ref(choosingMonth && yearFirst);
const period = useTemplateRef<HTMLElement>("period");
watch(currentYear, (year) => { highlightedYear.value = year; });
watch(() => choosingMonth, (next) => { yearOpen.value = next && yearFirst; });
watch([yearOpen, () => choosingMonth], async ([showYears], _, onCleanup) => {
  let cancelled = false;
  onCleanup(() => { cancelled = true; });
  // Sectile assigns the grid's tab stop after the newly rendered cells register.
  await nextTick();
  if (cancelled) return;
  const selector = showYears ? ".ui-calendar-period-header__years [data-part='grid']" : ":scope > [data-part='grid']";
  const grid = period.value?.querySelector<HTMLElement>(selector);
  const cell = grid?.querySelector<HTMLElement>("[role='gridcell'][tabindex='0']");
  (cell ?? grid)?.focus({ preventScroll: true });
}, { flush: "post" });
</script>

<template>
  <div ref="period" class="ui-calendar-period" :data-year-first="yearFirst || undefined" :data-year-open="yearOpen || undefined">
    <header class="ui-calendar-period-header">
      <slot name="previous" />
      <slot v-if="!choosingMonth">
        <strong>{{ display.yearMonth(view) }}</strong>
      </slot>
      <YearPickerRoot
        v-model:open="yearOpen"
        :model-value="currentYear"
        v-model:highlighted-value="highlightedYear"
        :policies="yearPolicies"
        :disabled="disabled"
        :position="false"
        :label="selectYearLabel"
        v-slot="{ years }"
        @update:model-value="value => { if (value) emit('select-year', value.year) }"
      >
        <YearPickerTrigger v-show="choosingMonth" class="ui-calendar-period-header__year" :aria-label="`${display.year(view)}, ${selectYearLabel}`">
          {{ display.year(view) }} <ChevronDown :size="14" aria-hidden="true" />
        </YearPickerTrigger>
        <YearPickerContent class="ui-calendar-period-header__years" :aria-label="selectYearLabel">
          <header>
            <YearPickerPreviousPage :aria-label="previousYearsLabel"><ChevronLeft :size="16" aria-hidden="true" /></YearPickerPreviousPage>
            <strong>{{ display.yearRange(years[0]?.[0], years.at(-1)?.at(-1)) }}</strong>
            <YearPickerNextPage :aria-label="nextYearsLabel"><ChevronRight :size="16" aria-hidden="true" /></YearPickerNextPage>
          </header>
          <YearPickerGrid>
            <YearPickerCell v-for="year in years.flat()" :key="year.year" :value="year">
              {{ display.year(year) }}
            </YearPickerCell>
          </YearPickerGrid>
        </YearPickerContent>
      </YearPickerRoot>
      <slot name="next" />
    </header>
    <slot name="grid" />
  </div>
</template>

<style scoped>
.ui-calendar-period {
  --ui-calendar-cell-height: var(--ui-control-height-small);
  --ui-calendar-grid-gap: var(--ui-space-2xs);
  --ui-calendar-period-gap: var(--ui-space-sm);
  --ui-calendar-period-body: calc(5 * var(--ui-calendar-cell-height) + 3 * var(--ui-calendar-grid-gap) + var(--ui-calendar-period-gap));

  display: grid;
  align-content: start;
  gap: var(--ui-calendar-period-gap);
  min-inline-size: 0;
  min-block-size: calc(var(--ui-calendar-cell-height) + var(--ui-calendar-period-gap) + var(--ui-calendar-period-body));
}

.ui-calendar-period[data-year-first] {
  --ui-calendar-period-body: calc(6 * var(--ui-calendar-cell-height) + 5 * var(--ui-calendar-grid-gap));
}

@supports (inline-size: 1cqi) {
  .ui-calendar-period[data-year-first] {
    --ui-calendar-day-column-gap: var(--ui-calendar-grid-gap);
    container-type: inline-size;
  }

  .ui-calendar-period[data-year-first]:has(> :is([data-scope="range-calendar"], [data-scope="date-range"], [data-scope="date-time-range"])[data-part="grid"]) {
    --ui-calendar-day-column-gap: 0px;
  }

  .ui-calendar-period[data-year-first] > .ui-calendar-period-header,
  .ui-calendar-period[data-year-first] > :slotted([data-part="grid"]) {
    --ui-calendar-day-size: max(var(--ui-calendar-cell-height), calc((100cqi - 6 * var(--ui-calendar-day-column-gap)) / 7));
    --ui-calendar-period-body: calc(6 * var(--ui-calendar-day-size) + 5 * var(--ui-calendar-grid-gap));
  }
}

.ui-calendar-period-header {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  grid-auto-rows: minmax(var(--ui-calendar-cell-height), auto);
  align-items: center;
  gap: var(--ui-calendar-period-gap) var(--ui-space-xs);
  text-align: center;
}

.ui-calendar-period-header__year {
  border-color: transparent;
}

.ui-calendar-period-header__years {
  grid-column: 1 / -1;
  grid-row: 2;
  grid-template-rows: var(--ui-calendar-cell-height) minmax(0, 1fr);
  inline-size: 100%;
  min-block-size: var(--ui-calendar-period-body);
  max-block-size: none;
  padding: 0;
  border: 0;
  box-shadow: none;
  opacity: 1;
  translate: none;
  transition: none;
}

.ui-calendar-period > :slotted([data-part="grid"]),
.ui-calendar-period-header__years > :deep([data-part="grid"]) {
  grid-auto-rows: minmax(var(--ui-calendar-cell-height), 1fr);
}

.ui-calendar-period > :slotted([data-part="grid"]) {
  min-block-size: var(--ui-calendar-period-body);
}

.ui-calendar-period[data-view="week"],
.ui-calendar-period[data-view="week"] > :slotted([data-part="grid"]) {
  min-block-size: 0;
}

.ui-calendar-period[data-year-first] > :slotted([data-part="grid"]:has(> [data-part="cell"])) {
  grid-auto-rows: auto;
  align-content: start;
}

/* Both grids stay registered with their picker. Only the active one takes up space. */
.ui-calendar-period[data-year-open] > :slotted([data-part="grid"]),
.ui-calendar-period:not([data-year-open]) .ui-calendar-period-header__years {
  display: none;
}

.ui-calendar-period[data-year-open] .ui-calendar-period-header > :slotted([data-part^="previous-"]),
.ui-calendar-period[data-year-open] .ui-calendar-period-header > :slotted([data-part^="next-"]) {
  visibility: hidden;
}
</style>
