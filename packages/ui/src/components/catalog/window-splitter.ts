import type { SliderSlotProps } from "@sectile/vue/slider";
import { WindowSplitterPane, WindowSplitterRoot } from "@sectile/vue/window-splitter";
import { defineComponent, h, type VNodeChild } from "vue";
import { controlFlag } from "../clear/clearable";
import UIWindowSplitterHandle from "./UIWindowSplitterHandle.vue";

type SplitterInstance = InstanceType<typeof WindowSplitterRoot>;
type SplitterWithPanes = new () => Omit<SplitterInstance, "$slots"> & {
  $slots: SplitterInstance["$slots"] & {
    before?: (state: SliderSlotProps) => VNodeChild;
    after?: (state: SliderSlotProps) => VNodeChild;
    grip?: () => VNodeChild;
  };
};

export const UIWindowSplitter = defineComponent({
  name: "UIWindowSplitter",
  inheritAttrs: false,
  props: {
    step: [Number, String],
    pageStep: Number,
  },
  setup(props, { attrs, slots }) {
    return () => {
      const content = slots.default || controlFlag(attrs.asChild ?? attrs["as-child"]) ? slots : {
        default: (state: SliderSlotProps) => [
          h(WindowSplitterPane, { side: "before" }, () => slots.before?.(state)),
          h(UIWindowSplitterHandle, null, slots.grip ? { default: slots.grip } : undefined),
          h(WindowSplitterPane, { side: "after" }, () => slots.after?.(state)),
        ],
      };
      return h(WindowSplitterRoot, {
        ...attrs,
        step: props.step ?? 0.1,
        // Page Up and Page Down still move ten percentage points with the finer default step.
        pageStep: props.pageStep ?? (props.step === undefined ? 100 : undefined),
      }, content);
    };
  },
}) as unknown as SplitterWithPanes;
