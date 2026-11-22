import assert from "node:assert/strict";
import test from "node:test";
import { createSSRApp, h } from "vue";
import { renderToString } from "vue/server-renderer";
import {
  UIDateField, UIDateRangeField, UIDateRangeFieldStartInput, UIDateRangeFieldEndInput,
  UIDateTimeField, UIDateTimePicker, UIDateTimePickerDateInput, UIDateTimePickerTimeInput,
  UITemporalProvider, UITimeField, UITimePicker, UITimePickerInput,
} from "@connextable/ui";

const date = { year: 2026, month: 8, day: 22 };
const time = { hour: 17, minute: 30, second: 12, millisecond: 345 };
const seconds = { ...time, millisecond: 0 };
const inputFormats = {
  date: { order: ["day", "month", "year"], separator: "/" },
  time: { hourCycle: "h12", separator: ".", fractionSeparator: ",", dayPeriods: ["AM", "PM"] },
  dateTime: { order: ["time", "date"], separator: " · " },
};

function assertInput(html, id, value, placeholder) {
  const input = html.match(new RegExp(`<input\\b[^>]*\\bid="${id}"[^>]*>`))?.[0];
  assert.ok(input, `SSR should render the ${id} input`);
  assert.ok(input.includes(`value="${value}"`), input);
  if (placeholder) assert.ok(input.includes(`placeholder="${placeholder}"`), input);
}

test("custom formats reach the SSR input values and placeholders of fields and pickers", async () => {
  const html = await renderToString(createSSRApp({
    render: () => h(UITemporalProvider, { inputFormats }, () => [
      h(UIDateField, { id: "date", defaultValue: date }),
      h(UIDateField, { id: "native-date", defaultValue: date, native: true }),
      h(UITimeField, { id: "time", defaultValue: time, precision: "millisecond" }),
      h(UIDateTimeField, { id: "appointment", defaultValue: { date, time: seconds }, precision: "second" }),
      h(UIDateRangeField, { defaultValue: { start: date, end: { ...date, day: 25 } } }, () => [
        h(UIDateRangeFieldStartInput, { id: "range-start" }),
        h(UIDateRangeFieldEndInput, { id: "range-end" }),
      ]),
      h(UIDateTimePicker, { defaultValue: { date, time } }, () => [
        h(UIDateTimePickerDateInput, { id: "picker-date" }),
        h(UIDateTimePickerTimeInput, { id: "picker-time" }),
      ]),
      h(UITimePicker, { defaultValue: seconds, precision: "second" }, () => [
        h(UITimePickerInput, { id: "time-picker" }),
      ]),
      h(UITemporalProvider, { inputFormats: { date: { separator: "-" } } }, () =>
        h(UIDateField, { id: "nested-date", defaultValue: date })),
    ]),
  }));

  assertInput(html, "date", "22/08/2026", "DD/MM/YYYY");
  assertInput(html, "native-date", "2026-08-22");
  assertInput(html, "time", "05.30.12,345 PM", "hh.mm.ss,SSS AM/PM");
  assertInput(html, "appointment", "05.30.12 PM · 22/08/2026", "hh.mm.ss AM/PM · DD/MM/YYYY");
  assertInput(html, "range-start", "22/08/2026", "DD/MM/YYYY");
  assertInput(html, "range-end", "25/08/2026", "DD/MM/YYYY");
  assertInput(html, "picker-date", "22/08/2026", "DD/MM/YYYY");
  assertInput(html, "picker-time", "05.30.12,345 PM", "hh.mm.ss,SSS AM/PM");
  assertInput(html, "time-picker", "05.30.12 PM", "hh.mm.ss AM/PM");
  assertInput(html, "nested-date", "22-08-2026", "DD-MM-YYYY");
});
