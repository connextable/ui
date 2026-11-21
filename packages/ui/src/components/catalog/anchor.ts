import { Anchor, type AnchorProps, type AnchorExpose } from "@sectile/vue/primitive";
import { defineComponent, h, mergeProps, shallowRef, type VNodeProps } from "vue";

export const UIAnchor = defineComponent({
  name: "UIAnchor",
  inheritAttrs: false,
  setup(_, { attrs, slots, expose }) {
    const anchor = shallowRef<AnchorExpose | null>(null);
    expose({
      get element() { return anchor.value?.element ?? null; },
      focus(options?: FocusOptions) { anchor.value?.focus(options); },
    } satisfies AnchorExpose);
    return () => h(Anchor, mergeProps(attrs, { ref: anchor, class: "ui-anchor" }) as AnchorProps & VNodeProps, slots);
  },
}) as typeof Anchor;
