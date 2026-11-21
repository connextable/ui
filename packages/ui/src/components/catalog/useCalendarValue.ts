import { formatDateFieldValue, formatDateValue, type DateValue } from "@sectile/temporal/date-field";
import { useTemporalFormatter } from "@sectile/vue/temporal/temporal-provider";

export type CalendarGranularity = "day" | "month" | "year";

export function useCalendarValue() {
  const formatter = useTemporalFormatter();
  return (date: DateValue, granularity: CalendarGranularity = "day", format?: (date: DateValue) => string) => {
    const datetime = formatDateValue(date);
    if (granularity === "month") {
      const localized = formatter.value?.month(date, "long");
      return { datetime: datetime.slice(0, -3), label: format?.(date) ?? (localized?.ok ? localized.value : datetime.slice(0, -3)) };
    }
    if (granularity === "year") {
      const localized = formatter.value?.year(date);
      return { datetime: String(date.year), label: format?.(date) ?? (localized?.ok ? localized.value : String(date.year)) };
    }
    const localized = formatter.value?.dateFieldFormat();
    return { datetime, label: format?.(date) ?? formatDateFieldValue(date, localized?.ok ? localized.value : undefined) };
  };
}
