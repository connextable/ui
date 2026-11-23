import { computed, defineComponent, h, inject, mergeProps, nextTick, provide, shallowRef, watch, type Component, type PropType } from "vue";
import { Clock } from "@lucide/vue";
import { TemporalProvider, useTemporalFormatter, type TemporalFormatterOptions } from "@sectile/vue/temporal/temporal-provider";
import { DateField } from "@sectile/vue/temporal/date-field";
import { CalendarContent, CalendarInput, CalendarRoot } from "@sectile/vue/temporal/calendar";
import { DateRangeFieldRoot, DateRangeFieldStartInput, DateRangeFieldEndInput } from "@sectile/vue/temporal/date-range-field";
import { DatePickerRoot, DatePickerAnchor, DatePickerInput } from "@sectile/vue/temporal/date-picker";
import { DateTimeField } from "@sectile/vue/temporal/date-time-field";
import { DateTimeRangeFieldRoot, DateTimeRangeFieldStartInput, DateTimeRangeFieldEndInput } from "@sectile/vue/temporal/date-time-range-field";
import {
  DateTimePickerRoot, DateTimePickerAnchor, DateTimePickerDateTimeInput, DateTimePickerDateInput, DateTimePickerTimeInput,
  DateTimePickerTimeChoices, type DateTimeTimeChoicesSlotProps,
} from "@sectile/vue/temporal/date-time-picker";
import {
  DateTimeRangePickerRoot, DateTimeRangePickerAnchor,
  DateTimeRangePickerStartDateInput, DateTimeRangePickerEndDateInput,
  DateTimeRangePickerStartTimeInput, DateTimeRangePickerEndTimeInput,
  DateTimeRangePickerStartDateTimeInput, DateTimeRangePickerEndDateTimeInput,
  DateTimeRangePickerContent, DateTimeRangePickerGrid, DateTimeRangePickerCell, DateTimeRangePickerMonthCell, DateTimeRangePickerTimeChoices,
} from "@sectile/vue/temporal/date-time-range-picker";
import { TimeField } from "@sectile/vue/temporal/time-field";
import { TimeRangeFieldRoot, TimeRangeFieldStartInput, TimeRangeFieldEndInput } from "@sectile/vue/temporal/time-range-field";
import { DateRangePickerRoot, DateRangePickerAnchor, DateRangePickerStartInput, DateRangePickerEndInput, DateRangePickerContent, DateRangePickerGrid, DateRangePickerCell, DateRangePickerMonthCell } from "@sectile/vue/temporal/date-range-picker";
import { MonthPickerRoot, MonthPickerAnchor, MonthPickerInput } from "@sectile/vue/temporal/month-picker";
import { MonthRangePickerRoot, MonthRangePickerAnchor, MonthRangePickerStartInput, MonthRangePickerEndInput, MonthRangePickerContent, MonthRangePickerGrid, MonthRangePickerCell } from "@sectile/vue/temporal/month-range-picker";
import { RangeCalendarContent, RangeCalendarRoot, RangeCalendarGrid, RangeCalendarCell, RangeCalendarMonthCell, RangeCalendarStartInput, RangeCalendarEndInput } from "@sectile/vue/temporal/range-calendar";
import {
  TimePickerRoot, TimePickerColumn, TimePickerContent, TimePickerInput,
  TimePickerItem, TimePickerTrigger,
  type TimePickerColumnProps, type TimePickerColumnSlotProps, type TimePickerContentSlotProps, type TimePickerExpose, type TimePickerRootSlotProps,
} from "@sectile/vue/temporal/time-picker";
import { YearPickerRoot, YearPickerAnchor, YearPickerInput } from "@sectile/vue/temporal/year-picker";
import { YearRangePickerRoot, YearRangePickerAnchor, YearRangePickerStartInput, YearRangePickerEndInput, YearRangePickerContent, YearRangePickerGrid, YearRangePickerCell } from "@sectile/vue/temporal/year-range-picker";
import { withClearableControl, withClearableModel, type ClearableComponent } from "../clear/with-clearable";
import { controlFlag, useFieldClear } from "../clear/clearable";
import UIFieldClear from "../clear/UIFieldClear.vue";
import { definedControlAttrs } from "../control-attrs";
import { useCompositeValueForm } from "../form/composite-value";
import UIScrollFade from "../scroll/UIScrollFade.vue";
import { useUIScrollArea } from "../scroll/useUIScrollArea";
import { withDateEditingFormat, withTemporalEditing, withTemporalInputAppearance } from "./temporal-input";
import { withCalendarDefaults, type CalendarFormComponent, type CalendarTimeModels, type EditableDatePickerOptions, type RangeCalendarTimeModels } from "./temporal-composition";
import { TemporalInputFormatProvider, temporalInputFormatsKey, withPickerInputPrecision, type UITemporalInputFormats } from "./temporal-input-format";
import { withRangeGridPresentation, withRangeCellPresentation, withRangeContentPresentation } from "./temporal-range-presentation";
import { defaultTemporalFormatting, temporalDisplayFormatsKey, useUITemporalDisplay, type UITemporalDisplayFormats } from "./temporal-display";
import type { DateValue } from "@sectile/temporal/date-field";
import { createTimeFieldFormat, formatTimeFieldValue, type TimeFieldPrecision, type TimeValue } from "@sectile/temporal/time-field";

export { useUITemporalDisplay, type UITemporalDisplayFormats } from "./temporal-display";
export type { UITemporalInputFormats } from "./temporal-input-format";
export { createDateFieldFormat as createUIDateFieldFormat } from "@sectile/temporal/date-field";
export { default as UICalendarPeriodHeader } from "./UICalendarPeriodHeader.vue";
export { default as UIDatePickerValue } from "./UIDatePickerValue.vue";
export { default as UIDateRangePickerValue } from "./UIDateRangePickerValue.vue";
export { default as UIDateTimeRangePickerValue } from "./UIDateTimeRangePickerValue.vue";

const fieldOptions = { placement: "inset", expose: ["element", "focus", "select"] } as const;
const rangeOptions = { placement: "end", label: "범위 지우기" } as const;

export const UIDateField: ClearableComponent<typeof DateField> =
  withClearableModel(withTemporalEditing(DateField, "date"), null, fieldOptions);
const inheritedDateFormat = { dateFormatFromParent: true } as const;
export const UIDateRangeFieldStartInput = withTemporalEditing(DateRangeFieldStartInput, "date", inheritedDateFormat);
export const UIDateRangeFieldEndInput = withTemporalEditing(DateRangeFieldEndInput, "date", inheritedDateFormat);
export const UIDatePickerInput = withTemporalEditing(DatePickerInput, "date", inheritedDateFormat);
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

export const UIRangeCalendarGrid: typeof RangeCalendarGrid = withRangeGridPresentation(RangeCalendarGrid);
export const UIRangeCalendarCell: typeof RangeCalendarCell = withRangeCellPresentation(RangeCalendarCell);
export const UIRangeCalendarMonthCell: typeof RangeCalendarMonthCell = withRangeCellPresentation(RangeCalendarMonthCell);
export const UIDateRangePickerGrid: typeof DateRangePickerGrid = withRangeGridPresentation(DateRangePickerGrid);
export const UIDateRangePickerCell: typeof DateRangePickerCell = withRangeCellPresentation(DateRangePickerCell);
export const UIDateRangePickerMonthCell: typeof DateRangePickerMonthCell = withRangeCellPresentation(DateRangePickerMonthCell);
export const UIDateTimeRangePickerGrid: typeof DateTimeRangePickerGrid = withRangeGridPresentation(DateTimeRangePickerGrid);
export const UIDateTimeRangePickerCell: typeof DateTimeRangePickerCell = withRangeCellPresentation(DateTimeRangePickerCell);
export const UIDateTimeRangePickerMonthCell: typeof DateTimeRangePickerMonthCell = withRangeCellPresentation(DateTimeRangePickerMonthCell);
export const UIMonthRangePickerGrid: typeof MonthRangePickerGrid = withRangeGridPresentation(MonthRangePickerGrid);
export const UIMonthRangePickerCell: typeof MonthRangePickerCell = withRangeCellPresentation(MonthRangePickerCell);
export const UIYearRangePickerGrid: typeof YearRangePickerGrid = withRangeGridPresentation(YearRangePickerGrid);
export const UIYearRangePickerCell: typeof YearRangePickerCell = withRangeCellPresentation(YearRangePickerCell);

export const UIDateRangePickerStartInput = withTemporalEditing(DateRangePickerStartInput, "date", inheritedDateFormat);
export const UIDateRangePickerEndInput = withTemporalEditing(DateRangePickerEndInput, "date", inheritedDateFormat);
export const UIDateTimeRangePickerStartDateTimeInput: typeof DateTimeRangePickerStartDateTimeInput =
  withTemporalInputAppearance(DateTimeRangePickerStartDateTimeInput);
export const UIDateTimeRangePickerEndDateTimeInput: typeof DateTimeRangePickerEndDateTimeInput =
  withTemporalInputAppearance(DateTimeRangePickerEndDateTimeInput);
export const UIMonthPickerInput = withTemporalInputAppearance(MonthPickerInput, "YYYY-MM");
export const UIMonthRangePickerStartInput = withTemporalInputAppearance(MonthRangePickerStartInput, "YYYY-MM");
export const UIMonthRangePickerEndInput = withTemporalInputAppearance(MonthRangePickerEndInput, "YYYY-MM");
export const UIYearPickerInput = withTemporalInputAppearance(YearPickerInput, "YYYY");
export const UIYearRangePickerStartInput = withTemporalInputAppearance(YearRangePickerStartInput, "YYYY");
export const UIYearRangePickerEndInput = withTemporalInputAppearance(YearRangePickerEndInput, "YYYY");

const RangeFieldDefaultParts = defineComponent({
  props: {
    start: { type: [Object, Function] as PropType<Component>, required: true },
    end: { type: [Object, Function] as PropType<Component>, required: true },
    startLabel: String,
    endLabel: String,
  },
  setup(props) {
    const { locale } = useUITemporalDisplay();
    return () => {
      const korean = locale.value.startsWith("ko");
      return [
        h(props.start, { "aria-label": props.startLabel ?? (korean ? "시작" : "Start") }),
        h(props.end, { "aria-label": props.endLabel ?? (korean ? "종료" : "End") }),
      ];
    };
  },
});

function rangeFieldParts(start: Component, end: Component) {
  return (attrs: Record<string, unknown>) => [h(RangeFieldDefaultParts, {
    start, end,
    startLabel: (attrs.startLabel ?? attrs["start-label"]) as string | undefined,
    endLabel: (attrs.endLabel ?? attrs["end-label"]) as string | undefined,
  })];
}

export const UIDateRangeField: ClearableComponent<typeof DateRangeFieldRoot> = withClearableModel(withDateEditingFormat(DateRangeFieldRoot), null, {
  ...rangeOptions,
  defaultParts: rangeFieldParts(UIDateRangeFieldStartInput, UIDateRangeFieldEndInput),
});
export const UITimeRangeField: ClearableComponent<typeof TimeRangeFieldRoot> = withClearableModel(TimeRangeFieldRoot, null, {
  ...rangeOptions,
  defaultParts: rangeFieldParts(UITimeRangeFieldStartInput, UITimeRangeFieldEndInput),
});
export const UIDateTimeRangeField: ClearableComponent<typeof DateTimeRangeFieldRoot> = withClearableModel(DateTimeRangeFieldRoot, null, {
  ...rangeOptions,
  defaultParts: rangeFieldParts(UIDateTimeRangeFieldStartInput, UIDateTimeRangeFieldEndInput),
});
export const UIDatePickerAnchor: typeof DatePickerAnchor = withClearableControl(DatePickerAnchor, "anchor");
export const UIDatePicker: ClearableComponent<CalendarFormComponent<typeof DatePickerRoot>> = withClearableModel(withCalendarDefaults(withDateEditingFormat(DatePickerRoot), {
  anchor: UIDatePickerAnchor, inputs: [UIDatePickerInput],
}), null);
export const UIDateRangePickerAnchor: typeof DateRangePickerAnchor = withClearableControl(DateRangePickerAnchor, "anchor");
export const UIDateRangePickerContent: typeof DateRangePickerContent = withRangeContentPresentation(DateRangePickerContent);
export const UIDateRangePicker: ClearableComponent<CalendarFormComponent<typeof DateRangePickerRoot, EditableDatePickerOptions>> = withClearableModel(withCalendarDefaults<typeof DateRangePickerRoot, EditableDatePickerOptions>(withDateEditingFormat(DateRangePickerRoot), {
  anchor: UIDateRangePickerAnchor, content: UIDateRangePickerContent, inputs: [UIDateRangePickerStartInput, UIDateRangePickerEndInput], summary: true,
  grid: UIDateRangePickerGrid, cell: UIDateRangePickerCell, monthCell: UIDateRangePickerMonthCell,
}), null, { label: "범위 지우기" });
export const UIDateTimePickerAnchor: typeof DateTimePickerAnchor = withClearableControl(DateTimePickerAnchor, "anchor");
const DateTimePicker: ReturnType<typeof withPickerInputPrecision<typeof DateTimePickerRoot>> = withPickerInputPrecision(DateTimePickerRoot);
type DateTimePickerOptions<Layout extends string> = { timeChoices?: boolean; inputLayout?: Layout; portal?: boolean };
type SingleDateTimePickerOptions = DateTimePickerOptions<"split" | "combined">;
type RangeDateTimePickerOptions = DateTimePickerOptions<"summary" | "split">;
export const UIDateTimePickerTimeChoices: typeof DateTimePickerTimeChoices = withStyledTimeChoices(DateTimePickerTimeChoices);
export const UIDateTimeRangePickerTimeChoices: typeof DateTimeRangePickerTimeChoices = withStyledTimeChoices(DateTimeRangePickerTimeChoices);
export const UIDateTimePicker: ClearableComponent<CalendarFormComponent<typeof DateTimePicker, SingleDateTimePickerOptions>> = withClearableModel(withCalendarDefaults<typeof DateTimePicker, SingleDateTimePickerOptions>(DateTimePicker, {
  kind: "date-time", anchor: UIDateTimePickerAnchor, inputs: [UIDateTimePickerDateInput, UIDateTimePickerTimeInput],
  alternateInputs: [UIDateTimePickerDateTimeInput],
  timeChoices: UIDateTimePickerTimeChoices,
}), null);
const DateTimeRangePicker: ReturnType<typeof withPickerInputPrecision<typeof DateTimeRangePickerRoot>> = withPickerInputPrecision(DateTimeRangePickerRoot);

export const UIDateTimeRangePickerAnchor: typeof DateTimeRangePickerAnchor = withClearableControl(DateTimeRangePickerAnchor, "anchor");
export const UIDateTimeRangePickerContent: typeof DateTimeRangePickerContent = withRangeContentPresentation(DateTimeRangePickerContent);

function renderTimeItems(state: TimePickerColumnSlotProps) {
  return state.choices.map(choice => h(TimePickerItem, { key: choice.id, value: choice.id }, () => choice.label));
}

function withStyledTimeChoices<Part extends Component>(part: Part): Part {
  return defineComponent({
    inheritAttrs: false,
    setup(_, { attrs, slots }) {
      const { locale } = useUITemporalDisplay();
      return () => h(part, attrs, {
        default: (state: DateTimeTimeChoicesSlotProps) => slots.default?.(state) ?? (state.empty
          ? h("p", { role: "status" }, locale.value.startsWith("ko") ? "선택할 수 있는 시간이 없습니다." : "No available times.")
          : state.columns.map(column => h(UITimePickerColumn, { key: column.part, part: column.part }, { default: renderTimeItems }))),
      });
    },
  }) as unknown as Part;
}

const TimePickerDefaultParts = defineComponent({
  props: { label: String },
  setup(props) {
    const { locale } = useUITemporalDisplay();
    return () => {
      const korean = locale.value.startsWith("ko");
      const label = props.label ?? (korean ? "시간" : "Time");
      return [
        h(UITimePickerInput, { label }),
        h(TimePickerTrigger, { "aria-label": korean ? "시간 선택 열기" : "Open time picker" }, () =>
          h(Clock, { "aria-hidden": true })),
        h(UITimePickerContent, null, {
          default: (state: TimePickerContentSlotProps) => state.columns.map(column =>
            h(UITimePickerColumn, { key: column.part, part: column.part }, { default: renderTimeItems })),
        }),
      ];
    };
  },
});
const InlineTimeField = defineComponent({
  inheritAttrs: false,
  props: {
    name: String, form: String,
    required: { type: Boolean, default: undefined },
    readonly: { type: Boolean, default: undefined },
    disabled: { type: Boolean, default: undefined },
    value: Object as PropType<TimeValue | null>,
    precision: String as PropType<TimeFieldPrecision>,
  },
  setup(props, { slots }) {
    const formatter = useTemporalFormatter();
    const { locale } = useUITemporalDisplay();
    const renderField = useCompositeValueForm(props, {
      focus: '[role="listbox"]',
      get requiredMessage() { return locale.value.startsWith("ko") ? "시간을 선택하세요." : "Choose a time."; },
      values() {
        if (!props.value) return [];
        const precision = props.precision ?? "minute";
        const format = formatter.value?.timeFieldFormat(precision);
        return [formatTimeFieldValue(props.value, format?.ok ? format.value : createTimeFieldFormat({ precision }))];
      },
    });
    return () => renderField(bindings => slots.default?.(bindings)[0]);
  },
});

type TimePickerInstance = InstanceType<typeof TimePickerRoot>;
type TimePickerWithInline = new () => Omit<TimePickerInstance, "$props"> & {
  $props: TimePickerInstance["$props"] & { inline?: boolean };
};

const TimePickerComposition = defineComponent({
  inheritAttrs: false,
  props: { inline: Boolean },
  setup(props, { attrs, slots, expose }) {
    const clear = useFieldClear();
    const picker = shallowRef<TimePickerInstance>();
    expose({
      get element() { return picker.value?.element ?? null; },
      focus(options?: FocusOptions) {
        if (!props.inline) return picker.value?.focus(options);
        const root = picker.value?.$el;
        if (root instanceof HTMLElement) root.querySelector<HTMLElement>('[role="listbox"]')?.focus(options);
      },
      select: () => picker.value?.select(),
      requestClose: () => picker.value?.requestClose(),
      selectChoice: (...args: Parameters<TimePickerExpose["selectChoice"]>) => picker.value?.selectChoice(...args) ?? false,
    } satisfies TimePickerExpose);

    function renderPicker(bindings: Record<string, unknown>) {
      const asChild = controlFlag(attrs.asChild ?? attrs["as-child"]);
      const framed = props.inline && !asChild && clear?.enabled.value;
      return h(TimePickerRoot, mergeProps(bindings, { ref: picker, class: framed ? "ui-clearable-inline" : undefined }), asChild ? slots : {
        default: (state: TimePickerRootSlotProps) => [
          slots.default?.(state) ?? (props.inline ? state.parts.map(part => h(UITimePickerColumn, { part, key: part }, {
            default: renderTimeItems,
          })) : h(TimePickerDefaultParts, { label: attrs.label as string | undefined })),
          clear?.enabled.value ? h(UIFieldClear) : null,
        ],
      });
    }

    return () => {
      if (!props.inline || slots.default || controlFlag(attrs.asChild ?? attrs["as-child"])) return renderPicker(attrs);
      const { name, form, required, disabled, readonly, ...visual } = attrs;
      return h(InlineTimeField, definedControlAttrs({
        name: name as string | undefined, form: form as string | undefined, required: controlFlag(required),
        disabled: controlFlag(disabled), readonly: controlFlag(readonly),
        value: attrs.modelValue as TimeValue | null, precision: attrs.precision as TimeFieldPrecision | undefined,
      }), { default: (bindings: Record<string, unknown>) => renderPicker({ ...visual, ...bindings }) });
    };
  },
}) as unknown as TimePickerWithInline;

export const UITimePicker: ClearableComponent<TimePickerWithInline> = withClearableModel(TimePickerComposition, null, {
  expose: ["element", "focus", "select", "requestClose", "selectChoice"],
});

export const UICalendarContent: typeof CalendarContent = withClearableControl(CalendarContent, "anchor");
export const UICalendar: ClearableComponent<CalendarFormComponent<typeof CalendarRoot, CalendarTimeModels>> = withClearableModel(withCalendarDefaults<typeof CalendarRoot, CalendarTimeModels>(CalendarRoot, {
  content: UICalendarContent, inputs: [CalendarInput], timePicker: UITimePicker, inlineTime: "single",
}), null, { label: "날짜 지우기" });

export const UIDateTimeRangePicker: ClearableComponent<CalendarFormComponent<typeof DateTimeRangePicker, RangeDateTimePickerOptions>> = withClearableModel(withCalendarDefaults<typeof DateTimeRangePicker, RangeDateTimePickerOptions>(DateTimeRangePicker, {
  kind: "date-time-range", anchor: UIDateTimeRangePickerAnchor, content: UIDateTimeRangePickerContent,
  inputs: [UIDateTimeRangePickerStartDateTimeInput, UIDateTimeRangePickerEndDateTimeInput], summary: true,
  alternateInputs: [UIDateTimeRangePickerStartDateInput, UIDateTimeRangePickerStartTimeInput, UIDateTimeRangePickerEndDateInput, UIDateTimeRangePickerEndTimeInput],
  grid: UIDateTimeRangePickerGrid, cell: UIDateTimeRangePickerCell, monthCell: UIDateTimeRangePickerMonthCell,
  timeChoices: UIDateTimeRangePickerTimeChoices,
}), null, { label: "범위 지우기" });
export const UIMonthPickerAnchor: typeof MonthPickerAnchor = withClearableControl(MonthPickerAnchor, "anchor");
export const UIMonthPicker: ClearableComponent<CalendarFormComponent<typeof MonthPickerRoot, EditableDatePickerOptions>> = withClearableModel(withCalendarDefaults<typeof MonthPickerRoot, EditableDatePickerOptions>(MonthPickerRoot, {
  kind: "month", anchor: UIMonthPickerAnchor, inputs: [UIMonthPickerInput], summary: true,
}), null);
export const UIMonthRangePickerAnchor: typeof MonthRangePickerAnchor = withClearableControl(MonthRangePickerAnchor, "anchor");
export const UIMonthRangePickerContent: typeof MonthRangePickerContent = withRangeContentPresentation(MonthRangePickerContent);
export const UIMonthRangePicker: ClearableComponent<CalendarFormComponent<typeof MonthRangePickerRoot, EditableDatePickerOptions>> = withClearableModel(withCalendarDefaults<typeof MonthRangePickerRoot, EditableDatePickerOptions>(MonthRangePickerRoot, {
  kind: "month", anchor: UIMonthRangePickerAnchor, content: UIMonthRangePickerContent, inputs: [UIMonthRangePickerStartInput, UIMonthRangePickerEndInput], summary: true,
  grid: UIMonthRangePickerGrid, monthCell: UIMonthRangePickerCell,
}), null, { label: "범위 지우기" });
export const UIYearPickerAnchor: typeof YearPickerAnchor = withClearableControl(YearPickerAnchor, "anchor");
export const UIYearPicker: ClearableComponent<CalendarFormComponent<typeof YearPickerRoot, EditableDatePickerOptions>> = withClearableModel(withCalendarDefaults<typeof YearPickerRoot, EditableDatePickerOptions>(YearPickerRoot, {
  kind: "year", anchor: UIYearPickerAnchor, inputs: [UIYearPickerInput], summary: true,
}), null);
export const UIYearRangePickerAnchor: typeof YearRangePickerAnchor = withClearableControl(YearRangePickerAnchor, "anchor");
export const UIYearRangePickerContent: typeof YearRangePickerContent = withRangeContentPresentation(YearRangePickerContent);
export const UIYearRangePicker: ClearableComponent<CalendarFormComponent<typeof YearRangePickerRoot, EditableDatePickerOptions>> = withClearableModel(withCalendarDefaults<typeof YearRangePickerRoot, EditableDatePickerOptions>(YearRangePickerRoot, {
  kind: "year", anchor: UIYearRangePickerAnchor, content: UIYearRangePickerContent, inputs: [UIYearRangePickerStartInput, UIYearRangePickerEndInput], summary: true,
  grid: UIYearRangePickerGrid, yearCell: UIYearRangePickerCell,
}), null, { label: "범위 지우기" });

export type { DateValue as UIDateValue } from "@sectile/vue/temporal/calendar";
export type { TimeValue as UITimeValue } from "@sectile/temporal/time-field";
export type { DateTimeValue as UIDateTimeValue, DateTimeRange as UIDateTimeRange } from "@sectile/temporal/date-time-field";
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
export const UIRangeCalendarContent: typeof RangeCalendarContent = withClearableControl(withRangeContentPresentation(RangeCalendarContent), "anchor");
export const UIRangeCalendar: ClearableComponent<CalendarFormComponent<typeof RangeCalendarRoot, RangeCalendarTimeModels>> = withClearableModel(withCalendarDefaults<typeof RangeCalendarRoot, RangeCalendarTimeModels>(InlineRangeCalendar, {
  content: UIRangeCalendarContent, inputs: [RangeCalendarStartInput, RangeCalendarEndInput],
  grid: UIRangeCalendarGrid, cell: UIRangeCalendarCell, monthCell: UIRangeCalendarMonthCell,
  timePicker: UITimePicker, inlineTime: "range",
}), null, { label: "범위 지우기" });
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
  YearRangePickerPreviousPage as UIYearRangePickerPreviousPage,
  YearRangePickerNextPage as UIYearRangePickerNextPage,
} from "@sectile/vue/temporal/year-range-picker";
