import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from "@sectile/vue/slider";
import { defineComponent, h, mergeProps, type Component } from "vue";
import { controlFlag } from "../clear/clearable";

function withPointerFocus<T extends Component>(part: T, findThumb: (element: HTMLElement) => HTMLElement | null): T {
  return defineComponent({
    inheritAttrs: false,
    setup(_, { attrs, slots }) {
      function focusThumb(event: PointerEvent) {
        if (!event.isPrimary || event.button !== 0 || !(event.currentTarget instanceof HTMLElement)) return;
        const thumb = findThumb(event.currentTarget);
        if (
          thumb && thumb.ownerDocument.activeElement !== thumb &&
          !thumb.matches(':disabled, [aria-disabled="true"]')
        ) thumb.focus({ preventScroll: true });
      }

      return () => h(part, mergeProps(attrs, { onPointerdownCapture: focusThumb }), slots);
    },
  }) as unknown as T;
}

// Sectile cancels pointerdown during a drag, which also cancels the browser's click focus.
export const UISliderTrack = withPointerFocus(SliderTrack, element =>
  element.querySelector<HTMLElement>('[data-scope="slider"][data-part="thumb"]'));
export const UISliderThumb = withPointerFocus(SliderThumb, element => element);

export const UISlider = defineComponent({
  name: "UISlider",
  inheritAttrs: false,
  __sectileFormLabelMode: "labelledby",
  setup(_, { attrs, slots }) {
    return () => h(SliderRoot, attrs, slots.default || controlFlag(attrs.asChild ?? attrs["as-child"]) ? slots : {
      default: () => h(UISliderTrack, null, () => [h(SliderRange), h(UISliderThumb)]),
    });
  },
}) as unknown as typeof SliderRoot;
