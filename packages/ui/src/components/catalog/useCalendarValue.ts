import { formatDateValue, type DateValue } from "@sectile/temporal/date-field";
import { useTemporalDisplay } from "./temporal-display";

export type CalendarGranularity = "day" | "month" | "year";
type CalendarValueFormat = CalendarGranularity | "month-without-year";

export function useCalendarValue() {
  const display = useTemporalDisplay();
  return (date: DateValue, granularity: CalendarValueFormat = "day", format?: (date: DateValue) => string) => {
    const datetime = formatDateValue(date);
    if (granularity === "month" || granularity === "month-without-year") {
      const displayMonth = granularity === "month-without-year" ? display.month : display.yearMonth;
      return { datetime: datetime.slice(0, -3), label: format?.(date) ?? displayMonth(date) };
    }
    if (granularity === "year") {
      return { datetime: String(date.year), label: format?.(date) ?? display.year(date) };
    }
    return { datetime, label: format?.(date) ?? display.date(date) };
  };
}
