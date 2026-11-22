import { RatingClear, RatingRoot, type RatingRootSlotProps } from "@sectile/vue/rating";
import { defineComponent, h, isVNode, type VNodeChild } from "vue";
import { withClearButton } from "../clear/clear-button-part";
import type { ClearableComponent } from "../clear/with-clearable";

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
    return () => h(RatingRoot, { ...attrs, items: attrs.items as readonly string[] }, {
      default: (state: RatingRootSlotProps) => {
        const children = slots.default?.(state) ?? [];
        if (!state.clearable || !state.value || state.disabled || state.readonly || containsClear(children)) return children;
        return [...children, h(UIRatingClear, { "aria-label": props.clearLabel })];
      },
    });
  },
}) as unknown as ClearableComponent<typeof RatingRoot>;
