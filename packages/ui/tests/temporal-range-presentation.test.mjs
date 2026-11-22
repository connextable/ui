import assert from "node:assert/strict";
import test from "node:test";
import { createSSRApp, h } from "vue";
import { renderToString } from "vue/server-renderer";
import {
  UIMonthRangePicker, UIMonthRangePickerCell, UIMonthRangePickerContent, UIMonthRangePickerGrid,
  UIYearRangePicker, UIYearRangePickerCell, UIYearRangePickerContent, UIYearRangePickerGrid,
} from "@connextable/ui";

test("period ranges mark their actual endpoints in the initial calendar", async () => {
  const examples = [
    {
      Root: UIMonthRangePicker, Content: UIMonthRangePickerContent, Grid: UIMonthRangePickerGrid, Cell: UIMonthRangePickerCell,
      periods: "months", idOf: period => `month-${period.month}`,
      value: { start: { year: 2026, month: 1, day: 1 }, end: { year: 2026, month: 11, day: 1 } },
      expected: [["month-1", "start"], ["month-11", "end"], ["month-10", undefined]],
    },
    {
      Root: UIYearRangePicker, Content: UIYearRangePickerContent, Grid: UIYearRangePickerGrid, Cell: UIYearRangePickerCell,
      periods: "years", idOf: period => `year-${period.year}`,
      value: { start: { year: 2026, month: 1, day: 1 }, end: { year: 2026, month: 1, day: 1 } },
      expected: [["year-2026", "both"], ["year-2027", undefined]],
    },
    {
      Root: UIYearRangePicker, Content: UIYearRangePickerContent, Grid: UIYearRangePickerGrid, Cell: UIYearRangePickerCell,
      periods: "years", idOf: period => `year-${period.year}`,
      value: { start: { year: 2026, month: 1, day: 1 }, end: { year: 2045, month: 1, day: 1 } },
      expected: [["year-2026", "start"], ["year-2031", undefined]],
    },
  ];

  for (const { Root, Content, Grid, Cell, periods, idOf, value, expected } of examples) {
    const html = await renderToString(createSSRApp({
      render: () => h(Root, { defaultValue: value, defaultOpen: true, position: false }, {
        default: state => h(Content, null, {
          default: () => h(Grid, null, {
            default: () => state[periods].flat().map(period =>
              h(Cell, { id: idOf(period), value: period }, () => idOf(period))),
          }),
        }),
      }),
    }));

    for (const [id, edge] of expected) {
      const cell = html.match(new RegExp(`<button\\b[^>]*\\bid="${id}"[^>]*>`))?.[0];
      assert.ok(cell, id);
      assert.equal(cell.match(/data-ui-range-edge="([^"]*)"/)?.[1], edge, id);
    }
  }
});
