import { computed, defineComponent, h, inject, mergeProps, nextTick, provide, type Component, type PropType } from "vue";
import { TemporalProvider, useTemporalFormatter, type TemporalFormatterOptions } from "@sectile/vue/temporal/temporal-provider";
import { DateField } from "@sectile/vue/temporal/date-field";
import { DateRangeFieldStartInput, DateRangeFieldEndInput } from "@sectile/vue/temporal/date-range-field";
import { DatePickerInput } from "@sectile/vue/temporal/date-picker";
import { DateTimeField } from "@sectile/vue/temporal/date-time-field";
import { DateTimeRangeFieldStartInput, DateTimeRangeFieldEndInput } from "@sectile/vue/temporal/date-time-range-field";
import { DateTimePickerDateTimeInput, DateTimePickerDateInput, DateTimePickerTimeInput } from "@sectile/vue/temporal/date-time-picker";
import { DateTimeRangePickerStartDateInput, DateTimeRangePickerEndDateInput, DateTimeRangePickerStartTimeInput, DateTimeRangePickerEndTimeInput } from "@sectile/vue/temporal/date-time-range-picker";
import { TimeField } from "@sectile/vue/temporal/time-field";
import { TimeRangeFieldStartInput, TimeRangeFieldEndInput } from "@sectile/vue/temporal/time-range-field";
import { DateRangePickerStartInput, DateRangePickerEndInput } from "@sectile/vue/temporal/date-range-picker";
import { MonthPickerInput } from "@sectile/vue/temporal/month-picker";
import { MonthRangePickerStartInput, MonthRangePickerEndInput } from "@sectile/vue/temporal/month-range-picker";
import { RangeCalendarRoot } from "@sectile/vue/temporal/range-calendar";
import {
  TimePickerColumn, TimePickerContent, TimePickerInput,
  type TimePickerColumnProps, type TimePickerColumnSlotProps, type TimePickerContentSlotProps,
} from "@sectile/vue/temporal/time-picker";
import { YearPickerInput } from "@sectile/vue/temporal/year-picker";
import { YearRangePickerStartInput, YearRangePickerEndInput } from "@sectile/vue/temporal/year-range-picker";
import { withTemporalEditing } from "./temporal-input";
import { TemporalInputFormatProvider, temporalInputFormatsKey, type UITemporalInputFormats } from "./temporal-input-format";
import { defaultTemporalFormatting, temporalDisplayFormatsKey, useUITemporalDisplay, type UITemporalDisplayFormats } from "./temporal-display";
import type { DateValue } from "@sectile/temporal/date-field";

export { useUITemporalDisplay, type UITemporalDisplayFormats } from "./temporal-display";
export type { UITemporalInputFormats } from "./temporal-input-format";
export { default as UICalendarPeriodHeader } from "./UICalendarPeriodHeader.vue";
export { default as UIDatePickerValue } from "./UIDatePickerValue.vue";
export { default as UIDateRangePickerValue } from "./UIDateRangePickerValue.vue";
export { default as UIDateTimeRangePickerValue } from "./UIDateTimeRangePickerValue.vue";

export const UIDateField: typeof DateField = withTemporalEditing(DateField, "date");
export const UIDateRangeFieldStartInput = withTemporalEditing(DateRangeFieldStartInput, "date");
export const UIDateRangeFieldEndInput = withTemporalEditing(DateRangeFieldEndInput, "date");
export const UIDatePickerInput = withTemporalEditing(DatePickerInput, "date");
export const UIDateTimeField: typeof DateTimeField = withTemporalEditing(DateTimeField, "date-time", { precision: "minute" });
export const UIDateTimeRangeFieldStartInput = withTemporalEditing(DateTimeRangeFieldStartInput, "date-time");
export const UIDateTimeRangeFieldEndInput = withTemporalEditing(DateTimeRangeFieldEndInput, "date-time");
export const UIDateTimePickerDateTimeInput = withTemporalEditing(DateTimePickerDateTimeInput, "date-time");
export const UIDateTimePickerDateInput = withTemporalEditing(DateTimePickerDateInput, "date-time-date");
export const UIDateTimePickerTimeInput = withTemporalEditing(DateTimePickerTimeInput, "date-time-time");
export const UIDateTimeRangePickerStartDateInput = withTemporalEditing(DateTimeRangePickerStartDateInput, "date");
export const UIDateTimeRangePickerEndDateInput = withTemporalEditing(DateTimeRangePickerEndDateInput, "date");
export const UIDateTimeRangePickerStartTimeInput = withTemporalEditing(DateTimeRangePickerStartTimeInput, "time");
export const UIDateTimeRangePickerEndTimeInput = withTemporalEditing(DateTimeRangePickerEndTimeInput, "time");
export const UITimeField: typeof TimeField = withTemporalEditing(TimeField, "time", { precision: "minute" });
export const UITimePickerInput = withTemporalEditing(TimePickerInput, "time");
export const UITimeRangeFieldStartInput = withTemporalEditing(TimeRangeFieldStartInput, "time");
export const UITimeRangeFieldEndInput = withTemporalEditing(TimeRangeFieldEndInput, "time");

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
  useTemporalReferenceDate as useUITemporalReferenceDate,
  useTemporalFormatter as useUITemporalFormatter,
} from "@sectile/vue/temporal/temporal-provider";

export const UITemporalProvider = defineComponent({
  name: "UITemporalProvider",
  inheritAttrs: false,
  props: {
    formatting: Object as PropType<Partial<TemporalFormatterOptions>>,
    formats: Object as PropType<UITemporalDisplayFormats>,
    inputFormats: Object as PropType<UITemporalInputFormats>,
    referenceDate: Object as PropType<DateValue>,
    referenceInstant: Number,
  },
  setup(props, { slots }) {
    const inherited = useTemporalFormatter();
    const inheritedFormats = inject(temporalDisplayFormatsKey, undefined);
    const inheritedInputFormats = inject(temporalInputFormatsKey, undefined);
    const inputFormats = computed(() => {
      const parent = inheritedInputFormats?.value;
      const local = props.inputFormats;
      if (!local) return parent;
      return {
        date: local.date ? { ...parent?.date, ...local.date } : parent?.date,
        time: local.time ? { ...parent?.time, ...local.time } : parent?.time,
        dateTime: local.dateTime ? { ...parent?.dateTime, ...local.dateTime } : parent?.dateTime,
      };
    });
    provide(temporalInputFormatsKey, inputFormats);
    provide(temporalDisplayFormatsKey, computed(() => props.formats
      ? { ...inheritedFormats?.value, ...props.formats }
      : inheritedFormats?.value));

    return () => h(TemporalProvider, {
      referenceDate: props.referenceDate,
      referenceInstant: props.referenceInstant,
      formatting: props.formatting || !inherited.value || inputFormats.value ? {
        locale: props.formatting?.locale ?? inherited.value?.locale ?? defaultTemporalFormatting.locale,
        timeZone: props.formatting?.timeZone ?? inherited.value?.timeZone ?? defaultTemporalFormatting.timeZone,
      } : undefined,
    }, {
      default: () => h(TemporalInputFormatProvider, null, slots),
    });
  },
});

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
  DateRangeFieldRoot as UIDateRangeField,
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
  DateTimeRangeFieldRoot as UIDateTimeRangeField,
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
  TimePickerRoot as UITimePicker,
  TimePickerItem as UITimePickerItem,
  TimePickerTrigger as UITimePickerTrigger,
  TimePickerAnchor as UITimePickerAnchor,
  TimePickerPortal as UITimePickerPortal,
  TimePickerTitle as UITimePickerTitle,
  TimePickerDescription as UITimePickerDescription,
  TimePickerClose as UITimePickerClose,
} from "@sectile/vue/temporal/time-picker";

export const UITimePickerContent = defineComponent({
  name: "UITimePickerContent",
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => h(TimePickerContent, attrs, {
      default: (state: TimePickerContentSlotProps) => slots.default?.({
        ...state,
        columns: state.columns.map(column => ({ ...column, choices: column.choices.filter(choice => !choice.disabled) })),
      }),
    });
  },
}) as unknown as typeof TimePickerContent;

function revealTimeChoice(column: HTMLElement, choice: Element | null) {
  if (!choice || !column.contains(choice)) return;

  const viewport = column.getBoundingClientRect();
  const option = choice.getBoundingClientRect();
  const top = viewport.top + column.clientTop;
  const above = option.top - top;
  const below = option.bottom - (top + column.clientHeight);
  column.scrollTop += Math.min(above, 0) + Math.max(below, 0);
}

type TimePickerColumnInstance = InstanceType<typeof TimePickerColumn>;

export const UITimePickerColumn = defineComponent({
  name: "UITimePickerColumn",
  inheritAttrs: false,
  props: {
    part: { type: String as PropType<TimePickerColumnProps["part"]>, required: true },
    label: String,
  },
  setup(props, { attrs, slots }) {
    const { locale } = useUITemporalDisplay();
    const formatter = useTemporalFormatter();
    const label = computed(() => {
      if (props.label !== undefined) return props.label;
      const { part } = props;
      if (part === "dayPeriod") {
        const format = formatter.value?.timeFieldFormat();
        return (format?.ok && format.value.dayPeriods?.join(" / ")) || "AM / PM";
      }
      const korean = { hour: "시", minute: "분", second: "초", millisecond: "밀리초" };
      if (locale.value.startsWith("ko")) return korean[part];
      return new Intl.NumberFormat(locale.value, { style: "unit", unit: part })
        .formatToParts(1).find(part => part.type === "unit")?.value ?? part;
    });
    return () => h("div", { class: "ui-time-picker-column ui-inset-frame", "data-time-part": props.part }, [
      label.value ? h("span", { class: "ui-time-picker-column__label", "aria-hidden": "true" }, label.value) : null,
      h(TimePickerColumn, {
        ...mergeProps(attrs, {
          class: "ui-scrollbar",
          "data-ui-scrollbar": "centered",
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
        part: props.part,
        label: label.value,
      }, {
        default: (state: TimePickerColumnSlotProps) => slots.default?.({
          ...state,
          choices: state.choices.filter(choice => !choice.disabled),
        }),
      }),
    ]);
  },
}) as unknown as new () => Omit<TimePickerColumnInstance, "$props"> & {
  $props: Omit<TimePickerColumnInstance["$props"], "label"> & { label?: string };
};

export {
  TimeRangeFieldRoot as UITimeRangeField,
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
