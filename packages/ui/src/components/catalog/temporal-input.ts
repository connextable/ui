import { createDateFieldFormat, formatDateFieldValue, parseDateFieldValue } from "@sectile/temporal/date-field";
import { createTimeFieldFormat, formatTimeFieldValue, parseTimeFieldValue, type TimeFieldPrecision } from "@sectile/temporal/time-field";
import { createDateTimeFieldFormat, formatDateTimeFieldValue, parseDateTimeFieldValue } from "@sectile/temporal/date-time-field";
import { useTemporalFormatter } from "@sectile/vue/temporal/temporal-provider";
import { defineComponent, h, mergeProps, shallowRef, type Component } from "vue";

type TemporalInputKind = "date" | "date-time-date" | "time" | "date-time-time" | "date-time";
type Formatter = ReturnType<typeof useTemporalFormatter>["value"];

function datePrefix(text: string) {
  const separated = /^(\d{4})(?:[./-]\s*|년\s*|\s+)(\d{1,2})(?:[./-]\s*|월\s*|\s+)(\d{1,2})일?/.exec(text);
  const compact = separated ?? /^(\d{4})(\d{2})(\d{2})/.exec(text);
  if (!compact) return;
  const [, year = "", month = "", day = ""] = compact;
  const result = parseDateFieldValue(`${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`);
  if (!result.ok) return;
  return { date: result.value, tail: text.slice(compact[0].length) };
}

function flexibleTime(text: string) {
  const parts = /^(\d{1,2}):(\d{1,2})(?::(\d{1,2})(?:\.(\d{1,3}))?)?$/.exec(text)
    ?? /^(\d{1,2})(\d{2})$/.exec(text)
    ?? /^(\d{1,2})(\d{2})(\d{2})$/.exec(text);
  if (!parts) return;
  const [, hour = "", minute = "", second = "0", fraction = "0"] = parts;
  const result = parseTimeFieldValue(`${hour.padStart(2, "0")}:${minute.padStart(2, "0")}:${second.padStart(2, "0")}.${fraction.padEnd(3, "0")}`);
  return result.ok ? result.value : undefined;
}

function resolvedFormat<T>(result: { ok: true; value: T } | { ok: false } | undefined) {
  return result?.ok ? result.value : undefined;
}

function normalize(text: string, kind: TemporalInputKind, precision: TimeFieldPrecision, formatter: Formatter) {
  const input = text.normalize("NFKC").trim();
  const date = datePrefix(input);
  if (kind === "date" || kind === "date-time-date") {
    const format = kind === "date-time-date"
      ? resolvedFormat(formatter?.dateTimeFieldFormat("millisecond"))?.date
      : resolvedFormat(formatter?.dateFieldFormat());
    if (parseDateFieldValue(input, format).ok) return input;
    return date && /^[.\s]*$/.test(date.tail) ? formatDateFieldValue(date.date, format) : undefined;
  }

  const onlyTime = kind === "time" || kind === "date-time-time";
  const timeFormat = (kind === "date-time-time"
    ? resolvedFormat(formatter?.dateTimeFieldFormat(precision))?.time
    : resolvedFormat(formatter?.timeFieldFormat(precision))) ?? createTimeFieldFormat({ precision });
  const timeText = onlyTime ? input : date?.tail.replace(/^(?:T|\.\s*|\s+)/, "");
  const time = timeText && flexibleTime(timeText);
  const fitsPrecision = time &&
    (precision === "millisecond" || time.millisecond === 0) &&
    (precision !== "minute" || time.second === 0);
  if (onlyTime) {
    if (parseTimeFieldValue(input, timeFormat).ok) return input;
    return fitsPrecision ? formatTimeFieldValue(time, timeFormat) : undefined;
  }

  const dateTimeFormat = resolvedFormat(formatter?.dateTimeFieldFormat(precision)) ?? createDateTimeFieldFormat({
    date: createDateFieldFormat({ order: ["year", "month", "day"] }),
    time: timeFormat,
    separator: "T",
  });
  if (parseDateTimeFieldValue(input, dateTimeFormat).ok) return input;
  return date && fitsPrecision && time ? formatDateTimeFieldValue({ date: date.date, time }, dateTimeFormat) : undefined;
}

export function withTemporalEditing<T extends Component>(
  part: T,
  kind: TemporalInputKind,
  defaults: { precision?: TimeFieldPrecision } = {},
): T {
  const metadata = part as T & { __sectileFormLabelMode?: "labelledby"; __sectileSubmissionPart?: number };
  return defineComponent({
    inheritAttrs: false,
    __sectileFormLabelMode: metadata.__sectileFormLabelMode,
    __sectileSubmissionPart: metadata.__sectileSubmissionPart,
    setup(_, { attrs, slots, expose }) {
      const formatter = useTemporalFormatter();
      const control = shallowRef<{ element?: HTMLInputElement; $el?: unknown }>();
      const element = () => control.value?.element ?? (control.value?.$el instanceof HTMLInputElement ? control.value.$el : null);
      expose({
        get element() { return element(); },
        focus: (options?: FocusOptions) => element()?.focus(options),
        select: () => element()?.select(),
      });

      function normalizeText(input: HTMLInputElement, text: string) {
        const configured = attrs.precision;
        const precision = configured === "minute" || configured === "second" || configured === "millisecond" ? configured
          : input.placeholder.includes("SSS") ? "millisecond"
          : input.placeholder.includes("ss") ? "second" : "minute";
        return normalize(text, kind, precision, formatter.value);
      }

      function editableInput(event: Event) {
        const input = event.currentTarget;
        if (input instanceof HTMLInputElement && input.type === "text" &&
            !input.disabled && !input.readOnly && input.getAttribute("aria-readonly") !== "true") return input;
      }

      function replaceText(input: HTMLInputElement, text: string) {
        if (input.value === text) return;
        input.value = text;
        input.dispatchEvent(new InputEvent("input", { bubbles: true, inputType: "insertReplacementText" }));
      }

      function normalizeDraft(event: Event) {
        const input = editableInput(event);
        if (!input || composing) return;
        const text = normalizeText(input, input.value);
        if (text !== undefined) replaceText(input, text);
      }

      function normalizePaste(event: ClipboardEvent) {
        const input = editableInput(event);
        if (!input || composing || event.defaultPrevented ||
            input.selectionStart !== 0 || input.selectionEnd !== input.value.length) return;
        const text = normalizeText(input, event.clipboardData?.getData("text/plain") ?? "");
        if (text === undefined) return;
        event.preventDefault();
        replaceText(input, text);
      }

      let composing = false;
      return () => h(part, mergeProps(defaults, attrs, {
        ref: control,
        onCompositionstart: () => { composing = true; },
        onCompositionend: () => { composing = false; },
        onKeydownCapture: (event: KeyboardEvent) => {
          if (event.key === "Enter" && !event.isComposing && !event.defaultPrevented) normalizeDraft(event);
        },
        onBlurCapture: normalizeDraft,
        onPaste: normalizePaste,
      }), slots);
    },
  }) as unknown as T;
}
