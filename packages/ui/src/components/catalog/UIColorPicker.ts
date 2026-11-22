import { formatColorValue } from "@sectile/core/color-picker";
import {
  ColorPickerAlphaSlider, ColorPickerArea, ColorPickerAreaThumb, ColorPickerHueSlider,
  ColorPickerRoot, ColorPickerSwatch, ColorPickerTextInput, type ColorPickerRootSlotProps,
} from "@sectile/vue/color-picker";
import { defineComponent, h } from "vue";
import { controlFlag } from "../clear/clearable";

export const UIColorPicker = defineComponent({
  name: "UIColorPicker",
  inheritAttrs: false,
  __sectileFormLabelMode: "labelledby",
  setup(_, { attrs, slots }) {
    return () => h(ColorPickerRoot, attrs, slots.default || controlFlag(attrs.asChild ?? attrs["as-child"])
      ? slots
      : {
        default: ({ value, format }: ColorPickerRootSlotProps) => {
          const example = formatColorValue(value, format);
          return [
            h(ColorPickerArea, { "aria-label": "색 영역" }, () => h(ColorPickerAreaThumb)),
            h(ColorPickerHueSlider, { "aria-label": "색조" }),
            controlFlag(attrs.allowAlpha ?? attrs["allow-alpha"]) && h(ColorPickerAlphaSlider, { "aria-label": "불투명도" }),
            h("div", { class: "ui-color-sample" }, [
              h(ColorPickerSwatch),
              h(ColorPickerTextInput, { "aria-label": "색상 값", placeholder: example.ok ? `예: ${example.value}` : undefined }),
            ]),
          ];
        },
      });
  },
}) as unknown as typeof ColorPickerRoot;
