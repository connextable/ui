import type { DateRange, DateValue } from "@sectile/temporal/date-field";
import type { DateTimeRange } from "@sectile/temporal/date-time-field";
import { defineComponent, getCurrentInstance, h, inject, isRef, provide, shallowRef, type Component, type ComponentInternalInstance, type InjectionKey, type PropType, type Ref } from "vue";

type CommittedRange = DateRange | DateTimeRange | null;
type CellPeriod = Pick<DateValue, "year"> & Partial<DateValue>;

const rangePresentation: InjectionKey<{
  committed: Readonly<Ref<CommittedRange>>;
  anchor?: Readonly<Ref<DateValue | null>>;
}> = Symbol("UIRangePresentation");

function pickerAnchor(scope: string): Readonly<Ref<DateValue | null>> | undefined {
  type PickerInstance = ComponentInternalInstance & { provides: object };
  let bindings = (getCurrentInstance()?.parent as PickerInstance | undefined)?.provides;

  // Sectile 0.21 exposes the committed value in the grid slot. The anchor
  // remains in the picker context until it has a public presentation API.
  while (bindings) {
    const values = bindings as Record<symbol, { scope?: string; rangeAnchor?: Ref<DateValue | null> } | undefined>;
    for (const key of Object.getOwnPropertySymbols(bindings)) {
      const context = values[key];
      if (context?.scope === scope && isRef(context.rangeAnchor)) return context.rangeAnchor;
    }
    bindings = Object.getPrototypeOf(bindings) as object | undefined;
  }
}

export function withRangeGridPresentation<T extends Component>(grid: T, scope: string): T {
  return defineComponent({
    inheritAttrs: false,
    setup(_, { attrs, slots }) {
      const committed = shallowRef<CommittedRange>(null);
      const anchor = pickerAnchor(scope);
      provide(rangePresentation, { committed, anchor });

      return () => h(grid, { ...attrs, "data-ui-range-draft": anchor?.value ? "" : undefined }, {
        default: (state: { value: CommittedRange }) => {
          committed.value = state.value;
          return slots.default?.(state);
        },
      });
    },
  }) as unknown as T;
}

function isSamePeriod(cell: CellPeriod, date: DateValue | undefined | null) {
  return !!date && cell.year === date.year
    && (cell.month === undefined || cell.month === date.month)
    && (cell.day === undefined || cell.day === date.day);
}

function dateOf(endpoint: NonNullable<CommittedRange>["start"] | undefined) {
  return endpoint && "date" in endpoint ? endpoint.date : endpoint;
}

export function withRangeCellPresentation<T extends Component>(cell: T): T {
  return defineComponent({
    inheritAttrs: false,
    props: { value: { type: Object as PropType<CellPeriod>, required: true } },
    setup(props, { attrs, slots }) {
      const range = inject(rangePresentation, undefined);
      return () => {
        const value = range?.committed.value;
        const start = isSamePeriod(props.value, dateOf(value?.start));
        const end = isSamePeriod(props.value, dateOf(value?.end));
        const anchor = isSamePeriod(props.value, range?.anchor?.value);
        return h(cell, {
          ...attrs,
          value: props.value,
          "data-ui-range-edge": start && end ? "both" : start ? "start" : end ? "end" : undefined,
          "data-ui-range-anchor": anchor ? "" : undefined,
        }, slots);
      };
    },
  }) as unknown as T;
}
