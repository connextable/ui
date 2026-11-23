import { CalendarDays, ChevronLeft, ChevronRight } from "@lucide/vue";
import { appendFormFieldPath, encodeFormFieldPath } from "@sectile/form/path";
import { provideFormBoundary } from "@sectile/vue/form-boundary";
import { useTemporalReferenceDate } from "@sectile/vue/temporal/temporal-provider";
import {
  DatePickerCell, DatePickerContent, DatePickerGrid, DatePickerMonthCell,
  DatePickerNextMonth, DatePickerNextWeek, DatePickerNextYear,
  DatePickerPortal, DatePickerPreviousMonth, DatePickerPreviousWeek, DatePickerPreviousYear,
  DatePickerTrigger, DatePickerYearViewTrigger, type DatePickerRootSlotProps,
} from "@sectile/vue/temporal/date-picker";
import { MonthPickerCell } from "@sectile/vue/temporal/month-picker";
import { YearPickerCell, YearPickerNextPage, YearPickerPreviousPage } from "@sectile/vue/temporal/year-picker";
import { compareDateValues, type DateRange, type DateValue } from "@sectile/temporal/date-field";
import type { DateTimeRange, DateTimeValue } from "@sectile/temporal/date-time-field";
import type { TimeFieldPolicies, TimeFieldPrecision, TimeValue } from "@sectile/temporal/time-field";
import { defineComponent, h, shallowRef, type Component, type PropType } from "vue";
import { controlFlag } from "../clear/clearable";
import { definedControlAttrs, inputStateAttrs } from "../control-attrs";
import UIOpeningIcon from "../UIOpeningIcon.vue";
import UICalendarPeriodHeader from "./UICalendarPeriodHeader.vue";
import UIDatePickerValue from "./UIDatePickerValue.vue";
import UIDateRangePickerValue from "./UIDateRangePickerValue.vue";
import UIDateTimeRangePickerValue from "./UIDateTimeRangePickerValue.vue";
import { useTemporalDisplay } from "./temporal-display";

type Value = DateValue | DateRange | DateTimeValue | DateTimeRange | null;
type State = Omit<DatePickerRootSlotProps, "value"> & { value: Value };
type Kind = "day" | "month" | "year" | "date-time" | "date-time-range";

interface CalendarComposition {
  kind?: Kind;
  anchor?: Component;
  content?: Component;
  inputs?: readonly Component[];
  alternateInputs?: readonly [Component] | readonly [Component, Component, Component, Component];
  grid?: Component;
  cell?: Component;
  monthCell?: Component;
  yearCell?: Component;
  timePicker?: Component;
  timeChoices?: Component;
  inlineTime?: "single" | "range";
  summary?: boolean;
}

type CalendarTimeProps = {
  timePrecision?: TimeFieldPrecision;
  timePolicies?: TimeFieldPolicies;
};

export type CalendarTimeModels = CalendarTimeProps & {
  time?: TimeValue | null;
  "onUpdate:time"?: (time: TimeValue | null) => void;
};

export type RangeCalendarTimeModels = CalendarTimeProps & {
  startTime?: TimeValue | null;
  endTime?: TimeValue | null;
  "onUpdate:startTime"?: (time: TimeValue | null) => void;
  "onUpdate:endTime"?: (time: TimeValue | null) => void;
};

export type EditableDatePickerOptions = { editable?: boolean };

export type CalendarFormComponent<Root, Extra = object> = Root extends abstract new (...args: never[]) => infer Instance
  ? Instance extends { $props: infer Props }
    ? new () => Instance & { $props: Props & { name?: string; form?: string } & Extra }
    : Root
  : Root;

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

const CalendarTimeControl = defineComponent({
  inheritAttrs: false,
  props: { picker: { type: [Object, Function] as PropType<Component>, required: true } },
  setup(props, { attrs }) {
    provideFormBoundary();
    return () => h(props.picker, { ...attrs, inline: true });
  },
});

export function withCalendarDefaults<Root extends Component, Extra = object>(root: Root, options: CalendarComposition): CalendarFormComponent<Root, Extra> {
  const { kind = "day", anchor, content = DatePickerContent, inputs = [], alternateInputs, grid = DatePickerGrid, cell = DatePickerCell, monthCell, yearCell, timePicker, timeChoices, inlineTime } = options;
  const range = inputs.length === 2 && kind !== "date-time";
  const metadata = root as Root & { __sectileFormLabelMode?: "for" | "labelledby" };
  return defineComponent({
    inheritAttrs: false,
    __sectileFormLabelMode: metadata.__sectileFormLabelMode,
    props: {
      name: String,
      form: String,
      time: Object as PropType<TimeValue | null>,
      startTime: Object as PropType<TimeValue | null>,
      endTime: Object as PropType<TimeValue | null>,
      timePolicies: Object as PropType<TimeFieldPolicies>,
      timeChoices: { type: Boolean, default: true },
      inputLayout: String as PropType<"split" | "combined" | "summary">,
      portal: Boolean,
      editable: Boolean,
    },
    emits: ["update:highlightedValue", "update:time", "update:startTime", "update:endTime"],
    setup(props, { attrs, slots, emit }) {
      const reference = useTemporalReferenceDate();
      const display = useTemporalDisplay();
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
        const previousButton = () => h(previous[0], { "aria-label": previous[1] }, () => h(ChevronLeft, { "aria-hidden": true }));
        const nextButton = () => h(next[0], { "aria-label": next[1] }, () => h(ChevronRight, { "aria-hidden": true }));
        const cells = () => h(grid, {
          "data-view": choosingYear || kind === "month" ? undefined : state.viewMode,
          "aria-readonly": state.readonly && !state.disabled || undefined,
          "aria-disabled": state.disabled || undefined,
          ...inputStateAttrs(state.disabled, state.readonly),
        }, () =>
          choosingYear ? state.years.flat().map(value => h(yearCell ?? YearPickerCell, { key: value.year, value }, () => display.year(value)))
            : choosingMonth ? state.months.flat().map(value => h(monthCell ?? (kind === "month" ? MonthPickerCell : DatePickerMonthCell), { key: value.month, value }, () => display.month(value)))
            : state.dates.flat().map(value => h(cell, { key: `${value.year}-${value.month}-${value.day}`, value }, () => display.day(value))));

        if (choosingYear) {
          const title = display.yearRange(state.years[0]?.[0], state.years.at(-1)?.at(-1));
          return [h("header", [previousButton(), h("strong", title), nextButton()]), cells()];
        }

        const policies = attrs.policies as { min?: DateValue | DateTimeValue; max?: DateValue | DateTimeValue } | undefined;
        const min = selectedDate(policies?.min);
        const max = selectedDate(policies?.max);
        return h(UICalendarPeriodHeader, {
          class: "ui-temporal-picker__calendar",
          "data-view": week ? "week" : undefined,
          view: state.view, choosingMonth, yearFirst: kind !== "month", disabled: state.disabled, min, max,
          onSelectYear(year: number) {
            const target = { year, month: state.view.month, day: 1 };
            const clamped = min && compareDateValues(target, min) < 0 ? min : max && compareDateValues(target, max) > 0 ? max : target;
            selectHighlight(clamped);
          },
        }, {
          previous: previousButton,
          next: nextButton,
          grid: cells,
          default: () => h(DatePickerYearViewTrigger, { class: "ui-opening-trigger", "aria-label": labels.monthYear }, () => [
            display.yearMonth(state.view), h(UIOpeningIcon),
          ]),
        });
      }

      function inlineClock(state: State, label: string, value: TimeValue | null, update: (value: TimeValue | null) => void, endpoint?: "start" | "end") {
        if (!timePicker) return;
        return h("div", { class: "ui-temporal-picker__time", "data-endpoint": endpoint }, [
          h("span", { class: "ui-field-label", "aria-hidden": true }, label),
          h(CalendarTimeControl, {
            picker: timePicker, label, modelValue: value, disabled: state.disabled, readonly: state.readonly,
            precision: attrs.timePrecision ?? attrs["time-precision"] ?? "minute",
            policies: props.timePolicies, "onUpdate:modelValue": update,
          }),
        ]);
      }

      function renderDefault(state: State) {
        const labels = display.locale.value.startsWith("ko") ? translations.ko : translations.en;
        const groupLabel = kind === "date-time" ? labels.dateTime : kind === "date-time-range" ? labels.dateTimeRange
          : range ? (kind === "day" ? labels.range : `${labels[kind]} ${labels.rangeUnit}`) : labels[kind];
        const triggerLabel = `${String(attrs.label ?? groupLabel)} ${labels.open}`;
        const granularity = kind === "month" || kind === "year" ? kind : "day";
        const combinedDateTime = kind === "date-time" && props.inputLayout === "combined";
        const splitDateTimeRange = kind === "date-time-range" && props.inputLayout === "split";
        const summary = options.summary && !(kind === "date-time-range" ? splitDateTimeRange : props.editable);
        const placeholder = `${groupLabel} ${labels.choose}`;
        function renderInput(input: Component, label: string, path: string[] = []) {
          const name = props.name && path.length ? encodeFormFieldPath(appendFormFieldPath(props.name, path)) : props.name;
          return h(input, {
            ...definedControlAttrs({ name, form: props.form }),
            hidden: summary || !anchor || undefined,
            "aria-label": label,
          });
        }
        function renderPickerInputs() {
          if (combinedDateTime && alternateInputs?.[0]) return renderInput(alternateInputs[0], groupLabel);
          if (splitDateTimeRange && alternateInputs?.length === 4) {
            const [startDate, startTime, endDate, endTime] = alternateInputs;
            const group = (endpoint: "start" | "end", date: Component, time: Component) =>
              h("div", { role: "group", "aria-label": `${labels[endpoint]} ${labels.dateTime}` }, [
                renderInput(date, `${labels[endpoint]} ${labels.day}`, [endpoint, "date"]),
                renderInput(time, `${labels[endpoint]} ${labels.time}`, [endpoint, "time"]),
              ]);
            return [group("start", startDate, startTime), group("end", endDate, endTime)];
          }
          return renderInputs();
        }
        const renderInputs = () => inputs.map((input, index) => {
          const segment = kind === "date-time" ? (index ? "time" : "date") : range ? (index ? "end" : "start") : undefined;
          const label = kind === "date-time" ? (index ? labels.time : labels.day)
            : range ? `${index ? labels.end : labels.start} ${granularity === "day" ? labels.day : labels[granularity]}` : groupLabel;
          return renderInput(input, label, segment ? [segment] : []);
        });
        if (!anchor) {
          const clock = inlineTime === "single" && props.time !== undefined
            ? inlineClock(state, labels.time, props.time, time => emit("update:time", time)) : undefined;
          const start = inlineTime === "range" && props.startTime !== undefined
            ? inlineClock(state, `${labels.start} ${labels.time}`, props.startTime, time => emit("update:startTime", time), "start") : undefined;
          const end = inlineTime === "range" && props.endTime !== undefined
            ? inlineClock(state, `${labels.end} ${labels.time}`, props.endTime, time => emit("update:endTime", time), "end") : undefined;
          return h(content, null, () => [
            ...renderInputs(), calendar(state, labels), clock,
            start || end ? h("div", { class: "ui-calendar-time-range" }, [start, end]) : undefined,
          ]);
        }
        const value = !summary ? undefined : kind === "date-time-range"
          ? h(UIDateTimeRangePickerValue, {
            value: state.value as DateTimeRange | null,
            startPlaceholder: `${labels.start} ${labels.dateTime}`, endPlaceholder: `${labels.end} ${labels.dateTime}`,
          })
          : range ? h(UIDateRangePickerValue, {
            value: state.value as DateRange | null, granularity,
            startPlaceholder: `${labels.start} ${labels[granularity]}`, endPlaceholder: `${labels.end} ${labels[granularity]}`,
          })
            : h(UIDatePickerValue, { value: state.value as DateValue | null, granularity, placeholder });

        const showTimes = timeChoices && props.timeChoices && state.open;
        function renderTime(endpoint?: "start" | "end") {
          if (!showTimes || !timeChoices) return;
          const label = endpoint ? `${labels[endpoint]} ${labels.time}` : labels.time;
          return h("div", { class: "ui-temporal-picker__time", "data-endpoint": endpoint ?? "end" }, [
            h("span", { class: "ui-field-label", "aria-hidden": true }, label),
            h(timeChoices, { label, endpoint, precision: attrs.timePrecision ?? attrs["time-precision"] ?? "minute" }),
          ]);
        }
        const popup = () => h(content, {
          "aria-label": groupLabel,
          class: showTimes ? "ui-temporal-picker__with-time" : undefined,
          "data-time-layout": showTimes ? range ? "range" : "single" : undefined,
        }, () => [range ? renderTime("start") : undefined, calendar(state, labels), renderTime(range ? "end" : undefined)]);
        return [
          h(anchor, inputStateAttrs(state.disabled, state.readonly), () => [
            renderPickerInputs(),
            value,
            h(DatePickerTrigger, { "aria-label": triggerLabel }, () => h(CalendarDays, { "aria-hidden": true })),
          ]),
          props.portal ? h(DatePickerPortal, null, popup) : popup(),
        ];
      }

      return () => {
        if (slots.default || controlFlag(attrs.asChild ?? attrs["as-child"])) {
          return h(root, { ...attrs, ...definedControlAttrs({ name: props.name, form: props.form }), "onUpdate:highlightedValue": selectHighlight }, slots);
        }
        const { "highlighted-value": highlighted, ...bindings } = attrs;
        if (inlineTime) {
          delete bindings.timePrecision;
          delete bindings["time-precision"];
        }
        return h(root, {
          ...bindings,
          highlightedValue: bindings.highlightedValue ?? highlighted ?? highlight.value ??
            bindings.defaultHighlightedValue ?? bindings["default-highlighted-value"] ??
            selectedDate(bindings.modelValue as Value | undefined) ?? bindings.referenceDate ?? bindings["reference-date"] ?? reference.value,
          "onUpdate:highlightedValue": selectHighlight,
        }, { default: renderDefault });
      };
    },
  }) as unknown as CalendarFormComponent<Root, Extra>;
}
