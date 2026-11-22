import { computed, defineComponent, h, inject, mergeProps, nextTick, provide, shallowRef, watch, type PropType } from "vue";
import { TemporalProvider, useTemporalFormatter, type TemporalFormatterOptions } from "@sectile/vue/temporal/temporal-provider";
import { DateField } from "@sectile/vue/temporal/date-field";
import { CalendarRoot } from "@sectile/vue/temporal/calendar";
import { DateRangeFieldRoot, DateRangeFieldStartInput, DateRangeFieldEndInput } from "@sectile/vue/temporal/date-range-field";
import { DatePickerRoot, DatePickerAnchor, DatePickerInput } from "@sectile/vue/temporal/date-picker";
import { DateTimeField } from "@sectile/vue/temporal/date-time-field";
import { DateTimeRangeFieldRoot, DateTimeRangeFieldStartInput, DateTimeRangeFieldEndInput } from "@sectile/vue/temporal/date-time-range-field";
import { DateTimePickerRoot, DateTimePickerAnchor, DateTimePickerDateTimeInput, DateTimePickerDateInput, DateTimePickerTimeInput } from "@sectile/vue/temporal/date-time-picker";
import {
  DateTimeRangePickerRoot, DateTimeRangePickerAnchor,
  DateTimeRangePickerStartDateInput, DateTimeRangePickerEndDateInput,
  DateTimeRangePickerStartTimeInput, DateTimeRangePickerEndTimeInput,
  DateTimeRangePickerStartDateTimeInput, DateTimeRangePickerEndDateTimeInput,
  DateTimeRangePickerGrid, DateTimeRangePickerCell, DateTimeRangePickerMonthCell,
} from "@sectile/vue/temporal/date-time-range-picker";
import { TimeField } from "@sectile/vue/temporal/time-field";
import { TimeRangeFieldRoot, TimeRangeFieldStartInput, TimeRangeFieldEndInput } from "@sectile/vue/temporal/time-range-field";
import { DateRangePickerRoot, DateRangePickerAnchor, DateRangePickerStartInput, DateRangePickerEndInput, DateRangePickerGrid, DateRangePickerCell, DateRangePickerMonthCell } from "@sectile/vue/temporal/date-range-picker";
import { MonthPickerRoot, MonthPickerAnchor, MonthPickerInput } from "@sectile/vue/temporal/month-picker";
import { MonthRangePickerRoot, MonthRangePickerAnchor, MonthRangePickerStartInput, MonthRangePickerEndInput, MonthRangePickerGrid, MonthRangePickerCell } from "@sectile/vue/temporal/month-range-picker";
import { RangeCalendarRoot, RangeCalendarGrid, RangeCalendarCell, RangeCalendarMonthCell } from "@sectile/vue/temporal/range-calendar";
import {
  TimePickerRoot, TimePickerColumn, TimePickerContent, TimePickerInput,
  type TimePickerColumnProps, type TimePickerColumnSlotProps, type TimePickerContentSlotProps,
} from "@sectile/vue/temporal/time-picker";
import { YearPickerRoot, YearPickerAnchor, YearPickerInput } from "@sectile/vue/temporal/year-picker";
import { YearRangePickerRoot, YearRangePickerAnchor, YearRangePickerStartInput, YearRangePickerEndInput, YearRangePickerGrid, YearRangePickerCell } from "@sectile/vue/temporal/year-range-picker";
import { withClearableControl, withClearableModel, type ClearableComponent } from "../clear/with-clearable";
import UIScrollFade from "../scroll/UIScrollFade.vue";
import { useUIScrollArea } from "../scroll/useUIScrollArea";
import { withTemporalEditing, withTemporalInputAppearance } from "./temporal-input";
import { TemporalInputFormatProvider, temporalInputFormatsKey, type UITemporalInputFormats } from "./temporal-input-format";
import { withRangeGridPresentation, withRangeCellPresentation } from "./temporal-range-presentation";
import { defaultTemporalFormatting, temporalDisplayFormatsKey, useUITemporalDisplay, type UITemporalDisplayFormats } from "./temporal-display";
import type { DateValue } from "@sectile/temporal/date-field";

export { useUITemporalDisplay, type UITemporalDisplayFormats } from "./temporal-display";
export type { UITemporalInputFormats } from "./temporal-input-format";
export { default as UICalendarPeriodHeader } from "./UICalendarPeriodHeader.vue";
export { default as UIDatePickerValue } from "./UIDatePickerValue.vue";
export { default as UIDateRangePickerValue } from "./UIDateRangePickerValue.vue";
export { default as UIDateTimeRangePickerValue } from "./UIDateTimeRangePickerValue.vue";

const fieldOptions = { placement: "inset", expose: ["element", "focus", "select"] } as const;
const rangeOptions = { placement: "end", label: "범위 지우기" } as const;

export const UIDateField: ClearableComponent<typeof DateField> =
  withClearableModel(withTemporalEditing(DateField, "date"), null, fieldOptions);
export const UIDateRangeFieldStartInput = withTemporalEditing(DateRangeFieldStartInput, "date");
export const UIDateRangeFieldEndInput = withTemporalEditing(DateRangeFieldEndInput, "date");
export const UIDatePickerInput = withTemporalEditing(DatePickerInput, "date");
export const UIDateTimeField: ClearableComponent<typeof DateTimeField> =
  withClearableModel(withTemporalEditing(DateTimeField, "date-time", { precision: "minute" }), null, fieldOptions);
export const UIDateTimeRangeFieldStartInput = withTemporalEditing(DateTimeRangeFieldStartInput, "date-time");
export const UIDateTimeRangeFieldEndInput = withTemporalEditing(DateTimeRangeFieldEndInput, "date-time");
export const UIDateTimePickerDateTimeInput = withTemporalEditing(DateTimePickerDateTimeInput, "date-time");
export const UIDateTimePickerDateInput = withTemporalEditing(DateTimePickerDateInput, "date-time-date");
export const UIDateTimePickerTimeInput = withTemporalEditing(DateTimePickerTimeInput, "date-time-time");
export const UIDateTimeRangePickerStartDateInput = withTemporalEditing(DateTimeRangePickerStartDateInput, "date");
export const UIDateTimeRangePickerEndDateInput = withTemporalEditing(DateTimeRangePickerEndDateInput, "date");
export const UIDateTimeRangePickerStartTimeInput = withTemporalEditing(DateTimeRangePickerStartTimeInput, "time");
export const UIDateTimeRangePickerEndTimeInput = withTemporalEditing(DateTimeRangePickerEndTimeInput, "time");
export const UITimeField: ClearableComponent<typeof TimeField> =
  withClearableModel(withTemporalEditing(TimeField, "time", { precision: "minute" }), null, fieldOptions);
// TimePicker installs a reset owner of its own. The input connects the UI model's reset to that field.
export const UITimePickerInput = withTemporalEditing(TimePickerInput, "time", { reconnectFormReset: true });
export const UITimeRangeFieldStartInput = withTemporalEditing(TimeRangeFieldStartInput, "time");
export const UITimeRangeFieldEndInput = withTemporalEditing(TimeRangeFieldEndInput, "time");

export const UIRangeCalendarGrid: typeof RangeCalendarGrid = withRangeGridPresentation(RangeCalendarGrid, "range-calendar");
export const UIRangeCalendarCell: typeof RangeCalendarCell = withRangeCellPresentation(RangeCalendarCell);
export const UIRangeCalendarMonthCell: typeof RangeCalendarMonthCell = withRangeCellPresentation(RangeCalendarMonthCell);
export const UIDateRangePickerGrid: typeof DateRangePickerGrid = withRangeGridPresentation(DateRangePickerGrid, "date-range");
export const UIDateRangePickerCell: typeof DateRangePickerCell = withRangeCellPresentation(DateRangePickerCell);
export const UIDateRangePickerMonthCell: typeof DateRangePickerMonthCell = withRangeCellPresentation(DateRangePickerMonthCell);
export const UIDateTimeRangePickerGrid: typeof DateTimeRangePickerGrid = withRangeGridPresentation(DateTimeRangePickerGrid, "date-time-range");
export const UIDateTimeRangePickerCell: typeof DateTimeRangePickerCell = withRangeCellPresentation(DateTimeRangePickerCell);
export const UIDateTimeRangePickerMonthCell: typeof DateTimeRangePickerMonthCell = withRangeCellPresentation(DateTimeRangePickerMonthCell);
export const UIMonthRangePickerGrid: typeof MonthRangePickerGrid = withRangeGridPresentation(MonthRangePickerGrid, "month-range-picker");
export const UIMonthRangePickerCell: typeof MonthRangePickerCell = withRangeCellPresentation(MonthRangePickerCell);
export const UIYearRangePickerGrid: typeof YearRangePickerGrid = withRangeGridPresentation(YearRangePickerGrid, "year-range-picker");
export const UIYearRangePickerCell: typeof YearRangePickerCell = withRangeCellPresentation(YearRangePickerCell);

export const UIDateRangePickerStartInput = withTemporalInputAppearance(DateRangePickerStartInput, "시작일");
export const UIDateRangePickerEndInput = withTemporalInputAppearance(DateRangePickerEndInput, "종료일");
export const UIDateTimeRangePickerStartDateTimeInput: typeof DateTimeRangePickerStartDateTimeInput =
  withTemporalInputAppearance(DateTimeRangePickerStartDateTimeInput);
export const UIDateTimeRangePickerEndDateTimeInput: typeof DateTimeRangePickerEndDateTimeInput =
  withTemporalInputAppearance(DateTimeRangePickerEndDateTimeInput);
export const UIMonthPickerInput = withTemporalInputAppearance(MonthPickerInput, "월 선택");
export const UIMonthRangePickerStartInput = withTemporalInputAppearance(MonthRangePickerStartInput, "시작 월");
export const UIMonthRangePickerEndInput = withTemporalInputAppearance(MonthRangePickerEndInput, "종료 월");
export const UIYearPickerInput = withTemporalInputAppearance(YearPickerInput, "연도 선택");
export const UIYearRangePickerStartInput = withTemporalInputAppearance(YearRangePickerStartInput, "시작 연도");
export const UIYearRangePickerEndInput = withTemporalInputAppearance(YearRangePickerEndInput, "종료 연도");

export const UICalendar: ClearableComponent<typeof CalendarRoot> = withClearableModel(CalendarRoot, null, { placement: "beside" });
export const UIDateRangeField: ClearableComponent<typeof DateRangeFieldRoot> = withClearableModel(DateRangeFieldRoot, null, rangeOptions);
export const UITimeRangeField: ClearableComponent<typeof TimeRangeFieldRoot> = withClearableModel(TimeRangeFieldRoot, null, rangeOptions);
export const UIDateTimeRangeField: ClearableComponent<typeof DateTimeRangeFieldRoot> = withClearableModel(DateTimeRangeFieldRoot, null, rangeOptions);
export const UIDatePicker: ClearableComponent<typeof DatePickerRoot> = withClearableModel(DatePickerRoot, null);
export const UIDatePickerAnchor: typeof DatePickerAnchor = withClearableControl(DatePickerAnchor, "anchor");
export const UIDateRangePicker: ClearableComponent<typeof DateRangePickerRoot> = withClearableModel(DateRangePickerRoot, null, { label: "범위 지우기" });
export const UIDateRangePickerAnchor: typeof DateRangePickerAnchor = withClearableControl(DateRangePickerAnchor, "anchor");
export const UIDateTimePicker: ClearableComponent<typeof DateTimePickerRoot> = withClearableModel(DateTimePickerRoot, null);
export const UIDateTimePickerAnchor: typeof DateTimePickerAnchor = withClearableControl(DateTimePickerAnchor, "anchor");
export const UIDateTimeRangePicker: ClearableComponent<typeof DateTimeRangePickerRoot> = withClearableModel(DateTimeRangePickerRoot, null, { label: "범위 지우기" });
export const UIDateTimeRangePickerAnchor: typeof DateTimeRangePickerAnchor = withClearableControl(DateTimeRangePickerAnchor, "anchor");
export const UITimePicker: ClearableComponent<typeof TimePickerRoot> = withClearableModel(TimePickerRoot, null, {
  placement: "end", expose: ["element", "focus", "select", "requestClose", "selectChoice"],
});
export const UIMonthPicker: ClearableComponent<typeof MonthPickerRoot> = withClearableModel(MonthPickerRoot, null);
export const UIMonthPickerAnchor: typeof MonthPickerAnchor = withClearableControl(MonthPickerAnchor, "anchor");
export const UIMonthRangePicker: ClearableComponent<typeof MonthRangePickerRoot> = withClearableModel(MonthRangePickerRoot, null, { label: "범위 지우기" });
export const UIMonthRangePickerAnchor: typeof MonthRangePickerAnchor = withClearableControl(MonthRangePickerAnchor, "anchor");
export const UIYearPicker: ClearableComponent<typeof YearPickerRoot> = withClearableModel(YearPickerRoot, null);
export const UIYearPickerAnchor: typeof YearPickerAnchor = withClearableControl(YearPickerAnchor, "anchor");
export const UIYearRangePicker: ClearableComponent<typeof YearRangePickerRoot> = withClearableModel(YearRangePickerRoot, null, { label: "범위 지우기" });
export const UIYearRangePickerAnchor: typeof YearRangePickerAnchor = withClearableControl(YearRangePickerAnchor, "anchor");

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
const InlineRangeCalendar = defineComponent({
  name: "UIRangeCalendar",
  inheritAttrs: false,
  __sectileFormLabelMode: "labelledby",
  setup(_, { attrs, slots }) {
    return () => h(RangeCalendarRoot, { position: false, ...attrs }, slots);
  },
}) as typeof RangeCalendarRoot;
export const UIRangeCalendar: ClearableComponent<typeof RangeCalendarRoot> = withClearableModel(InlineRangeCalendar, null, { placement: "beside", label: "범위 지우기" });
export {
  DatePickerTrigger as UIDatePickerTrigger,
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
  DateRangePickerTrigger as UIDateRangePickerTrigger,
  DateRangePickerPortal as UIDateRangePickerPortal,
  DateRangePickerContent as UIDateRangePickerContent,
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
  DateTimePickerTrigger as UIDateTimePickerTrigger,
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
  DateTimeRangePickerTrigger as UIDateTimeRangePickerTrigger,
  DateTimeRangePickerPortal as UIDateTimeRangePickerPortal,
  DateTimeRangePickerContent as UIDateTimeRangePickerContent,
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

function centerSelectedTimeChoice(column: HTMLElement) {
  const selected = column.querySelector('[role="option"][aria-selected="true"]');
  if (!selected || column.clientHeight === 0) return;

  const viewport = column.getBoundingClientRect();
  const option = selected.getBoundingClientRect();
  const viewportCenter = viewport.top + column.clientTop + column.clientHeight / 2;
  column.scrollTop += option.top + option.height / 2 - viewportCenter;
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
    const listbox = shallowRef<HTMLElement>();
    const { state: scrollState } = useUIScrollArea(listbox);
    const centerSelection = () => {
      if (listbox.value) centerSelectedTimeChoice(listbox.value);
    };
    watch([() => listbox.value, () => scrollState.value.height > 0], ([column, visible]) => {
      if (column && visible) centerSelectedTimeChoice(column);
    }, { flush: "post" });
    watch(listbox, (column, _, onCleanup) => {
      if (!column) return;
      const activeChoice = new MutationObserver(() => {
        if (!column.matches(":focus")) return;
        const active = column.getAttribute("aria-activedescendant");
        if (active) revealTimeChoice(column, column.ownerDocument.getElementById(active));
      });
      activeChoice.observe(column, { attributeFilter: ["aria-activedescendant"] });
      onCleanup(() => activeChoice.disconnect());
    }, { flush: "post" });
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
      h(UIScrollFade, {
        class: "ui-time-picker-column__viewport",
        state: scrollState.value,
        edges: ["top", "bottom"],
      }, {
        default: () => h(TimePickerColumn, {
          ...mergeProps(attrs, {
            onVnodeMounted({ el }: { el: unknown }) {
              if (el instanceof HTMLElement) listbox.value = el;
            },
            onVnodeBeforeUnmount() {
              listbox.value = undefined;
            },
            onActivate() {
              void nextTick(centerSelection);
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
      }),
    ]);
  },
}) as unknown as new () => Omit<TimePickerColumnInstance, "$props"> & {
  $props: Omit<TimePickerColumnInstance["$props"], "label"> & { label?: string };
};

export {
  MonthPickerTrigger as UIMonthPickerTrigger,
  MonthPickerPortal as UIMonthPickerPortal,
  MonthPickerContent as UIMonthPickerContent,
  MonthPickerGrid as UIMonthPickerGrid,
  MonthPickerCell as UIMonthPickerCell,
  MonthPickerPreviousYear as UIMonthPickerPreviousYear,
  MonthPickerNextYear as UIMonthPickerNextYear,
} from "@sectile/vue/temporal/month-picker";
export {
  MonthRangePickerTrigger as UIMonthRangePickerTrigger,
  MonthRangePickerPortal as UIMonthRangePickerPortal,
  MonthRangePickerContent as UIMonthRangePickerContent,
  MonthRangePickerPreviousYear as UIMonthRangePickerPreviousYear,
  MonthRangePickerNextYear as UIMonthRangePickerNextYear,
} from "@sectile/vue/temporal/month-range-picker";
export {
  YearPickerTrigger as UIYearPickerTrigger,
  YearPickerPortal as UIYearPickerPortal,
  YearPickerContent as UIYearPickerContent,
  YearPickerGrid as UIYearPickerGrid,
  YearPickerCell as UIYearPickerCell,
  YearPickerPreviousPage as UIYearPickerPreviousPage,
  YearPickerNextPage as UIYearPickerNextPage,
} from "@sectile/vue/temporal/year-picker";
export {
  YearRangePickerTrigger as UIYearRangePickerTrigger,
  YearRangePickerPortal as UIYearRangePickerPortal,
  YearRangePickerContent as UIYearRangePickerContent,
  YearRangePickerPreviousPage as UIYearRangePickerPreviousPage,
  YearRangePickerNextPage as UIYearRangePickerNextPage,
} from "@sectile/vue/temporal/year-range-picker";
