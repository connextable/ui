import { WindowSplitterRoot } from "@sectile/vue/window-splitter";
import { defineComponent, h } from "vue";

export const UIWindowSplitter = defineComponent({
  name: "UIWindowSplitter",
  inheritAttrs: false,
  props: {
    step: [Number, String],
    pageStep: Number,
  },
  setup(props, { attrs, slots }) {
    return () => h(WindowSplitterRoot, {
      ...attrs,
      step: props.step ?? 0.1,
      // Page Up and Page Down still move ten percentage points with the finer default step.
      pageStep: props.pageStep ?? (props.step === undefined ? 100 : undefined),
    }, slots);
  },
}) as typeof WindowSplitterRoot;
