import { Check, ChevronRight } from "@lucide/vue";
import {
  CascadeListColumn, CascadeListItem, CascadeListItemChevron, CascadeListItemIndicator, CascadeListRoot, CascadeListValue,
  type CascadeListColumnSlotProps, type CascadeListRootSlotProps,
} from "@sectile/vue/cascade-list";
import {
  CascadeSelectColumn, CascadeSelectContent, CascadeSelectItem, CascadeSelectItemChevron,
  CascadeSelectItemIndicator, CascadeSelectRoot, CascadeSelectValue,
} from "@sectile/vue/cascade-select";
import { defineComponent, h, type Component } from "vue";
import { controlFlag } from "../clear/clearable";
import { inputStateAttrs } from "../control-attrs";
import UICascadeSelectTrigger from "./UICascadeSelectTrigger.vue";

type CascadeOptions = { columnLabels?: readonly string[] };
type ComposedCascade<Root, Options> = Root extends abstract new (...args: never[]) => infer Instance
  ? Instance extends { $props: infer Props }
    ? new () => Instance & { $props: Props & Options }
    : Root
  : Root;

function renderCascadeColumns(
  state: CascadeListRootSlotProps,
  textValue: (id: string) => string,
  labels: readonly string[] | undefined,
  parts: { column: Component; item: Component; chevron: Component; indicator: Component },
) {
  return state.columns.map((_, depth) => h(parts.column, { key: depth, depth, label: labels?.[depth] }, {
    default: ({ items }: CascadeListColumnSlotProps) => items.map(id => h(parts.item, { key: id, value: id }, () => [
      textValue(id),
      h(parts.chevron, null, () => h(ChevronRight, { size: 16, "aria-hidden": "true" })),
      h(parts.indicator, null, () => h(Check, { size: 16, "aria-hidden": "true" })),
    ])),
  }));
}

const idText = (id: string) => id;
const listParts = { column: CascadeListColumn, item: CascadeListItem, chevron: CascadeListItemChevron, indicator: CascadeListItemIndicator };
const selectParts = { column: CascadeSelectColumn, item: CascadeSelectItem, chevron: CascadeSelectItemChevron, indicator: CascadeSelectItemIndicator };

export const CascadeListComposition = defineComponent({
  name: "UICascadeList",
  inheritAttrs: false,
  __sectileFormLabelMode: "labelledby",
  setup(_, { attrs, slots }) {
    return () => {
      const { columnLabels, "column-labels": columnLabelsKebab, ...bindings } = attrs;
      if (slots.default || controlFlag(attrs.asChild ?? attrs["as-child"])) return h(CascadeListRoot as Component, bindings, slots);
      const labels = (columnLabels ?? columnLabelsKebab) as CascadeOptions["columnLabels"];
      const labelFor = (attrs.textValue ?? attrs["text-value"] ?? idText) as typeof idText;
      return h(CascadeListRoot as Component, bindings, {
        default: (state: CascadeListRootSlotProps) => [
          h(CascadeListValue, null, () => state.valuePath.map(labelFor).join(" / ") || String(attrs.label ?? "")),
          ...renderCascadeColumns(state, labelFor, labels, listParts),
        ],
      });
    };
  },
}) as unknown as ComposedCascade<typeof CascadeListRoot, CascadeOptions>;

export const CascadeSelectComposition = defineComponent({
  name: "UICascadeSelect",
  inheritAttrs: false,
  __sectileFormLabelMode: "labelledby",
  setup(_, { attrs, slots }) {
    return () => {
      const { columnLabels, "column-labels": columnLabelsKebab, placeholder, ...bindings } = attrs;
      if (slots.default || controlFlag(attrs.asChild ?? attrs["as-child"])) return h(CascadeSelectRoot as Component, bindings, slots);
      const labels = (columnLabels ?? columnLabelsKebab) as CascadeOptions["columnLabels"];
      const labelFor = (attrs.textValue ?? attrs["text-value"] ?? idText) as typeof idText;
      return h(CascadeSelectRoot as Component, bindings, {
        default: (state: CascadeListRootSlotProps) => [
          h(UICascadeSelectTrigger, {
            "aria-label": attrs.label as string | undefined,
            "aria-description": state.readonly && !state.disabled ? "읽기 전용" : undefined,
            ...inputStateAttrs(state.disabled, state.readonly),
          },
            () => h(CascadeSelectValue, { placeholder: (placeholder ?? "항목 선택") as string })),
          h(CascadeSelectContent, null, () => renderCascadeColumns(state, labelFor, labels, selectParts)),
        ],
      });
    };
  },
}) as unknown as ComposedCascade<typeof CascadeSelectRoot, CascadeOptions & { placeholder?: string }>;
