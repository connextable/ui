import { CalendarDays, ChevronDown, ChevronLeft, ChevronRight } from "@lucide/vue";
import { useTemporalReferenceDate } from "@sectile/vue/temporal/temporal-provider";
import {
  DatePickerCell, DatePickerContent, DatePickerGrid, DatePickerMonthCell,
  DatePickerNextMonth, DatePickerNextWeek, DatePickerNextYear,
  DatePickerPreviousMonth, DatePickerPreviousWeek, DatePickerPreviousYear,
  DatePickerTrigger, DatePickerYearViewTrigger, type DatePickerRootSlotProps,
} from "@sectile/vue/temporal/date-picker";
import { MonthPickerCell } from "@sectile/vue/temporal/month-picker";
import { YearPickerCell, YearPickerNextPage, YearPickerPreviousPage } from "@sectile/vue/temporal/year-picker";
import { compareDateValues, type DateRange, type DateValue } from "@sectile/temporal/date-field";
import type { DateTimeRange, DateTimeValue } from "@sectile/temporal/date-time-field";
import { applyDateTimeRangePickerEvent, createDateTimeRangePickerState, type DateTimeRangePickerPolicies } from "@sectile/temporal/date-time-range-picker";
import { compareTimeValues, type TimeValue } from "@sectile/temporal/time-field";
import { defineComponent, h, shallowRef, type Component } from "vue";
import { controlFlag } from "../clear/clearable";
import { inputStateAttrs } from "../control-attrs";
import UICalendarPeriodHeader from "./UICalendarPeriodHeader.vue";
import UIDatePickerValue from "./UIDatePickerValue.vue";
import UIDateRangePickerValue from "./UIDateRangePickerValue.vue";
import UIDateTimeRangePickerValue from "./UIDateTimeRangePickerValue.vue";
import { useUITemporalDisplay } from "./temporal-display";

type Value = DateValue | DateRange | DateTimeValue | DateTimeRange | null;
type State = Omit<DatePickerRootSlotProps, "value"> & { value: Value };
type Kind = "day" | "month" | "year" | "date-time" | "date-time-range";

interface CalendarComposition {
  kind?: Kind;
  anchor?: Component;
  inputs?: readonly Component[];
  grid?: Component;
  cell?: Component;
  monthCell?: Component;
  yearCell?: Component;
  timePicker?: Component;
  summary?: boolean;
}

function selectedDate(value: Value | undefined): DateValue | undefined {
  if (!value) return;
  if ("start" in value) return "date" in value.start ? value.start.date : value.start;
  return "date" in value ? value.date : value;
}

const translations = {
  ko: {
    day: "날짜", month: "월", year: "연도", range: "기간", rangeUnit: "범위", dateTime: "일시",
    dateTimeRange: "날짜와 시간 범위", start: "시작", end: "종료", time: "시간",
    choose: "선택", open: "선택 창 열기", monthYear: "연도와 월 선택",
    previousWeek: "이전 주", nextWeek: "다음 주", previousMonth: "이전 달", nextMonth: "다음 달",
    previousYear: "이전 연도", nextYear: "다음 연도", previousPage: "이전 연도 목록", nextPage: "다음 연도 목록",
  },
  en: {
    day: "Date", month: "Month", year: "Year", range: "Date range", rangeUnit: "range", dateTime: "Date and time",
    dateTimeRange: "Date and time range", start: "Start", end: "End", time: "Time",
    choose: "selection", open: "picker", monthYear: "Choose year and month",
    previousWeek: "Previous week", nextWeek: "Next week", previousMonth: "Previous month", nextMonth: "Next month",
    previousYear: "Previous year", nextYear: "Next year", previousPage: "Previous years", nextPage: "Next years",
  },
};

function rangeTimeBounds(range: DateTimeRange, endpoint: "start" | "end", policies?: DateTimeRangePickerPolicies) {
  const date = range[endpoint].date;
  const sameDay = compareDateValues(range.start.date, range.end.date) === 0;
  const limits = endpoint === "start" ? policies?.startTime : policies?.endTime;
  const minimums = [limits?.min, sameDay && endpoint === "end" ? range.start.time : undefined];
  const maximums = [limits?.max, sameDay && endpoint === "start" ? range.end.time : undefined];
  if (policies?.min && compareDateValues(date, policies.min.date) === 0) minimums.push(policies.min.time);
  if (policies?.max && compareDateValues(date, policies.max.date) === 0) maximums.push(policies.max.time);
  const min = minimums.filter((time): time is TimeValue => time !== undefined).sort(compareTimeValues).at(-1);
  const max = maximums.filter((time): time is TimeValue => time !== undefined).sort(compareTimeValues)[0];
  return { min, max };
}

export function withCalendarDefaults<Root extends Component>(root: Root, options: CalendarComposition): Root {
  const { kind = "day", anchor, inputs = [], grid = DatePickerGrid, cell = DatePickerCell, monthCell, yearCell, timePicker } = options;
  const metadata = root as Root & { __sectileFormLabelMode?: "for" | "labelledby" };
  return defineComponent({
    inheritAttrs: false,
    __sectileFormLabelMode: metadata.__sectileFormLabelMode,
    emits: ["update:highlightedValue"],
    setup(_, { attrs, slots, emit }) {
      const reference = useTemporalReferenceDate();
      const display = useUITemporalDisplay();
      const highlight = shallowRef<DateValue>();

      function selectHighlight(value: DateValue) {
        highlight.value = value;
        emit("update:highlightedValue", value);
      }

      function calendar(state: State, labels: typeof translations.en) {
        const choosingYear = kind === "year";
        const choosingMonth = kind === "month" || state.viewMode === "year" && !choosingYear;
        const week = !choosingYear && !choosingMonth && state.viewMode === "week";
        const previous = choosingYear ? [YearPickerPreviousPage, labels.previousPage] as const
          : choosingMonth ? [DatePickerPreviousYear, labels.previousYear] as const
          : week ? [DatePickerPreviousWeek, labels.previousWeek] as const : [DatePickerPreviousMonth, labels.previousMonth] as const;
        const next = choosingYear ? [YearPickerNextPage, labels.nextPage] as const
          : choosingMonth ? [DatePickerNextYear, labels.nextYear] as const
          : week ? [DatePickerNextWeek, labels.nextWeek] as const : [DatePickerNextMonth, labels.nextMonth] as const;
        const previousButton = () => h(previous[0], { "aria-label": previous[1] }, () => h(ChevronLeft, { size: 16, "aria-hidden": true }));
        const nextButton = () => h(next[0], { "aria-label": next[1] }, () => h(ChevronRight, { size: 16, "aria-hidden": true }));
        const cells = () => h(grid, {
          "data-view": choosingYear || kind === "month" ? undefined : state.viewMode,
          "aria-readonly": state.readonly && !state.disabled || undefined,
          "aria-disabled": state.disabled || undefined,
          ...inputStateAttrs(state.disabled, state.readonly),
        }, () =>
          choosingYear ? state.years.flat().map(value => h(yearCell ?? YearPickerCell, { key: value.year, value }, () => display.year(value)))
            : choosingMonth ? state.months.flat().map(value => h(monthCell ?? (kind === "month" ? MonthPickerCell : DatePickerMonthCell), { key: value.month, value }, () => display.month(value)))
            : state.dates.flat().map(value => h(cell, { key: `${value.year}-${value.month}-${value.day}`, value }, () => display.day(value))));

        if (choosingYear || !anchor) {
          const title = choosingYear ? display.yearRange(state.years[0]?.[0], state.years.at(-1)?.at(-1)) : display.yearMonth(state.view);
          return [h("header", [previousButton(), h("strong", title), nextButton()]), cells()];
        }

        return h(UICalendarPeriodHeader, {
          class: "ui-temporal-picker__calendar",
          view: state.view, choosingMonth, yearFirst: kind !== "month",
          onSelectYear: (year: number) => selectHighlight({ year, month: state.view.month, day: 1 }),
        }, {
          previous: previousButton,
          next: nextButton,
          grid: cells,
          default: () => h(DatePickerYearViewTrigger, { "aria-label": labels.monthYear }, () => [
            display.yearMonth(state.view), h(ChevronDown, { size: 14, "aria-hidden": true }),
          ]),
        });
      }

      function renderDefault(state: State) {
        const labels = display.locale.value.startsWith("ko") ? translations.ko : translations.en;
        if (!anchor) return h(DatePickerContent, null, () => calendar(state, labels));

        const range = inputs.length === 2 && kind !== "date-time";
        const groupLabel = kind === "date-time" ? labels.dateTime : kind === "date-time-range" ? labels.dateTimeRange
          : range ? (kind === "day" ? labels.range : `${labels[kind]} ${labels.rangeUnit}`) : labels[kind];
        const triggerLabel = `${String(attrs.label ?? groupLabel)} ${labels.open}`;
        const granularity = kind === "month" || kind === "year" ? kind : "day";
        const placeholder = `${groupLabel} ${labels.choose}`;
        const renderInputs = () => inputs.map((input, index) => h(input, {
          hidden: options.summary || undefined,
          "aria-label": kind === "date-time" ? (index ? labels.time : labels.day) : groupLabel,
        }));
        const value = !options.summary ? undefined : kind === "date-time-range"
          ? h(UIDateTimeRangePickerValue, {
            value: state.value as DateTimeRange | null,
            startPlaceholder: `${labels.start} ${labels.dateTime}`, endPlaceholder: `${labels.end} ${labels.dateTime}`,
          })
          : range ? h(UIDateRangePickerValue, {
            value: state.value as DateRange | null, granularity,
            startPlaceholder: `${labels.start} ${labels[granularity]}`, endPlaceholder: `${labels.end} ${labels[granularity]}`,
          })
            : h(UIDatePickerValue, { value: state.value as DateValue | null, granularity, placeholder });

        const selectedRange = timePicker && state.open ? state.value as DateTimeRange | null : null;
        function renderTime(endpoint: "start" | "end") {
          if (!timePicker || !selectedRange) return;
          const policies = attrs.policies as DateTimeRangePickerPolicies | undefined;
          const label = `${labels[endpoint]} ${labels.time}`;
          return h("div", { class: "ui-temporal-picker__time", "data-endpoint": endpoint }, [
            h("span", { class: "ui-field-label" }, label),
            h(timePicker, {
              label, modelValue: selectedRange[endpoint].time, disabled: state.disabled, readonly: state.readonly,
              precision: attrs.timePrecision ?? attrs["time-precision"] ?? "minute",
              policies: rangeTimeBounds(selectedRange, endpoint, policies),
              "onUpdate:modelValue": (time: TimeValue | null) => {
                if (!time) return;
                const update = attrs["onUpdate:modelValue"] as ((value: DateTimeRange) => void) | undefined;
                const result = applyDateTimeRangePickerEvent(createDateTimeRangePickerState({ value: selectedRange }), {
                  type: endpoint === "start" ? "set-start-time" : "set-end-time", value: time,
                }, policies);
                if (result.ok && result.value.state.value) update?.(result.value.state.value);
              },
            }),
          ]);
        }
        return [
          h(anchor, inputStateAttrs(state.disabled, state.readonly), () => [
            ...renderInputs(),
            value,
            h(DatePickerTrigger, { "aria-label": triggerLabel }, () => h(CalendarDays, { size: 18, "aria-hidden": true })),
          ]),
          h(DatePickerContent, {
            "aria-label": groupLabel,
            class: selectedRange ? "ui-temporal-picker__time-range" : undefined,
          }, () => [renderTime("start"), calendar(state, labels), renderTime("end")]),
        ];
      }

      return () => {
        if (slots.default || controlFlag(attrs.asChild ?? attrs["as-child"])) {
          return h(root, { ...attrs, "onUpdate:highlightedValue": selectHighlight }, slots);
        }
        const { "highlighted-value": highlighted, ...bindings } = attrs;
        return h(root, {
          ...bindings,
          highlightedValue: bindings.highlightedValue ?? highlighted ?? highlight.value ??
            bindings.defaultHighlightedValue ?? bindings["default-highlighted-value"] ??
            selectedDate(bindings.modelValue as Value | undefined) ?? bindings.referenceDate ?? bindings["reference-date"] ?? reference.value,
          "onUpdate:highlightedValue": selectHighlight,
        }, { default: renderDefault });
      };
    },
  }) as unknown as Root;
}
