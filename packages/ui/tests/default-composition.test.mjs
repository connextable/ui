import assert from "node:assert/strict";
import test from "node:test";
import { createSSRApp, h } from "vue";
import { renderToString } from "vue/server-renderer";
import {
  UICalendar, UIDatePicker, UIDateRangeField, UIDateRangePicker,
  UIDateTimePicker, UIDateTimeRangeField, UIDateTimeRangePicker,
  UIMonthPicker, UIMonthRangePicker, UIRangeCalendar,
  UITimePicker, UITimeRangeField, UIYearPicker, UIYearRangePicker,
} from "@connextable/ui";

const date = { year: 2026, month: 8, day: 22 };
const endDate = { ...date, day: 25 };
const time = { hour: 9, minute: 30, second: 0, millisecond: 0 };
const endTime = { ...time, hour: 17 };
const dates = { start: date, end: endDate };
const times = { start: time, end: endTime };
const dateTime = { date, time };
const period = { start: dateTime, end: { date: endDate, time: endTime } };

function render(component, props, content) {
  return renderToString(createSSRApp({ render: () => h(component, props, content) }));
}

test("calendar and picker roots provide interactive parts without a default slot", async () => {
  const calendars = [
    [UICalendar, date], [UIRangeCalendar, dates], [UIDatePicker, date],
    [UIDateRangePicker, dates], [UIDateTimePicker, dateTime], [UIDateTimeRangePicker, period],
    [UIMonthPicker, date], [UIMonthRangePicker, dates], [UIYearPicker, date], [UIYearRangePicker, dates],
  ];
  for (const [component, defaultValue] of calendars) {
    const html = await render(component, { defaultValue, defaultOpen: true, label: "예약" });
    assert.match(html, /role="grid"/);
    assert.match(html, /role="gridcell"/);
  }
  const range = await render(UIDateTimeRangePicker, { defaultValue: period, defaultOpen: true });
  assert.equal([...range.matchAll(/role="listbox"/g)].length, 4);
  assert.match(range, /09:30/);
  assert.match(range, /17:30/);
  const clock = await render(UITimePicker, { defaultValue: time, defaultOpen: true });
  assert.match(clock, /aria-haspopup="dialog"/);
  assert.match(clock, /role="listbox"/);
});

test("range fields render both editable endpoints with their labels", async () => {
  for (const [component, defaultValue] of [
    [UIDateRangeField, dates], [UITimeRangeField, times], [UIDateTimeRangeField, period],
  ]) {
    const html = await render(component, { defaultValue, startLabel: "시작", endLabel: "종료" });
    assert.match(html, /<input[^>]+aria-label="시작"/);
    assert.match(html, /<input[^>]+aria-label="종료"/);
  }
});
