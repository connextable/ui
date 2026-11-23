import { formatDateFieldValue, type DateValue } from "@sectile/temporal/date-field";
import { formatDateTimeFieldValue, formatDateTimeValue, type DateTimeValue } from "@sectile/temporal/date-time-field";
import { formatTimeFieldValue, type TimeValue } from "@sectile/temporal/time-field";
import { useTemporalFormatter } from "@sectile/vue/temporal/temporal-provider";
import { computed, inject, type InjectionKey, type Ref } from "vue";

type Year = Pick<DateValue, "year">;
type YearMonth = Pick<DateValue, "year" | "month">;
type DisplayPart = "yearMonth" | "year" | "month" | "day" | "weekday" | "date" | "dateTime";

type CivilDateFormat = Omit<Intl.DateTimeFormatOptions, "calendar" | "timeZone" | "timeZoneName">;
export type UITemporalDisplayFormats = Partial<Record<DisplayPart, CivilDateFormat>>;

export const defaultTemporalFormatting = { locale: "ko-KR-u-hc-h23", timeZone: "Asia/Seoul" };
export const temporalDisplayFormatsKey: InjectionKey<Readonly<Ref<UITemporalDisplayFormats | undefined>>> =
  Symbol("UITemporalDisplayFormats");

const defaultFormats: UITemporalDisplayFormats = {
  yearMonth: { year: "numeric", month: "long" },
  year: { year: "numeric" },
  month: { month: "long" },
  weekday: { weekday: "short" },
} satisfies UITemporalDisplayFormats;

export function useTemporalDisplay() {
  const temporal = useTemporalFormatter();
  const formats = inject(temporalDisplayFormatsKey, undefined);
  const locale = computed(() => temporal.value?.locale ?? defaultTemporalFormatting.locale);
  const dayNumber = computed(() => new Intl.NumberFormat(locale.value, { useGrouping: false }));
  const formatters = computed(() => {
    const options = formats?.value;
    const language = locale.value;
    const cache = new Map<DisplayPart, Intl.DateTimeFormat>();
    return (part: DisplayPart) => {
      const config = options?.[part] ?? defaultFormats[part];
      if (!config) return undefined;
      let format = cache.get(part);
      if (!format) {
        format = new Intl.DateTimeFormat(language, { ...config, calendar: "gregory", timeZone: "UTC" });
        cache.set(part, format);
      }
      return format;
    };
  });

  function civilDate({ year, month = 1, day = 1 }: Year & Partial<DateValue>, time?: DateTimeValue["time"]) {
    const date = new Date(0);
    date.setUTCFullYear(year, month - 1, day);
    if (time) date.setUTCHours(time.hour, time.minute, time.second, time.millisecond);
    return date;
  }

  function label(part: "year" | "yearMonth" | "month" | "weekday", value: Year) {
    return formatters.value(part)!.format(civilDate(value));
  }

  function year(value: Year) {
    return label("year", value);
  }

  return {
    locale,
    year,
    yearMonth: (value: YearMonth) => label("yearMonth", value),
    month: (value: YearMonth) => label("month", value),
    day: (value: DateValue) => formatters.value("day")?.format(civilDate(value)) ?? dayNumber.value.format(value.day),
    weekday: (value: DateValue) => label("weekday", value),
    yearRange(start: Year | undefined, end: Year | undefined) {
      return start && end ? `${year(start)}–${year(end)}` : "";
    },
    date(value: DateValue) {
      const display = formatters.value("date");
      if (display) return display.format(civilDate(value));
      const format = temporal.value?.dateFieldFormat();
      return formatDateFieldValue(value, format?.ok ? format.value : undefined);
    },
    dateTime(value: DateTimeValue) {
      const display = formatters.value("dateTime");
      if (display) return display.format(civilDate(value.date, value.time));
      const { second, millisecond } = value.time;
      const precision = millisecond ? "millisecond" : second ? "second" : "minute";
      const format = temporal.value?.dateTimeFieldFormat(precision);
      return format?.ok ? formatDateTimeFieldValue(value, format.value) : formatDateTimeValue(value).replace("T", " ");
    },
    time(value: TimeValue) {
      const precision = value.millisecond ? "millisecond" : value.second ? "second" : "minute";
      const format = temporal.value?.timeFieldFormat(precision);
      return formatTimeFieldValue(value, format?.ok ? format.value : undefined);
    },
  };
}
