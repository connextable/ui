import { Star } from "@lucide/vue";
import { RatingClear, RatingItem, RatingRoot, type RatingRootSlotProps } from "@sectile/vue/rating";
import { defineComponent, h, isVNode, type VNodeChild } from "vue";
import { withClearButton } from "../clear/clear-button-part";
import { controlFlag } from "../clear/clearable";
import type { ClearableComponent } from "../clear/with-clearable";
import { useInputState } from "../control-attrs";

export const UIRatingClear: typeof RatingClear = withClearButton(RatingClear, "평가 지우기");

function containsClear(children: VNodeChild): boolean {
  if (Array.isArray(children)) return children.some(containsClear);
  if (!isVNode(children)) return false;
  return children.type === UIRatingClear || children.type === RatingClear ||
    (Array.isArray(children.children) && containsClear(children.children));
}

export const UIRating = defineComponent({
  inheritAttrs: false,
  __sectileFormLabelMode: "labelledby",
  props: { clearLabel: String },
  setup(props, { attrs, slots }) {
    const { required, editable } = useInputState({
      get required() { return controlFlag(attrs.required); },
      get disabled() { return controlFlag(attrs.disabled); },
      get readonly() { return controlFlag(attrs.readonly); },
    });
    return () => {
      const items = attrs.items as readonly string[];
      const bindings = { ...attrs, items, required: required.value && editable.value };
      if (controlFlag(attrs.asChild ?? attrs["as-child"])) return h(RatingRoot, bindings, slots);
      return h(RatingRoot, bindings, {
        default: (state: RatingRootSlotProps) => {
          const children = slots.default?.(state) ?? items.map(value =>
            h(RatingItem, { key: value, value, "aria-label": value }, () => h(Star, { size: 18, "aria-hidden": "true" })));
          if (!state.clearable || !state.value || state.disabled || state.readonly || containsClear(children)) return children;
          return [...children, h(UIRatingClear, { "aria-label": props.clearLabel })];
        },
      });
    };
  },
}) as unknown as ClearableComponent<typeof RatingRoot>;
