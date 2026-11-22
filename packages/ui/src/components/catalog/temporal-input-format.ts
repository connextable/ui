import { okResult } from "@sectile/core/result";
import { createDateFieldFormat, type DateFieldFormat, type DateFieldFormatOptions } from "@sectile/temporal/date-field";
import { createDateTimeFieldFormat, type DateTimeFieldFormatOptions, type DateTimeRange, type DateTimeValue } from "@sectile/temporal/date-time-field";
import { createTimeFieldFormat, type TimeFieldFormat, type TimeFieldHourCycle, type TimeFieldPrecision } from "@sectile/temporal/time-field";
import type { DateTimePickerRoot, DateTimePickerRootSlotProps } from "@sectile/vue/temporal/date-time-picker";
import type { DateTimeRangePickerRoot, DateTimeRangePickerRootSlotProps } from "@sectile/vue/temporal/date-time-range-picker";
import { TemporalProvider, useTemporalFormatter, useTemporalReferenceDate, type TemporalFormatter } from "@sectile/vue/temporal/temporal-provider";
import { computed, defineComponent, getCurrentInstance, h, inject, provide, type Component, type ComponentInternalInstance, type ComputedRef, type InjectionKey, type PropType } from "vue";
import { defaultTemporalFormatting } from "./temporal-display";

export interface UITemporalInputFormats {
  date?: {
    order?: DateFieldFormatOptions["order"];
    separator?: string;
  };
  time?: {
    hourCycle?: TimeFieldHourCycle;
    separator?: string;
    fractionSeparator?: string;
    dayPeriodPosition?: "before" | "after";
    dayPeriods?: readonly [string, string];
  };
  dateTime?: Pick<DateTimeFieldFormatOptions, "order" | "separator">;
}

export const temporalInputFormatsKey: InjectionKey<ComputedRef<UITemporalInputFormats | undefined>> =
  Symbol("UITemporalInputFormats");

function dateFormat(base: DateFieldFormat, options: UITemporalInputFormats["date"]) {
  if (!options) return base;
  const { order, separator } = options;
  return createDateFieldFormat({
    order: order ?? base.order,
    literals: separator === undefined ? base.literals : ["", separator, separator, ""],
    digits: base.digits,
  });
}

function localDayPeriods(locale: string): readonly [string, string] {
  const format = new Intl.DateTimeFormat(locale, { hour: "numeric", hourCycle: "h12", timeZone: "UTC" });
  const period = (hour: number) => format.formatToParts(Date.UTC(2026, 0, 1, hour)).find(part => part.type === "dayPeriod")?.value;
  return [period(9) ?? "AM", period(21) ?? "PM"];
}

function timeFormat(base: TimeFieldFormat, options: UITemporalInputFormats["time"], locale: string) {
  if (!options) return base;
  const hourCycle = options.hourCycle ?? base.hourCycle;
  const halfDay = hourCycle === "h11" || hourCycle === "h12";
  const position = options.dayPeriodPosition ?? (base.order[0] === "dayPeriod" ? "before" : "after");
  const order = base.order.filter(part => part !== "dayPeriod");
  const parts = halfDay ? position === "before" ? ["dayPeriod", ...order] as const : [...order, "dayPeriod"] as const : order;
  const literals = parts.map((part, index) => {
    const previous = parts[index - 1];
    const baseIndex = base.order.indexOf(part);
    const inherited = baseIndex >= 0 && base.order[baseIndex - 1] === previous ? base.literals[baseIndex] : undefined;
    if (previous === undefined) return inherited ?? "";
    if (part === "dayPeriod" || previous === "dayPeriod") return inherited ?? " ";
    if (part === "millisecond") return options.fractionSeparator ?? inherited ?? ".";
    return options.separator ?? inherited ?? ":";
  });
  literals.push(parts.at(-1) === base.order.at(-1) ? base.literals.at(-1) ?? "" : "");
  return createTimeFieldFormat({
    precision: base.precision,
    hourCycle,
    order: parts,
    literals,
    digits: base.digits,
    ...(halfDay ? { dayPeriods: options.dayPeriods ?? base.dayPeriods ?? localDayPeriods(locale) } : {}),
  });
}

function withInputFormats(base: TemporalFormatter, options: UITemporalInputFormats): TemporalFormatter {
  const date = base.dateFieldFormat();
  const resolvedDate = date.ok ? okResult<DateFieldFormat, never>(dateFormat(date.value, options.date)) : date;
  const times = new Map<TimeFieldPrecision, ReturnType<TemporalFormatter["timeFieldFormat"]>>();
  const dateTimes = new Map<TimeFieldPrecision, ReturnType<TemporalFormatter["dateTimeFieldFormat"]>>();

  return {
    ...base,
    dateOrder: options.date?.order ?? base.dateOrder,
    dateFieldFormat: () => resolvedDate,
    timeFieldFormat(precision = "minute") {
      const cached = times.get(precision);
      if (cached) return cached;
      const fallback = base.timeFieldFormat(precision);
      if (!fallback.ok || !options.time) return fallback;
      const result = okResult<TimeFieldFormat, never>(timeFormat(fallback.value, options.time, base.locale));
      times.set(precision, result);
      return result;
    },
    dateTimeFieldFormat(precision = "minute") {
      const cached = dateTimes.get(precision);
      if (cached) return cached;
      const fallback = base.dateTimeFieldFormat(precision);
      if (!fallback.ok) return fallback;
      const format = fallback.value;
      const result = okResult<ReturnType<typeof createDateTimeFieldFormat>, never>(createDateTimeFieldFormat({
        date: options.date && resolvedDate.ok ? resolvedDate.value : format.date,
        time: timeFormat(format.time, options.time, base.locale),
        order: options.dateTime?.order ?? format.order,
        separator: options.dateTime?.separator ?? format.separator,
      }));
      dateTimes.set(precision, result);
      return result;
    },
  };
}

interface SectileTemporalContext {
  formatter: ReturnType<typeof useTemporalFormatter>;
  referenceDate: ReturnType<typeof useTemporalReferenceDate>;
}

type ProviderInstance = ComponentInternalInstance & { provides: Record<symbol, SectileTemporalContext | undefined> };

function provideTemporalFormatter(transform: (formatter: TemporalFormatter) => TemporalFormatter) {
  const formatter = useTemporalFormatter();
  const referenceDate = useTemporalReferenceDate();
  let provider = (getCurrentInstance()?.parent as ProviderInstance | undefined)?.provides;
  // Vue's TemporalProvider accepts locale and time zone. Combined and time
  // fields still read custom editing formats through its formatter.
  while (provider) {
    const context = provider;
    const key = Object.getOwnPropertySymbols(context).find(symbol =>
      context[symbol]?.formatter === formatter && context[symbol]?.referenceDate === referenceDate);
    if (key !== undefined) {
      provide(key, {
        ...context[key],
        formatter: computed(() => formatter.value && transform(formatter.value)),
      });
      return true;
    }
    provider = Object.getPrototypeOf(provider);
  }
  return false;
}

const TemporalFormatterScope = defineComponent({
  props: {
    transform: { type: Function as PropType<(formatter: TemporalFormatter) => TemporalFormatter>, required: true },
  },
  setup(props, { slots }) {
    const formatter = useTemporalFormatter();
    provideTemporalFormatter(formatter => props.transform(formatter));
    return () => slots.default?.(formatter);
  },
});

export const TemporalInputFormatProvider = defineComponent({
  setup(_, { slots }) {
    const formats = inject(temporalInputFormatsKey, undefined);
    const connected = provideTemporalFormatter(formatter =>
      formats?.value ? withInputFormats(formatter, formats.value) : formatter);
    return () => {
      if (!connected && formats?.value) throw new Error("UITemporalProvider could not connect inputFormats to Sectile.");
      return slots.default?.();
    };
  },
});

type DateTimeRoot = typeof DateTimePickerRoot | typeof DateTimeRangePickerRoot;
type PickerWithInputPrecision<Root extends DateTimeRoot> = new () => Omit<InstanceType<Root>, "$props"> & {
  $props: InstanceType<Root>["$props"] & { timePrecision?: TimeFieldPrecision };
};

function pickerInputPrecision(value: DateTimeValue | DateTimeRange | null | undefined, requested: TimeFieldPrecision): TimeFieldPrecision {
  if (!value || requested === "millisecond") return requested;
  const times = "start" in value ? [value.start.time, value.end.time] : [value.time];
  if (times.some(time => time.millisecond !== 0)) return "millisecond";
  return times.some(time => time.second !== 0) ? "second" : requested;
}

export function withPickerInputPrecision<Root extends DateTimeRoot>(root: Root): PickerWithInputPrecision<Root> {
  return defineComponent({
    inheritAttrs: false,
    props: { timePrecision: { type: String as PropType<TimeFieldPrecision>, default: "minute" } },
    setup(props, { attrs, slots }) {
      const formatter = useTemporalFormatter();
      const inputPrecision = computed(() => {
        const value = (attrs.modelValue === undefined ? attrs.defaultValue ?? attrs["default-value"] : attrs.modelValue) as DateTimeValue | DateTimeRange | null | undefined;
        return pickerInputPrecision(value, props.timePrecision);
      });
      const renderWithInputPrecision = () => h(TemporalFormatterScope, {
        transform: base => ({
          ...base,
          // The native picker inputs request the Provider's millisecond format.
          timeFieldFormat: precision => base.timeFieldFormat(precision === "millisecond" ? inputPrecision.value : precision),
          dateTimeFieldFormat: precision => base.dateTimeFieldFormat(precision === "millisecond" ? inputPrecision.value : precision),
        }),
      }, {
        default: (inherited: ReturnType<typeof useTemporalFormatter>) => h(root as Component, attrs, {
          ...slots,
          default: (state: DateTimePickerRootSlotProps | DateTimeRangePickerRootSlotProps) => h(TemporalFormatterScope, {
            transform: base => inherited.value ?? base,
          }, { default: () => slots.default?.(state) }),
        }),
      });

      return () => formatter.value ? renderWithInputPrecision() : h(TemporalProvider, {
        formatting: defaultTemporalFormatting,
      }, { default: renderWithInputPrecision });
    },
  }) as unknown as PickerWithInputPrecision<Root>;
}
