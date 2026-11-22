import { Check, ChevronRight } from "@lucide/vue";
import {
  CascadeListColumn, CascadeListItem, CascadeListItemChevron, CascadeListItemIndicator, CascadeListRoot, CascadeListValue,
  type CascadeListColumnSlotProps, type CascadeListRootProps, type CascadeListRootSlotProps,
} from "@sectile/vue/cascade-list";
import {
  CascadeSelectColumn, CascadeSelectContent, CascadeSelectItem, CascadeSelectItemChevron,
  CascadeSelectItemIndicator, CascadeSelectRoot, CascadeSelectValue,
} from "@sectile/vue/cascade-select";
import { defineComponent, h, type Component } from "vue";
import { controlFlag, useFieldClear } from "../clear/clearable";
import UIFieldClear from "../clear/UIFieldClear.vue";
import { inputStateAttrs, useInputState } from "../control-attrs";
import UICascadeSelectTrigger from "./UICascadeSelectTrigger.vue";
import UIItemIcon from "../UIItemIcon.vue";

type CascadeNode = CascadeListRootProps["nodes"][number] & { readonly icon?: Component };
type CascadeOptions = { columnLabels?: readonly string[]; nodes: readonly CascadeNode[] };
type ComposedCascade<Root, Options> = Root extends abstract new (...args: never[]) => infer Instance
  ? Instance extends { $props: infer Props }
    ? new () => Instance & { $props: Props & Options }
    : Root
  : Root;

function renderCascadeColumns(
  state: CascadeListRootSlotProps,
  textValue: (id: string) => string,
  labels: readonly string[] | undefined,
  nodes: readonly CascadeNode[],
  parts: { column: Component; item: Component; chevron: Component; indicator: Component },
) {
  const icons = new Map(nodes.map(({ id, icon }) => [id, icon]));
  return state.columns.map((_, depth) => h(parts.column, { key: depth, depth, label: labels?.[depth] }, {
    default: ({ items }: CascadeListColumnSlotProps) => items.map(id => h(parts.item, { key: id, value: id }, () => [
      icons.has(id) && h(UIItemIcon, { icon: icons.get(id) }),
      textValue(id),
      h(parts.chevron, null, () => h(ChevronRight, { size: 16, "aria-hidden": "true" })),
      h(parts.indicator, null, () => h(Check, { size: 16, "aria-hidden": "true" })),
    ])),
  }));
}

const idText = (id: string) => id;
const listParts = { column: CascadeListColumn, item: CascadeListItem, chevron: CascadeListItemChevron, indicator: CascadeListItemIndicator };
const selectParts = { column: CascadeSelectColumn, item: CascadeSelectItem, chevron: CascadeSelectItemChevron, indicator: CascadeSelectItemIndicator };

function useCascadeRequired(attrs: Record<string, unknown>) {
  return useInputState({
    get required() { return controlFlag(attrs.required); },
    get disabled() { return controlFlag(attrs.disabled); },
    get readonly() { return controlFlag(attrs.readonly); },
  });
}

export const CascadeListComposition = defineComponent({
  name: "UICascadeList",
  inheritAttrs: false,
  __sectileFormLabelMode: "labelledby",
  setup(_, { attrs, slots }) {
    const { required, editable } = useCascadeRequired(attrs);
    const clear = useFieldClear();
    return () => {
      const { columnLabels, "column-labels": columnLabelsKebab, ...rootAttrs } = attrs;
      const bindings = { ...rootAttrs, required: required.value && editable.value };
      if (controlFlag(attrs.asChild ?? attrs["as-child"])) return h(CascadeListRoot as Component, bindings, slots);
      const labels = (columnLabels ?? columnLabelsKebab) as CascadeOptions["columnLabels"];
      const labelFor = (attrs.textValue ?? attrs["text-value"] ?? idText) as typeof idText;
      return h(CascadeListRoot as Component, bindings, {
        ...slots,
        default: (state: CascadeListRootSlotProps) => [slots.default?.(state) ?? [
          h(CascadeListValue, null, () => state.valuePath.map(labelFor).join(" / ") || String(attrs.label ?? "")),
          ...renderCascadeColumns(state, labelFor, labels, attrs.nodes as CascadeOptions["nodes"], listParts),
        ], clear?.enabled.value ? h(UIFieldClear, { footer: true }) : null],
      });
    };
  },
}) as unknown as ComposedCascade<typeof CascadeListRoot, CascadeOptions>;

export const CascadeSelectComposition = defineComponent({
  name: "UICascadeSelect",
  inheritAttrs: false,
  __sectileFormLabelMode: "labelledby",
  setup(_, { attrs, slots }) {
    const { required, editable } = useCascadeRequired(attrs);
    return () => {
      const { columnLabels, "column-labels": columnLabelsKebab, placeholder, ...rootAttrs } = attrs;
      const bindings = { ...rootAttrs, required: required.value && editable.value };
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
          h(CascadeSelectContent, null, () => renderCascadeColumns(state, labelFor, labels, attrs.nodes as CascadeOptions["nodes"], selectParts)),
        ],
      });
    };
  },
}) as unknown as ComposedCascade<typeof CascadeSelectRoot, CascadeOptions & { placeholder?: string }>;
