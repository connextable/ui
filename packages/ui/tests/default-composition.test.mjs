import assert from "node:assert/strict";
import test from "node:test";
import { createSSRApp, h } from "vue";
import { renderToString } from "vue/server-renderer";
import {
  UICalendar, UIDatePicker, UIDateRangeField, UIDateRangePicker,
  UIDateTimePicker, UIDateTimeRangeField, UIDateTimeRangePicker,
  UIForm, UIFormField, UIMonthPicker, UIMonthRangePicker, UIRangeCalendar,
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

test("inline calendars include year/month navigation and opt in to independent time models", async () => {
  const dateOnly = await render(UICalendar, { defaultValue: date });
  assert.match(dateOnly, /data-part="year-view-trigger"/);
  assert.doesNotMatch(dateOnly, /role="listbox"/);

  const calendar = await render(UICalendar, { name: "date", defaultValue: date, time: null });
  assert.match(calendar, /<input[^>]+name="date"[^>]+value="2026-08-22"/);
  assert.equal([...calendar.matchAll(/role="listbox"/g)].length, 2);

  const range = await render(UIRangeCalendar, { defaultValue: dates, startTime: time, endTime });
  assert.match(range, /data-part="year-view-trigger"/);
  assert.match(range, /data-endpoint="start"/);
  assert.match(range, /data-endpoint="end"/);
  assert.equal([...range.matchAll(/role="listbox"/g)].length, 4);
});

test("the standalone inline time picker keeps a native submission value and validation target", async () => {
  const html = await render(UIForm, null, () => h(UIFormField, {
    name: "arrival", label: "Arrival", labelMode: "labelledby", required: true,
  }, () => h(UITimePicker, { inline: true, defaultValue: time })));
  assert.match(html, /<input[^>]+name="arrival"[^>]+value="09:30"/);
  assert.match(html, /<select[^>]+class="ui-form-constraint"[^>]+required/);
  assert.doesNotMatch(html, /aria-haspopup="dialog"/);
});

test("year navigation keeps a year selectable when only part of it is available", async () => {
  const html = await render(UIRangeCalendar, {
    defaultView: "year", defaultValue: dates, policies: { min: date, max: endDate },
  });
  const yearCells = [...html.matchAll(/<[^>]+role="gridcell"[^>]*>(202[567])년<\//g)];
  assert.deepEqual(yearCells.map(([, year]) => year), ["2025", "2026", "2027"]);
  for (const [cell, year] of yearCells) assert.match(cell, new RegExp(`aria-disabled="${year !== "2026"}"`));
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
