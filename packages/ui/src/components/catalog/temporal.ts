import { defineComponent, h, mergeProps, nextTick, type Component } from "vue";
import { DateRangePickerStartInput, DateRangePickerEndInput } from "@sectile/vue/temporal/date-range-picker";
import { MonthPickerInput } from "@sectile/vue/temporal/month-picker";
import { MonthRangePickerStartInput, MonthRangePickerEndInput } from "@sectile/vue/temporal/month-range-picker";
import { RangeCalendarRoot } from "@sectile/vue/temporal/range-calendar";
import { TimePickerColumn, type TimePickerColumnProps } from "@sectile/vue/temporal/time-picker";
import { YearPickerInput } from "@sectile/vue/temporal/year-picker";
import { YearRangePickerStartInput, YearRangePickerEndInput } from "@sectile/vue/temporal/year-range-picker";

export { default as UICalendarPeriodHeader } from "./UICalendarPeriodHeader.vue";
export { default as UIDateRangePickerValue } from "./UIDateRangePickerValue.vue";
export { default as UIDateTimeRangePickerValue } from "./UIDateTimeRangePickerValue.vue";

function withPickerPlaceholder<T extends Component>(part: T, placeholder: string): T {
  return defineComponent({
    inheritAttrs: false,
    setup(_, { attrs, slots }) {
      return () => h(part, { placeholder, ...attrs }, slots);
    },
  }) as unknown as T;
}

export const UIDateRangePickerStartInput = withPickerPlaceholder(DateRangePickerStartInput, "시작일");
export const UIDateRangePickerEndInput = withPickerPlaceholder(DateRangePickerEndInput, "종료일");
export const UIMonthPickerInput = withPickerPlaceholder(MonthPickerInput, "월 선택");
export const UIMonthRangePickerStartInput = withPickerPlaceholder(MonthRangePickerStartInput, "시작 월");
export const UIMonthRangePickerEndInput = withPickerPlaceholder(MonthRangePickerEndInput, "종료 월");
export const UIYearPickerInput = withPickerPlaceholder(YearPickerInput, "연도 선택");
export const UIYearRangePickerStartInput = withPickerPlaceholder(YearRangePickerStartInput, "시작 연도");
export const UIYearRangePickerEndInput = withPickerPlaceholder(YearRangePickerEndInput, "종료 연도");

export type { DateValue as UIDateValue } from "@sectile/vue/temporal/calendar";
export {
  TemporalProvider as UITemporalProvider,
  useTemporalReferenceDate as useUITemporalReferenceDate,
  useTemporalFormatter as useUITemporalFormatter,
} from "@sectile/vue/temporal/temporal-provider";

export {
  CalendarRoot as UICalendar,
  CalendarContent as UICalendarContent,
  CalendarGrid as UICalendarGrid,
  CalendarCell as UICalendarCell,
  CalendarMonthCell as UICalendarMonthCell,
  CalendarInput as UICalendarInput,
  CalendarPreviousWeek as UICalendarPreviousWeek,
  CalendarNextWeek as UICalendarNextWeek,
  CalendarPreviousMonth as UICalendarPreviousMonth,
  CalendarNextMonth as UICalendarNextMonth,
  CalendarPreviousYear as UICalendarPreviousYear,
  CalendarNextYear as UICalendarNextYear,
  CalendarWeekViewTrigger as UICalendarWeekViewTrigger,
  CalendarMonthViewTrigger as UICalendarMonthViewTrigger,
  CalendarYearViewTrigger as UICalendarYearViewTrigger,
} from "@sectile/vue/temporal/calendar";
export {
  RangeCalendarContent as UIRangeCalendarContent,
  RangeCalendarGrid as UIRangeCalendarGrid,
  RangeCalendarCell as UIRangeCalendarCell,
  RangeCalendarMonthCell as UIRangeCalendarMonthCell,
  RangeCalendarStartInput as UIRangeCalendarStartInput,
  RangeCalendarEndInput as UIRangeCalendarEndInput,
  RangeCalendarPreviousWeek as UIRangeCalendarPreviousWeek,
  RangeCalendarNextWeek as UIRangeCalendarNextWeek,
  RangeCalendarPreviousMonth as UIRangeCalendarPreviousMonth,
  RangeCalendarNextMonth as UIRangeCalendarNextMonth,
  RangeCalendarPreviousYear as UIRangeCalendarPreviousYear,
  RangeCalendarNextYear as UIRangeCalendarNextYear,
  RangeCalendarWeekViewTrigger as UIRangeCalendarWeekViewTrigger,
  RangeCalendarMonthViewTrigger as UIRangeCalendarMonthViewTrigger,
  RangeCalendarYearViewTrigger as UIRangeCalendarYearViewTrigger,
} from "@sectile/vue/temporal/range-calendar";

// Sectile's range calendar shares the date range picker's positioning options.
// Keep inline content in flow by default, including after hydration.
export const UIRangeCalendar = defineComponent({
  name: "UIRangeCalendar",
  inheritAttrs: false,
  __sectileFormLabelMode: "labelledby",
  setup(_, { attrs, slots }) {
    return () => h(RangeCalendarRoot, { position: false, ...attrs }, slots);
  },
}) as typeof RangeCalendarRoot;
export {
  DateField as UIDateField,
} from "@sectile/vue/temporal/date-field";
export {
  DateRangeFieldRoot as UIDateRangeField,
  DateRangeFieldStartInput as UIDateRangeFieldStartInput,
  DateRangeFieldEndInput as UIDateRangeFieldEndInput,
} from "@sectile/vue/temporal/date-range-field";
export {
  DatePickerRoot as UIDatePicker,
  DatePickerTrigger as UIDatePickerTrigger,
  DatePickerAnchor as UIDatePickerAnchor,
  DatePickerPortal as UIDatePickerPortal,
  DatePickerContent as UIDatePickerContent,
  DatePickerGrid as UIDatePickerGrid,
  DatePickerCell as UIDatePickerCell,
  DatePickerMonthCell as UIDatePickerMonthCell,
  DatePickerInput as UIDatePickerInput,
  DatePickerPreviousWeek as UIDatePickerPreviousWeek,
  DatePickerNextWeek as UIDatePickerNextWeek,
  DatePickerPreviousMonth as UIDatePickerPreviousMonth,
  DatePickerNextMonth as UIDatePickerNextMonth,
  DatePickerPreviousYear as UIDatePickerPreviousYear,
  DatePickerNextYear as UIDatePickerNextYear,
  DatePickerWeekViewTrigger as UIDatePickerWeekViewTrigger,
  DatePickerMonthViewTrigger as UIDatePickerMonthViewTrigger,
  DatePickerYearViewTrigger as UIDatePickerYearViewTrigger,
} from "@sectile/vue/temporal/date-picker";
export {
  DateRangePickerRoot as UIDateRangePicker,
  DateRangePickerTrigger as UIDateRangePickerTrigger,
  DateRangePickerAnchor as UIDateRangePickerAnchor,
  DateRangePickerPortal as UIDateRangePickerPortal,
  DateRangePickerContent as UIDateRangePickerContent,
  DateRangePickerGrid as UIDateRangePickerGrid,
  DateRangePickerCell as UIDateRangePickerCell,
  DateRangePickerMonthCell as UIDateRangePickerMonthCell,
  DateRangePickerPreviousWeek as UIDateRangePickerPreviousWeek,
  DateRangePickerNextWeek as UIDateRangePickerNextWeek,
  DateRangePickerPreviousMonth as UIDateRangePickerPreviousMonth,
  DateRangePickerNextMonth as UIDateRangePickerNextMonth,
  DateRangePickerPreviousYear as UIDateRangePickerPreviousYear,
  DateRangePickerNextYear as UIDateRangePickerNextYear,
  DateRangePickerWeekViewTrigger as UIDateRangePickerWeekViewTrigger,
  DateRangePickerMonthViewTrigger as UIDateRangePickerMonthViewTrigger,
  DateRangePickerYearViewTrigger as UIDateRangePickerYearViewTrigger,
} from "@sectile/vue/temporal/date-range-picker";
export {
  DateTimeField as UIDateTimeField,
} from "@sectile/vue/temporal/date-time-field";
export {
  DateTimeRangeFieldRoot as UIDateTimeRangeField,
  DateTimeRangeFieldStartInput as UIDateTimeRangeFieldStartInput,
  DateTimeRangeFieldEndInput as UIDateTimeRangeFieldEndInput,
} from "@sectile/vue/temporal/date-time-range-field";
export {
  DateTimePickerRoot as UIDateTimePicker,
  DateTimePickerTrigger as UIDateTimePickerTrigger,
  DateTimePickerAnchor as UIDateTimePickerAnchor,
  DateTimePickerPortal as UIDateTimePickerPortal,
  DateTimePickerContent as UIDateTimePickerContent,
  DateTimePickerGrid as UIDateTimePickerGrid,
  DateTimePickerCell as UIDateTimePickerCell,
  DateTimePickerMonthCell as UIDateTimePickerMonthCell,
  DateTimePickerDateTimeInput as UIDateTimePickerDateTimeInput,
  DateTimePickerDateInput as UIDateTimePickerDateInput,
  DateTimePickerTimeInput as UIDateTimePickerTimeInput,
  DateTimePickerPreviousWeek as UIDateTimePickerPreviousWeek,
  DateTimePickerNextWeek as UIDateTimePickerNextWeek,
  DateTimePickerPreviousMonth as UIDateTimePickerPreviousMonth,
  DateTimePickerNextMonth as UIDateTimePickerNextMonth,
  DateTimePickerPreviousYear as UIDateTimePickerPreviousYear,
  DateTimePickerNextYear as UIDateTimePickerNextYear,
  DateTimePickerWeekViewTrigger as UIDateTimePickerWeekViewTrigger,
  DateTimePickerMonthViewTrigger as UIDateTimePickerMonthViewTrigger,
  DateTimePickerYearViewTrigger as UIDateTimePickerYearViewTrigger,
} from "@sectile/vue/temporal/date-time-picker";
export {
  DateTimeRangePickerRoot as UIDateTimeRangePicker,
  DateTimeRangePickerTrigger as UIDateTimeRangePickerTrigger,
  DateTimeRangePickerAnchor as UIDateTimeRangePickerAnchor,
  DateTimeRangePickerPortal as UIDateTimeRangePickerPortal,
  DateTimeRangePickerContent as UIDateTimeRangePickerContent,
  DateTimeRangePickerGrid as UIDateTimeRangePickerGrid,
  DateTimeRangePickerCell as UIDateTimeRangePickerCell,
  DateTimeRangePickerMonthCell as UIDateTimeRangePickerMonthCell,
  DateTimeRangePickerStartDateTimeInput as UIDateTimeRangePickerStartDateTimeInput,
  DateTimeRangePickerEndDateTimeInput as UIDateTimeRangePickerEndDateTimeInput,
  DateTimeRangePickerStartDateInput as UIDateTimeRangePickerStartDateInput,
  DateTimeRangePickerEndDateInput as UIDateTimeRangePickerEndDateInput,
  DateTimeRangePickerStartTimeInput as UIDateTimeRangePickerStartTimeInput,
  DateTimeRangePickerEndTimeInput as UIDateTimeRangePickerEndTimeInput,
  DateTimeRangePickerPreviousWeek as UIDateTimeRangePickerPreviousWeek,
  DateTimeRangePickerNextWeek as UIDateTimeRangePickerNextWeek,
  DateTimeRangePickerPreviousMonth as UIDateTimeRangePickerPreviousMonth,
  DateTimeRangePickerNextMonth as UIDateTimeRangePickerNextMonth,
  DateTimeRangePickerPreviousYear as UIDateTimeRangePickerPreviousYear,
  DateTimeRangePickerNextYear as UIDateTimeRangePickerNextYear,
  DateTimeRangePickerWeekViewTrigger as UIDateTimeRangePickerWeekViewTrigger,
  DateTimeRangePickerMonthViewTrigger as UIDateTimeRangePickerMonthViewTrigger,
  DateTimeRangePickerYearViewTrigger as UIDateTimeRangePickerYearViewTrigger,
} from "@sectile/vue/temporal/date-time-range-picker";
export {
  TimeField as UITimeField,
} from "@sectile/vue/temporal/time-field";
export {
  TimePickerRoot as UITimePicker,
  TimePickerInput as UITimePickerInput,
  TimePickerContent as UITimePickerContent,
  TimePickerItem as UITimePickerItem,
  TimePickerTrigger as UITimePickerTrigger,
  TimePickerAnchor as UITimePickerAnchor,
  TimePickerPortal as UITimePickerPortal,
  TimePickerTitle as UITimePickerTitle,
  TimePickerDescription as UITimePickerDescription,
  TimePickerClose as UITimePickerClose,
} from "@sectile/vue/temporal/time-picker";

function revealTimeChoice(column: HTMLElement, choice: Element | null) {
  if (!choice || !column.contains(choice)) return;

  const padding = Number.parseFloat(getComputedStyle(column).scrollPaddingBlockStart) || 0;
  const viewport = column.getBoundingClientRect();
  const option = choice.getBoundingClientRect();
  const above = option.top - viewport.top - padding;
  const below = option.bottom - viewport.bottom;
  column.scrollTop += Math.min(above, 0) + Math.max(below, 0);
}

export const UITimePickerColumn = defineComponent({
  name: "UITimePickerColumn",
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => h(TimePickerColumn, {
      ...mergeProps(attrs, {
        onVnodeMounted({ el }: { el: unknown }) {
          if (el instanceof HTMLElement) {
            revealTimeChoice(el, el.querySelector('[role="option"][aria-selected="true"]'));
          }
        },
        onKeydown(event: KeyboardEvent) {
          const column = event.currentTarget;
          if (!(column instanceof HTMLElement)) return;
          void nextTick(() => {
            const active = column.getAttribute("aria-activedescendant");
            if (active) revealTimeChoice(column, column.ownerDocument.getElementById(active));
          });
        },
      }),
      part: attrs.part as TimePickerColumnProps["part"],
      label: attrs.label as TimePickerColumnProps["label"],
    }, slots);
  },
}) as typeof TimePickerColumn;

export {
  TimeRangeFieldRoot as UITimeRangeField,
  TimeRangeFieldStartInput as UITimeRangeFieldStartInput,
  TimeRangeFieldEndInput as UITimeRangeFieldEndInput,
} from "@sectile/vue/temporal/time-range-field";
export {
  MonthPickerRoot as UIMonthPicker,
  MonthPickerTrigger as UIMonthPickerTrigger,
  MonthPickerAnchor as UIMonthPickerAnchor,
  MonthPickerPortal as UIMonthPickerPortal,
  MonthPickerContent as UIMonthPickerContent,
  MonthPickerGrid as UIMonthPickerGrid,
  MonthPickerCell as UIMonthPickerCell,
  MonthPickerPreviousYear as UIMonthPickerPreviousYear,
  MonthPickerNextYear as UIMonthPickerNextYear,
} from "@sectile/vue/temporal/month-picker";
export {
  MonthRangePickerRoot as UIMonthRangePicker,
  MonthRangePickerTrigger as UIMonthRangePickerTrigger,
  MonthRangePickerAnchor as UIMonthRangePickerAnchor,
  MonthRangePickerPortal as UIMonthRangePickerPortal,
  MonthRangePickerContent as UIMonthRangePickerContent,
  MonthRangePickerGrid as UIMonthRangePickerGrid,
  MonthRangePickerCell as UIMonthRangePickerCell,
  MonthRangePickerPreviousYear as UIMonthRangePickerPreviousYear,
  MonthRangePickerNextYear as UIMonthRangePickerNextYear,
} from "@sectile/vue/temporal/month-range-picker";
export {
  YearPickerRoot as UIYearPicker,
  YearPickerTrigger as UIYearPickerTrigger,
  YearPickerAnchor as UIYearPickerAnchor,
  YearPickerPortal as UIYearPickerPortal,
  YearPickerContent as UIYearPickerContent,
  YearPickerGrid as UIYearPickerGrid,
  YearPickerCell as UIYearPickerCell,
  YearPickerPreviousPage as UIYearPickerPreviousPage,
  YearPickerNextPage as UIYearPickerNextPage,
} from "@sectile/vue/temporal/year-picker";
export {
  YearRangePickerRoot as UIYearRangePicker,
  YearRangePickerTrigger as UIYearRangePickerTrigger,
  YearRangePickerAnchor as UIYearRangePickerAnchor,
  YearRangePickerPortal as UIYearRangePickerPortal,
  YearRangePickerContent as UIYearRangePickerContent,
  YearRangePickerGrid as UIYearRangePickerGrid,
  YearRangePickerCell as UIYearRangePickerCell,
  YearRangePickerPreviousPage as UIYearRangePickerPreviousPage,
  YearRangePickerNextPage as UIYearRangePickerNextPage,
} from "@sectile/vue/temporal/year-range-picker";
