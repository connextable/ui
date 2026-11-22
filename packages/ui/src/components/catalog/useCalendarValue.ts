import { formatDateValue, type DateValue } from "@sectile/temporal/date-field";
import { useUITemporalDisplay } from "./temporal-display";

export type CalendarGranularity = "day" | "month" | "year";

export function useCalendarValue() {
  const display = useUITemporalDisplay();
  return (date: DateValue, granularity: CalendarGranularity = "day", format?: (date: DateValue) => string) => {
    const datetime = formatDateValue(date);
    if (granularity === "month") {
      return { datetime: datetime.slice(0, -3), label: format?.(date) ?? display.yearMonth(date) };
    }
    if (granularity === "year") {
      return { datetime: String(date.year), label: format?.(date) ?? display.year(date) };
    }
    return { datetime, label: format?.(date) ?? display.date(date) };
  };
}
