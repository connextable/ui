import type { DateValue } from "@sectile/temporal/date-field";
import { computed, defineComponent, h, inject, provide, type Component, type ComputedRef, type InjectionKey, type PropType } from "vue";
import { controlFlag } from "../clear/clearable";

type CellPeriod = Pick<DateValue, "year"> & Partial<DateValue>;

const rangeAnchorKey: InjectionKey<ComputedRef<DateValue | null | undefined>> = Symbol("UIRangeAnchor");

const TemporalRangePresentation = defineComponent({
  props: { anchor: Object as PropType<DateValue | null> },
  setup(props, { slots }) {
    provide(rangeAnchorKey, computed(() => props.anchor));
    return () => slots.default?.();
  },
});

export function withRangeContentPresentation<T extends Component>(content: T): T {
  return defineComponent({
    inheritAttrs: false,
    setup(_, { attrs, slots }) {
      return () => controlFlag(attrs.asChild ?? attrs["as-child"]) ? h(content, attrs, slots) : h(content, attrs, {
        default: (state: { rangeAnchor: DateValue | null }) => h(TemporalRangePresentation, { anchor: state.rangeAnchor }, {
          default: () => slots.default?.(state),
        }),
      });
    },
  }) as unknown as T;
}

export function withRangeGridPresentation<T extends Component>(grid: T): T {
  return defineComponent({
    inheritAttrs: false,
    setup(_, { attrs, slots }) {
      const anchor = inject(rangeAnchorKey, undefined);
      return () => h(grid, { ...attrs, "data-ui-range-draft": anchor?.value ? "" : undefined }, slots);
    },
  }) as unknown as T;
}

function isSamePeriod(cell: CellPeriod, date: DateValue | undefined | null) {
  return !!date && cell.year === date.year
    && (cell.month === undefined || cell.month === date.month)
    && (cell.day === undefined || cell.day === date.day);
}

export function withRangeCellPresentation<T extends Component>(cell: T): T {
  return defineComponent({
    inheritAttrs: false,
    props: { value: { type: Object as PropType<CellPeriod>, required: true } },
    setup(props, { attrs, slots }) {
      const anchor = inject(rangeAnchorKey, undefined);
      return () => h(cell, {
        ...attrs,
        value: props.value,
        "data-ui-range-anchor": isSamePeriod(props.value, anchor?.value) ? "" : undefined,
      }, slots);
    },
  }) as unknown as T;
}
