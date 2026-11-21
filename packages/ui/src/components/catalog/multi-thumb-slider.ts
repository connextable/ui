import {
  MultiThumbSliderRoot,
  type MultiThumbSliderRootProps,
} from "@sectile/vue/multi-thumb-slider";
import { computed, defineComponent, h, type PropType } from "vue";

export const UIMultiThumbSlider = defineComponent({
  name: "UIMultiThumbSlider",
  inheritAttrs: false,
  __sectileFormLabelMode: "labelledby",
  props: {
    thumbs: { type: Array as PropType<MultiThumbSliderRootProps["thumbs"]>, required: true },
    policies: Object as PropType<MultiThumbSliderRootProps["policies"]>,
    getThumbLabel: Function as PropType<MultiThumbSliderRootProps["getThumbLabel"]>,
    formatValue: Function as PropType<MultiThumbSliderRootProps["formatValue"]>,
  },
  setup(props, { attrs, slots }) {
    // Keep the drag connection alive when a render recreates equivalent props.
    const thumbs = computed<readonly string[]>((previous) => {
      const next = [...props.thumbs];
      return previous?.length === next.length && next.every((id, index) => id === previous[index])
        ? previous
        : next;
    });
    const policies = computed<MultiThumbSliderRootProps["policies"]>((previous) => {
      if (!props.policies) return undefined;
      const { minGap, allowCross } = props.policies;
      if (previous && previous.minGap === minGap && previous.allowCross === allowCross) return previous;
      return { minGap, allowCross };
    });
    const getThumbLabel = (id: string) => props.getThumbLabel?.(id) ?? id;
    const formatValue = (value: string, id: string) => props.formatValue?.(value, id) ?? value;

    return () => h(MultiThumbSliderRoot, {
      ...attrs,
      thumbs: thumbs.value,
      policies: policies.value,
      getThumbLabel: props.getThumbLabel && getThumbLabel,
      formatValue: props.formatValue && formatValue,
    }, slots);
  },
}) as typeof MultiThumbSliderRoot;
